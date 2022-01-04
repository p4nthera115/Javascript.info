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
// symbols are not strings and do not convert to strings automatically
// to explicitly show a symbol:
id = Symbol("id");
console.log(id.toString()); // converts to string to view symbol
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
console.log(user);
console.log(user[id]); // must directly access symbol to view

// "Object.assign" copies both string and symbol properties
id = Symbol("id");
user = {
  name: "Finn",
  age: 16,
  [id]: 123,
};

let clone = Object.assign({}, user);

console.log(clone);
console.log(clone[id]);

// Global Symbols
console.log("");
console.log("--- GLOBAL SYMBOLS ---");
// The "global symbol registry" exists to store symbols that need repeated access
// To read (or create if absent) a symbol from the registry, "Symbol.for(key)"
// this call checks the global registry, and if there is a symbol with a description of "key", it returns it,
// otherwise creates a new symbol "Symbol(key)" and stores it in the registry
id = Symbol.for("id"); // read from the global registry or create if symbol does not exist

let idAgain = Symbol.for("id"); // read it again (maybe from another part of the code)

console.log(id === idAgain); // true
// symbols inside the registry are called "global symbols"
// global symbols are application-wide and accessible everywhere in the code

// Symbol.keyFor
console.log("");
// "Symbol.keyFor(sym)" does the opposite of "Symbol.for(key)", it returns a name by a global symbol
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
console.log(Symbol.keyFor(sym)); // name
console.log(Symbol.keyFor(sym2)); // id

// "Symbol.keyFor" uses global symbol registry, if symbol is not global, returns undefined
// Any symbol can have a description property
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

console.log(Symbol.keyFor(globalSymbol)); // name
console.log(Symbol.keyFor(localSymbol)); // undefined, not global

console.log(localSymbol.description); // name

// System Symbols
console.log("");
// JS uses many "system" symbols internally which can be used to fine-tune various aspects of objects
// These symbols are listed  in the "Well-known symbols" table under the "Well-Known symbols" section of the ECMAScript language specification

// For instance, "Symbol.toPrimitive" allows to describe object to primitive conversion.

