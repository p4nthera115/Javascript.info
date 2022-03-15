// Class Checking: "instanceof"
console.log('--- CLASS CHECKING: "instanceof" ---');

// The "instanceof" operator allows to check whether an object belongs to a certain class.
// It also takes inheritance into account.
// This kind of check can be necessary in many cases, for example, it can be used for building a polymorphic
// function, the one that treats arguments differently depending on their type.

console.log();
console.log("--- THE instanceof OPERATOR ---");

// Syntax:
/* 
    obj instanceof Class
*/
// It returns "true" if "obj" belongs to the "Class" or a class inheriting from it.

// For instance:
let Rabbit = class Rabbit {};
let rabbit = new Rabbit();
console.log(rabbit instanceof Rabbit); // true

// It also works with constructor functions:

// instead of class
Rabbit = function Rabbit() {};
console.log(new Rabbit() instanceof Rabbit); // true

// And with built-in classes like "Array":
let arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true

// "arr" also belongs to the "Object" class. This is because "Array" prototypically inherits from "Object".

// Normally, "instanceof" examines the prototype chain for the check. A custom logic in the static method
// "Symbol.hasInstance" can also be set.

// The algorithm of "obj instanceof Class" works roughly as follows:
// 1. If there is a static method "Symbol.hasIntance", the just call it:
//    "Class[Symbol.hasInstance](obj)". It should return either "true" or "false".
//    This is how the behaviour of "instanceof" can be customized.
//    Example:
// setup instanceOf check that assumes that anything with canEat property is an animal
let Animal = class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
};

let obj = { canEat: true };

console.log(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called

// 2. Most classes do not have "Symbol.hasInstance". In that case, the standard logic is used:
//    "obj instanceOf Class" checks whether "Class.prototype" is equal to one of
//    the prototypes in the "obj" prototype chain.
//    In other words, compare one after another:
/*
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
*/
// if any answer is true, return true
// otherwise, if the end of the chain is reached, return false

// In the example above "rabbit.__proto__ === Rabbit.prototype", so that gives the answer immediately.
// In the case of an inheritance, the match will be at the second step:
Animal = class Animal {};
Rabbit = class Rabbit extends Animal {};

rabbit = new Rabbit();
console.log(rabbit instanceof Animal); // true

// rabbit.__proto__ === Animal.prototype (no match)
// rabbit.__proto__.__proto__ === Animal.prototype (match!)

// Bonus: Object.prototype.toString for the type
console.log();
console.log("--- BONUS: Object.prototype.toString FOR THE TYPE ---");

// Plain objects are converted to string as "[object Object]":
obj = {};
console.log(obj.toString()); // [object Object]

// That is their implementation of "toString". But there is a hidden feature makes "toString" actually
// much more powerful than that. It can be used as an extended "typeof" and an alternative for "instanceof".
// By specification, the built-in "toString" can be extracted from the object and executed in the context of any other
// value. And its result depends on that value.
// • For a number, it will be "[object Number]"
// • For a boolean, it will be "[object Boolean]"
// • For "null": "[object Null]"
// • For "undefined"L "[object Undefined]"
// • For arrays: "[object Array]"
// • ...etc (customizable).

// Example:
// copy toString method into a variable for convenience
let objectToString = Object.prototype.toString;

arr = [];

console.log(objectToString.call(arr)); // [object Array]

// Here "call" is used as described in the chapter "5. AdvancedWorkingWithFunctions/9.DecoratorsAndForwarding.js"
// to execute the function "objectToString" in the context "this=arr".

// Internally, the "toString" algorithm examines "this" and returns the corresponding result.
// More examples:
let s = Object.prototype.toString;

console.log(s.call(123)); // [object Number]
console.log(s.call("")); // [object String]
console.log(s.call(null)); // [object Null]
console.log(s.call(undefined)); // [object Undefined]
console.log(s.call(console.log)); // [object Function]

// Symbol.toStringTag
console.log();
console.log("-- Symbol.toStringTag --");

// The behavour of Object "toString" can be customize d useing a special object property "Symbol.toStringTag".
// For instance:
let user = {
  [Symbol.toStringTag]: "User",
};

console.log({}.toString.call(user)); // [object User]

// For most environment-specific objects, there is such a property.
// Some browser specific examples:
// toStringTag for the environment-specific object and class:
/*
  console.log(window[Symbol.toStringTag]); // Window
  console.log(XMLHttpRequest.prototype[Symbol.toStringTag]); // XMLHtpRequest

  console.log( {}.toString.call(window) ); // [object Window]
  console.log( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
*/