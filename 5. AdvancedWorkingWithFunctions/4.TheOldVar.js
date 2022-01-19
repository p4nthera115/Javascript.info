// The old "var"
console.log('--- THE OLD "VAR" ---');

// The "var" declaration is similar to "let". Most of the time it can be replaced by "var" or vice-versa:
var message = "Hello";
console.log(message);

// But internally, "var" is very different.

// "var" has no block scope
console.log("");
console.log('--- "VAR" HAS NO BLOCK SCOPE ---');

// Variables declared with "var", are either function-scoped or global-scoped.
// They are visible through blocks.
// Example:
if (true) {
  var test = true;
}
console.log(test); // true, the variable lives after if
// as "var" ignores code blocks, "test" is a global variable.
// if "let test" was used it would only be visible inside "if"

// If a code block is inside a function, then "var" becomes a function-level variable:
function sayHi() {
  if (true) {
    var phrase = "hello";
  }
  console.log(phrase);
}
sayHi();
// console.log(phrase); // Error: phrase is not declared

// ignores "if" code block but is confined within "sayHi()" function.

// "var" tolerates redeclarations
console.log("");
console.log('--- "VAR" TOLERATES REDECLARATIONS ---');

// With "var", a variable can be redeclared any number of times with no errors.
var user = "Finn";
var user = "Jake";
console.log(user); // Jake

// "var" variables can be declared below their use
console.log("");
console.log('--- "VAR" VARIABLES CAN BE DECLARED BELOW THEIR USE ---');

// "var" declarations are processed when the function starts (or script for globals).
function sayHi() {
  phrase = "Hello";
  console.log(phrase);
  var phrase;
}
sayHi();
// technically the same as this:
function sayHi() {
  var phrase;
  phrase = "hello";
  console.log(phrase);
}
sayHi();
// People call this behaviour "hoisting" (raising), because all "var" are "hoisted" to the top of the function.

// IIFE
console.log("");
console.log("--- IIFE ---");

// In the past, as there was only "var", and it has no block level visibility, programmers invented a way to
// emulate it. What they did was called "immediately-invoke function expression" (IIFE).
// Example:
(function () {
  var message = "hello";
  console.log(message); // hello
})();

// Here, a Function Expression is created and immediately called. So the code executes right away and
// has its own private variables.
// The parentheses around the function is a trick to show JS that the function is created in the 
// context of another expression, and hence it is a Function Expression: it needs no name 
// and can be called immediately.

