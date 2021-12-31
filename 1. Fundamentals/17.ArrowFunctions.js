// const header = document.querySelector("h1");
// header.innerText = "Arrow functions, the basics";

// arrow functions
console.log("--- ARROW FUNCTIONS ---");

// simpler syntax for creating functions
/*
    let func = function (arg1, arg2 ..., argN) {
      return expression;
    };
*/
/*
    let func = (arg1, arg2, ..., argN) => expression;
*/

let sum = (a, b) => a + b;
console.log(sum(1, 2));

// if only 1 parameter, brackets can be omitted
let square = (n) => n ** 2;
console.log(square(3));

// if no arguments, brackets are empty but must be present
let sayHi = () => console.log("hi");
sayHi();

// arrow functions can be used in the same way as function expressions
let age = 15;
let welcome =
  age < 18 ? () => console.log("waddup") : () => console.log("peace out");
welcome();

// multiline arrow functions
sum = (a, b) => {
  let result = a + b;
  return result;
};
console.log(sum(1, 2));

// PLAYGROUND

// let ask = (question, yes, no) => {
//   confirm(question) ? yes() : no();
// };

// ask(
//   "Do you agree?",
//   () => {
//     console.log("you agreed");
//   },
//   () => {
//     console.log("you cancelled");
//   }
// );
