// Extending Built-in Classes
console.log("--- EXTENDING BUILT-IN CLASSES ---");

// Built-in classes like Array, Map and others are extendable also.
// For instance, here "PowerArray" inherits from the native "Array":
// add one more method to is (can do more)
PowerArray = class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
};

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

let filteredArr = arr.filter((item) => item >= 10);
console.log(filteredArr); // PowerArray(2) [ 10, 50 ]
console.log(filteredArr.isEmpty()); // false

// Built-in methods like "filter", "map" and others - return new objects
// of exactly inherited type "PowerArray".
// Their internal implementation uses the object's "constructor" property for that.

// In the example above,
arr.constructor === PowerArray;

// When "arr.filter()" is called, it internally creates the new array of results
// using exactly "arr.constructor", not basic "Array".
// Because of this "PowerArray" methods can keep being used further on.

// Even more, this behaviour can be customized.

// A special static getter "Symbol.species" can be added to the class.
// If it exists, it should return the constructor that JS will use internally to create
// new entities in "map", "filter" and so on.

// If built-in methods like "map" or "filter" are wanted to return regular arrays,
// "Array" in "Symbol.species" can be returned:
PowerArray = class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }
};

arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
filteredArr = arr.filter((item) => item >= 10);

// filteredArr is not PowerArray, but Array
// console.log(filteredArr.isEmpty()); // TypeError: filteredArr.isEmpty is not a function

// Now ".filter" returns "Array". So the extended functionality is not passed any further.

// Other collections, like "Map" and "Set" work the same way. They also use "Symbol.species".

// No Static Inheritance in Built-ins
console.log();
console.log("--- NO STATIC INHERITANCE IN BUILT-INS ---");

// Built-in objects have their own static methods, for instance "Object.keys",
// "Array.isArray" etc.

// Normally, when one class extends another, both static and non-static methods are inherited.

// Built-in classes are an exception. They do not inherit statics from each other.

// For example, both "Array" and "Date" inherit from "Object",
// so their instances have methods from "Object.prototypes". But "Array.[[Prototype]]" does not
// references "Object", so there is no, for instance, "Array.keys()" (or "Date.keys()") static method.

// There is no link between "Date" and "Object". They are independent,
// only "Date.prototype" inherits from "Object.prototype".

// This is an important difference of inheritance between built-in objects compared to results from "extends".
