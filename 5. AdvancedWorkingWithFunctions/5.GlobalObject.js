// Global Object
console.log("--- GLOBAL OBJECT ---");

// The global object provied variables and functions that are available anywhere.
// By default, those that are built into the language or the environment.

// In a browser it is named "window", for Node.js it is "global". For other environments
// it may have other names.

// Recently, "globalThis" was added to the language, as a standardized name for a global object.
// It is supported in all major browsers.

// ~ "window" used in js.info ~

// All properties of the global object can be accessed directly:
console.log("Hello");
globalThis.console.log("Hello");

// In a browser, global functions and variables declared with "var" become the property of the global object:
var gVar = 5;
// console.log(window.gVar); // 5 (became a property of the global object)
// This does not happen with "let" or "const"

// If a value is so important that it must be available globally, write it directly as a property:
globalThis.currentUser = {
  name: "Finn",
};
console.log(currentUser.name); // Finn
console.log(globalThis.currentUser.name); // Finn

// Using for Polyfills
console.log("");
console.log("--- USING FOR POLYFILLS ---");

// The global object is used to test for support of modern language features.
// Test if a built-in "Promise" object exists (it does not in really old browsers):
if (!globalThis.Promise) {
  console.log("Your browser is really old!");
} else {
  console.log("Hi");
}

// If there is none, "polyfills" can be created: add functions that are not supported by the
// environment, but exist in the modern standard.
if (!globalThis.Promise) {
  // globalThis.Promise = ...; // custom implementation of the modern language feature
}
