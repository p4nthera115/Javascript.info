const header = document.querySelector("h1");
header.innerText = "Variables";

// A variable is a "named storage" for data

// "let" is a changeable variable

let letvar = "--- LET VARIABLE ---";
console.log(letvar);

let message = "hello";
console.log(message);

message = "world";
console.log(message);

// repeating "let" when redeclaring a variable leads to an error

// let message = "hello world"
// console.log(message)

/* 
Uncaught SyntaxError: redeclaration of let message
note: Previously declared at line 8, column 4
*/

let varname = "--- VARIABLE NAMING ---";
console.log(varname);

// Naming limitations:
// The name must contain only letters, digits, or the symbols $ and _
// The first character must not be a digit

// camelCase commonly used for names containing multiple word
// names are case sensitive

let varvar = "--- VAR VARIABLE ---"
console.log(varvar)

// old-school version of let with subtle differences 
// ( refer to: 5. Advanced Working with Functions/4.OldVar.js )

const constvar = "--- CONST VARIABLE ---";
console.log(constvar);

// a constant is an unchangeable variable and cannot be redeclared

/*
    const name = "finn";
    name = "jake";
*/
// Uncaught TypeError: invalid assignment to const 'name'

// Preknown values are named using capital letters and underscores 
// e.g. hexadecimal color values

const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

const color = COLOR_BLUE;
console.log(color)