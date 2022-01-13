// Object.keys, values, entries
console.log("--- OBJECT.KEYS, VALUES, ENTRIES ---");

// "map.keys()", "map.values()", "map.entries()" are generic methods,
// there is a common agreement to use them for data structures.
// They are supported for: "Map", "Set", "Array"
// Plain objects support similar methods but with different syntax.

// Object.keys, values, entries
console.log("");
console.log("-- Object.keys, values, entries --");
// For plain objects, the following methods are available:
// • Object.keys(obj) - returns an array of keys.
// • Object.values(obj) - returns an array of values.
// • Object.entries(obj) - returns an array of [key, value] pairs.

// Objects have distinctions (compared to map for example):
// The first difference is the "Object.keys(obj)" has to be called, not "obj.keys()".
// The main reason for this is flexibility, as objects are the base of all complex structures in JS.
// The second difference is that "Object.*" methods return "real" array objects, not just an iterable.
// For instance:
let user = {
  name: "Jake",
  age: 28,
};
// • Object.keys(user) = ["name", "age"]
// • Object.values(user) = ["Jake", 28]
// • Object.entries(user) = [ [ "name", "Jake" ], [ "age", 28 ] ]

// Example of using "Object.values" to loop over property values:
user = {
  name: "Jake",
  age: 28,
};

// loop over values
for (let value of Object.values(user)) {
  console.log(value); // Jake, then 28
}

// Transforming Objects
console.log("");
console.log("--- TRANSFORMING OBJECTS ---");

// Objects lack many methods that exist for arrays, e.g. "map", "filter" and others.
// To apply them, "Object.entries" followed by "Object.fromEntries" can be used:
// 1. Use "Object.entries(obj)" to get an array of key/value pairs from "obj".
// 2. Use array methods on that array, e.g. "map", to transform these key/value pairs.
// 3. Use "Object.fromEntries(array)" on the resulting array to turn it back into an object.

// Example:
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // convert prices to array, map each key/value pair into another pair
  // and then fromEntries gives back the object
  Object.entries(prices).map((entry) => [entry[0], entry[1] * 2])
);

console.log(doublePrices.meat); // 8
