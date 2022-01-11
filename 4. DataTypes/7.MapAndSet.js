// Map and Set
console.log("--- MAP AND SET ---");

// The following complex data structures have been covered:
// • Objects are used for storing keyed collections.
// • Arrays are used for storing ordered collections.

// Map
console.log("");
console.log("--- MAP ---");

// Map is a collection of keyed data items, just like an "Object".
// But the main difference is that "Map" allows keys of any type

// Methods and properties are:
// • new Map() - creates the map.
// • map.set(key, value) - stores the value by the key.
// • map.get(key) - returns the value by the key, "undefined" if "key" does not exist.
// • map.has(key) - returns "true" id the "key" exists, "false" otherwise.
// • map.delete(key) - removes the value by the key.
// • map.clear() - removed everything from the map.
// • map.size - returns the current element count.

// Example:
let map = new Map();

map.set("1", "str1"); // a string key
map.set(1, "num1"); // a numeric key
map.set(true, "bool1"); // a boolean key

// Map keeps key type instead of converting like a regular object
console.log(map.get(1));
console.log(map.get("1"));

console.log(map.size);

// Map can also use objects as keys:
let finn = { name: "Finn" };

// store visit count for every user
let visitsCountMap = new Map();

// finn is the key for the map
visitsCountMap.set(finn, 123);

console.log(visitsCountMap.get(finn));

// If an Object is used as a key in Object it converts to a string "[object Object]":
finn = { name: "Finn" };
jake = { name: "Jake" };

let visitsCountObj = {};

visitsCountObj[jake] = 234;
visitsCountObj[finn] = 123;

console.log(visitsCountObj); // { '[object Object]': 234 }

// Iteration Over Map
console.log("");
console.log("--- ITERATION OVER MAP ---");

// 3 methods for looping over a "map":
// • map.keys() - returns an iterable for keys,
// • map.values() - returns an iterable for values,
// • map.entries() - returns an iterable for entries "[key, value]", it is
//   used by default in "for..of".
// Example:
let recipeMap = new Map([
  ["cucumber", 500],
  ["tomatoes", 350],
  ["onion", 50],
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable);
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  console.log(amount);
}

// iterate over [key, value] entries
for (let entry of recipeMap) {
  console.log(entry);
}

// "Map" has a built-in "forEach" method, similar to "Array":

// runs the function for each (key, value) pair
recipeMap.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// Object.entries: Map From Object
console.log("");
console.log("--- OBJECT.ENTRIES: MAP FROM OBJECT ---");

// When a "Map" is created, an array (or another iterable) with key/value pairs
// can be passed for initialization, like this:

// array of [key, value] pairs
map = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "boo1"],
]);

console.log(map.get("1")); // str1

// To create a "Map" from a plain object, a built-in method "Object.entries(obj)"
// can be used.
// "Object.entries(obj)" returns an array of key/value pairs for an object.
// Example:
let obj = {
  name: "Finn",
  age: 16,
};

map = new Map(Object.entries(obj));

console.log(map.get("name")); // Finn

// Here, "Object.entries" returns the array of key/value pairs:
// [ [ "name", "Finn" ], [ "age", 30 ] ].

// Object.fromEntries: Object From Map
console.log("");
console.log("--- OBJECT.FROMENTRIES: OBJECT FROM MAP ---");

// "Object.fromEntries" does the opposite of "Object.entries"
// Given an array of [key, value] pais, it creates an object from them.
// Example:
let prices = Object.fromEntries([
  ["banana", 1],
  ["orange", 2],
  ["meat", 4],
]);

console.log(prices); // { banana: 1, orange: 2, meat: 4 }
console.log(prices.orange); // 2

// "Object.fromEntries" can be used to get a plain object from "Map".
map = new Map();
map.set("banana", 1);
map.set("orange", 2);
map.set("meat", 4);

obj = Object.fromEntries(map.entries()); // make a plain object (*)

console.log(obj); // { banana: 1, orange: 2, meat: 4 }

// (*) line can be made shorter,
obj = Object.fromEntries(map);
console.log(obj); // { banana: 1, orange: 2, meat: 4 }

// this is because "Object.fromEntries" expects an iterable object as the argument.
// And the standard iteration for "map" returns the same key/value pairs as "map.entries()".

// Set
console.log("");
console.log("--- SET ---");

// A "Set" is a special type collection - "set of value" (without keys), where each value may occur only once.
// Its main methods:
// • new Set(iterable) - creates the set, and if an "iterable" object is provided (usually array),
//   copies values from it into the set.
// • set.add(value) - adds a value, returns the set itself.
// • set.delete(value) - removes the value, returns "true" if "value" existed at the moment of
//   the call, otherwise "false".
// • set.has(value) - returns "true" if the value exists in the set, otherwise "false".
// • set.clear() - removes everything from the set.
// • set.size - if the elements count

// The main feature is that repeated calls of "set.add(value)" with the same value do not do anything.
// That's the reason why each value appears in a "Set" only once.
// Example:
let set = new Set();

let pb = { name: "PB" };
let marcy = { name: "Marcy" };
let iceKing = { name: "Ice King" };

// visits, some users come multiple times
set.add(pb);
set.add(marcy);
set.add(iceKing);
set.add(pb);
set.add(iceKing);

// set keeps only unique values
console.log(set.size); // 3

for (let user of set) {
  console.log(user.name);
}

// "Set" is much better optimized than something like "arr.fing" for uniqueness checks.

// Iteration Over Set
console.log("");
console.log("--- ITERATION OVER SET ---");

// "for..of" or "forEach" can be used to loop over a set:
set = new Set(["orange", "apples", "bananas"]);

for (let value of set) console.log(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  console.log(value);
});

// The reason for the extra argument "valueAgain" is compatibility with "Map",
// where the callback passed "forEach" has 3 arguments.

// The same methods "Map" has for iterators are also supported:
// • set.keys() - returns an iterable object for values,
// • set.values() - same as "set.keys()", for compatibility with "Map",
// • set.entries() - returns an iterable object for entries [value, value],
//   exists for compatibility with "Map".
