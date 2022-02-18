// Arrays
console.log("--- ARRAYS ---");
// Arrays store ordered collections, unlike objects, which are unordered

// Declaration
console.log("");
console.log("--- DECLARATION ---");
// 2 syntaxes for creating arrays:
let arr = new Array();
arr = [];
// Second syntax is used almost always

// Array elements are numbered, starting with zero
let fruits = ["Apple", "Orange", "Banana"];
console.log(fruits[0]); // Apple
console.log(fruits[1]); // Orange
console.log(fruits[2]); // Banana
// Replace element:
fruits[2] = "Melon";
console.log(fruits);
// Add element:
fruits[3] = "Banana";
console.log(fruits);
// Length:
console.log(fruits.length); // 4
// Can store elements of any type:
arr = [
  "Apple Pie",
  { name: "Tree Trunks" },
  true,
  function () {
    console.log("hi");
  },
];
console.log(arr);

// Methods pop/push, shift/unshift
console.log("");
console.log("--- METHODS POP/PUSH, SHIFT/UNSHIFT ---");
// A "queue" is a common use of an array
// A queue is an ordered collection of elements which supports two operations:
// • "push" appends an element to the end
// • "shift" get an element from the beginning, advancing the queue,
//    so that the 2nd element becomes the 1st.

// In practice, it is used very often, e.g. for a queue of messages that need to be shown on-screen

// Another use case for arrays is the data structure named "stack"
// "stack" supports two operations
// • "push" adds an element to the end
// • "pop" takes an element from the end
// So new elements are added or taken away from the "end"

// For stacks, the latest pushed item is received first,
// also called "LIFO" (Last-In-First-Out).
// For queues, there is "FIFO" (First-In-First-Out).

// Arrays in JS can work both as queues or stacks, they allow to add/remove elements both
// to/from the beginning or the end.

// In computer science the data structue that allows this, is called "deque".

// Methods that work with the end of the array:
// "pop" - extracts last element of array and returns it:
fruits = ["apple", "orange", "pear"];
console.log(fruits.pop()); // removed "pear" and console logs it
console.log(fruits);
// "push" - appends the element to the end of the array:
fruits = ["apple", "orange"];
fruits.push("pear");
console.log(fruits);
fruits[fruits.length] = "banana"; // same thing as fruits.push(...)
console.log(fruits);

// Methods that work with the beginning of the array:
// "shift" - Extracts the first element of the array and returns it:
fruits = ["apple", "orange", "pear"];
console.log(fruits.shift()); // removed "apple" and console logs it
console.log(fruits);
// "unshift" - Add the element to the beginning of the array:
fruits = ["orange", "pear"];
fruits.unshift("apple");
console.log(fruits);

// Methods "push" and "unshift" can add multiple elements at once:
fruits = ["apple"];

fruits.push("orange", "peach"); // add to end
fruits.unshift("pineapple", "lemon"); // add to beginning

console.log(fruits);

// Internals
console.log("");
console.log("--- INTERNALS ---");
// An array is a special kind of object.
// [] used to access a property "arr[0]" actually come from the object syntax.
// Essentially the same as "obj[key]", where "arr" is the object, while numbers are used as keys.

// They are an extension objects which provide special methods to work
// with ordered collections of data and also the "length" property

// An array is an object and thus behaves like an object.
// For instance, it is copied by reference:
fruits = ["banana"];
arr = fruits; // copy by reference (two variables referencing the same array)
console.log(arr === fruits); // true
arr.push("pear"); // modify the array by reference
console.log(fruits); // banana, pear

// Arrays are objects with specific optimizations for use as an "ordered list".
// Ways to misuse an array:
// • Add a non-numeric property like "arr.test = 5".
// • Make holes, like: add "arr[0]" and then "arr[1000]" (and nothing between them).
// • Fill the array in the reverse order, like "arr[1000]", "arr[999]" and so on.

// Performance
console.log("");
console.log("--- PERFORMANCE ---");
// Methods "push/pop" run fast while "shift/unshift" are slow.
// It is faster to work with the end of an array than with its beginning,
// the "shift" operation must do 3 things:
// 1. Remove the element with the index "0".
// 2. Move all elements to the left, renumber them from the index "1" to "0",
//    from "2" to "1" and so on.
// 3. Update the length property.
// The "unshift" operation does the same thing but adding.

// The more elements in the array, the more time to move them, more in-memory operations.

// "pop" and "push" do not need to move anything, because other elements keep their indexes.

// Loops
console.log("");
console.log("--- LOOPS ---");
// "for" loops is one of the oldest ways to cycle array items:
arr = ["apple", "orange", "pear"];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
// there is another form of loop for arrays, "for..of":
fruits = ["", "apple", "orange", "plum"];

for (let fruit of fruits) {
  console.log(fruit);
}
// "for..of" doesn't give access to the number of the current element, just its value.
// Technically a "for..in" loop is also possible:
arr = ["", "apple", "orange", "pear"];

for (let key in arr) {
  console.log(arr[key]);
}
// There are potential problems with using this however:
// 1. "for..in" loop iterates over all properties, not just numeric ones.
//    There are "array-like" objects in the browser which may hold non-numeric properties and methods
//    "for..in" will iterate over these and list them. These "extra" properties can become a problem
//    when working with "array-like" objects.
// 2. "for..in" is optimized for generic objects, not arrays, and thus is 10-100 times slower.

// A Word About "length"
console.log("");
console.log("--- A WORD ABOUT LENGTH ---");
// The "length" property automatically updates when an array is modified.
// It is not actually the cound of values in the array, but the greatest numeric index plus one (because it starts at 0).
// For example, a single element with a large index gives a big length:
fruits = [];
fruits[123] = "apple";
console.log(fruits.length); // 124

// "length" property is writable
// If it is increased manually, nothing happens. But if decreased, the array is shortened and values are irreversibly lost:
arr = [1, 2, 3, 4, 5];
console.log(arr);
arr.length = 2; // shorten to 2 elements
console.log(arr);
arr.length = 5; // return length back
console.log(arr); // 3 undefined items

// The simplest way to clear an array is: "arr.length = 0;".

// new Array()
console.log("");
console.log("--- NEW ARRAY() ---");
// There is one more syntax to create an array as stated before:
arr = new Array("apple", "pear", "etc");

// If "new Array" is called with a single argument which is a number, then it creates an array without items, but with the given lenghth:
arr = new Array(2);
console.log(arr); // 2 empty items
console.log(arr.length); // 2
// This is why "[]" syntax is more reliable

// Multidimensional Arrays
console.log("");
console.log("--- MULTIDIMENSIONAL ARRAYS ---");
// Arrays can have items that are also arrays. They can be used for multidimensional arrays,
// for example to store matrices:
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(matrix);
console.log(matrix[1][1]); // 5

// toString
console.log("");
console.log("--- toString ---");
// Arrays have their own implementation of "toString" method that returns a comma-seperated list of elements.
arr = [1, 2, 3];
console.log(arr); // 1,2,3
console.log(String(arr) === "1,2,3"); // true

// Arrays do not have "Symbol.toPrimitive", or a viable "valueOf".
// They implement only "toString" conversion
// binary plus "+", adds something to a string, automatically converting it to a string as well.
console.log([] + 1); // 1, "[]" becomes an empty string
console.log([1] + 1); // 11, "[1]" becomes "1"
console.log([1, 2] + 1); // 1,21, "[1, 2]" becomes "1,2"

// Don't Compare Arrays With "=="
console.log("");
console.log('--- DON\'T COMPARE ARRAYS WITH "==" ---');
// Arrays in JS should not be compared with "==".
// == works with arrays as it would with any object
// The rules are:
// • Two objects are equal "==" only if they are references to the same object.
// • If one of the arguments of "==" is an object, and the other one is a primitive,
//   then the object gets converted to primitive.
// • With an exception of "null" and "undefined" that equal "==" each other and nothing else.
// "===" is even simpler, as it does not convert types.

// If arrays are compared with "==", they are never the same, unless compared to two variables that
// reference exactly the same array.
console.log([] == []); // false
console.log([0] == [0]); // false

// Comparison with primitives may also give strange results:
console.log(0 == []); // true
console.log("0" == []); // false
// Here the array gets converted into an empty string for the purpose of comparison to a primitive
// After [] was converted to "":
console.log(0 == ""); // true
console.log("0" == ""); // false

// Do not use "==" to compare arrays, instead compare them item-by-item in a loop or iteration methods 
// explained in the next chapter (4. DataTypes/5.ArrayMethods.js)