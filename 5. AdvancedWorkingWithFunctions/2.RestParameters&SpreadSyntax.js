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

//
