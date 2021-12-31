// Object methods, "this"
console.log("--- OBJECT METHODS ---");
// Objects are usually created to represent entities of the real world, like users and orders
let user = {
  name: "Finn",
  age: 16,
};
// in the real world a user can "act", actions are represented by functions in properties

// Method Examples
console.log("");
console.log("--- METHOD EXAMPLES ---");
// teach "user" to say hello
user.sayHi = function () {
  console.log("Hey!");
};

user.sayHi();
// created function expression and assigned to property "user.sayHi" of "user" object
console.log(user);
// a function that is a property of an object is called its "method"
// "sayHi" is a method of "user" object

// a pre-declared function can also be used as a method
function sayHi1() {
  console.log("yo");
}

user.sayHi1 = sayHi1;
user.sayHi1();

console.log(user);

// Method Shorthand
console.log("");
// shorter syntax for methods in object literals
user = {
  sayHi: function () {
    console.log("hello");
  },
};
console.log(user);

user = {
  sayHi() {
    console.log("hey");
  },
};
console.log(user);

// "this" in Methods
console.log("");
console.log('--- "this" IN METHODS ---');
// to access an object, a method can use the "this" keyword
user = {
  name: "Finn",
  age: 16,

  sayHi() {
    console.log(this.name);
  },
};
user.sayHi();
// object is also accessible referencing it via the outer variable "user"
user = {
  name: "Jake",
  age: 28,
  sayHi() {
    console.log(user.name);
  },
};
user.sayHi();
// but this is unreliable as it will cause an error if the outer variable is reassigned
let admin = user;
user = null;
// admin.sayHi(); // TypeError: Cannot read property 'name' of null
// using "this.name" instead of "user.name" will work
user = {
  name: "Jake",
  age: 28,
  sayHi() {
    console.log(this.name);
  },
};

admin = user;
user = null;
admin.sayHi();

// "this" is not bound
console.log("");
// "this" can be user in a function, even if it is not a method of an object
function sayHi() {
  console.log(this.name);
}
sayHi();
// shows no error but undefined
// "this" can also be called in a function without an object at all
function sayHi1() {
  console.log(this);
}
sayHi1();
// shows no error but undefined

// The value of "this" is evaluated during the run-time, depending on the context
// Here the same function is assigned to two different objects
user = { name: "Finn" };
admin = { name: "Glob" };

function sayHi1() {
  console.log(this.name);
}

user.f = sayHi1;
admin.f = sayHi1;

user.f();
admin.f();
// if "obj.f()" is called, the "this" is localised to the "obj" object during the call of the "f" function
// so in the example above, it is either the object "user" or "admin"

// Arrow Function Have No "this"
console.log("");
// Arrow functions do not have their "own" 'this'.
// If "this" is referenced from an arrow function, it is taken from the outer "normal" function.
user = {
  firstName: "Jake",
  sayHi() {
    let arrow = () => console.log(this.firstName);
    arrow();
  },
};
user.sayHi();
// If there is no "normal" outer function, it returns undefined
user = {
  firstName: "Jake",
  arrow: () => {
    console.log(this.firstName);
  },
};
user.arrow();

console.log("");

// Task
let calculator = {
  sum() {
    return `The sum is ${this.value1 + this.value2}`;
  },
  mul() {
    return `The product is ${this.value1 * this.value2}`;
  },
  read() {
    this.value1 = +prompt("Enter a number", "");
    this.value2 = +prompt("Enter a number", "");
  },
};

// calculator.read();
// alert(calculator.sum());
// alert(calculator.mul());
