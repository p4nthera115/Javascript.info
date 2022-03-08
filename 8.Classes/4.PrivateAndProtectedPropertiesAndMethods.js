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
