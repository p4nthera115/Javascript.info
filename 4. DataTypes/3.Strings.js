// Strings
console.log("--- STRINGS ---");
// In JS, textual data is always stored as strings.
// UTF-16 is the internal format.

// Quotes
console.log("");
console.log("--- QUOTES ---");

// 3 types of quotes:
// 'single-quoted'
// "double-quoted"
// `backticks`

// backticks allow embedded expressions
let name = "Finn";
console.log(`Hey ${name}`);

function sum(a, b) {
  return a + b;
}
console.log(`1 + 2 = ${sum(1, 2)}.`);

// backticks allow string to span multiple lines
let hellos = `Hello
Hi
Hey
Waddup
Yo`;
console.log(hellos);

// Special characters
console.log("");
console.log("--- SPECIAL CHARACTERS ---");
// "\n", "newline character" adds a line break
let guestList = "Guests:\n BMO\n NEPTR\n Ice King";
console.log(guestList);

// Full list of "special" characters:

// "\n" - New line
// "\r" - Windows text files use "\r\n" for historical reasons
// "(\')", "(\")" - Quotes
// "\\" = Backslash
// "\t" = Tab
//  "\b, \f, \v" - Backspace, Form Feed, Vertical Tab; kept for compatibility, not used nowadays
// "\xXX" = Unicode character with given hexadecimal Unicode, e.g. "\x7a" = "z"
// "\uXXXX" = Unicode symbol with hex code XXXX, e.g. "\u00A9" = "©"
// "\u{X...XXXXXX" (1 to 6 hex characters) - Unicode symbol with UTF-32 encoding

console.log("\u00A9"); // ©
console.log("\u{20331}"); // 𠌱
console.log("\u{1F60D}"); // 😍

// String Length
console.log("");
console.log("--- STRING LENGTH ---");
// "length" gives string length
let str = "length";
console.log(str.length); // 6

// Accessing Characters
console.log("");
console.log("--- ACCESSING CHARACTERS ---");
// Method "charAt()" gives acces to specific character in string, starting from 0 as JS is a zero-based language
str = "character";
console.log(str.charAt(0)); // c
// square brackets are the modern way to access a character
console.log(str[0]); // c

// "for..of" iterates over characters
for (let char of "what") {
  console.log(char);
}

// String are Immutable
console.log("");
console.log("--- STRINGS ARE IMMUTABLE ---");
// Strings cannot be changed in JS
str = "Hi";
str[0] = "h";
console.log(str[0]);
// create new string and assign "str" to workaround
str = "Hi";
str = "h" + str[1];
console.log(str);

// Changing the Case
console.log("");
console.log("--- CHANGING THE CASE ---");
// Methods "toLowerCase()" and "toUpperCase()" change the case
str = "Case";
console.log(str.toLowerCase()); // case
console.log(str.toUpperCase()); // CASE

// Searching for a Substring
console.log("");
console.log("--- SEARCHING FOR A SUBSTRING ---");
// method "indexOf()" gives position of character
str = "bingbong";
console.log(str.indexOf("o")); // 5
console.log(str.indexOf("c")); // -1 when character not found

// The Bitwise NOT Trick
console.log("");
console.log("--- BITWISE NOT OPERATOR ---");
// Bitwise NOT operator "~" converts number to 32-bit integer.
// in practice, "~n" = "-(n+1)".
console.log(~2); // -3, -(2+1)
console.log(~-2); //  1, -(-2+1)

// includes, startsWith, endsWith
console.log("");
console.log("--- .includes, .startsWith, .endsWith ---");
// "str.includes()" returns "true" or "false" depending on whether "str" contains "substr" within
str = "hi";
console.log(str.includes("bye")); // false
// optional second argument specifies the position to start searching from
str = "hello";
console.log(str.includes("h", 0)); // true
console.log(str.includes("h", 1)); // false

// "str.startsWith" and "str.endsWith" are self-explanatory
str = "oh my glob";
console.log(str.startsWith("o")); // true
console.log(str.startsWith("x")); // false
console.log(str.endsWith("b")); // true
console.log(str.endsWith("x")); // false

//  Getting a Substring
console.log("");
console.log("--- GETTING A SUBSTRING --- ");
// 3 mehods to getting substring:
// "slice"
// str.slice(start [, end])
str = "string";
console.log(str.slice(1, 3)); // "ri"
console.log(str.slice(2)); // "ring", leave second argument empty to include last character
console.log(str.slice(-3, -1)); // "in", negative values start from the string end
// "substring"
// str.substring(start [, end])
str = "string";
console.log(str.substring(5, 2)); // allows "start" to be greater than "end"
// "substr"
// str.substr(start [, length])
str = "string";
console.log(str.substr(0, 4)); // "stri", second arguments gives "length", how many characters to get from "start"

// Comparing Strings
console.log("");
console.log("--- COMPARING STRINGS ---");
// Strings are compared character-by-character in alphabetical order
// There are some rules:
// 1. A lowercase letter is always greater than uppercase
console.log("a" > "A"); // true
// Letter with diacritical marks are "out of order":
console.log("á" > "a"); // true

// All strings are encoded using UTF-16
// Each character has a corresponding numeric code
// "str.codePointAt(pos)" - returns the code for the character at position "pos":
str = "string String";
console.log(str.codePointAt(0)); // ("s") 115
console.log(str.codePointAt(7)); // ("S") 83
console.log(str.codePointAt(6)); // (" ") 32
// "String.fromCodePoint(code)" - creates a character by its numeric "code":
console.log(String.fromCodePoint(115)); // s
// Unicode characters can be added using their codes with "\u" followed by hex:
console.log("\u005a"); // Z

// Characters of latin alphabet:
str = "";

for (let i = 65; i < 65 + 26; i++) {
  str += String.fromCodePoint(i);
}
str += " ";
for (let i = 97; i < 97 + 26; i++) {
  str += String.fromCodePoint(i);
}

console.log(str);

// Correct Comparisons
console.log("");
console.log("--- CORRECT COMPARISONS ---");
// "str.localeCompare(str2)" returns an integer indicating whether "str" is less, equal or greater than "str2"
// • Returns negative number if "str" < "str2"
console.log("a".localeCompare("c")); // -1
// • Returns positive number if "str" > "str2"
console.log("c".localeCompare("a")); // 1
// • Returns 0 if "str" === "str2"
console.log("a".localeCompare("a")); // 0

// Internals, Unicode
console.log("");
console.log("--- INTERNALS, UNICODE ---");
// Surrogate Pairs
console.log("");
console.log("--- SURROGATE PAIRS ---");
