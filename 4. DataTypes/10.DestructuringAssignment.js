// Destructuring Assignment
console.log("--- DESTRUCTURING ASSIGNMENT ---");

// The two most used data structures in JS are "Object" and "Array".
// • Objects allow to create a single entity that stores data items by key.
// • Arrays allow to gather data items into an ordered list.

// When passing these to a function, objects/arrays may not be needed as a whole, but instead as individual pieces.
// Destructuring assignment is a special syntax that allows arrays and objects to be "unpacked" into a bunch of
// variables.
// Destructuring also works great with complex functions that have a lot of parameters, default values and so on.

// Array Destructuring
console.log("");
console.log("--- ARRAY DESTRUCTURING ---");

// An example of how an array is destructured into variables:
// array with name and surname
let arr = ["Finn", "The Human"];

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

console.log(firstName);
console.log(surname);
// Now variables can be worked with instead of array members.
// It looks great when combined with "split" or other array-returning methods:
[firstName, middleName, surname] = "Jake The Dog".split(" ");
console.log(firstName);
console.log(middleName);
console.log(surname);

// Destructuring is basically just a shorter way to write:
firstName = arr[0];
surname = arr[1];
// It does not modify the array.

// Ignore elements using commas:
[firstName, , title] = ["Jake", "The", "Dog"];
console.log(title);

// Works with any iterable on the right-side:
let [a, b, c] = "abc";
let [one, two, three] = new Set([1, 2, 3]);

// Assign to anything at the left-side:
let user = {};
[user.name, user.surname] = "Ice King".split(" ");
console.log(user.name);
console.log(user.surname);

// Looping with .entries():
user = {
  name: "Finn",
  age: 16,
};
// loop over keys-and-values
for (let [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`); // name: Finn, age: 16
}
// using map;
user = new Map();
user.set("name", "Jake");
user.set("age", 28);
// Map iterates as [key, value] pairs, very convenient for destructuring
for (let [key, value] of user) {
  console.log(`${key}: ${value}`);
}

// Swap variables trick:
let guest = "Gunther";
let admin = "Ice King";

[guest, admin] = [admin, guest];
console.log(guest);
console.log(admin);

// The Rest "..."
console.log("");
console.log("-- The rest '...' --");

// Usually, if the array is longer than the list at the left, the "extra" items are omitted.
// Example:
let [name1, name2] = [
  "Jake",
  "The Dog",
  "Hero",
  "Father",
  "Ex-criminal",
  "Husband",
];

console.log(name1);
console.log(name2);
// further items are not assigned anywhere
// to gather those items, a parameter "..." can be added:
[name1, name2, ...titles] = [
  "Jake",
  "The Dog",
  "Hero",
  "Father",
  "Ex-criminal",
  "Husband",
];
console.log(titles); // [ 'Hero', 'Father', 'Ex-criminal', 'Husband' ]

// Default values
console.log("");
console.log("-- Default values --");

// If the array is shorter than the list of variables at the left, there will be no errors.
// Absent values are considered undefinedL
[firstName, surname] = [];
console.log(firstName); // undefined
console.log(surname); // undefined

// A "default" value can be added using "=":
[name = "Guest", surname = "Anonymous"] = ["BMO"];
console.log(name); // BMO (from array)
console.log(surname); // Anonymous (default used)

// Object Destructuring
console.log("");
console.log("--- OBJECT DESTRUCTURING ---");

// The destructuring assignment also works with object.
// The basic syntax is:
/*
    let {var1, var2} = {var1:..., var2:...}
*/
// Existing object on the right side, that can be split into variables.
// The left side contains an object-like "pattern" for corresponding properties.
// Example:
let options = {
  title1: "Menu",
  width: 100,
  height: 200,
};

let { width, height, title1 } = options; // order in let {...} does not matter

console.log(title1); // Menu
console.log(width); // 100
console.log(height); // 200

// To assign a property to a variable with another name, for instance make "options.width"
// go into the variable names "w", then set the variable name using a colon:
let { width: w, height: h, title1: t } = options;
console.log(t); // Menu
console.log(w); // 100
console.log(h); // 200

// For missing properties, defaults can be set:
options = {
  title1: "Menu",
};

let { width: wid = 100, height: hgt = 200, title1: ttl } = options;
console.log(ttl); // Menu
console.log(wid); // 100
console.log(hgt); // 200

// Can extract any number of variables in object:
let { title1: titl } = options;
console.log(titl); // Menu

// The Rest Pattern "..."
console.log("");
console.log("-- The rest pattern '...' --");

// Rest pattern can be used to assign extra properties with no variables, like arrays.
options = {
  title: "Menu",
  height: 200,
  width: 100,
};

({ title, ...rest } = options);
console.log(rest.height); // 200
console.log(rest.width); // 100

// Nested destructuring
console.log("");
console.log("--- NESTED DESTRUCTURING ---");

// If an object or an array contain other nested objects and arrays, more complex
// left-side patterns can be used to extract deeper portions.

// In this example, "options" has another object in the property "size" and an array in the property
// "items". The pattern at the left side of the assignment has the same structure to extract values from them:
options = {
  size: {
    width: 100,
    height: 200,
  },
  items: ["Cake", "Donut"],
  extra: true,
};

// destructuring assignment
({
  size: { width, height },
  items: [item1, item2],
  title = "Menu",
} = options);

console.log(title); // Menu
console.log(width); // 100
console.log(height); // 200
console.log(item1); // Cake
console.log(item2); // Donut
// there are no variables for "size" or "items" as their contents are taken instead.

// Smart Function Parameters
console.log("");
console.log("--- SMART FUNCTION PARAMETERS ---");

// Sometimes a function has many parameters, most of which are optional.
// Example, a function that creates a menu, has: width, height, title, items list etc.
// Bad way to write such a function:
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}

showMenu("My Menu", undefined, undefined, ["Item1", "Item2"]);
// ugly and becomes unreadable with more parameters

// Parameters can be passed as an object and the function immediately destructurizes into variables:
// pass object to function
options = {
  title: "My menu",
  items: ["Item1", "Item2"],
};
// ...immediately expands it to variables
function showMenu({
  title = "Untitled",
  width = 200,
  height = 100,
  items = [],
}) {
  // title, items - takes from options,
  // width, height - defaults used
  console.log(`${title} ${width} ${height}`); // My Menu 200 100
  console.log(items); // Item1, Item2
}

showMenu(options);

// More complex destructuring with nested objects and colon mappings:
options = {
  title: "My Menu",
  items: ["item1", "item2"],
};

console.log("");

(function showMenu({
  title = "Untitled",
  width: w = 100, // width -> w
  height: h = 200, // height -> h
  items: [item1, item2], // items first element -> item1, second element -> item2
}) {
  console.log(`${title} ${w} ${h}`);
});

showMenu(options);

// Full syntax is the same as for a destructuring assignment:
/*
   function({
     incomingProperty: varName = defaultValue
     ...
     
   })
*/
// For an object of parameters, there will be a variable "varName" for property
// "incomingProperty", with "defaultValue" by default.

// Such destructuring assumes that function does have an argument, if all values are default,
// specify an empty object:
showMenu({}); // all values are default
// showMenu(); // gives an error
// this can be fixed by making "{}" the default value for the whole object of parameters:
function showMenu1({ title = "Menu", width = 100, height = 200 } = {}) {
  console.log(`${title} ${width} ${height}`);
}
showMenu1(); // now it works, Menu 100 200
