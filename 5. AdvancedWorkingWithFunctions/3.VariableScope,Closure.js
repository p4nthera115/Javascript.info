// Variable scope, closure
console.log("--- VARIABLE SCOPE, CLOSURE ---");

// Code Blocks
console.log("");
console.log("--- CODE BLOCKS ---");

// If a variable is declared inside a code blocl "{...}", it is only visible inside that block
// Example:
{
  let message = "Hello";
  console.log(message);
}
// console.log(message); // Error: message is not defined

// This can be used to isolate a piece of code that does its own task:
{
  let message = "Hello";
  console.log(message);
}
{
  let message = "Goodbye";
  console.log(message);
}

// Variables declared in code blocks for "if", "for", "while" etc, are also only visible inside.

// Nested Functions
console.log("");
console.log("--- NESTED FUNCTIONS ---");

// A function is "nested" when it is created inside another function:
function sayHiBye(firstName, lastName) {
  function getFullName() {
    return firstName + " " + lastName;
  }
  console.log("Hello, " + getFullName());
  console.log("Goodbye, " + getFullName());
}
sayHiBye("Finn", "The Human");

// Lexical Environment
console.log("");
console.log("--- LEXICAL ENVIRONMENT ---");

// Step 1. Variables
// In JS, every running function, code block "{...}", and the script as a whole have an internal (hidden) associated
// object known as the "Lexical Environment".
// The Lecxical Environment object consists of two parts:
// 1. Environment Record - an object that stores all local variables as its properties 
//    (and some other information like the value of "this").
// 2. A reference to the outer lexical environment, the one associated with the outer code.

// ~ A "variable" is just a property of the special internal object, "Environment Record". ~
// ~ "To get or change a variable" means "to get or change a property of that object". ~

// Steps:
// 1. When the script stars, the Lexical Environment is pre-populated with all declared variables.
//      • Initially, they are in the "uninitialized" state. This is a special internal state in which the engine
//        knows about the variable, but it cannot be referenced until it has been declared.
// 2. Then the variable appears, if no assignment, returns "undefined". The variable can be used from this point.


// Step 2. Function Declarations
// A function is also a value, like a variable.
// The difference is that a Function Declaration is instantly fully initialized.
// Naturally, this behaviour only applies to Function Declarations, not Function Expressions.

// Step 3. Inner and outer Lexical Environment
// When the code wants to access a variable - the inner Lexical Environment is searched first,
// then the outer one, and so on until the global one.
// If a variable is not found anywhere, that is an error in strict mode (without "use strict").

// Step 4. Returning a function 
// A variable is updated in the Lexical Environment where it lives.

// Garbage Collection
console.log("");
console.log("-- GARBAGE COLLECTION ---");

// A Lexical Environment object dies when it becomes unreachable (just like any other object).
// It only exists while there is at least one nested function referencing it.

// Real-life optimizations
// In theory, while a function is alive, all outer variable are also retained.
// But in practice JS engines try to optimize that. They analyze variable usage and it is obvious from the code
// that an outer variable is not used - it is removed.
// ~ An important side effect in V8 (Chrome, Edge, Opera) is that such variable will become unavailable in debugging.



