// Arrow Functions Revisited
console.log("--- ARROW FUNCTIONS REVISITED ---");

// Arrow functions are not just a "shorthand" for writing small stuff. They have some specific and useful features.
// JS is full of situations where a small function needs to be written that is executed somewhere else.
// For instance:
// • "arr.forEach(func)" - "func" is executed by "forEach" for every array item.
// • "setTimeout(func)" - "func" is executed by the built-in scheduler.
// • ...there are many more.

// Arrow functions have no "this"
console.log("");
console.log('--- ARROW FUNCTION HAVE NO "THIS" ---');

// Arrow functions do not have "this". If "this" is accessed, it is taked from the outside.
// For instance, it can be used to iterate inside an object method:
let group = {
  title: "Our Group",
  students: ["Finn", "Jake", "BMO"],

  showList() {
    this.students.forEach((student) =>
      console.log(this.title + ": " + student)
    );
  },
};

group.showList();

// If a "regular" function was used here, there would be an error:
// Error: Cannot read property "title" of undefined
// The error occurs because "forEach" runs functions with "this = undefined" by default,
// so the attempt to access "undefined.title" is made.
// That does not affect arrow functions, because they do not have "this".

// Arrows Have No Arguments
console.log("");
console.log("--- ARROWS HAVE NO ARGUMENTS ---");

// Arrow functions have no "arguments" variable.
// That is great for decorators, when a call needs to be forwarded with the current "this" and "arguments".

// For instance, "defer(f, ms)" gets a function and returns a wrapper around it
// that delays the call by "ms" milliseconds:
function defer(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  console.log("Hello, " + who);
}

let sayHiDeferred = defer(sayHi, 1000);
sayHiDeferred("Finn"); // Hello, Finn after 1 second

// without an arrow funtion:
function defer(f, ms) {
  return function (...args) {
    let ctx = this;
    setTimeout(function () {
      return f.apply(ctx, args);
    }, ms);
  };
}
// Here additional variables "args" and "ctx" had to be created so that the function inside "setTimeout" could take them.


