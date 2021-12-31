const header = document.querySelector("h1");
header.innerText = "Type Conversions";

// String conversion
const strconv = "--- STRING CONVERSION ---";
console.log(strconv);

// converts value to string

let value = 21;
console.log(typeof value);

value = String(value);
console.log(typeof value);

// Numeric conversion
const numconv = "--- NUMERIC CONVERSIONS ---";
console.log(numconv);

// converts value to number, if value is not a valid number, NaN will show
const str = "115";
console.log(typeof str);

const num = Number(str);
console.log(typeof num);

// numeric conversions happen in mathematical functions and expressions automatically
console.log("6" / "2");

// true and false = 1 and 0 respectively

// numeric conversion rules
console.log(Number("   123   ")); // 123
console.log(Number("123z")); // NaN (error reading a number at "z")
console.log(Number(true)); // 1
console.log(Number(false)); // 0

// null becomes 0, undefined becomes NaN

// Boolean conversion
const boolcon = "--- BOOLEAN CONVERSION ---";
console.log(boolcon);

// converts value to true or false
// values that are "empty" (0, empty string, null, undefined and NaN) are falsy
// other values are truthy

console.log(Boolean(1)); // can be any number, positive or negative
console.log(Boolean(0));
console.log(Boolean("str"));
console.log(Boolean(""));
