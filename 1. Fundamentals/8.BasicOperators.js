// const header = document.querySelector("h1");
// header.innerText = "Basic Operators, maths";

// % = remainder
console.log(9 % 4);
// ** = power
console.log(2 ** 3);

// concatenation
const omg = "oh " + "my " + "glob";
console.log(omg);

// order matters
console.log(1 + 1 + "5");
console.log("1" + 1 + 5);

// plus (+) operator converts non-numbers to a number
// basically shorter version of "Number()"
console.log(+true);
console.log(+"");

let n = 2;
n += 5; // 7
n *= 2; // 14

// ++ adds 1, -- subtracts 1
let counter = 1;
console.log(2 * ++counter); // 4

counter = 1;
console.log(2 * counter++); // 2, because counter++ returns the "old" value
