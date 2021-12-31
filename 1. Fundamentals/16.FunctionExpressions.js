// const header = document.querySelector("h1");
// header.innerText = "Function expressions";

console.log("--- FUNCTION EXPRESSIONS ---");
// function expressions are another syntax for creating a function
// allows to create a new function in the middle of any expression
// function expression does not need a name

// function declaration
function sayHi() {
  console.log("hi");
}
sayHi();
// function expression
let sayHello = function () {
  console.log("hello");
};
sayHello();

// function is a value
console.log("");

let func = sayHi;
func();

// Callback Functions
console.log("");
console.log("--- CALLBACK FUNCTIONS ---");

// callback function is a function passed into another function as an argument
function greeting(name) {
  console.log("Waddup " + name);
}

function processUserInput(callback) {
  let name = "Finn";
  callback(name);
}

processUserInput(greeting);

console.log("");
// function expression can only be called after it is defined
let sayHi1 = function (name) {
  console.log(`Hey ${name}`);
};
sayHi1("Finn");
// function declaration can be called earlier than defined
sayHi2("Jake");
function sayHi2(name) {
  console.log("Hey " + name);
}

// function declaration within a code block is only visible inside that code block
let age = 16;
if (age < 18) {
  welcome();
  function welcome() {
    console.log("ding dong");
  }
  welcome();
} else {
  function welcome() {
    console.log("go away bing bong");
  }
}
// welcome();  // error: welcome is not defined
// to make function visible outside of code block, use function expression and declare outside of code block
age = 21;
let welcome;
if (age < 18) {
  welcome = function () {
    console.log("How do you do?");
  };
} else {
  welcome = function () {
    console.log("what the flip");
  };
}
welcome();

// simplify

age = 30;
welcome =
  age < 18
    ? function () {
        console.log("hallo young one");
      }
    : function () {
        console.log("shoo, old hag");
      };
welcome();
