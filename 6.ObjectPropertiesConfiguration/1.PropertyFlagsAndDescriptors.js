// Property Flags and Descriptors
console.log("--- PROPERTY FLAGS AND DESCRIPTORS ---");

// Until now, a propertu was a simple "key-value" pair.
// But an object property is actually a more flexible and powerful thing.

// Property Flags
console.log("");
console.log("--- PROPERTY FLAGS ---");

// Object properties, besides a "value", have three special attributes (so-called "flags"):
// • "writable" - if "true", the value can be changed, otherwise it is read-only.
// • "enumerable" - if "true", then listed in loops, otherwise not listed.
// • "configurable" - if "true", the property can be deleted and these attributes can be modified, otherwise not.

// Generally these do not show up. When a property is created "the usual way", all of them are "true".
// But they can also be changed at anytime.

// The method "Object.getOwnPropertyDescriptor" allows to query the full information about a property.
// Syntax:
/*
    let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
*/
// "obj" - the object to get information from.
// "propertyName" - the name of the property.

// The returned value is a so-called "property descriptor" object: it contains the value and all the flags:
let user = {
  name: "Finn",
};

let descriptor = Object.getOwnPropertyDescriptor(user, "name");

console.log(JSON.stringify(descriptor, null, 2));
/* property descriptor:
{
  "value": "Finn",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

// To change the flags, "Object.defineProperty" can be used.
// Syntax:
/*
    Object.defineProperty(obj, propertyName, descriptor)
*/
// "obj", "propertyName" - the object and its property to apply the descriptor.
// "descriptor" - property descriptor object to apply.

// If the property exists, "defineProperty" updates its flags. If not,
// it creates the property with the given value and flags; in that case, if a flag is not supplied,
// it is assumed "false".

// For instancem here a property "name" is created with all falsy flags:
user = {};

Object.defineProperty(user, "name", {
  value: "Finn",
});

descriptor = Object.getOwnPropertyDescriptor(user, "name");

console.log(JSON.stringify(descriptor, null, 2));
/* property descriptor:
{
  "value": "Finn",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/

// Now all flags are falsy.

// Non-writable
console.log();
console.log("--- NON-WRITABLE ---");

// Make "user.name" non-writable (can not be reassigned) by changing "writable" flag:
user = {
  name: "Jake",
};

Object.defineProperty(user, "name", {
  writable: false,
});
console.log(user.name); // Jake

user.name = "BMO";
console.log(user.name); // still Jake

// Now "user.name" can not be overwritten, unless another "defineProperty" is used to change the flag.

// Non-enumerable
console.log();
console.log("--- NON-ENUMERABLE ---");

// Add custom "toString" to "user".
// Normally, a built-in "toString" for objects is non-enumerable, it does not show up in "for..in".
// If a "toString" is added to an object, then by default it shows up in "for..in":
user = {
  name: "BMO",
  toString() {
    return this.name;
  },
};
// by default, both properties are listed:
for (let key in user) console.log(key); // name, toString

// setting "enumerable:false", it will not appear in a "for..in" loop:
user = {
  name: "BMO",
  toString() {
    return this.name;
  },
};

Object.defineProperty(user, "toString", {
  enumerable: false,
});

for (let key in user) console.log(key); // name

// Non-enumerable properties are also excluded from "Object.keys":

console.log(Object.keys(user)); // name

// Non-configurable
console.log();
console.log("--- NON-CONFIGURABLE ---");

// The non-configurable flag ("configurable:false") is sometimes preset for built-in objects and properties.
// A non-configurable property can not be deleted, its attributes can not be modified.

// For instance, "Math.PI" is non-writable, non-enumerable and non-configurable:
descriptor = Object.getOwnPropertyDescriptor(Math, "PI");
console.log(JSON.stringify(descriptor, null, 2));

// So, a programmer is unable to change the value of "Math.PI" or overwrite it.
// It also can not be changed to be "writable" again as it is non-configurable.

// Making a property non-configurable is a one-way road. It cannot be changed back with "defineProperty".

// ~~ Note: "configurable:false" prevents changes of property flags and its deletion,
//          while allowing to change its value.

user = {
  name: "Gunter",
};

Object.defineProperty(user, "name", {
  configurable: false,
});

user.name = "Orgalorg"; // works
delete user.name; // does nothing
console.log(user.name);

// "user.name" is "forever sealed":
user = {
  name: "Gunter",
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false,
});

user.name = "Orgalorg"; // nothing happens
delete user.name; // nothing happens
console.log(user.name); // Gunter

// Object.defineProperties
console.log();
console.log("--- OBJECT.DEFINEPROPERTIES ---");

// Method "Object.defineProperties(obj, descriptors)" allows to define many properties at once.
// Syntax:
/*
  Object.defineProperties(obj, {
    prop1: descriptor1,
    prop2: descriptor2,
    // ...
  });
*/
// Example:
Object.defineProperties(user, {
  name: { value: "Bonabelle", writable: false },
  surname: { value: "Bubblegum", writable: false },
});

// Object.getOwnPropertyDescriptors
console.log();
console.log("--- OBJECT.GETOWNPROPERTYDESCRIPTORS ---");

// Method "Object.getOwnPropertyDescriptors(obj)", allows to get all property descriptors at once.
// Together with "Object.defineProperties" it can be used as a "flags-aware" way of cloning an object:
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));

// Normally, when an object is cloned, an assignment is used to copy properties:
for (let key in user) {
  clone[key] = user[key];
}
// but this does not copy flags.

// "Object.defineProperties" will give a "better" clone.

// Another difference is that "for..in" ignores symbolic properties, but "Object.getOwnPropertyDescriptors" returns 
// all property descriptors including symbolic ones.

// Sealing an Object Globally
console.log();
console.log("--- SEALING AN OBJECT GLOBALLY ---");

// Property descriptors work at the level of individual properties.

// There are also methods that limit access to the whole object:
// • "Object.preventExtensions(obj)" - Forbids the addition of new properties to the object.
// • "Object.seal(obj)" - Forbids adding/removing of properties. Sets "configurable: false" for all existing properties
// • "Object.freeze(obj)" - Forbids adding/removing/changing of properties. 
//   Sets "configurable: false, writable: false" for all existing properties.

// And also there are tests for them:
// • "Object.isExtensible(obj)" - Returns "false" if adding properties is forbidden, otherwise "true".
// • "Object.isSealed(obj)" - Returns "true" if adding/removing properties is forbidden, 
//   and all existing properties have "configurable: false".
// • "Objects.isFrozen(obj)" - Returns "true" if adding/removing/changing properties is forbidden, and all current
//   properties are "configurable: false, writable: false".

// These methods are rarely used in practice.