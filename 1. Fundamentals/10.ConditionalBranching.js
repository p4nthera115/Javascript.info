// const header = document.querySelector("h1");
// header.innerText = "Conditional branching: if, '?'";

// "if" statement aka "?"
// only executes if result is true
console.log("--- IF STATEMENT ---");
let feeling = "litty";
if (feeling == "litty") {
  console.log("let's goooooo!!!");
}
feeling = "bad as flip";
if (feeling != "litty") {
  console.log("feels bad man :(");
}

// if statement evaluates expression in brackets and converts result to boolean
// for conversion rules refer to "1. Fundamentals/7.TypeConversions.js"
feeling = "litty";
let good = feeling == "litty";
if (good) {
  console.log("WOOOOOO");
}

// "else" clause aka ":"
console.log("--- ELSE CLAUSE ---");
feeling = "not litty";
if (feeling == good) {
  console.log("hell yeah brother");
} else {
  console.log("sucks to be you lawl");
}

// "else if"
let meh = "meh";
feeling = meh;
if (feeling == good) {
  console.log("hell yeah brother");
} else if (feeling == meh) {
  console.log("at least you're not miserable");
} else {
  console.log(";(");
}

// conditional operator "?"
console.log("--- CONDITIONAL OPERATOR ---");

const question = console.log("Are you cool?");
let cool = "yes";
let maybeCool = "maybe";
let uncool = "no";
let coolmsg = "welcome cool guy";
let maybemsg = "cool people know they're cool";
let uncoolmsg = "come back when you're cool";

if (cool) {
  console.log(coolmsg);
} else {
  console.log(uncoolmsg);
}

let result = !cool ? coolmsg : uncoolmsg;
console.log(result);

// multiple "?"

result = !cool
  ? coolmsg
  : !maybeCool
  ? maybemsg
  : !uncool
  ? uncoolmsg
  : "you're just strange";

console.log(result);
