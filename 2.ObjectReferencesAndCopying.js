// Object References and Copying
console.log("--- OBJECT REFERENCES AND COPYING ---");

// a fundamental difference between a object and a primitive
// primitive values: strings, numbers, booleans, etc. are always copied as a whole value
let message = "hello";
let phrase = message;

console.log(message);
console.log(phrase);
// here both "message" and "phrase" store the string "hello"
// message = "hello"
// phrase = message = "hello"

// objects are stored and copied "by reference"
let user = {
  name: "Finn",
};
let admin = user;

console.log(user);
console.log(admin);
// here the variables both refer to the object property "name"
// "->" is used as "refers to"
// user -> name = "Finn"
// admin -> name = "Finn"
// either variable can be used to access object and modify its contents
user.name = "Jake";
console.log(admin.name);

admin.name = "BMO";
console.log(user.name);

// Comparison by Reference
console.log("");
console.log("--- COMPARISON BY REFERENCE ---");

// two objects are equal only if they are equal to the same object
let a = {};
let b = a; // same object

console.log(a == b);
console.log(a === b);

a = {};
b = {}; // two independent objects

console.log(a == b);
console.log(a === b);

// Cloning and Merging, Object.assign
console.log("");
console.log("--- CLONING AND MERGING ---");
// to duplicate an object independently instead of copying by reference,
// create a new object and replicate the structure of the existing one
// by using a "for...in" loop to iterate over its properties and copy them on a primitive level
user = {
  name: "Finn",
  age: 16,
};

let clone = {}; // new empty object

for (let key in user) {
  clone[key] = user[key];
}

console.log(user);
console.log(clone);
// "clone" is an independent object and its data can be changed without affecting "user"
clone.name = "Jake";

console.log(user);
console.log(clone);

// Object.assign can also be used to copy properties
console.log("");
console.log("--- OBJECT.ASSIGN ---");
/*
  Object.assign(dest, [src1, src2, src3...]);
*/
// first argument, "dest", is a target object
// further arguments are source objects
// copies all source objects into "dest" and returns "dest"
user = { name: "Marcy" };

let permission1 = { canView: true };
let permission2 = { canEdit: true };

console.log(user);

// copies all properties from "permission1" and "permission2" into "user"
Object.assign(user, permission1, permission2);

console.log(user);

// if copied property name already exists, it gets overwritten
user = { name: "Ice King" };

console.log(user.name);

Object.assign(user, { name: "Simon" });

console.log(user.name);

// Object.assign can also be used to replace "for...in" loop for simple cloning
user = {
  name: "PepBut",
  age: 300,
};

clone = Object.assign({}, user);

console.log(user, clone);

// Nested Cloning
console.log("");
console.log("--- NESTED CLONING ---");
// if an object has another object as a property, when cloned, that object will be copied by reference
user = {
  name: "BMO",
  sizes: {
    height: 51,
    width: 31,
  },
};

console.log(user.sizes.height);

clone = Object.assign({}, user);

console.log(user.sizes === clone.sizes); // strict equality returns true, same object

user.sizes.width++; // changing a property from one affects the other as copied by reference
console.log(clone.sizes.width);

// to fix this, using a cloning loop that examines each value of user[key],
// if it is an object, replicate its structure
// this is called "deep cloning"