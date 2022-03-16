// F.prototype
console.log("--- F.prototype ---");

// New objects can be created with a constructor function, like "new F()".

// If "F.prototype" is an object, then the "new" operator uses it to set "[[Prototype]]" for the new object.

//~ "F.prototype" here means a regular property named "prototype" on "F".
//~ It sounds something similar to the term "prototype", but here it is a regular property with this name.

// Example:
let animal = {
  eats: true,
};
let Rabbit = function Rabbit(name) {
  this.name = name;
};

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); // rabbit.__proto__ == animal

console.log(rabbit.eats); // true

// Setting "Rabbit.prototype = animal" literally states the following:
// "When a "new Rabbit" is created, assign its "[[Prototype]]" to "animal"".

// Default F.prototype, Constructor Property
console.log();
console.log("--- DEFAULT F.prototype, CONSTRUCTOR PROPERTY ---");

// Every function has the "prototype" property even if it is not supplied.

// The default "prototype" is an object with the only property "constructor"
// that points back to the function itself.
// Like this:
Rabbit = function Rabbit() {};

// default prototype
// Rabbit.prototype = { constructor: Rabbit };

// Check:
Rabbit = function Rabbit() {};
// by default:
// Rabbit.prototype = { constructor: Rabbit }
console.log(Rabbit.prototype.constructor == Rabbit); // true

// "constructor" property can be used to create a new object using the same constructor as existing one.
// Like here:
Rabbit = function Rabbit(name) {
  this.name = name;
  console.log(name);
};

let rabbit1 = new Rabbit("White Rabbit");
let rabbit2 = new rabbit.constructor("Black Rabbit");

// This is handy when needing to create an object the same kind as another,
// when not knowing which constructor was used for it (e.g. it comes from a 3rd party library).

// (Probably) the most important thing about "constructor" is that JS itself
// does not ensure the right "constructor" value.

// It exists in the default "prototype" for functions, but that is all.
// Anything that happens later is controlled by the dev.

// For instance:
Rabbit = function Rabbit() {};
Rabbit.prototype = {
  jumps: true,
};

rabbit = new Rabbit();
console.log(rabbit.constructor === Rabbit); // false

// So, to keep the right "constructor", properties can be added/removed
// to the default "prototype" instead of overwriting it is a whole:
Rabbit = function Rabbit() {};

// Not overwrite Rabbit.prototype totally
// just add to it
Rabbit.prototype.jumps = true;
// the default Rabbit.prototype.constructor is preserved

// Or, alternatively, recreate the "constructor" property manually:
Rabbit.prototype = {
  jumps: true,
  constructor: Rabbit,
};
// now constructor is also correct, because it was added manually
