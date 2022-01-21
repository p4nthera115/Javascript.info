const header = document.querySelector("h1");
header.innerText = "Promises Chaining";

// Promises chaining
console.log("--- PROMISES CHAINING ---");

// In 10.1, a sequence of asynchronous tasks (loading scripts) were to be performed one after another.
// This is that done with "promise chaining":
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
})
  .then(function (result) {
    // (**)
    console.log(result); // 1
    return result * 2;
  })
  .then(function (result) {
    // (***)
    console.log(result); // 2
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 4
    return result * 2;
  });
// The idea is that the result is passed through the chain of ".then" handlers.
// Here the flow is:
// 1. The initial promise resolves in 1 second "(*)",
// 2. Then the ".then" handler is called "(**)", which in turn creates a new promise (resolves with "2" value).
// 3. The next "then" "(***)" gets the result of the previous one,
//    processes it (doubles) and passes it to the next handler.
// 4. ...and so on.

// As the result is passed along the chain of handlers, there is a sequence of "console.log" calls: 1 -> 2 -> 4.

// The whole thing works, because every call to a ".then" returns a new promise, so that the next ".then"
// can be called.
// When a handler returns a value, it becomes the result of that promise, so the next ".then" is called with it.

// ~ A classic newbie error: technically many ".then" can be added to a single promise. This is not chaining. ~
// For example:
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function (result) {
  console.log(result); // 1
  return result * 2;
});

promise.then(function (result) {
  console.log(result); // 1
  return result * 2;
});

promise.then(function (result) {
  console.log(result);
  return result * 2;
});
// This is just several handlers to one promise.
// They do not pass the result to each other, instead they process it independently.
// All ".then" on the same promise get the same result - the result of that promise. So in the code above
// all "console.log" show the same: "1".

// Returning Promises
console.log(" ");
console.log("--- RETURNING PROMISES ---");

// A handler, used in ".then(handler)" may create and return a promise.
// In that case further handlers wait until it settles, and then get its result.

// For instance:
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); // 1

    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    // (**)
    console.log(result); // 2

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    console.log(result); // 4
  });
// Here the first ".then" shows "1" and return "new Promise(...)" in the line "(*)".
// After one second it resolves, and the result (the argument of "resolve", here it is "result * 2")
// is passed on to the handler of the second ".then". That handler is in the line "(**)", it shows "2"
// and does the same thing.

// So the output is the same as in the previous example: 1 -> 2 -> 4, but now with 1 second delay
// between "console.log" calls.
// Returning promises allows to build chains of asynchronous actions.

// Example: loadScript
console.log(" ");
console.log("--- EXAMPLE: LOADSCRIPT ---");

// Using this feature with the promisified "loadScript" defined in the previous chapter:
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

// Load scripts one by one, in sequence:
loadScript("10.Promises,asyncawait/3.PromisesChaining/one.js")
  .then(function (script) {
    return loadScript("10.Promises,asyncawait/3.PromisesChaining/two.js");
  })
  .then(function (script) {
    return loadScript("10.Promises,asyncawait/3.PromisesChaining/three.js");
  })
  .then(function (script) {
    // use function declared in scripts
    // to show that they indeed loaded
    one();
    two();
    three();
  });
// Here each "loadScript" call returns a promise, and the next ".then" runs when it resolves.
// Then it initiates the loading of the next script. So scripts are loaded one after another.
// Note: The code is still "flat" it grows down, not right; so there are no signs of the "Pyramid of Doom".

// Bigger example: fetch
console.log(" ");
console.log("--- BIGGER EXAMPLE: FETCH ---");

// In frontend programming promises, are often used for network requests.
// This example will use the "fetch" method to load the information about the user from the remote server.
// Basic syntax:
/*
  let promise = fetch(url);
*/
// This makes a network request to the "url" and returns a promise. The promise resolves with a "response"
// object when the remote server responds with headers, but before the full response is downloaded.

// To read the full response, the method "responese.text()" should be called; it returns a promise that resolves when
// the full text is downloaded from the remote server, with that text as a result.

// The code below makes a request to "user.json" and loads its text from the server:
fetch("https://javascript.info/article/promise-chaining/user.json")
  // .then below runs when the remote server responds
  .then(function (response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function (text) {
    // ...and here is the content of the remote file
    console.log(text);
  });
// The "response" object returned from "fetch" also includes the method "respone.json()" that reads the remote data
// and parses it as JSON. In this case, that is more convenient so it will be used instead.

// Use arrow functions for brevity:
fetch("https://javascript.info/article/promise-chaining/user.json")
  .then((response) => response.json())
  .then((user) => console.log(user.name)); // iliakan, got username

// Do something with the loaded user.
// For instance, make a request to GitHub, load the user profile and show the avatar:

// Make a request for user.json
// fetch("https://javascript.info/article/promise-chaining/user.json")
//   // Load it as json
//   .then((response) => response.json())
//   // Make a request to GitHub
//   .then((user) => fetch(`https://api.github.com/users/${user.name}`))
//   // Load the response as json
//   .then((response) => response.json())
//   // Show the avatar image (githubUser.avatar_url) for 3 seconds
//   .then((githubUser) => {
//     let img = document.createElement("img");
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => img.remove(), 5000);
//   });

// As of right now, there is no way to make the chain extendable.
// To do this a promise that resolves when the avater finishes showing needs to be returned:
// fetch("https://javascript.info/article/promise-chaining/user.json")
//   .then((response) => response.json())
//   .then((user) => fetch(`https://api.github.com/users/${user.name}`))
//   .then((response) => response.json())
//   .then(
//     // (*)
//     (githubUser) =>
//       new Promise(function (resolve, reject) {
//         let img = document.createElement("img");
//         img.src = githubUser.avatar_url;
//         img.className = "promise-avatar-example";
//         document.body.append(img);

//         setTimeout(() => {
//           img.remove();
//           resolve(githubUser);
//         }, 5000);
//       })
//   )
//   .then((githubUser) => console.log(`finished showing ${githubUser.name}`));

// The ".then" handler here "(*)", now returns "new Promise", that becomes settles only after the call of
// "resolve(githubUser)" in "setTimeout". The next ".then" in the chain will wait for that.

// As a good practice, an asynchronous action should always return a promise. That makes it possible to plan actions
// after it; even if it is not planned to extend the chain at that moment, it may be needed later.

// Finally, the code can be split into reusable functions:

function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Use them:
loadJson("https://javascript.info/article/promise-chaining/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => console.log(`Finished showing ${githubUser.name}`));
