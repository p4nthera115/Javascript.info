// Objects
console.log("--- OBJECTS ---");
// objects are used to store keyed collections of various data and more complex entities
// an object can be created with figure brackets, "{...}", with an optional list of 'properties'.
// a property is a "key: value" pair, where key is a string (also called "property name"), and value can be anything

// let user = new Object(); - "object constructor" syntax
// let user = {}; - "object literal" syntax

let user = {
  name: "Finn", // key "name": value "Finn"
  age: 16, // key "age": value 16
};

// property values are accessible using the dot notation
console.log(user.name);
console.log(user.age);

// add new property to object
user.isHero = true;
console.log(user.isHero);

// delete property
delete user.age;
console.log(user);

// can also use multiword property names, must use [] to access as dot notation does not work
user["likes penguins"] = true;
console.log(user["likes penguins"]);
delete user["likes penguins"];

// [] also provide a way to obtain keys from any expression
// e.g. a variable
let key = "likes penguins";
user[key] = true;
console.log(user[key]);

// computed properties
let fruit = "apple"; // user inputs 'fruit'

let bag = {
  [fruit]: 5, // name of property is taken from 'fruit' variable
};

console.log(bag.apple); // 5 if fruit == "apple"

// Property Value Shorthand
console.log("");
console.log("--- PROPERTY VALUE SHORTHAND ---");
// often times existing variables are used as values for property names,*
function makeUser(name, age) {
  return {
    name: name,
    age: age,
  };
}

user = makeUser("Jake", 28);
console.log(user);
// * because of this there is a "property value shorthand"
// when the property name and value are the same, you can write it as, "value: value" -> "value,"
// in this case, instead of "name: name", the shorthand would be "name,"
function makeUser1(name, age) {
  return {
    name,
    age,
  };
}

user = makeUser1("LSP", 15);
console.log(user);

// Property Names Limitations
console.log("");
console.log("--- PROPERTY VALUE LIMITATIONS ---");
// variables cannot have a name equal to a language-reserved word like, "for", "let" etc.
// but for objects there are no restrictions
// they can be strings or symbols, other data types are converted into strings
let obj = {
  let: true,
  for: "what",
  0: 0, // 0 becomes "0"
};

console.log(obj);
console.log(obj.for, obj.let, obj[0]);

// Property existence test, "in" operator
console.log("");
console.log("--- IN OPERATOR ---");
// in JS you can access properties that do not exist, they will be undefined
user = {};
console.log(user.noProperty);

// the "in" operator checks to see if the property exists in the object
user = {
  name: "PB",
  age: '"18"',
};

console.log("age" in user); // true, exists
console.log("no" in user); // false, does not exist
// left side must be a property name
// can be stored in a variable
key = "name";
console.log(key in user);

// "in" is useful when a property stores "undefined" as its value
let object = {
  test: undefined,
};

console.log(object.test); // returns undefined but property does exist
console.log("test" in object); // returns true, does exist

// The "for...in" loop
console.log("");
console.log("--- FOR...IN LOOP ---");
// the "for...in" loop iterates over all properties in an object
// completely different to a "for" loop
/*
  for (key in object) {
    // executes body for each key in object properties
  }
*/

user = {
  name: "Gunter",
  age: 13.8 * 10 ** 9,
  isEvil: true,
};

for (let key in user) {
  console.log(key);
  console.log(user[key]);
}

// Order of an Object
console.log("");
console.log("--- ORDER OF AN OBJECT ---");
// objects prioritise numerical order in property names
object = {
  5: 1,
  3: 2,
  4: 3,
  1: 4,
  2: 5,
};

for (let prop in object) {
  console.log(prop);
  console.log(object[prop]);
}
// if the keys are not numbers, they are listed in creation order
let first = "first";
let second = "second";
let third = "third";

object = {
  first,
  second,
  third,
};

for (let prop in object) {
  console.log(object[prop]);
}
