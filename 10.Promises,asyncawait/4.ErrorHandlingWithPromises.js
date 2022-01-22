// Error Handling With Promises
console.log("--- ERROR HANDLING WITH PROMISES ---");

// Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection
// handler. That is very convenient in practice.

// For instance, in the code below the URL to "fetch" is wrong (no such site) and ".catch" handles the error:
fetch("https://no-such-server.blabla") // rejects
  .then((response) => response.json())
  .catch((err) => console.log(err)); // TypeError: NetworkError when attempting to fetch resource.
// The ".catch" does not have to be immediate. IT may appear ayfter one or maybe several ".then".

// Or, maybe, everything is all right with the site, but the response is not valid JSON.
// The easiest way to catch all errors to append ".catch" to the end of the chain:
fetch("https://javascript.info/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise((resolve, reject) => {
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      })
  )
  .catch((error) => console.log(error.message));
// Normally, such ".catch" does not trigger at all. But if any of the promises above rejects
// (a network problem or invalid json or whatever), then it would catch it.

// Implicit try...catch
console.log(" ");
console.log("--- IMPLICIT TRY...CATCH ---");

// The code of a promise executor and promise handlers has an "invisible 'try...catch'" around it.
// If an exception happens, it gets caught and treated as a rejection.

// For example, this code:
new Promise((resolve, reject) => {
  throw new Error("oopsie doopsie poopsie");
}).catch(console.log);

// works exactly the same at this:

new Promise((resolve, reject) => {
  reject(new Error("poopsie loopsie woopsie"));
}).catch(console.log);

// The "invisible 'try...catch'" around the executor automatically catches the
// error and turns it into rejected promise.
// This happens not only in the executor function, but in its handlers as well.
// If "throw" is inside a ".then" handler, that means a rejected promise,
// so the control jumps to the nearest error handler.
// Example:
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    throw new Error("Whoopsies"); // rejects the promise
  })
  .catch(console.log);

// This happens for all errors, not just those cause by the "throw" statement
// For example, a programming error:
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((resolve) => {
    blabla(); // no such function
  })
  .catch(console.log); // ReferenceError: blabla is not defined

// The final ".catch" not only catches explicit rejections, but also accidental errors in the handlers above.

// Rethrowing
console.log(" ");
console.log("--- RETHROWING ---");

// If a "throw" is inside ".catch", then the control goes to the nect closest error handler.
// And if the error is handled normally, then it continues to the next closest successful ".then" handler.

// In the example below the ".catch" successfully handles the error:

// the execution: catch -> then
new Promise((resolve, reject) => {
  throw new Error("AAAAAHHHH");
})
  .catch(function (error) {
    console.log("The error is handled, continue normally");
  })
  .then(() => console.log("Next successful handler runs"));
// Here the ".catch" block finishes normally. So the next successful ".then" handler
// is called.

// In the example below we see the other situation with ".catch". The handler "(*)" catches the error
// and just can not handle it (e.g. it only know how handle "URIError"), so it throw it again:

//the execution: catch -> catch
new Promise((resolve, reject) => {
  throw new Error("WHOOPSSSS");
})
  .catch(function (error) {
    // (*)
    if (error instanceof URIError) {
      // handle it
    } else {
      console.log("Can't handle such error");

      throw error; // throwing this or another error jumps to the next catch
    }
  })
  .then(function () {
    // doesn't run here
  })
  .catch((error) => {
    // (**)
    console.log(`The unknown error has occurres: ${error}`);
    // don't return anything => execution goes the normal way
  });
// The execution jumps from the first ".catch" "(*)" to the next one "(**)" down the chain.

// Unhandled Rejections
console.log(" ");
console.log("--- UNHANDLED REJECTIONS ---");

// The JS engine tracks unhandled promise rejections and generates a global error.
// In the browser, such errors can be caught using the event "unhandledrejection":
window.addEventListener("unhandledrejection", function (event) {
  // the event object has two special properties:
  console.log(event.promise); // [object Promise] - the promise that generated
  console.log(event.reason); // Error: Whoops! - the unhandled error object
});

new Promise(function () {
  throw new Error("oops...");
}); // no catch to handle the error

// The event is part of the "HTML standard".
// If an error occurs, and there is no ".catch", the "unhandledrejection" handler triggers, and egets the "event"
// object with the information about the error, so something can be done.

// Usually such errors are unrecoverable, so the best way out is to inform the user about the problem and probably
// report the incident to the server.
// In non-browser environments like Node.js there are other ways to track unhandled errors.
