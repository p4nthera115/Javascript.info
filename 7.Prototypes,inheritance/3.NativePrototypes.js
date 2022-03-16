// Native Prototypes
console.log("--- NATIVE PROTOTYPES ---");

// The "prototype" property is widely used by the of JavaScript itself.
// All built-in constructor functions use it.

// Object.prototype
console.log();
console.log("--- Object.prototype ---");

// Output an empty object:
let obj = {};
console.log(obj); // {}

// The short notation "obj = {}" is the same as "obj = new Object()",
// where "Object" is a built-in object constructor function, with its own "prototype"
// referencing a huge object with "toString" and other methods.

// When "new Object()" is called (or a literal object "{...}" is created), the "[[Prototype]]"
// of it is set to "Object.prototype" according to the rule that was stated in the previous chapter.

// So then when "obj.toString()" is called the method is taken from "Object.prototype".
// It can be checked like this:
obj = {};

console.log(obj.__proto__ === Object.prototype); // true

console.log(obj.toString === obj.__proto__.toString); // true
console.log(obj.toString === Object.prototype.toString); // true

//~ There is no more "[[Prototype]]" in the chain above "Object.prototype":
console.log(Object.prototype.__proto__); // null

// Other built-in Prototypes
console.log();
console.log("--- OTHER BUILT-IN PROTOTYPES ---");

// Other built-in objects such as "Array", "Date", "Function" and others also keep methods in prototypes.

// For instance, when an array is created "[1, 2, 3]", the default "new Array()"
// constructor is used internally. So "Array.prototype" becomes its prototype and provides methods.
// This is very memory-efficient.

// By specification, all of the built- in prototypes have "Object.prototype" at the top.
// This is why some people say that "everything inherits from objets".

// Check prototypes manually:
let arr = [1, 2, 3];

// it inherits from Array.prototype
console.log(arr.__proto__ === Array.prototype); //true

// then from Object.prototype
console.log(arr.__proto__.__proto__ === Object.prototype); // true

// and null on the top
console.log(arr.__proto__.__proto__.__proto__); // null

// Some methods in prototypes may overlap, for instance, "Array.prototype"
// has its own "toString" that lists comma-delimited elements:
arr = [1, 2, 3];
console.log(arr); // 1,2,3 <-- the result of Array.prototype.toString

// As seen before, "Object.prototype" has "toString" as well, but "Array.prototype"
// is closer in the chain, so the array variant is used.

