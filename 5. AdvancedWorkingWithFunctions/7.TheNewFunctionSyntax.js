// The "new function" syntax
console.log('--- THE "NEW FUNCTION" SYNTAX ---');

// There is one more way to create a function that is rarely uses, but sometimes there is no alternative.

// Syntax
console.log("--- SYNTAX ---");

// The syntax for creating a function:
/*
    let func = new Function ([arg1, arg2, ...argN], functionBody);
*/
// The function is created with the arguments "arg1...argN" and the given "functionBody".

// Example:
let sum = new Function("a", "b", "return a + b");
console.log(sum(1, 2)); // 3

// function withour arguments, only function body:
let sayHi = new Function("console.log('Hello')");
sayHi();

// The major difference is that the function is created literally from a string that is passed at run time.
// All previous declarations required the function code to be written in the script.
// But "new Function" allows to turn any string into a function.
// For example, a new function from a server can be received and executed:
/*
    let str = ... receive the code from a server dynamically ...
    let func = new Function(str);
    func;
*/

// It is used in very specific cases, like when code is received from a server, or to dynamically compile
// a function from a template, in complex web-applications.

// Closure
console.log("");
console.log("--- CLOSURE ---");

// Usually, a function remembers where it was born in the special property "[[Environment]]".
// It references the Lexical Environment from where it was created.
// But when a function is created using "new Function", its "[[Environment]]" is set to reference not the
// current Lexical Environment, but the global one.

// So, such functions do not have access to outer variables, only to global ones:
function getFunc() {
  let value = "test";
  let func = new Function("console.log(value)");
  return func;
}

// getFunc()(); // error:  value is not defined

// Compare with regular behaviour:
function getFunc() {
  let value = "test";
  let func = function () {
    console.log(value);
  };
  return func;
}

getFunc()(); // test, from the Lexical Environment

// Before JS is published to production, it is compressed using a "minifier" -
// a special program that shrinks code by removing extra comments, spaces, and renames local variables into shorter ones

// If "new Function" had access to outer variables, it would have problems with minifiers.


