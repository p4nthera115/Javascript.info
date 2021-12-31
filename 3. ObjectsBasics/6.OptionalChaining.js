// Optional Chaining '?.'
console.log("--- OPTIONAL CHAINING '?.' ---");
// The optional chaining "?." is a safe way to access nested object properties

// The "non-existing property" problem
console.log("");
console.log("--- NON-EXISTING PROPERTY PROBLEM ---");
// Trying to access a nested property if an intermediate property does not exist will lead to an error
let user = {}; // user without an "address" property
// console.log(user.address.street); // Error
// A preferred result would be "undefined"
user = {};
console.log(user.address ? user.address.street : undefined);
// this works but becomes problematic for more deeply nested properties
// e.g. trying to get something like "user.address.street.name" is a mess
user = {};
console.log(
  user.address ? (user.address.street ? user.address.street.name : null) : null
);
// another way would be using the AND, &&, operator
user = {};
console.log(user.address && user.address.street && user.address.street.name);
// still is not ideal

// Optional Chaining
console.log("");
console.log("--- OPTIONAL CHAINING ---");
// Optional chaining "?." stops the evaluation if the value before "?." is "undefined" or "null" and returns "undefined"
// "value?.prop":
// • works as "value.prop", if "value" exists
// • if "value" is "undefined/null" it returns "undefined"

// The safe way to access "user.address.street" using "?.":
user = {};
console.log(user?.address?.street);
// reading the address with "user?.address" works even if the "user" object does not exist
user = null;
console.log(user?.address);
console.log(user?.address.street);
// "?." only makes the value before it optional

// Short-circuiting
console.log("");
console.log("--- SHORT-CIRCUITING ---");
// "?." immediately stops ("short-circuits") the evalutaion if the left part does not exist
// So, if there are any further function calls or side effects, they do not occur
user = null;
let x = 0;

user?.sayHi(x++); // no "sayHi", so execution does not reach "x++"
console.log(x);

// Other variants: ?.(), ?.[]
console.log("");
console.log("--- OTHER VARIANTS ---");
// "?." is not an operator, but a special syntax construct that also works with functions and square brackets
// "?.()" is used to call a function that may not exist
// if the function does exist, it runs, if not, the evaluation stops without errors
let userAdmin = {
  admin() {
    console.log("I am admin");
  },
};

let userGuest = {};

userAdmin.admin?.();
userGuest.admin?.();
// "?.[]" syntax also works if "[]" need to be used to access properties instead of "."
let key = "firstName";

let user1 = {
  firstName: "Finn",
};

let user2 = null;

console.log(user1?.[key]);
console.log(user2?.[key]);

// "?." can also be used with "delete"
delete user?.name; // delete "user.name" is "user" exists
