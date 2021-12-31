// const header = document.querySelector("h1");
// header.innerText = "Comparisons";

// Comparison operators

// greater/less than: >, <
// greater/less than or equals to: >=, <=
// equals: == (one "=" is an assignment)
// not equals: !=

// all comparison operators return a boolean value
console.log(2 == 40 - 38);
console.log(29 <= 17);

// strings are compared letter by letter
// later in the alphabet = greater value (z > a)
// lowercase > uppercase, lowercase character has greater index in internal encoding table JS uses (Unicode)
// console.log("G" < "g");

// JS converts values of different types to numbers when comparing
console.log("2" > 1);

// strict equality: === (!== for not equals)
// === has no type conversion so both arguments must be same type to be true

// null == undefined is true
console.log("--- NULL == UNDEFINED ---");
console.log(null == undefined);
// null === undefined is false because different types
console.log("--- NULL === UNDEFINED ---");
console.log(null === undefined);

// comparisons convert null to number (0)
console.log("--- COMPARING NULL ---");
console.log(null == 0); // equality check, not comparison
console.log(null > 0); // 0 is not greater than 0
console.log(null >= 0); // true

// comparisons convert undefined to NaN so all comparisons are always false
console.log("--- COMPARING UNDEFINED ---");
console.log(undefined == 0);
console.log(undefined > 0);
console.log(undefined >= 0);
