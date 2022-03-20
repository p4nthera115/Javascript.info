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
// For accessor properties, there is no "value" or "writable", but instead there are "get" and "set" functions.

// An accessor descriptor may have:
// • "get" - a function without arguments, that works when a property is read,
// • "set" - a function with one argument, that is called when the property is set,
// • "enumerable" - same as for data properties,
// • "configurable" - same as for data properties.

// For instance, to create an accessor "fullName" with "defineProperty", pass a descriptor with "get" and "set":
user = {
  name: "Finn",
  surname: "Mertens",
};

Object.defineProperty(user, "fullName", {
  get() {
    return `${this.name} ${this.surname}`;
  },
  set(value) {
    [this.name, this.surname] = value.split(" ");
  },
});

console.log(user.fullName);

for (let key in user) console.log(key);

//~ A property can be either an accessor (has "get/set" methods) or a data property (has a "value"),
//~ supplying both will result in an error.

// Smarter getters/setters
console.log();
console.log("--- SMARTER GETTERS/SETTERS ---");

// Getters/setters can be used as wrappers over "real" property values to gain more control
// over operations with them.

// For instance, to forbid names that are too short for "user",
// a setter "name" can be made and the value can be kept in a seperate property "_name":
user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  },
};

user.name = "Finn";
console.log(user.name);

user.name = "";

// So, the name is stored in "_name" property, and the access is done via getter and setter.

// Techinically, external code is able to access the name directly by using "user._name".
// But there is a widely known convention that properties starting with an unserscore "_"
// are internal and should not be touched from outside the object.

// Using for compatibililty
console.log();
console.log("--- USING FOR COMPAITIBILITY ---");

// One of the great uses of sccessors is that they allow to take control over a "regular"
// data property at any moment by replacing it with a getter and a setter and tweak its behaviour.

// Example:
// User objects are being implemented with data properties "name" and "age":
let User = function User(name, age) {
  this.name = name;
  this.age = age;
};

let finn = new User("Finn", 17);
console.log(finn.age);

// Later, it is decided to store "birthday" instead of "age", because it is more precise and convenient:
User = function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
};

finn = new User("Finn", new Date(985, 3, 14));

// Adding a getter for "age" property solves the problem of having to remove it from old code:
User = function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    },
  });
};

let asad = new User("Asad", new Date(2000, 9, 6));

console.log(asad.birthday);
console.log(asad.age);

// Now the old works too and now there is a nice additional property.
