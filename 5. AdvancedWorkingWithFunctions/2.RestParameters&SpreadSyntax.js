// Rest Parameters and Spread Syntax
console.log("--- REST PARAMETERS AND SPREAD SYNTAX ---");

// Many JS built-in functions support an arbitrary number of arguments.
// For instance:
// • "Math.mac(arg1, arg2, ..., argN)" - returns the greatest of the arguments.
// • "Object.assign(dest, src1, ..., srcN)" - copies properties from "src1..N" into "dest".
// •  ...and so on.

// Rest parameters ...
console.log("");
console.log('--- REST PARAMETERS "..." ---');

// A function can be called with any number of arguments:
function sum(a, b) {
  return a + b;
}
console.log(sum(1, 2, 3, 4, 5));

// There is no error, but only the first two arguments are counted.
// The rest of the parameters can be included in the function by using "..." followed by the name of the array that
// will contain them.
// The dots literally mean "gather the remaining parameters into an array".

// Example:
function sumAll(...args) {
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
}

console.log(sumAll(1)); // 1
console.log(sumAll(1, 2)); // 3
console.log(sumAll(1, 2, 3)); // 6

// The first parameters can be chosen to get as variables, and gather only the rest.
// Here the first two arguments go into variables and the rest go into "titles" array:
function showName(firstName, lastName, ...titles) {
  console.log(firstName + " " + lastName);
  console.log(titles);
}
showName("Jake", "The Dog", "Hero", "Father", "Ex-criminal", "Husband");

// The "arguments" Variable
console.log("");
console.log('--- THE "ARGUMENTS" VARIABLE ---');

// There is also a special array-like object named "arguments" that contains all arguments by their index.
// Example:
function showName1() {
  console.log(arguments);
}
showName1("Jake", "The Dog");

// Rest parameters did not exist in old times, "arguments" was the only way to get all arguments of the function.
// Although "arguments" is array-like it is not an array so it does not support array methods.
// Also it always contains all argumemts, they can not be captured partially unlike with rest parameters.

// Spread Syntax
console.log("");
console.log("--- SPREAD SYNTAX ---");

// Spread syntax looks similar to rest parameters, also uses "..." but it "expands" an iterable object.
// When "...arr" is used in a function call it expands it into the a list of arguments
// Example, with "Math.max":
let arr = [3, 5, 1];
console.log(Math.max(...arr)); // 5 (spread turns array into a list of arguments)

// combine spread syntax with normal values:
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];
console.log(Math.max(1, ...arr1, 2, ...arr2, 25)); // 25

// spread syntax can be used to merge arrays:
arr1 = [3, 5, 1];
arr2 = [8, 9, 15];

let merged = [0, ...arr1, 2, ...arr2];
console.log(merged); // 0, 3, 5, 1, 2, 8, 9, 15

// spread syntax works with any iterable:
let str = "Hello";
console.log([...str]); // H, e, l, l, o

// Copy an array/object
console.log("");
console.log("--- COPY AN ARRAY/OBJECT ---");

// Spread syntax can also copy objects and arrays like "Object.assign()":
arr = [1, 2, 3];
let arrCopy = [...arr]; // spread the array into a list of parameters, then put the result into a new array

console.log(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true
console.log(arr === arrCopy); // false (not same reference)

// modifying initial array does not modify copy
arr.push(4);
console.log(arr); // 1, 2, 3, 4
console.log(arrCopy); // 1, 2, 3

// it is possible to do the same with an object

// This way of copying an object is much shorter than 
// "let objCopy = Object.assign({}, obj)"
// or for an array,
// "let arrCopy = Object.assign([], arr)" 
// so the spread syntax is preferred whenever it can be used.