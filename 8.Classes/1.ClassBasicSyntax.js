// Class Basic Syntax
console.log("--- CLASS BASIC SYNTAX ---");
console.log();
/* 
In object-oriented programming, a class is an extensible program-code-template for creating objects, 
providing initial values for state (member variables) 
and implementations of behavior (member functions or methods).
*/

// The "class" Syntax
console.log('--- THE "class" SYNTAX ---');

// Basic syntax:
/* 
    class MyClass {
        // class methods
        constructor() { ... }
        method1() { ... }
        method2() { ... }
        method3() { ... }
        ...
    }
*/
// Then use "new MyClass()" to create a new object with all the listed methods.
// The "constructor()" method is called automatically by "new", so the object can be initialized there.

// For example:

class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }
}

let user = new User("Finn");
user.sayHi();

// When "new User("Finn")" is called:
// 1. A new object is created.
// 2. The "constructor" runs with the given argument and assigns it to "this.name".
// Then object methods such as "user.sayHi()" can be called.

// What is a class?
console.log();
console.log("--- WHAT IS A CLASS? ---");

// In JavaScript, a class is a kind of function:

class User1 {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(this.name);
  }
}

console.log(`User1 is a ${typeof User1}`); // function

// "class User {...}" does:
// 1. Creates a function named "User", that becomes the result of the class declaration.
//    The function code is taken from the "constructor" method (assumed empty if no such method exists).
// 2. Stores class methods, such as "sayHi", in  "User.prototype".

// After "new User" object is created, when its method is called, it is taken from the prototype,
// just as described in the chapter "7.Prototypes,inheritance/2.F.prototype.js".
// So the object has access to class methods.

// The result of "class User" declaration:
class User2 {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(this.name);
  }
}

// class is a function
console.log(typeof User2); // function

// ...or, more precisely, the constructor method
console.log(User2 === User2.prototype.constructor); // true

// The methods are in User.protosype, e.g:
console.log(User.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

// Not Just a Syntactic Sugar
console.log();
console.log("--- NOT JUST A SYNTACTIC SUGAR ---");

// Sometimes people say that "class" is a "syntactic sugar"
// (syntax that is designed to make things easier to read, but does not introduce anything new),
// because the same thing could be declared without using the "class" keyword at all:
// rewriting class User in pure functions

// 1. Create constructor function
function User3(name) {
  this.name = name;
}
// a function prototype has "constructor" property by default,
// so it does not need to be created

// 2. Add the method to protorype
User3.prototype.sayHi = function () {
  console.log(this.name);
};

user = new User3("Jake");
user.sayHi();

// The result of this definition is about the same. So, there are indeed reasons why "class"
// can be considered a syntactic sugar to define a constructor together with its prototype methods.

// Still, there are important differeneces.
// 1. First, a function created by "class" is labelled by a special internal property "[[IsClassConstructor]]: true".
//    So it is not entirely the same as creating it manually.
//    The language checks for that propertu in a variety of places.
//    For example, unlike a regular function is must be called with "new":
class User4 {
  constructor() {}
}

console.log(typeof User4);
// User(); // TypeError: Class constructor User cannot be invoked without 'new'

//    Also, a string representation of a class constructor in most JS engines starts with the "class..."
console.log(User4); // class User4 { ... }

// 2. Class methods are non-enumerable. A class definition sets "enumerable" flag to "false"
//    for all methods in the "prototype".
//    This is good, because if "for..in" is used over an object, class methods are usually not wanted.

// 3. Classes always "use strict". All code inside the class construct is automatically in strict mode.

// Class Expression
console.log();
console.log("--- CLASS EXPRESSION ---");

// Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.
// Example of a class expression:
User = class {
  sayHi() {
    console.log("Hello");
  }
};
// Similar to Named Function Expressions, class expressions may have a name.

// If a class expression has a name, it is visible inside the class only:
// "Named Class Expression"
// (no such term in the spec, but that is similar to Named Function Expression)
User = class MyClass {
  sayHi() {
    console.log(MyClass); // MyClass name is visible only inside the class
  }
};

new User().sayHi(); // works, shows Myclass definition
// console.log(MyClass); // ReferenceError: MyClass is not defined, name isn't visible outside of the class

// Classes can be made dynamically "on-demand", like this:
function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

// Create a new class
User = makeClass("Hello");

new User().sayHi(); // Hello

// Getters/setters
console.log();
console.log("--- GETTERS/SETTERS ---");

// Just like literals objects, classes may include getters/setters, computed properties etc.
// Example for "user.name" implemented using "get/set":
class User5 {
  constructor(name) {
    // invoked the setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._name = value;
  }
}

user = new User5("Finn");
console.log(user.name); // Finn

user = new User5(""); // Name is too short.

// Technically, such class declaration works by creating getters and setters in "User.prototype".

// Computed Names [...]
console.log();
console.log("--- COMPUTED NAMES[...] ---");

// Example with a computed method name using brackets "[...]":
class User6 {
  ["say" + "Hi"]() {
    console.log("Hello");
  }
}
new User6().sayHi(); // Hello
// Such features are easy to remember, as they resemble that of literal objects.

// Class Fields
console.log();
console.log("--- CLASS FIELDS ---");

// ~ Old browsers may need a polyfill ~
// ~ Class fields are a recent addition to the language. ~

// Previously, classes only had methods.
// "Class fields" is a syntax that allows to add any properties.
// For instance, add "name" property to "class User":
class User7 {
  name = "Jake";

  sayHi() {
    console.log(`Hello, ${this.name}!`);
  }
}

new User7().sayHi(); // Hello, Jake!

// So, " = " is written in the declaration, and that's it.

// The important difference of class fields is that they are set on individual objects, not "User.prototype":
class User8 {
  name = "Finn";
}

user = new User8();
console.log(user.name); // Finn
console.log(User8.prototype.name); // undefined

// Values can also be assigned using more complex expressions and function calls.
// For example using "prompt".

// Making bound methods with class fields
console.log();
console.log("-- Making bound methods with class fields --");

// As demonstrated in the chapter "5.AdvancedWorkingWithFunctions/10.FunctionBinding.js"
// functions in JS have a dynamic "this". It depends on the context of the call.

// So if an object method is passed around and called in another context,
// "this" will not be a reference to its object any more.

// For instance, this code will show "undefined":
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    console.log(this.value);
  }
}

let button = new Button("hello");
setTimeout(button.click, 1000); // undefined

// The problem is called "losing "this" ".

// There are two approaches to fixing it,
// as discussed in the chapter "5.AdvancedWorkingWithFunctions/10.FunctionBinding.js":
// 1. Pass a wrapper-function, such as "setTimeout(() => button.click(), 1000)".
// 2. Bind the method to object, e.g. in the constructor.

// Class fields provide another, quite elegant syntax:
class Button2 {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    console.log(this.value);
  };
}

button = new Button2("hello");
setTimeout(button.click, 1000); // hello

// The class field "click = () => {...}" is created on a per-object basis,
// there is a seperate funciton for each "Button" object, with "this" inside it referencing that object.
// "button.click" can be passed around anywhere and the value of "this" will always be correct.

// That is especially useful in browser environent, for event listeners.
