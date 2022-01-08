// Array Methods
console.log("");
console.log("--- ARRAY METHODS ---");
// Add/Remove Items
console.log("");
console.log("--- ADD/REMOVE METHODS ---");
// Methods covered in previous chapter :
// • "arr.push(...items)" - adds items to the end,
// • "arr.pop()" - extreacts an item from the end,
// • "arr.shift()" - extracts an item from the beginning,
// • "arr.unshift(...items)" - adds items to the beginning.

// Splice
console.log("");
console.log("--- SPLICE ---");
// Using "delete" to delete an element from an array:
let arr = ["oh", "my", "glob"];
delete arr[1]; // remove "my"
console.log(arr); // [ 'oh',  , 'glob']
console.log(arr.length); // 3

// "arr.splice" can do everything: insert, remove, replace elements
// The syntax:
/*
    arr.splice(start[, deleteCount, elem1, ..., elemN]);
*/
// It modifies "arr" starting from the index "start": removes "deleteCount" elements
// and then inserts "elem1, ..., elemN" in their place. Returns the array of removed elements.

// Deletion:
arr = ["oh", "my", "glob"];
arr.splice(1, 1); // from index "1", remove 1 element
console.log(arr); // [ 'oh', 'glob' ]

arr = ["oh", "my", "glob"];
arr.splice(1, 2, "hell", "yeah");
console.log(arr);

// "splice" returns the array of removed elements:
arr = ["oh", "my", "flipping", "glob"];
let removed = arr.splice(0, 2);
console.log(removed);
["oh", "my"];

// Setting "deleteCount" to 0 allows "splice" to insert elements without removals
arr = ["oh", "my", "glob"];
arr.splice(2, 0, "flipping");
console.log(arr);

// (Negative indexes work the same way as "slice")

// Slice
console.log("");
console.log("--- SLICE ---");
// The method "arr.slice" is much simpler than "arr.splice"
// It is similar to the string method "str.slice", but instead of substrings it makes subarrays.
// The syntax:
/*
    arr.slice([start], [end])
*/
// It returns a new array copying to it all items from index "start" to "end" (not including "end").
arr = ["t", "e", "s", "t"];
console.log(arr.slice(1, 3)); // e,s (copy from 1 to 3)
console.log(arr.slice(-2)); // s,t (copy from -2 to the end)
// Calling it without argument "arr.slice()" creates a copy of "arr".
// This is often used to obtain a copy for further transformations that should not affect the original array.

// Concat
console.log("");
console.log("--- CONCAT ---");
// "arr.concat" creates a new array that includes values from other arrays and additional items.
// The syntax:
/*
    arr.concat(arg1, arg2...)
*/
// It accepts any number of arguments - either arrays or values.
// The result is a new array containing items from "arr", then "arg1", "arg2" etc.
// If an argument is an array, then all its elements are copied. Otherwies the argument itself is copied.
arr = [1, 2];

// create an array from: arr and [3, 4]
console.log(arr.concat([3, 4])); // [ 1, 2, 3, 4 ]

// create an array from: arr and [3, 4] and [5, 6]
console.log(
  arr.concat([
    [3, 4],
    [5, 6],
  ])
); // [ 1, 2, [ 3, 4 ], [5, 6] ]

// create an array from: arr and [3, 4] then add values 5 and 6
console.log(arr.concat([3, 4], 5, 6)); // [1, 2, 3, 4, 5, 6]

// Normally, it only copies elements from arrays.
// Other objects are added as a whole:
arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1,
};

console.log(arr.concat(arrayLike)); // [ 1, 2, { object Object } ]
// But if an array-like object has a special "Symbol.isConcatSpreadable" property, then it is
// treated as an array by "concat": its elements are added instead:
arr = [1, 2];
arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2,
};

console.log(arr.concat(arrayLike)); // [ 1, 2, "something", "else" ]

// Iterate forEach
console.log("");
console.log("--- ITERATE: forEach ---");
// "arr.forEach" allows to run a function for every element of the array.
// The syntax:
/*
    arr.forEach(function(item, index, array) {
        // ... do something with item
    });
*/
// For instance, this shows each element of the array:
// for each element call console.log()
let heroes = ["Finn", "Jake", "BMO"];
heroes.forEach(console.log);

heroes.forEach((item, index, array) => {
  console.log(`${item} is at ${index} in ${array}`);
});

// Searching in Array
console.log("");
console.log("--- SEARCHING IN ARRAY ---");
// Methods that search in an array.

// indexOf/lastIndexOf and includes

// Methods "arr.indexOf", "arr.lastIndexOf" and "arr.includes" have the same syntax and do
// essentially the same as their string counterparts:
// • "arr.indexOf(item, from)" - looks for "item" starting from index "from", and returns the
//    index where it was found, otherwise "-1".
// • "arr.lastIndexOf(item, from)" - same, but looks from right to left
// • "arr.includes(item, from)" - looks for "item" starting from index "from", returns "true" if found.

arr = [1, 0, false];

console.log(arr.indexOf(0)); // 1
console.log(arr.indexOf(false)); // 2
console.log(arr.indexOf(null)); // -1

console.log(arr.includes(1)); // true

// find and findIndes
console.log("");
// "arr.find(fn)" method finds object with specific condition in an array of objects
// Syntax:
/*
    let result = arr.find(function(item, index, array) {
        // if true is returned, item is returned and iteration is stopped
        // for falsy scenario returns undefined
    });
*/
