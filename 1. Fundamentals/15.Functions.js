// const header = document.querySelector("h1");
// header.innerText = "Functions";

// Functions
console.log("");
console.log("--- FUNCTIONS ---");

// function declaration

/*
    function name(parameter1, parameter2, ...) {
     body...;
    }
*/

function showMessage() {
  console.log("Mathematical!");
}
showMessage();

// local variables
function showMsg() {
  let message = "Waddup";
  console.log(message);
}
showMsg();

// outer variables
let userName = "Finn";
function showMes() {
  let message = "Oh My Glob " + userName;
  console.log(message);
}
showMes();

// cannot repeat function name

// function has full access to outer variable and can modify them
userName = "Finn";
function showMessage1() {
  userName = "Jake";
  let message = "Oh My Glob " + userName;
  console.log(message);
}
showMessage1();

// outer variable is default if no local variable
// same-named variable can be declared inside function

const usrName = "Simon";
function showMessage2() {
  const usrName = "Marcy";
  let message = "Hello, " + usrName;
  console.log(message);
}
showMessage2();
console.log(usrName);

// Parameters
console.log("");
console.log("--- PARAMETERS ---");

// when function is called, values given for parameters are copied to local variables
function showParMsg(from, text) {
  console.log(from + ": " + text);
}
showParMsg("LSP", "Oh My Glob");
showParMsg("LSP", "Lump you");

// you can declare a variable outside and pass it into the function
function showMessage3(from, text) {
  from = "*" + from + "*";
  console.log(from + ": " + text);
}

let from = "PepBut";
showMessage3(from, "Hello");
console.log(from);

// parameter = variable listed inside brackets in function declaration (declaration time term)
// argument = value passed into function when called (call time term)
// declare function listing their parameters, then call them passing arguments

// above example - function "showMessage3" declared with 2 parameters, then called with 2 arguments (from and "Hello")

// Default Values
console.log("");
console.log("--- DEFAULT VALUES ---");

// if function is called but argument is not provided, value is "undefined"
showMessage3("PB"); // "text" parameter is undefined as there is no argument

// giving value to "default" by giving value to parameter
// "default" value can be more complex i.e. another function
function showMessage4(from, text = "no text given") {
  from = "*" + from + "*";
  console.log(from + ": " + text);
}
showMessage4("PB");

// alternative default parameters
console.log("");

function showMessage5(text) {
  if (text === undefined) {
    text = "empty message";
  }
  console.log(text);
}
showMessage5();

function showMessage6(text) {
  // if text is undefined or falsy, set text to "empty"
  text = text || "empty";
  console.log(text);
}
showMessage6();

// modern JS supports ?? (refer to 1. Fundamentals/12.NullishCoelescing.js)
// ?? is better to use when most falsy values, such as 0, should be considered normal
console.log("");
function showCount(count) {
  console.log(count ?? "unknown");
}
showCount(0);
showCount(null);
showCount();

// returning a value
console.log("");
console.log("--- RETURNING A VALUE ---");

function sum(a, b) {
  return a + b;
}
let result = sum(1, 2);
console.log(result);

// "return" directive can be in any place in function

function checkAge(age) {
  if (age >= 18) {
    return true;
  } else {
    return console.log("go elsewhere little one");
  }
}

let age = 18;

if (checkAge(age)) {
  console.log("access granted");
} else {
  console.log("access denied");
}

function showMovie(age) {
  if (!checkAge(age)) {
    return;
  }
  console.log("showing you the movie");
}

// function with empty return or without return gives undefined
function doNothing() {}
console.log(doNothing());

// naming a function

// common prefixes, their meanings and examples:
// show: shows something
function showMessage() {}
// get: return a value
function getAge() {}
// calc: calculate something
function calcSum() {}
// create: create something
function createForm() {}
// check: check something and return a boolean
function checkPermission() {}

// function == comments
console.log("");

function showPrimes(n) {
  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;
    console.log(i);
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}

console.log(showPrimes());

// playground
console.log("");
console.log("--- PLAYGROUND ---");

// function returns the least of two numbers, a and b

// function min(a, b) {
//   if (a < b) {
//     console.log(a);
//   } else {
//     console.log(b);
//   }
// }

function min(a, b) {
  return a < b ? a : b;
} 

min(2, 5);
min(3, -1);
min(49, 22);
