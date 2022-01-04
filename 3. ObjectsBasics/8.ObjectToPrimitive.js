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
