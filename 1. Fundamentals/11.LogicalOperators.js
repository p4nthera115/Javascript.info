// const header = document.querySelector("h1");
// header.innerText = "Logical Operators";

// Logical Operators
console.log("--- LOGICAL OPERATORS ---");
// || (OR)
// && (AND)
// ! (NOT)
// ?? (Nullish Coalescing) refer to "1. Fundamentals/12.NullishCoalescing.js"

// || (OR)
console.log("");
console.log("--- OR ---");
// logical OR is meant to manipulate only boolean values
// if any arguments are true, returns true, otherwise returns false
console.log(true || true);
console.log(false || true);
console.log(true || false);
console.log(false || false);

// OR || is most often in if statements
let hour = 14;
let isWeekend = true;

if (hour < 11 || hour > 20 || isWeekend) {
  console.log("busy");
}

// OR || finds first truthy value
// || operates from left to right
// stops at first argument that is truthy
console.log(1 || 0 || null);
console.log("" || 0 || 1);
console.log(0 || 1 || null);
// if all arguments are falsy, returns last argument
console.log(0 || undefined || null);
console.log(0 || null || undefined);

let firstName = "";
let lastName = "";
let nickName = "";

console.log(firstName || lastName || nickName || "Anonymous");

// "Short-circuit" evaluation
// executes command only if condition on left is falsy
// useful for expressions with side effects such as variable assignments or functions
true || console.log("not printed");
false || console.log("printed");

// && (AND)
console.log("");
console.log("--- AND ---");
// && (AND) returns true only if both arguments are truthy
// like OR, values are evaluated as boolean values
console.log(true && true);
console.log(false && true);
console.log(true && false);
console.log(false && false);

hour = 12; // already declared in OR
let minute = 30;

if (hour == 12 && minute == 30) {
  console.log("its 12:30");
}

// && operates from left to right
// stops at first argument that is falsy
console.log(1 && 0);
console.log(null && 0);
console.log(1 && true && undefined && "hallo");
// if all arguments are truthy, returns last argument
console.log(1 && "hi");

/*
Precedence of && is higher than || 
  a && b || c && d 
is the same as
  (a && b) || (c && d) 
*/

// ! (NOT)
console.log("");
console.log("--- NOT ---");
// converts argument to boolean type
// returns the inverse value
console.log(!true);
console.log(!undefined);
// double NOT, !!, sometimes used for converting value to boolean type
// basically shorter version of "Boolean()"
console.log(!!"hi");
console.log(!!0);
