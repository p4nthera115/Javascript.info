// const header = document.querySelector("h1");
// header.innerText = "Loops: while and for";

// while loop
console.log("");
console.log("--- WHILE ---");

/*
    while (condition) {
        // code 
        // "loop body"
    }
*/

// when condition is truthy, code from loop body is executed
// applies to all kinds of loops

let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}

// each loop execution is called an "iteration"

// condiiton is evaluated and converted to a boolean by 'while'
// shorter way to write while (i != 0) is while (i)
i = 3;
while (i) {
  console.log(i);
  i--;
}
// stops at 1 as 0 is falsy

// do...while loop
console.log("");
console.log("--- DO WHILE ---");

// do..while executes body, then checks condition

/*
    do {
      // loop body
    } while (condition);
*/

i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);

// for loop
console.log("");
console.log("--- FOR ---");

/*
    for (begin; condition; step) {
        // ... loop body ...
    }
*/

for (let i = 0; i < 3; i++) {
  console.log(i);
}

i = 0;
for (i = 0; i < 3; i++) {
  console.log(i);
}
console.log(i);

// if i is already declared, "begin" can be removed
i = 0;
for (; i < 3; i++) {
  console.log(i);
}

// "step" can be removed when declared in loop body
i = 0;
for (; i < 3; ) {
  console.log(i++);
}

// removing everything creates infinite loop
// for (;;) {}

// breaking the loop
console.log("");
console.log("--- BREAK DIRECTIVE ---");

// "break" directive force exits loop

let sum = 0;
while (sum < 3) {
  let number = "";
  let value = +number;
  if (!value) break;

  sum += value;
}
console.log(sum);

let number = "5";
console.log(+number);
let value = +number;
console.log(!value);

// continue to the next iteration
console.log("");
console.log("--- CONTINUE DIRECTIVE ---");

// "continue" directive is a 'lighter version' of the "break" directive
// doesn't whole loop, only stops current iteration and forced loop to start new one

// loop below uses continue to output odd values
for (let i = 0; i < 10; i++) {
  if (i % 2 == 0) continue;
  console.log(i);
}

// cannot use break/continue with "?" (else), use "else" instead

// labels
console.log("");
console.log("--- LABELS ---");

// a label is an identifier with a colon before a loop

/*
    labelName: for (...) {
        ...
    }
*/

foo: {
  console.log("this prints");
  break foo;
  console.log("this does not print");
}
console.log("execution jumps to here");

// playground
console.log("");
console.log("--- PLAYGROUND ---");

// outputs odd numbers
for (let i = 1; i < 10; i += 2) {
  console.log(i);
}

console.log("");

// we'll figure this out later
i = "0";
for (; i.length <= 5; i += "0") {
  console.log(i);
}

console.log("");

str = "";
for (i = 0; i < 9; i++) {
  if (i < 5) {
    str += "0";
  } else {
    str = str.slice(0, -1);
  }
  console.log(str);
}

// console.log("");
// a = "abcdef";
// console.log(a);
// b = a.length - 1;
// console.log(b);
// b = a.substring(0, a.length - 1);
// console.log(b);
// b = a.substr(-1);
// console.log(b);
// b = a.slice(0, -1);
// console.log(b);
