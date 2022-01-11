// Iterables
console.log("--- ITERABLES ---");

// Iterable objects are a generalization of arrays.
// It is a  concept that makes any object useable in a "forr..of" loop.

// If an object is not an array, but represents a collection of something,
// then "for..of" is a great syntax to loop over it.

// Symbol.iterator
console.log("");
console.log("--- SYMBOL.ITERATOR ---");
// Object that is not an array, but looks suitable for "for..of";
// "range" object that represents an interval of numbers:
let range = {
  from: 1,
  to: 5,
};
// To make the "range" object iterable (and thus let "for..of" work), a method needs
// to be added to the object names "Symbol.iterator" (a special built-in symbol just for that).
// 1. When "for..of" starts, it calls that method once (or errors if not found).
//    The method must return an iterator - an object with the method "next".
// 2. Onward, "for..of" works only with that returned object.
// 3. When "for..of" wants the next value, it calls next() on that object.
// 4. The result of next() must have the form "{ done: Boolean, value: any }",
//    where "done = true" means that the iteration is finishedm otherwise "value" is the next value.
range = {
  from: 1,
  to: 5,
};

// 1. call to "for..of" initially calls this
range[Symbol.iterator] = function () {
  // ... it returns the iterator object:
  // 2. Onward, "for..of" worls only with this iterator, asking it for next values
  return {
    current: this.from,
    last: this.to,

    // 3. next() is called on each iteration by the "for..of" loop
    next() {
      // 4. it should return the value as an object { done:.., value :... }
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

// now it works
for (let num of range) {
  console.log(num);
}

// "range" can be merged with "Symbol.iterator"
range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (let num of range) {
  console.log(num); // 1, then 2, 3, 4, 5
}

// String is Iterable
console.log("");
console.log("--- STRING IS ITERABLE ---");

// "for..of" loops over a strings characters:
for (let char of "test") {
  console.log(char);
}

// Calling an Iterator Explicitly
console.log("");
console.log("--- CALLING AN ITERATOR EXPLICITLY ---");

// Iterator over a string in exactly the same way as "for..of", but with direct calls.
// This code creates a string iterator and gets values from it "manually":
let str = "hello";

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value);
}

// Iterables and array-likes
console.log("");
console.log("--- ITERABLES AND ARRAY-LIKES ---");

// • "Iterables" are objects that implement the "Symbol.iterator" method.
// • "Array-likes" are objects that have indexes and "length", so they look like arrays.

// The "range" in the above example is iterable, but not array-like, because it deos not
// have indexed properties and "length".

// Object that is array-like, but not iterable:
let arrayLike = {
  0: "hello",
  1: "ooo",
  length: 2,
};

// for (let item of arrayLike) {} // not iterable

// Array.form
console.log("");
console.log("--- ARRAY.FORM ---");

// "Array.form" is a universal method that takes an iterable or array-like value and
// makes a real array that can call array methods.
arrayLike = {
  0: "hello",
  1: "world",
  length: 2,
};

let arr = Array.from(arrayLike);
console.log(arr.pop()); // world (method works)

// Array from takes the object, examines it for being an iterable or array-like, then
// makes a new array and copies all items to it
// Same for an iterable:
// (using previous "range" example)
arr = Array.from(range);
console.log(arr);

// Syntax for "Arry.from":
/*
    Array.from(obj[, mapFn, thisArg])
*/
// optional "mapFn" can be a function that is applied to each element before adding to array.
// "thisArg" allows to set "this" for it.

// For instance:
// (using previous "range" example)
arr = Array.from(range, (num) => num * num);
console.log(arr);
