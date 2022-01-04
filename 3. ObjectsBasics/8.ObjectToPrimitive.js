// Object to Primitive Conversion
console.log("--- OBJECT TO PRIMITIVE CONVERSION ---");
// JS does not allow customization of how operators work on objects
// Unlike other languages, such as Ruby or C++, special object methods cannot be implemented
// to handle things like an addition (or other operators)

// In case of such operations, objects are auto-converted to primitives, and then the operation is carried out
// The results are also primitive values
// This is an important limitation, as the result of something like "obj1 + obj2" cannot be another object

// Conversion Rules
console.log("--- CONVERSION RULES ---");
// In "1. Fundamentals/7.TypeConversions.js" the rules for numeric, string and boolean conversions of primitives were covered
// 1. All objects are "true" in a boolean context. There are only numeric and string conversions.
// 2. The numeric conversion happens when subtracting or applying mathematical functions to objects
//    For instance, "Date" objects (refer to "5. DataTypes/11.DateAndTime.js") can be subtracted,
//    and the result of "date1 - date2" is the time difference between the two objects.
// 3. String conversion usually happens when outputting an object like "alert(obj)"

// String and numeric conversions can be fine-tined using special object methods

// There are three variants of type conversion, that happen in various situations
// They are called "hints" in the ECMA spec:
// • "string"
//   For object-to-string conversion, when doing an operation on an object that expects a string:
//   alert (obj); // output
//   anotherObj[obj] = 123; // using object as a property key

// • "number"
//   For an object-to-number conversion, like when doing maths:
// (DEFINING EMPTY VARIABLES FOR EXAMPLE)
// explicit conversion
let obj;
let num = Number(obj);

// maths (except binary plus)
let date1;
let date2;
let n = +obj; // unary plus
let delta = date1 - date2;

// less/greater comparison
let user1;
let user2;
let greater = user1 > user2;

// • "default"
//   Occurs in rare cases when the operator is "not sure" what type to expect
//   For instance, binary plus "+" can work both with strings (concatenation) and numbers (addition)
//   So if a binary plus "+" gets an object as an argument, it uses the "default" hint to convert it
//   If an object is compared using "==" with a string, number or symbol, it is also unclear which
//   conversion should be done, so the "default" hint is used
let obj1;
let obj2;
let total = obj1 + obj2; // binary plus uses the "default" hint

let user;
if (user == 1) {
} // obj == number uses the "default" hint

// < and > work with both strings and numbers, although they still use the "number" hint not "default"

// To clarify, there are only 3 hints, there is no "boolean" hint

// To do these conversions, JS tries to find and call three object methods:
// 1. Call "obj[Symbol.toPrimitive](hint)" - the method with the symbolic key "Symbol.toPrimitive", if the method exists
// 2. Otherwise if hint "string"
//      • try "obj.toString()" and "obj.valueOf()", which ever exists
// 3. Otherwise if hint is "number" or "default"
//      • try "obj.valueOf()" and "obj.toString()", which ever exists

// Symbol.toPrimitive
console.log("");
console.log("--- Symbol.toPrimitive ---");
// There is a built-in symbol named "Symbol.toPrimitive" that is used to name the conversion method:
/*
    obj[Symbol.toPrimitive] = function(hint) {
        // code that converts this object to primitive
        // must return a primitive value
        // "hint" = one of "string", "number", "default"
    };
*/
// If the method for "Symbol.toPrimitive" exists in the code, it's used for all hints and no more methods are needed
// For instance, here "user" object implements it:
user = {
  name: "Finn",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    console.log(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  },
};

console.log(user); // when in DOM (e.g. "alert()"), hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500

// here, "user" object becomes a self-descriptive string or a money amount depending on the conversion
// the single method "user[Symbol.toPrimitive]" handles all conversion cases

// toString/valueOf
console.log("");
console.log("--- toString/valueOf ---");
// If there is no "Symbol.toPrimitive" then JS tries to find methods "toString" and "valueOf":

// • for the "string" hint: "toString", and if it does not exist, then "valueOf"
//   ("toString" has the priority for string conversion).
// • for other hints: "valueOf", and if it does not exist, then "toString"
//   ("valueOf" has the priority for maths).

// The methods "toString" and "valueOf" are not symbols and come from ancient times, they are "regular" string-named methods
// These methods must return a primitive value. If either return an object, it is ignored (as if there were no method)

// By default, a plain object has following "toString" and "valueOf" methods:
// • "toString" returns a string "[object Object]".
// "valueOf" returns the object itself

user = { name: "Jake" };

console.log(user); // when in DOM (e.g. "alert()"), [object Object]
console.log(user.valueOf() === user); // true

// If object is used as a string, then by default it returns "[object Object]"
// The default "valueOf" is mentioned only for the sake of completeness. It returns the object itself, and so is ignored.
console.log("");
user = {
  name: "Finn",
  money: 1000,

  // for hint = "string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint = "number" or "default"
  valueOf() {
    return this.money;
  },
};

console.log(user); // when in DOM (e.g. "alert()"), toString -> {name: "Finn"}
console.log(+user); // valueOf -> 1000
console.log(user + 500); // valueOf -> 1500
// same behaviour as previous example with "Symbol.toPrimitive"

// Often a single "catch-all" place is wanted to handle all primitive conversions.
// in this case "toString" can be implemented

user = {
  name: "Finn",

  toString() {
    return this.name;
  },
};

console.log(user); // when in DOM (e.g. "alert()"), toString -> Finn
console.log(user + 500); // toString -> John500

// A Conversion Can Return Any Primitive Type
// All primitive-conversion methods do not necessarily return the "hinted" primitive.
// There is no control whether "toString" returns exactly a string, or whether "Symbol.toPrimitive"
// method returns a number for a hint "number"
// The only mandatory: these methods must return a primitive, not an object

// Because they are ancient, "toString" and "valueOf" do not give an error if they return an object
// this is because there was no "error" concept back then, instead the value is ignored as stated above
// (as if the method did not exist)
// "Symbol.toPrimitive" however, must return a primitive, otherwise there will be an error

// Further Conversions
console.log("");
console.log("--- FURTHER CONVERSIONS ---");
// Many operators and functions perform type conversions, e.g. multiplication "*" converts operands to numbers

// If an object is passed as an argument, there are two stages:
// 1. The object is converted to a primitive (using the rules described above)
// 2. If the resulting primitive is not of the correct type, it is converted
obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  },
};

console.log(obj * 2); // 4, object converted to primitive "2", then "*" made it a number

// Binary plus will concatenate strings in the same situation
obj = {
  toString() {
    return "2";
  },
};

console.log(obj + 2); // 22, ("2" + 2), conversion to primitive returns string => concatenation
