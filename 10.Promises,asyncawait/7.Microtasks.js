// Microtasks
console.log("--- MICROTASKS ---");

// Promise handlers ".then / .catch / .finally" are always asynchronous.

// Even when a Promise is immediately resolved, the code on the lines below
// ".then / .catch / .finally" will still execute before these handlers.
// Demo:
let promise = Promise.resolve();
promise.then(() => console.log("promise done!"));
console.log("code finished"); // this shows first

// Microtasks queue
console.log(" ");
console.log("--- MICROTASKS QUEUE ---");

// Asynchronous tasks need proper management. For that, the ECMA stansard specifies an internal queue
// "PromiseJobs", more often referred to as the "microtask queue".

// As stated in the spec:
// • The queue is first-in-first-out: tasks enqueued first are run first.
// • Execution of a task is initiated only when nothing else is running.

// When a promise is ready, its handlers are put into the queue; they are not executed yet. When the JS engine becomes
// free from the current code, it takes task from the queue and executes it.

// If order matters, add it into the queue with ".then":
Promise.resolve()
  .then(() => console.log("Promise done!"))
  .then(() => console.log("code finished"));
// now order is as intended.

// Unhandled rejection
console.log(" ");
console.log("--- UNHANDLED REJECTION ---");

// An "unhandled rejection" occurs when a promise error is not handled at the end og the microtask queue.
// Normally, if an error is expected, ".catch" is added to the promise chain to handle it:
let promise = Promise.reject(new Error("Promise Failed"));
promise.catch((err) => console.log("caught"));

// does not run: error handled
window.addEventListener("unhandledrejection", (even) =>
  console.log(event.reason)
);

// But if ".catch" is not added, then after the microtask queue is empty,
// the engine triggers the event:
promise = Promise.reject(new Error("Promise Failed"));

// Promise Failed
window.addEventListener("unhandledrejection", (event) =>
  console.log(event.reason)
);

// If the error is handled later, like this:
promise = Promise.reject(new Error("Promise Failed"));
setTimeout(() => promise.catch((err) => console.log("caught")), 1000);

// Error: Promise Failed
window.addEventListener("unhandledrejection", (event) =>
  console.log(event.reason)
);

// Now, if the code is ran, "Promise Failed" is first and then "caught".

// "unhandledrejection" is generated when the microtask queue is complete: the engine examines promises
// and, if any of them is in the "rejected" statem then the event triggers.

// In the example above, ".catch" added by "setTimeout" also triggers. But it does so later, 
// after "unhandledrejection" has already occurred, so it does not change anything.
