// Methods of Primitives
console.log("--- METHODS OF PRIMITIVES ---");
// JS allows to work with primitives as if they were objects

// A primitive:
// • Is a value of a primitive type.
// • There are 7 primitive types: "string", "number", "bigint", "boolean", "symbol", "null" and "undefined".

// An object:
// • Is capable of storing values as properties.
// • Can be created with "{}", for instance: { name: "Finn", age: 16 }.
//   There are other kinds of objects in JS: functions, for example are objects.

// Functions can be stored as properties within an object, making it a "method"
let LSP = {
  name: "LSP",
  sayOmg: function () {
    console.log("Oh my GLob");
  },
};

LSP.sayOmg(); // Oh my Glob

// Many built-in objects already exist, such as those that work with dates, errors, HTML elements, etc.
// Objects are "heavier" than primitives. They require additional resources to support internal machinery.

// A Primitive as an Object
console.log("");
console.log("--- PRIMITIVE AS AN OBJECT ---");

// There are many things one would want to do with a primitive like a string or a number.
// It would be great to access them using methods, but Primitives must be as fast and lightweight as possible.

// The solution to this looks a bit awkward:
// 1. Primitives are still primitive. A single value as desired.
// 2. The language allows access to methods and properties of strings, numbers, booleans and symbols.
// 3. In order for that to work, a special "object wrapper" that provides the extra functionality is created, and then is destroyed.

// "Object wrappers" are different for each primitive type and are calles:
// "String", "Number", "Boolean", "Symbol", and "BigInt".

// For instance, there exists a string method "str.toUpperCase()" that returns a capitalized "str"
let str = "Bing bong";
console.log(str.toUpperCase()); // BING BONG

// This is what is happening in "str.toUpperCase()":
// 1. The string "str" is a primitive. So in the moment of accessing its property, a special object is created that knows the value of the string,
//    and has useful methods, like "toUpperCase()".
// 2. That method runs and returns a new string (shown by "console.log")
// 3. The special object is destroyed, leaving the primitive "str" alone

// So primitives can provide methods, but still remain lightweight.

// A number has its own methods like "toFixed(n)", which rounds the number to the given precision
let n = 3.1415926535;
console.log(n.toFixed(4)); // 3.1416
// More specific methods will be covered in "4. DataTypes/2.Numbers.js" and "4. DataTypes/3.String.js"

// "null"/"undefined" have no methods, they have no corresponding "wrapper objects".
// they are "the most primitive"

// "Wrapper objects" for primitives can be creating using a syntax like "new Number(1)" or "new Boolean(false)"
// But this is highly unrecommended as things will go crazy in several places
// Some languages like Java allow this 
// e.g.
console.log(typeof 0); // number
console.log(typeof new Number(0)); // object?!
// Objects are always truthy in "if"
let zero = new Number(0);
if (zero) {
  // zero is true, because it is an object
  console.log("zero is truthy?!");
}
// using these functions without "new" is useful as they convert values to their corresponding types
