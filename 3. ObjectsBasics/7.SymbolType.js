// Symbol Type
console.log("--- SYMBOL TYPE ---");
// Object property keys may be either of string type, or of symbol type, no other types
// Symbol
console.log("");
console.log("--- SYMBOL ---");
// A "symbol" represents a unique identifier
// A value of this type can be created using "Symbol()"
let id = Symbol("id");
// Upon creation a symbol can be given a description,
// a description is just a label that does not affect anything
// Two symbols with the same description are not equal
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 == id2); // false
// symbols and strings are different and do not convert automatically
// to explicitly show a symbol:
id = Symbol("id");
console.log(id.toString()); // converts to string
// to show description only
console.log(id.description); // id

// "Hidden" properties
console.log("");
console.log("--- HIDDEN PROPERTIES ---");
// Symbols allow to create "hidden" properties of an object, that no other part of the code can accidentally access or overwrite
let user = {
  name: "Finn",
};

id = Symbol("id");

user[id] = 1;

console.log(user[id]);
// Benefits of using "Symbol("id")" over a string "id":
// As "user" objects tend to belong to third-party code, adding any fields could be unsafe,
// but a symbol cannot be accessed accidentally.
// If another script wants to add its own identifier inside "user", for its own purposes,
// they can do so with "Symbol("id")" as there would be no conflict
id = Symbol("id");
user[id] = "Their id value";
// no conflict would occur because symbols are always different, even if they have the same name
// using a string here would cause conflict
user = { name: "Finn" };
// current script uses "id" property
user.id = "id value";
// another script uses "id" property for its purposes
user.id = "other id value";
// id is now overwritten by another script

// Symbols in an Object Literal
console.log("");
// To use a symbol in an object literal, square brackets must be around it
id = Symbol("id");
user = {
  name: "Finn",
  [id]: 123,
};

// Symbols are skipped by "for...in"
console.log("");
// symbolic properties do not participate in "for...in" loops
id = Symbol("id");
user = {
  name: "Finn",
  age: 16,
  [id]: 123,
};

for (let key in user) console.log(key); // name, age, no symbol
console.log(user[id]); // must directly access symbol to view
