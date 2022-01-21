// Promise
console.log("--- PROMISE ---");

// A promise is an object that may produce a single value some time in the future:
// either a resolved value, or a reason that it's not resolved (e.g., a network error occurred).

// Constructor syntax for a promise object is:
/*
    let promise = new Promise(function(resolve, reject) {
        // executor
    });
*/
// The function passed to "new Promise" is called the executor. When "new Promise" is created,
// the executor runs automatically.
// Its arguments "resolve" and "reject" are callbacks provided by JS itself.
// The only original code is inside the executor.

// When the executor obtains the result, it should call one of these callbacks:
// • "resolve(value)" - if the job is finished successfully, with result "value".
// • "reject(error)" - if an error has occurred, "error" is the error object.

// To summarize: the executor runs automatically and attempts to perform a job.
// When it is finished with the attempt, it calls "resolve" if it was successful or "reject" if there was an error.

// The "promise" object returned by the "new Promise" constructor has these internal properties:
// • "state" - initially "pending", then changes to either "fulfilled" when "resolve" is called or
//   "rejected" when "reject" is called.
// • "result" - initially "undefined", then changes to "value" when "resolve(value)" called or
//   "error" when "reject(error)" is called.

// Example of a promise constructor and a simple executor function:
let promise = new Promise(function (resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result is "done"
  setTimeout(() => resolve(console.log("done")), 1000);
});

// Two things can be seen by running the code above:
// 1. The executor is called automatically and immediately (by "new Promise").
// 2. The executor receives two arguments: "resolve" and "reject".
//    These functions are pre-defined by the JS engine, so there is no need to create them.
//    They should only be called when ready.
//
//    After one second of "processing" the executor calls "resolve("done")" to produce the result.
//    This changes the state of the "promise" object from:
//    "state: pending" and "result: undefined" to "state: fulfilled" and "result: done".

// Example of the executor rejecting the promise with an error:
promise = new Promise(function (resolve, reject) {
  // after 1 second signal that the job is finished with an error
  //   setTimeout(() => reject(new Error("Whoops!")), 1000);
});
// The call to "reject(...)" moves the promise object to "rejected" state:
// from "state: pending" and "result: undefined" to "state: rejected" and "result: error"

// To summarize, the executor should perform a job and then call "resolve" or "reject" to change the state of
// the corresponding promise object.
// A promise that is either resolves or rejected is called "settled", as opposed to an initially "pending" promise.

// There can only be a single result or error:
// The executor should call only one "resolve" or one "reject". Any state change is final.
// All further calls of "resolve" and "reject" are ignored.
// They also only expect one argument (or none) and will ignore additional arguments.

// Consumers: then, catch, finally
console.log("");
console.log("--- CONSUMERS: THEN, CATCH, FINALLY ---");

// A "Promise" object serves as a link between the executor and the consuming functions,
// which will receive the result or error. Consuming functions can be registereed using methods
// ".then", ".catch" and ".finally".

// then
console.log("");
console.log("-- then --");

// The most important, fundamental one is ".then".
// Syntax:
/*
    promise.then(
        function(result) { handle a successful result },
        function(error) { handle an error }
    );
*/
// The first argument of ".then" is a function that runs when the promise is resolved, and receives the result.
// The second argument is a funciton that runs when the promise is rejected, and received the error.

// Example of a successfully resolves promise:
promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});
//resolve runs the first function in .then
promise.then(
  (result) => console.log(result),
  (error) => console.log(error)
);

// rejected promise:
promise = new Promise(function (resolve, reject) {
  setTimeout(
    () => reject(new Error("HAWT DAYUM, SOMETHING WENT WRONG!")),
    1000
  );
});
// reject runs the second function in .then
promise.then(
  (result) => console.log(result),
  (error) => console.log(error)
);

// If interested only in successful completions, only one function argument can be provided to ".then":
promise = new Promise((resolve) => {
  setTimeout(() => resolve("WOOOOO!"), 1000);
});
promise.then(console.log);

// catch
console.log("");
console.log("-- catch --");

// If interested only in errors, then "null" can be used as the first argument:
// ".then(null, errorHandlingFunction)".
// Or ".catch(errorHandlingFunction)" can be used, which is exactly the same:
promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error(".catch oopsie"), 1000));
});
// .catch(f) is the same as promise.then(null, f)
promise.catch(console.log);

// finally
console.log("");
console.log("-- finally --");

// Just like there is a "finally" clase in a regular "try {...} catch {...}",
// there is a "finally" in promises.

// The call ".finally(f)" is similar to ".then(f, f)" in the sens that "f"
// always runs when the promise is settled: be it resolve or reject.
// "finally" is a good handler for pergorming cleanup, e.g. stopping loading indicators,
// as they are not needed anymore, no matter the outcome.

// Like this:
/*
    new Promise((resolve, reject) => {
        // do something that takes time, and then call resolve/reject
    })
        // runs when the promise is settled, does not matter successfully or not
        .finally(() => stop loading indicator)
        // so the loading indicator is always stopped before the result/error is processed
        .then(result => show result, err => show error)
*/

// There are a few differences between "finally(f)" and "then(f, f)":
// 1. A "finally" hanfler has no arguments. In "finally" it is unknown whether the promise is successful or not.
//    