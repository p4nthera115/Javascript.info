// const header = document.querySelector("h1");
// header.innerText = "The 'switch' statement";

// switch statement
console.log("");
console.log("--- SWITCH STATEMENT ---");

/*
    switch (x) {
    case "value1":
        break;

    case "value2":
        break;

    default:
        break;
    }
*/

// switch checks if case === x, if so, it executes that code, if not it moves to the next case
let a = 2 * 2;

switch (a) {
  case 3:
    console.log("too small");
    break;
  case 4:
    console.log("exactly");
    break;
  case 5:
    console.log("too big");
    break;
  default:
    console.log("idk what that is");
}

// if no cases match, "default" is executed
console.log("");
a = 3 * 3;

switch (a) {
  case 3:
    console.log("too small");
    break;
  case 4:
    console.log("exactly");
    break;
  case 5:
    console.log("too big");
    break;
  default:
    console.log("idk what that is");
}

// if there is no "break", switch executes the next case as well
console.log("");
a = 2 * 2;

switch (a) {
  case 3:
    console.log("too small");
    break;
  case 4:
    console.log("exactly");
  case 5:
    console.log("too big");
  default:
    console.log("idk what that is");
}

// grouping of "case"
console.log("")
// "groups" are a side-effect of how switch/case works without "break"
a = 5;

switch (a) {
  case 4:
    console.log("correct");
    break;
  case 3:
  case 5:
    console.log("wrong");
    break;

  default:
    console.log("what in the world is that");
}

// data type matters as switch/case uses strict equality (===)