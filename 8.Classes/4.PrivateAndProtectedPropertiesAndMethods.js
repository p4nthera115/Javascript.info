// Private and Protected Properties and Methods
console.log("--- PRIVATE AND PROTECTED PROPERTIES AND METHODS ---");

// One of the most important principles of object oriented programming -
// delimiting internal interface from the external one.

// This is "a must" practice in developing anything more complex than a "hello world" app.

// Internal and External Interface
console.log();
console.log("--- INTERNAL AND EXTERNAL INTERFACE ---");

// In object-oriented programming, properties and methods are split into two groups:
// • 'Internal interface' - methods and properties,
//   accessible from other methods of the class, but not from the outside.
// • 'External interface' - methods and properties,
//   accessible also from outside of the class.

// In JS, there are two types of object fields (properties and methods):
// • Public: accessible from anywhere. They comprise the external interface.
//   Until now, only public properties and methods have been used.
// • Private: accessible only from inside the class. These are for the internal interface.

// In many other languages there also exist "protected" fields:
// accessible only from inside the class and those extending it
// (like private, but plus access from inheriting classes).
// They are also useful for the internal interface.
// They are in a sense more widespread than private ones,
// because access to them are usually wanted for inheriting classes.

// Protected fields are not implemented in JS on the language level,
// but in practice they are very convenient, so they are emulated.

// Protecting "waterAmount"
console.log();
console.log('--- PROTECTING "waterAmount" ---');

let CoffeeMachine = class CoffeeMachine {
  waterAmount = 0; // the amount of water inside

  constructor(power) {
    this.power = power;
    console.log(`Created a coffee-machine, power: ${power}`);
  }
};

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = 200;

// Right now the properties "waterAmount" and "power" are public.
// They can be easily get/set from the outside to any value.

// Change "waterAmount" property to protected to have more control.
// For instance, so that it cannot be set below zero.

// ~ Protected properties are usually prefixed with an underscore "_". ~
// This is not enforced on a language level, but there is a well-known convention
// between programmers that such properties and methods should mnot be accessed from the outside.

// So, property will be called "_waterAmount":

CoffeeMachine = class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }
};

// create the coffee machine
coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10

console.log(coffeeMachine.waterAmount); // 0

// Read-only "power"
console.log();
console.log('--- READ-ONLY "power" ---');

// Make "power" property, read-only.
// It sometimes happens that a property must be set at creation time only, and then never modified.

// That is exactly the case for the coffee machine example: the power never changes.

// To do this, only getter needs to be made, not setter:
CoffeeMachine = class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }
};

// create the coffee machine
coffeeMachine = new CoffeeMachine(100);

console.log(`Power is: ${coffeeMachine.power}W`);

coffeeMachine.power = 25; // Power is: 100W

// NOTE - Getter/setter functions
// Most of the time "get.../set..." functions are preferred over the getter/setter syntax used above.
// Like this:
CoffeeMachine = class CoffeeMachine {
  _waterAmount = 0;

  setWaterAmount(value) {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  getWaterAmount() {
    return this._waterAmount;
  }
};

new CoffeeMachine().setWaterAmount(100);
// Although this looks a bit longer, functions are more flexible.
// They can have multiple arguments (even if they are not used at the time).

// On the other hand, get/set syntax is shorter, so it comes down to personal preference.

// Private "#waterLimit"
console.log();
console.log('--- PRIVATE "#waterLimit" ---');

// ~~ Recent addition to the language ~~
// ~~ Requires polyfilling ~~

// There is a finished JS proposal, almost in the standard, that provides language-level
// support for private properties and methods.

// Privates should start with "#". They are only accessible from inside the class.

// For instance, here is a private "#waterLimit" property and the
// water-checking private method "#fixWaterAmount":
CoffeeMachine = class CoffeeMachine {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }
};

coffeeMachine = new CoffeeMachine();

// cannot access privates from outside of the class
// coffeeMachine.#fixWaterAMount(123); // Error
// coffeeMachine.#waterLimit = 1000; // Error

// On the language level, "#" is a special sign that the field is private.
// There can be both private "#waterAmount" and public "waterAmount" fields at the same time.

// For instance, here is a "waterAmount", an accessor for "#waterAmount":

CoffeeMachine = class CoffeeMachine {
  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
};

let machine = new CoffeeMachine();

machine.waterAmount = 100;
// console.log(machine.#waterAmount); // Error

// Unlike protected ones, private fields are enforced by the language itself.

// Inheriting classes from "CoffeeMAchine", have no direct access to "#waterAmount".
// The "waterAmount" getter/setter will need to be used.

class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    // console.log(this.#waterAmount); // Error
  }
}

// In many scenarios such limitation is too severe.
// If a "CoffeeMachine" is extended, there may be legitimate reason to access its internals.
// That is why protected fields are used more often, even though they are not supported by the language syntax.
