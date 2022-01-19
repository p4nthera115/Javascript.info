// Function object, NFE
console.log("--- FUNCTION OBJECT, NFE ---");

// In JS, functions are object.
// A good way to imagine functions is as callable "action objects". They can not only be called,
// but can also be treated as objcets: add/remove properties, pass by reference etc.

// The "name" property
console.log("");
console.log('THE "NAME" PROPERTY');

// Function objects contain some useable properties.
// For instance, a function's name is accessible as the "name" property:
function sayHi() {
  console.log("Hi");
}
console.log(sayHi.name); // sayHi

// The name-assigning logic is smart. It also assigns the correct name to a function even if it is created without one,
// and then immediately assigned:
sayHi = function () {
  console.log("Hi");
};
console.log(sayHi.name); // sayHi

// It also works if the assignment is done via a default value:
function f(sayHi = function () {}) {
  console.log(sayHi.name); // sayHi
}
f();

// In the specification, this feature is called a "contexual name". If the functions does not provide one, then in an
// assignment it is figured out from the context.

// Object methods have names too:
let user = {
  sayHi() {
    // ...
  },
  sayBye: function () {
    // ...
  },
};
console.log(user.sayHi.name); // sayHi
console.log(user.sayBye.name); // sayBye

// There are cases when there is no way to figure out the right name. In that case, the name property is empty:
let arr = [function () {}];
console.log(arr[0].name); // emptu string
// engine has no way to set up the right name, so there is none

// The "length" property
console.log("");
console.log('--- THE "LENGTH" PROPERTY ---');

// The in-built property "length" returns the number of function paramaters:
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

console.log(f1.length); // 1
console.log(f2.length); // 2
console.log(many.length); // 2, rest parameters are not counted

// "length" property is sometimes used for introspection in functions that operate on other functions.

// In the following example, the "ask" function accepts a "question" to ask and an arbitrary number of
// "handler" functions to call.
// Once a user provides their answer, the function calls the handlers.
// Two kinds of handlers can be passed:
// • A zero-argument function, which is only called when the user gives a positive answer.
// • A function with arguments, which is called in either case and returns an answer.
// To call "handler" the right way, the "handler.length" property is examined.
// The idea is that there is a simple, no-arguments handler syntax for positive cases (most frequent variant),
// but are able to support universal handlers as well:
function ask(question, ...handlers) {
  let isYes = console.log(question);

  for (let handler of handlers) {
    if (handlers.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }
}
// for positive answer, both handlers are called
// for negative answer, only the second one
ask(
  "Question?",
  () => console.log("You said yes"),
  (result) => console.log(result)
);

// This is a particular case of so-called polymorphism - treating arguments differently
// depending on their type or, in this case depending on the "length".

// Custom properties
console.log("");
console.log("--- CUSTOM PROPERTIES ---");

// Original properties can also be added
// Add "counter" property to track the total calls count:
function sayHello() {
  console.log("Hello");

  sayHello.counter++;
}
sayHello.counter = 0; // initial value

sayHello();
sayHello();

console.log(`Called ${sayHello.counter} times.`); // Called 2 times.

// Function properties can replace closures sometimes. For instance, the "counter" function can be rewritten
// to use a function property:
function makeCounter() {
  function counter() {
    return counter.count++;
  }
  counter.count = 0;
  return counter;
}

let counter = makeCounter();
console.log(counter()); // 0
console.log(counter()); // 1

// The "count" is stored in the function directly

// Names Function Expression
console.log("");
console.log("--- NAMED FUNCTION EXPRESSION ---");

// Named Function Expression, or NFE, is a term for function Expressions that have a name.
// For instance, take an ordinary Function Expression:
let sayHey = function (who) {
  console.log(`Hello, ${who}`);
};
// add a name to it:
sayHey = function func(who) {
  console.log(`Hello, ${who}`);
};

// Adding such a name did not break anything and did not make it a Function Declaration,
// because it is still created as a part of an assignment expression.

// There are two special things about the name "func":
// 1. It allows the function reference itself internally.
// 2. It is not visible outside of the function.

// For instance, the function "sayHey" below called itself again with "Guest" if no "who" is provided:
sayHey = function func(who) {
  if (who) {
    console.log(`Hello, ${who}`);
  } else {
    func("Guest"); // use func to re-call itself
  }
};
sayHey("Finn"); // Hello, Finn
sayHey(); // Hello, Guest

// If "sayHey" is used instead for the nested call, it may cause problems if the function gets reassigned.


