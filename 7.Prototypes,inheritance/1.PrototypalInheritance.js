// Prototypal Inheritance
console.log("--- PROTOTYPAL INHERITANCE ---");

// Prototypal inheritance is a language feature that helps in extending an object.

// [[Prototype]]
console.log();
console.log("--- [[Prototype]] ---");

// In Js, objects have a special hidden property "[[Prototype]]",
// that is either "null" or references another object. That object is called "a prototype".

// When reading a property from "object", and it is missing, JS automatically takes it from the prototype.
// In programming, this is called "prototypal inheritance".

// The property "[[Prototype]]" is internal and hidden, but there are many ways to set it.
// One of them is to use the special name "__proto__":
let animal = {
  eats: true,
};
let rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

// Now when reading a property from "rabbit", and it is missing, JS will automatically take it from "animal".
// For intance:
animal = {
  eats: true,
};
rabbit = {
  jumps: true,
};

rabbit.__proto__ = animal; // (*)

// both properties can now be found in rabbit:
console.log(rabbit.eats); // true (**)
console.log(rabbit.jumps); // true

// Here the line "(*)" sets "animal" to be the prototype of "rabbit".

// Then, when "console.log" tries to read property "rabbit.eats" "(**)", it is not in "rabbit",
// so JS follows the "[[Prototype]]" reference and finds it in "animal".
// ' "animal" is the prototype of "rabbit" ' or ' "rabbit" prototypically inherits from "animal" '.

// So if "animal" has a lot of useful properties and methods, they they become automatically available in "rabbit".
// Such properties are called "inherited".

// A method in "animal", can be called on "rabbit":
animal = {
  eats: true,
  walk() {
    console.log(`${this.name} walks`);
  },
};
rabbit = {
  name: "Rabbit",
  jumps: true,
  __proto__: animal,
};

// walk is taken from the prototype
rabbit.walk(); // Rabbit walks

// The prototype chain can be longer:
animal = {
  eats: true,
  walk() {
    console.log(`${this.name} walks`);
  },
};
rabbit = {
  name: "Rabbit",
  jumps: true,
  __proto__: animal,
};
let longEar = {
  earLength: 10,
  __proto__: rabbit,
};

// walk is taken from the prototype chain
longEar.walk(); // Rabbit walks
console.log(longEar.jumps); // true (from rabbit)

// Now if a property is read from "longEar", and it is missing, JS will look for it in "rabbit", and then in "animal".

// There are only two limitations:
// 1. The references can not go in circles. JS will throw an error if "__proto__" is assigned in a circle.
// 2. The value of "__proto__" can be either an object or "null". Other types are ignored.

// There can be only one "[[Prototype]]", an object may not inherit from two others.

// Writing Doesn't Use Prototype
console.log();
console.log("--- WRITING DOESN'T USE PROTOTYPE ---");

// The prototype is only used for reading propterties.
// Write/delete operations work directly with the object.

// In the example below, "rabbit" is assigned its own "walk" method:
animal = {
  eats: true,
  walk() {
    // this method will not be used by rabbit
  },
};
rabbit = {
  __proto__: animal,
};

rabbit.walk = function () {
  console.log("Rabbit! Bounce-bounce!");
};

rabbit.walk(); // Rabbit! Bounce-bounce!

// From now on, "rabbit.walk()" call finds the method immediately in the object
// and executes it, without using the prototype.

// Accessor properties are an exception, as assignment is handled by a setter function.
// So writing to such a property is actually the same as calling a function.

// For that reason "admin.fullName" works correctly in the code below:
let user = {
  name: "Finn",
  surname: "Mertens",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  },
};

let admin = {
  __proto__: user,
  isAdmin: true,
};

console.log(admin.fullName); // Finn Mertens (*)

// setter triggers
admin.fullName = "Jake TheDog"; // (**)

console.log(admin.fullName); // Jake TheDog, state of admin modified
console.log(user.fullName); // Finn Mertens, state of user protected

// Here in the line "(*)" the property "admin.fullName" has a getter in the prototype "user", so it is called.
// And in the line "(**)" the property has a setter in the prototype, so it is called.

// The Value of "this"
console.log();
console.log('--- THE VALUE OF "this" --- ');

// "this" is not affected by prototypes at all.
// No matter where the method is found: in an object or its prototype.
// In a method call, "this" is always the object before the dot.

// So, the setter call "admin.fullName=" uses "admin" as "this", not "user".

// This is actually super important, because when dealing with a big object with many methods and many inherited objects,
// the inherited objects will only modify their own states when running the inherited methods,
// not the state of the big object.

// For instance, here "animal" represents a "method storage", and "rabbit" makes use of it.

// The call "rabbit.sleep()" sets "this.tisSleeping" on the "rabbit" object:
// animal has methods
animal = {
  walk() {
    if (!this.isSleeping) {
      console.log("I walk");
    }
  },
  sleep() {
    this.isSleeping = true;
  },
};
rabbit = {
  name: "White Rabbit",
  __proto__: animal,
};

// modifies rabbit.isSleeping
rabbit.sleep();

console.log(rabbit.isSleeping); // true
console.log(animal.isSleeping); // undefined (no such property in the prototype)

// If there were other objects, like "bird", "snake", etc., inheriting from "animal",
// they would also gain access to methods of "animal". But "this" in each method call
// would be the corresponding object, evaluated at the call-time (before dot), not "animal".
// So when writing data into "this", it is stored into these object.

// As a result, methods are shared, but the object state is not.

// for...in Loop
console.log();
console.log("--- for...in LOOP ---");

// The "for..in" loop iterates over inherited properties too.
// For instance:
animal = {
  eats: true,
};

rabbit = {
  jumps: true,
  __proto__: animal,
};

// Object.keys only return own keys
console.log(Object.keys(rabbit)); // jumps

// for..in loops over both own and inherited keys
for (let prop in rabbit) console.log(prop); // jumps, then eats

// If that is not what is wanted, and inherited properties are to be excluded, there is a built-in method
// "obj.hasOwnProperty(key)": it returns "true" if "obj" has its own (not inherited) property names "key".

// So inherited properties can be filtered out:
animal = {
  eats: true,
};
rabbit = {
  jumps: true,
  __proto__: animal,
};

for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    console.log(`Our: ${prop}`); // Our: jumps
  } else {
    console.log(`Inherited: ${prop}`); // Inherited: eats
  }
}

// Inheritance chain:
// "rabbit" inherits from "animal", that inherits from "Object.prototype"
// (because "animal" is a literal object "{...}", so it is by default),
// and then "null" above it.

// "hasOwnProperty" does not appear in the "for..in" loop because it is not enumerable.
// It has "enumerable:false" flag, and "for..in" only lists enumerable properties.
