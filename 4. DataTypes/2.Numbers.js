// Numbers
console.log("--- NUMBERS ---");
// In modern JS there are two types of numbers:
// 1. Regular numbers in JS are stored in 64-bit format "IEEE-754", also known as "double pricision floating point numbers".
//    These are numbers that are being used most of the time.
// 2. Bigint numbers, to represent integers of arbitrary length.
//    They are sometimes needed, because a regular number cannot safely exceed "2**53" or be less than "-2**53"
//    As bigints are used in few special areas, there will be a special chapter devoted to them, "13. Miscellaneous/5.BigIng.js"

// More Ways to Write a Number
// Obvious way of writing 1 billion:
let billion = 1000000000;
// underscores "_" can be used as the seperator
billion = 1_000_000_000;
// The underscore makes the number more readable, JS engine ignores them
console.log(billion); // 1000000000

// A number can be shortened by appending the letter "e" to it and specifying the zeroes count
billion = 1e9; // 1 billion, literally: 1 and 9 zeroes
console.log(billion); // 1000000000
// "e" multiplies the number by "1" with the given zeroes count
console.log(1e3 === 1 * 1000); // true
console.log(1.23e6 === 1.23 * 1000000); // true

// Example of a very small number, 1 microsecond (one millionth of a second)
let ms = 0.000001;
ms = 1e-6; // six zeroes to the left from 1
// A negative number after "e" means a division by 1 with the given number of zeroes.
1e-3 === 1 / 1000; // 0.001
1.23 === 1.23 / 1000000; // 0.00000123

// Hex, Binary and Octal Numbers
console.log("");
console.log("--- HEX, BINARY AND OCTAL NUMBERS ---");
// Hexadecimal numbers are widely used in JS to represent colours, encode characters, and for many other things.
// There is a shorter way to write them: "0x" and then the number
console.log(0xff); // 255
console.log(0xFF); // 255 (case does not matter)
// Binary and octal numeral systems are rarely used, but have shorter ways to write them using the prefixes "0b" and "0o":
let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of
console.log(a == b); // true, the same number on both sides
// There are only 3 numeral systems with this support. For other numeral systems, the function "parseInt" should be used.

// toString(base)
console.log("");
console.log("--- toString(base) ---");
// The method "num.toString(base)" returns a string representation of "num" in the numeral system with the given "base"
let num = 255;
console.log(num.toString(16)); // ff (hex)
console.log(num.toString(2)); // 11111111 (binary)
// The "base" can vary from "2" to "36". By default it is "10"

// Common use cases for this are:
// • base = 16,
//   is used for hex colours, character encodings etc, digits can be "0..9" or "A..F"
// • base = 2,
//   mostly for debugging bitwise operations, digits can be "0" or "1"
// • base = 36,
//   is the maximum, digits can be "0..9" or "A..Z". The whole latin alphabet is used to represent a number.
//   A useful case for "36" is when turning a long numeric identifier into something shorter,
//   e.g. to make a short url. Can simply represent it in the numeral system with base "36":
console.log((123456).toString(36)); // 2n9c

// Rounding
console.log("");
console.log("--- ROUNDING ---");
// One of the most used operations when working with numbers is rounding.
// There are several built-in functions for rounding:
// • "Math.floor",
//   Rounds down: "3.1" becomes "3", and "-1.1" becomes "-2".
// • "Math.ceil",
//   Rounds up: "3.1" becomes "4", and "-1.1" becomes "-1".
// • "Math.round",
//   Round to the nearest integer: "3.2" becomes "3", "3.6" becomes "4", the middle case: "3.5" round up to "4" also
// • "Math.trunc" (not supported by Internet Explorer)
//   Removes anything after the decimal point without rounding: "3.1" becomes "3", "-1.1" becomes "1"

// These functions cover all possible ways to deal with decimal part of a number.

// There are two ways to rounf the number to the "n-th" digit after the decimal:
// 1. Multiply-and-divide
//    To round the number to the 2nd digit after the decimal, the number can be multiplied by "100" (or a bigger power of 10),
//    then call the rounding function and then divide back
num = 1.23456;
console.log(Math.round(num * 100) / 100); // 1.23456 -> 123.456 -> 123 -> 1.23
// 2. The method "toFixed(n)" rounds the number to "n" digits after the point and returns a string representation as the result
num = 12.34;
console.log(num.toFixed(1)); // "12.3"
//    This rounds up or down to the nearest value, similar to "Math.round" :
num = 12.36;
console.log(num.toFixed(1)); // "12.4"
//    Because the result of "toFixed" is a string, if the decimal part is shorter than required, zeroes are appended to the end
num = 12.34;
console.log(num.toFixed(5)); // "12.34000", added zeroes to make exactly 5 digits
//    Can convert to number using unary plus"+" or "Number()"
num = 12.34;
console.log(+num.toFixed(5)); // 12.34

// Imprecise calculations
console.log("");
console.log("--- IMPRECISE CALCULATIONS ---");
// Internally, a number is represented in 64-bit format (IEEE-754), to there are exactly 64 bits to store a number:
// 52 of them are used to store the digits, 11 of them store the position of the decimal point (they are zero for integer numbers),
// and 1 bit is for the sign.

// If a number is too big, it would overflow the 64-bit storage, potentially giving infinity:
console.log(1e500); // Infinity

// Tests: isFinite and isNaN
console.log("");
console.log("--- TESTS: isFinite AND isNaN ---");
// • "Infinity" (and "-Infinity") is a special numeric value that is greater (less) than anything
// • "NaN" represents an error

// They belong to the "number" type, but are not "normal" numbers, so there are special functions 
// to check for them:

// • "isNaN(value)" converts its argument to a number and then tests it for being "NaN"
console.log(isNaN(NaN)); // true
console.log(isNaN("str")); // true
//   "===" cannot be used instead as "NaN" is not equaled to anything, including itself:
console.log(NaN === NaN); // false

// • "isFinite(value)" converts its argument to a number and returns "true" if it is a regular number:
console.log(isFinite("15")); // true
console.log(isFinite("str")); // false, because a special value: NaN
console.log(isFinite(Infinity)); // false, because a special value: Infinity
// Sometimes "isFinite" is used to validate whether a string value is a regular number,
// as it will be true unless "Infinity", "-Infinity" or not a number

// There is a special built-in method "Object.is" that compares values like "===" but is more reliable for two edge cases:
// 1. It works with "NaN": "Object.is(NaN, NaN) === true"
// 2. Values "0" and "-0" are different: "Object.is(0, -0) === false"
// In all other cases "Object.is(a, b)" is the same as "a === b"

// parseInt and parseFloat
console.log("");
console.log("--- parseInt AND parseFloat");
// "parseInt" and "parseFloat" read a number from a string until they can't. The gathered number is returned.
// "parseInt" returns an integer
console.log(parseInt("100px")); // 100
console.log(parseInt("12.3")); // 12, only the integer part is returned
// "parseFloat" returns a floating-point number
console.log(parseFloat("12.5em")); // 12.5
console.log(parseFloat("12.3.4")); // 12.3, the second point stops the reading