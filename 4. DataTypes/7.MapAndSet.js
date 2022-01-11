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
let visitscountMap = new Map();

// finn is the key for the map
visitscountMap.set(finn, 123);

console.log(visitscountMap.get(finn));
