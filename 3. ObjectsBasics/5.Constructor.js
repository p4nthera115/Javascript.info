// Constructor, operator "new"
console.log('--- CONSTRUCTOR, OPERATOR "new" ---');
// Often times, many similar objects need to be created
// This can be done using the constructor functions and the "new" operator

// Constructor Function
console.log("");
console.log("--- CONSTRUCTOR FUNCTION ---");
// Constructor functions technically are regular functions but have two conventions
// 1. They are named with capital letter first
// 2. They should be executed only with "new" operator
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("Jack");

console.log(user);
console.log(user.name);
console.log(user.isAdmin);
// When a function is executed with "new", the following steps occur:
// 1. A new empty object is created and assigned to "this"
// 2. The function body executed. Usually it modifies "this", adds new properties to it
// 3. The value of "this" is returned

// Constructor mode test: new.target
console.log("");
console.log("--- CONSTRUCTOR MODE TEST: new.target ---");
// Inside a function, we can check whether it was called with "new" or without it,
// using a special "new.target" property
// It is undefined for regular calls and equals the function if called with "new"
function User2() {
  console.log(new.target);
}

User2(); // undefined
new User2(); // function User2

// Make both "new" and regular calls do the same:
function User3(name) {
  if (!new.target) {
    return new User3(name);
  }
  this.name = name;
}
let finn = User3("Finn"); // redirects to new User3
console.log(finn.name);

// Return from constructors
console.log("");
console.log("--- RETURN FROM CONSTRUCTORS ---");
// Usually constructors do not have a "return" statement
// Their task is to write all necessary stuff into "this", which automatically becomes the result
// If there is a "return":
// • If "return" is called with an object, then the object is returned instead of "this"
function BigUser() {
  this.name = "Gunter";
  return { name: "Orgalorg" };
}

console.log(new BigUser().name);

// • If "return" is called with a primitive, it is ignored
function SmallUser() {
  this.name = "Gunter";
  return "ignored primitive";
}

console.log(new SmallUser().name);
// Basically, "return" with an object returns that object, an all other cases, "this" is returned

// Methods in Constructor
console.log("");
console.log("--- METHODS IN CONSTRUCTOR ---");
// Using constructor functions to create objects gives a lot of flexability.
// The constructor function may have parameters that define how to construct the object and what to put in it.
// "this" can add properties and methods
function Person(name) {
  this.name - name;

  this.sayHi = function () {
    console.log("My name is: " + this.name);
  };
}

let jake = new Person("Jake");
jake.sayHi();

// Tasks

function Accumulator(startingValue) {
  this.value = startingValue;
  this.read = function () {
    this.value += +prompt("Add", 0);
  };
}

let accumulator = new Accumulator(5);

accumulator.read();
accumulator.read();
alert(accumulator.value);
