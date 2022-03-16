// Prototype Methods, Objects without __proto__
console.log("--- PROTOTYPE METHODS, OBJECTS WITHOUT __proto__ ---");

// In the first chapter of this section, it was mentioned that there are modern methods to setup a prototype.

// The "__proto__" is considered outdated and somewhat deprecated (in browser-only part of the JS standard).

// The modern methods are:
// • "Object.create(proto, [descriptors])" — creates an empty object with given "proto" as "[[Prototype]]"
//                                           and optional property descriptors
// • "Object.getPrototypeOf(obj)" — returns the "[[Prototype]]" of "obj".
// • "Object.setPrototypeOf(obj, proto)" — sets the "[[Prototype]]" of "obj" to "proto".

// These should be used instead of "__proto__".
// For instance:
let animal = {
  eats: true,
};

// create a new object with animal as a prototype
let rabbit = Object.create(animal);

console.log(rabbit.eats); // true

console.log(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}

// "Object.create" has an optional second argument: property descriptors.
// Additional properties can be provided to the new object, like this:
animal = {
  eats: true,
};

rabbit = Object.create(animal, {
  jumps: {
    value: true,
  },
});

console.log(rabbit.jumps); // true

// The descriptors are in the same format as described in the chapter
// "6.ObjectPropertiesConfiguration/1.PropertyFlagsAndDescriptors.js".

// "Object.Create" can be used to perform an object cloning more powerful than copying propertied in "for..in":
// let clone = Object.create(Object.getPrototypeOf(obj),  Object.getOwnPropertyDescriptors(obj));

// This call makes a truly exact copy of "obj", including all properties:
// enumerable and non-enumerable, data properties and setters/getters —
// everything, and with the right "[[Prototype]]".

// Brief History
console.log();
console.log("--- BRIEF HISTORY ---");

// • The "prototype" property of a constructor function has worked since very ancient times.

// • Later, in the year 2012, "Object.create" appeared in the standard.
//   It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it.
//   So browsers implemented the non-standard "__proto__" accessor that allowed the user to get/set a prototype at any time.

// • Later, in the year 2015, "Object.setPrototypeOf" and "Object.getPrototypeOf" were added to the standard,
//   to perform the same functionality as "__proto__". As "__proto__" was de-facto implemented everywhere,
//   it was kind-of deprecated and made its way to the Annex B of the standard,
//   that is: optional for non-browser environments.

// "Very plain" Objects
console.log();
console.log('--- "VERY PLAIN" OBJECTS ---');

// Objects can be used as associative arrays to store key/value pairs.

// But if user-provided keys are stored in it (for instance, a user-entered dictionary),
// an interesting glitch occurs: all keys work fine except "__proto__".
// Example:
/* (using "prompt")
  let obj = {};

  let key = prompt("What's the key?", "__proto__");
  obj[key] = "some value";

  console.log(obj[key]); // [object Object], not "some value"
*/

// Here if the user types in "__proto__", the assignment is ignored.
// The "__proto__" property is special: it must be either an object or "null".
// A string can not become a prototype. This can lead to many unexpected problems.

// To use an objecta as an associative array and be free of problems, a trick can be used:
/*
  let obj = Object.create(null);

  let key = prompt("What's the key?", "__proto__");
  obj[key] = "some value";

  console.log(obj[key]); // "some value"
*/

// "Object.create(null)" creates an empty object without a prototype ("[[Prototype]] is "null").
// So, there is no inherited getter/setter for "__proto__".
// Now it is processed as a regular data property, so the example above works correctly.

// Such objects can be called "very plain" or "pure dictionary" objects,
// because they are even simpler than the regular plain object "{...}".

// A downside is that such objects lack any built-in method, e.g. "toString":
obj = Object.create(null);
console.log(obj); // [Object: null prototype] {}

// But that is usually fine for associative arrays.

//~ Most object-related methods are "Object.something(...)",
//  like "Object.keys(obj)" - they are not in the prototype, so they will keep working on such objects:
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

console.log(Object.keys(chineseDictionary)); // [ 'hello', 'bye' ]
