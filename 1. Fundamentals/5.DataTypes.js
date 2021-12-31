const header = document.querySelector("h1");
header.innerText = "Data Types";

// Data Types

// Numbers
const num = "--- NUMBERS ---";
console.log(num);

// Infinity
console.log(Infinity);
console.log(1 / 0);

// NaN - Not a Number
console.log("hello" * 2);

// BigInt
// represents numbers greater than (2^53-1) (that’s 9007199254740991), or less than -(253-1)

// String
const str = "--- STRINGS ---";
console.log(str);

// must be surrounded by quotes ("", '', ``)

// "", '' are "simple" quotes
// `` allows splitting string into multiple lines
// `` are "extended functionality" quotes
// `` allows embedding variables and expressions into ${...}
// embed variable
const name = "Finn";
console.log(`Hello, ${name}!`);
// embed expression
console.log(`the result is ${1 + 2}`);

// Booleans
const bool = "--- BOOLEANS ---";
console.log(bool);

// true or false
const nameFieldChecked = true;
const ageFieldChecked = false;
console.log(nameFieldChecked, ageFieldChecked);

const isGreater = 4 > 1;
console.log(isGreater);

// Null and Undefined 

// null is explicitly defined and represents "nothing", "empty" or "value unknown"
/*
    const age = null;
*/
// undefined is when a value is not assigned
/*
    const address = ;
*/

// Objects 
// all other types are "primitive" as they can only hold a single value, objects can hold multiple
// refer to 3. Objects: The Basics/1.Objects.js

// typeof operator
// typeof returns the type of argument
typeof 0
typeof "ooo"
// typeof null returns object, an error kept for compatibility 

