// Function Binding
console.log("--- FUNCTION BINDING ---");

// When passing object methods as callbacks, for instance to "setTimeout",
// there is a known problem: "losing 'this'".

// Losing "this"
console.log("");
console.log('--- LOSING "THIS" ---');

// Once a method is passed somewhere seperately from the object - "this" is lost.
// Here is how it may happen with "setTimeout":
let user = {
  firstName: "Finn",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  },
};
setTimeout(user.sayHi, 500); // Hello, undefined!
// "setTimeout" got the function "user.sayHi", seperately from the object. The last line can be rewritten as:
let f = user.sayHi;
setTimeout(f, 600); // lost user context
// The method "setTimeout" in-browser is a little special: it sets "this = window" for the function call
// (for Node.js, "this" becomes the timer object, but does not matter here). So for "this.firstName" it tries to cget
// "window.firstName", which does not exist. In other similar cases usually "this" just becomes "undefined".

// The task is quite typical - an object method must be passed somewhere else (here - to the scheduler) where it will
// be called. How to make sure that it will be called in the right context?

// Solution 1: a wrapper
console.log("");
console.log("--- SOLUTION 1: A WRAPPER ---");

// The simplest solution is to use a wrapping function:
user = {
  firstName: "Finn",
  sayHey() {
    console.log(`Hello, ${this.firstName}!`);
  },
};

setTimeout(function () {
  user.sayHey();
}, 700);
