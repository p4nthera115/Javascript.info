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
console.log("-- indexOf/lastIndexOf and includes --");
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

// find and findIndex
console.log("");
console.log("-- find and findIndex --");
// "arr.find(fn)" method finds object with specific condition in an array of objects
// Syntax:
/*
    let result = arr.find(function(item, index, array) {
        // if true is returned, item is returned and iteration is stopped
        // for falsy scenario returns undefined
    });
*/
// The function is called for elements of the array, one of another:
// • "item" is the element.
// • "index" is the index.
// • "array" is the array itself.

// If it returns "true", the search is stopped the "item" is returned. If nothing found, "undefined"
// is returned.

// Example
heroes = [
  { id: 1, name: "Finn" },
  { id: 2, name: "Jake" },
  { id: 3, name: "BMO" },
];

let hero = heroes.find((item) => item.id == 3);

console.log(hero.name); // BMO

// "arr.findIndex" is essentially the same but instead returns the index instead of the element itself,
// it returns "-1" if nothing is found
let heroIndex = heroes.findIndex((item) => item.id == 4);

console.log(heroIndex); // -1

// Filter
console.log("");
console.log("-- filter --");
// "find" method looks for single element that makes the function return true.
// If there is more than one, "arr.filter(fn)" can be used.
// Syntax:
/*
  let results = arr.filter(function(item, index, array) {
    // if true item is pushed to results and the iteration continues
    // returns empty array if nothing found
  });
*/

// Example:
heroes = [
  { id: 1, name: "Finn" },
  { id: 2, name: "Jake" },
  { id: 3, name: "BMO" },
];

// returns array of the first two users
let someHeroes = heroes.filter((item) => item.id < 3);

console.log(someHeroes.length);

// Transform an Array
console.log("");
console.log("--- TRANSFORM AN ARRAY ---");
// Methods that transform and reorder an array.

console.log("-- map --");
// "arr.map" calls the function for each element of the array returns the array of results
// Syntax:
/*
  let result = arr.map(function(item, index, array) {
    // returns the new value instead of item
  });
*/

let candyPeople = [
  { id: 1, name: "PepBut" },
  { id: 2, name: "Starchy" },
  { id: 3, name: "Cinnamon Bun" },
];

let lengths = candyPeople.map((item) => item.name.length);
console.log(lengths); // 6, 7, 12

// sort(fn)
console.log("");
console.log("-- sort(fn) --");
// "arr.sort()" sorts the array in place, changing its element order.
// Also returns the sorted array, but the returned value is usually ignored as "arr" is modified.
// For instance:
arr = [1, 2, 15];

arr.sort(); // the method reorders the content of arr

console.log(arr); // 1, 15, 2 (items are sorted as strings by default)

// A function needs be passed in as the argument of "arr.sort()" to fix the order.

// The function should compare two arbitrary values and return:
function compare(a, b) {
  console.log(a + " <-> " + b);

  if (a > b) return 1; // ( > 0),  if first value is greater than second sort b before a
  if (a == b) return 0; // ( === 0), if values are equal keep original order of an and b
  if (a < b) return -1; // ( < 0), if first value is less than second sort a before b
}

arr = [1, 2, 15];

arr.sort(compare);

console.log(arr); // 1, 2, 15

// Check which elements are being compared
console.log("");
arr = [1, -2, 15, 2, 0, 8];

arr.sort(function (a, b) {
  console.log(a + " <-> " + b);
  return a - b;
});

console.log(arr); // -2, 0, 1, 2, 8, 15

// simplify with arrow function
arr = [1, -2, 15, 2, 0, 8];

arr.sort((a, b) => a - b);

console.log(arr);

// reverse
console.log("");
console.log("-- reverse --");
// "arr.reverse" reverses the order of elements in arr
arr = [1, 2, 3, 4, 5];
arr.reverse();

console.log(arr); // 5, 4, 3, 2, 1

// split and join
console.log("");
console.log("-- split and join --");
// "str.split(delim)" splits a string into an array by the given delimiter "delim".
// Example:
let names = "BMO, NEPTR, Gunter";

arr = names.split(", ");

for (let name of arr) {
  console.log(`A message to ${name}`);
}

// "split" had an optional second numeric argument - a limit on array length
arr = names.split(", ", 2);

console.log(arr); // BMO, NEPTR

// "arr.join(glue)" does the reverse to "split". It creates a string of "arr" items joined by "glue".
// Example:
arr = ["BMO", "NEPTR", "Gunter"];

let str = arr.join(", ");

console.log(str);

// reduce/reduceRight
console.log("");
console.log("-- reduce/reduceRight --");
// "arr.reduce / arr.reduceRight" calculate a single value based on the array.
// Syntax:
/*
  let value = arr.reduce(function(accumulator, item, array) {
    // ...
  }, [initial]);
*/

// The function is applied to all array elements one after another and "carries on" its result to the next call.

// Arguments:
// • "accumulator" - is the result of the previous function call, equals
//   "initial" the first time (if "initial" is provided).
// • "item" - is the current array item
// • "index" - is its position
// • "array" is the array

// As function is applied, result of previous function call is passed to next one as first argument "accumulator".
arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

console.log(result); // 15

// if no "initial" value, first element is taken as "initial" and starts iteration from 2nd element

// "arr.reduceRight" does the same but goes from right to left
arr = [1, 2, 3, 4, 5];

result = arr.reduceRight((sum, current) => sum + current, 0);

console.log(result); // 15

// Array.isArray
console.log("");
console.log("--- ARRAY.ISARRAY ---");
// Because arrays are based on objects, "typeof" does not distinguish between a plain object and an array:
console.log(typeof {}); // object
console.log(typeof []); // object

// "Array.isArray(value)" is used for this, it returns true if the "value" is an array and false if not.
console.log(Array.isArray({})); // false
console.log(Array.isArray([])); // true

// Most Methods Support "thisArg"
console.log("");
console.log("--- THISARG ---");
// Almost all array methods that call functions accept an optional additional parameter "thisArg".
// Full syntax of methods with "thisArg" included:
/*
  arr.find(func, thisArg);
  arr.filter(func, thisArg);
  arr.map(func, thisArg);
  // ...
  // thisArg is the optional last argument
*/

// The value of "thisArg" becomes "this" for "func".
// Example:
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  },
};

let users = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];

// find users, for who army.canJoin returns true
let soldiers = users.filter(army.canJoin, army);

console.log(soldiers);
console.log(soldiers.length);
console.log(soldiers[0].age);
console.log(soldiers[1].age);

// Array Methods Cheat Sheet
console.log("");
console.log("--- CHEAT SHEET ---");

// • To add/remove elements:
//    • push(...items) - adds items to the end,
//    • pop() - extracts an item from the end,
//    • shift() - extracts an item from the beginning,
//    • unshift(...items) - adds items to the beginning.
//    • splice(pos, deleteCount, ...items) - at index "pos" deletes
//      "deleteCount" elements and inserts "items".
//    • slice(start, end) - creates a new array, copies elements from
//      index "start" till "end" (not inclusive) into it.
//    • concat(...items) - returns a new array, copies all members of the
//      current one and adds "items" to it. If any of "items" is an array, then
//      its elements are taken.

// • To search among elements:
//    • indexOf/lastIndexOf(item, pos) - look for "item" starting from position "pos",
//    return the index or -1 if not found.
//    • includes(value) - returns "true" if the array has "value",
//    otherwise "false".
//    • find/filter(func) - filter elements through the function, return
//      first/all values that make it return "true".
//    • "findIndex" is like "find", but returns the index instead of value.

// • To iterate over elements:
//    • forEach(func) - calls "func" for every element, does not return anything.

// • To transform the array:
//    • map(func) - creates a new array from results of calling "func" for every element.
//    • sort(func) - sorts the array in-place, then returns it.
//    • reverse() - reverses the array in-place, then returns it.
//    • split/join - convert a string to array and back.
//    • reduce/reduceRight(func, initial) - calculate a single value over the array
//      by calling "func" for each element and passing an intermediate result between the calls.

// Additionally:
//    • Array.isArray(arr) checks "arr" for being an array.

// Tasks:
console.log("");
console.log("--- TASKS ---");

function camelize(str) {
  arr = str.split("-");
  result = arr.map((word, index) => {
    return index > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
  });
  camel = result.join("");
  return camel.charAt(0).toLowerCase() + camel.slice(1);
}

console.log(camelize("background-color"));
console.log(camelize("list-style-image"));
console.log(camelize("-webkit-transition"));
