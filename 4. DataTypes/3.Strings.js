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
// " \' ", " \" " - Quotes
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
// method "indexOf()"

