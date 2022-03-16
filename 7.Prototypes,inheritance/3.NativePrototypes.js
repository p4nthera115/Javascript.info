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

// Other built-in objects also work the same way. Even functions – they are objects of
// a built-in "Function" constructor, and their methods ("call"/"apply" and others)
// are taken from "Function.prototype". Functions have their own "toString" too.
function f() {}

console.log(f.__proto__ == Function.prototype); // true
console.log(f.__proto__.__proto__ == Object.prototype); // true, inherit from objects

// Primitives
console.log();
console.log("--- PRIMITIVES ---");

// The most intricate thing happens with strings, numbers and booleans.

// They are not objects. But when trying to access their properties, temporary wrapper objects
// are created using built-in constructors "String", "Number" and "Boolean".
// They provide the methods and disappear.

// These objects are created invisibly and most engines optimize them out, but the specification
// describes it exactly this way. Methods of these objects also reside in prototypes,
// available as "String.prototype", "Number.prototype" and "Boolean.prototype".

// Changing Native Prototypes
console.log();
console.log("--- CHANGING NATIVE PROTOTYPES ---");

// Native prototypes can be modified. For instance, a method is added to "String.prototype",
// it becomes available to all strings:
String.prototype.show = function () {
  console.log(this);
};

"BOOM!".show(); // BOOM!

// Adding new built-in methods to native prototypes is generally a bad idea.

//~ In modern programming, there is only one case where modifying native prototypes is approved. That is polyfilling.

// Polyfilling is a term for making a substitute for a method that exists in the JS specification,
// but is not yet supported by a particular JS engine.

// It may be implemented manually into the built-in prototype.
// For instance:
if (!String.prototype.repeat) {
  // if there is no such method
  // add it to the prototype

  String.prototype.repeat = function (n) {
    // repeat the string n times

    // actually, the code should be a little bit more complex than that
    // (the full algorithm is in the specification)
    // but even an imperfect polyfill is often considered good enough
    return new Array(n + 1).join(this);
  };
}
console.log("La".repeat(3)); // LaLaLa

// Borrowing From Prototypes
console.log();
console.log("--- BORROWING FROM PROTOTYPES ---");

// In the chapter "5. AdvancedWorkingWithFunctions/9.DecoratorsAndForwarding.js", method borrowing was talked about.
// That is when a method is taken from one object and copied into another.
// Some methods of native prototypes are often borrowed.

// For instance, if an array-like object is made, some "Array" methods may want to be copied to it:
obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};

obj.join = Array.prototype.join;

console.log(obj.join(" ")); // Hello world

// It works because the internal algorithm of the built-in "join" method
// only cares about the correct indexes and the "length" property. It does not check if
// the object is indeed an array. Many built-in methods are like that.

// Another possibility is to inherit by setting "obj.__proto__" to "Array.prototype",
// so all "Array" methods are automatically available in "obj".

// But that is impossible if "obj" already inherits from another object.
//~ Only one object can be inherited at a time.

// Borrowing methods is flexible, it allows to mix functionalities from different objects if needed.
