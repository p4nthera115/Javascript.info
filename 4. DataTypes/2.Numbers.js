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
// The method "num.toString(base)" returns a string representation of "num" in the numeral system with the giveb "base"
