// Propeerty Getters and Setters
console.log("--- PROPERTY GETTERS AND SETTERS ---");

// There are two kinds of object properties.

// The first kind is 'data properties'. All properties used until now were data properties.

// The second type of properties is something new. 'Accessor properties' are essentially functions
// that execute on getting and setting a value, but look like regular properties to an external code.

// Getters and Setters
console.log();
console.log("--- GETTERS AND SETTERS ---");

// Accessor properties are represented by "getter" and "setter" methods.
// In an object literal they are denoted by "get" and "set":
let obj = {
  get propName() {
    // getter, the code executed on getting obj.propName
  },

  set propName(value) {
    // setter, the code executed on setting obj.propName = value
  },
};

// The getter works when "obj.propName" is read, the setter - when it is assigned.

// For instance, a "user" object with "name" and "surname":
let user = {
  name: "Finn",
  surname: "Mertens",
};

// Now a "fullName" property is wanted, that should be "Finn Mertens".
// This can be implemented as an accessor:
user = {
  name: "Finn",
  surname: "Mertens",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

console.log(user.fullName); // Finn Mertens

// From the outside, an accessor property looks like a regular one. That is the idea of accessor properties.
// "user.fullName" is not called as a function, it is read normally: the getter runs behind the scenes.

// As of now, "fullName" has only a getter. There will be an error when attempting to assign "user.fullName=":
user = {
  get fullName() {
    return `...`;
  },
};

user.fullName = "Test"; // Error (property has only a getter)

// It can be fixed by adding a setter for "user.fullName":
user = {
  name: "Finn",
  surname: "Mertens",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },
};

user.fullName = "Jake TheDog";

console.log(user.name); // Finn
console.log(user.surname); // Mertens

// As a result, a "virtual" property "fullName" is created. It is readable and writable.

// Accessor Descriptors
console.log();
console.log("--- ACCESSOR DESCRIPTORS ---");

// Descriptors for accessor properties are different from those for data properties.
