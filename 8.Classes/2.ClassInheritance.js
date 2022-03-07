// Class Inheritance
console.log("---- CLASS INHERITANCE ---");

// Class inheritance is a way for one class to extend another class.
// So new functionality can be created on top of the existing.

// The "extends" Keyword
console.log();
console.log('--- THE "extends" KEYWORD ---');

// Class "Animal":
let Animal = class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still.`);
  }
};

let animal = new Animal("My animal");

// Create another "class Rabbit".

// As rabbits are animals, "Rabbit" class should be based on "Animal", have access to animal methods,
// so that rabbits can do what "generic" animals can do.

// The syntax to extend another class is: "class Child extends Parent".

// Create "class Rabbit" that inherits from "Animal":
let Rabbit = class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }
};

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still.
rabbit.hide(); // White Rabbit hides!

// Object of "Rabbit" class have access both to "Rabbit" methods, such as "rabbit.hide()",
// and also to "Animal" methods, such as "rabbit.run()".

// Internally, "extends" keyword works using the good old prototype mechanics.
// It sets "Rabbit.prototype.[[Prototype]]" to "Animal.prototype".
// So, if a method is not found in "Rabbit.prototype", JS takes it from "Animal.prototype".

// For instance, to find "rabbit.run" method, the engine checks:
// 1. The "rabbit" object (has no "run").
// 2. Its prototype, hat is "Rabbit.prototype" (has "hide", but not "run").
// 3. Its prototype, that is (due to "extends") "Animal.prototype", that finally has the "run" method.

// Recalling from "7.Prototypes,inheritance/3.NativePrototypes.js",
// JS itself uses prototypal inheritance for built-in objects.
// E.g. "Date.prototype.[[Prototype]]" is "Object.prototype".
// That is why dates have access to generic object methods.

// Overriding a Method
console.log();
console.log("--- OVERRIDING A METHOD ---");

// By default, all methods that are not specified in "class Rabbit" are taken directly "as is" from "class Animal".
// But if a method is specified in "Rabbit", such as "stop()" then it will be used instead:
Rabbit = class Rabbit extends Animal {
  stop() {
    console.log("new stop");
  }
};
rabbit = new Rabbit("Black Rabbit");
rabbit.stop(); // new stop

// Usually a parent method is not wanted to be replaced completely,
// but rather to build on top of it to tweal or extend its functionality.

// Classes probide "super" keyword for that.
// • "super.method(...)" to call a parent method.
// • "super(...)" to cal a parent constructor (inside our constructor only).

// For instance, let the rabbit autohide when stopped:

Animal = class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still`);
  }
};

Rabbit = class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }

  stop() {
    super.stop(); // call parent stop
    this.hide(); // and then hide
  }
};

rabbit = new Rabbit("Green Rabbit");

rabbit.run(5); // Green Rabbit runs with speed 5.
rabbit.stop(); // Green Rabbit stands still. Green Rabbit hides!

// Now "Rabbit" has the "stop" method that calls the parent "super.stop()" in the process.

// Overriding constructor
console.log();
console.log("--- OVERRIDING CONSTRUCTOR ---");

// Until now, "Rabbit" did not have its own "constructor".

// According to the spec, if a class extends another class and has no "constuctor",
// then the following "empty" "constructor" is generated:
/*
    class Rabbit extends Animal {
      // generated for extending classes without own constructors
      constructor(...args) {
        super(...args);
      }
    };
*/

// It basically calls the parent "constructor" passing it all the arguments.
// That happens if no constructor is written.

// Add a custom constructor to "Rabbit". It will specify "earLength" in addition to "name":

Animal = class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
};

Rabbit = class Rabbit extends Animal {
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
};

// Doesn't work
// rabbit = new Rabbit("Orange Rabbit", 10);
// ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

// Constructors in inheriting classes must call "super(...)", and (!) do it before using "this".

// In JS. there is a distinction between a constructor function of an inheriting class ("derived constructor")
// and other functions. A derived constructor has a special internal property "[[ContstructorKind]]:"derived"".
// That is a special internal label.

// That label affects its behaviour with "new".
// • When a regular function is executed with "new" , it creates an empty object and assigns it to "this".
// • But when a derived constructor runs it, does not fo this. It expects the parent constructor to do this job.

// So a derived constructor must call "super" in order to execute its parent (base) constructor,
// otherwise the object for "this" will not be created and an error will occur.

// For the "Rabbit" constructor to work, it needs to call "super()" before using "this", like here:
Animal = class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
};

Rabbit = class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
};

rabbit = new Rabbit("Orange Rabbit", 10);
console.log(rabbit.name); // Orange Rabbit
console.log(rabbit.earLength); // 10

// Overriding class fields: a tricky note
console.log();
console.log("-- Overriding class fields: a tricky note --");

// Class fields can also be overridden.
// Although there is a tricky behaviour when accessing an overridden field in parent constructor,
// quite different from most other programming languages.
// Example:
Animal = class Animal {
  name = "animal";

  constructor() {
    console.log(this.name); // (*)
  }
};

Rabbit = class Rabbit extends Animal {
  name = "rabbit";
};

new Animal(); // animal
new Rabbit(); // animal

// Here, class "Rabbit" extends "Animal" and overrides the "name" field with its own value.

// There is no own constructor in "Rabbit", so "Animal" constructor is called.

// The "console.log" in the line (*) shows "animal".
// The parent constructor always uses its own field value not the overriden one.

// As seen earlier, when using methods, when the parent constructor is called in the derived class,
// it uses the overridden method.

// The difference is because of the field initialization order.
// The class field is initialized:
// • Before constructor for the base calss (that does not extend anything),
// • Immediately after "super()" for the derived class.

// In this case, "Rabbit" is the derived class. There is no "constructor()" in it.
// As said previously, that is the same as if there was an empty constructor with only "super(...args)".

// So, "new Rabbit()" calls "super()", this executing the parent constructor, and (per the rule for derived classes)
// only after that its class fields are initialized. 
// At the time of the parent constructor execution, there are no "Rabbit" class fields yet,
// that is why "Animal" fields are used.

// This subtle difference between fields and methods is specific to JS.

// Luckily, this behaviour only reveals itself if an overridden field is used in the parent constructor.
// If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.

// Super: internals, [[HomeObject]]
console.log();
console.log("--- SUPER: INTERNALS, [[HomeObject]] ---");

// ~~ Section is about the internal mechanisms behind the inheritance and "super". ~~