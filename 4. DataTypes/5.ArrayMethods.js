// Array Methods
console.log("");
console.log("--- ARRAY METHODS ---");
// Add/Remove Items
console.log("");
console.log("--- ADD/REMOVE METHODS ---");
// Methods covered in previous chapter :
// • "arr.push(...items)" - adds items to the end,
// • "arr.pop()" - extreacts an item from the end,
// • "arr.shift()" - extracts an item from the beginning,
// • "arr.unshift(...items)" - adds items to the beginning.

// Splice
console.log("");
console.log("--- SPLICE ---");
// Using "delete" to delete an element from an array:
let arr = ["oh", "my", "glob"];
delete arr[1]; // remove "my"
console.log(arr); // [ 'oh',  , 'glob']
console.log(arr.length); // 3

// "arr.splice" can do everything: insert, remove, replace elements
// The syntax:
/*
    arr.splice(start[, deleteCount, elem1, ..., elemN]);
*/
// It modifies "arr" starting from the index "start": removes "deleteCount" elements
// and then inserts "elem1, ..., elemN" in their place. Returns the array of removed elements.

// Deletion:
arr = ["oh", "my", "glob"];
arr.splice(1, 1); // from index "1", remove 1 element
console.log(arr); // [ 'oh', 'glob' ]

arr = ["oh", "my", "glob"];
arr.splice(1, 2, "hell", "yeah");
console.log(arr);

// "splice" returns the array of removed elements:
arr = ["oh", "my", "flipping", "glob"];
let removed = arr.splice(0, 2);
console.log(removed);
["oh", "my"];

// Setting "deleteCount" to 0 allows "splice" to insert elements without removals
arr = ["oh", "my", "glob"];
arr.splice(2, 0, "flipping");
console.log(arr);

// (Negative indexes work the same way as "slice")

// Slice
console.log("");
console.log("--- SLICE ---");
// The method "arr.slice" is much simpler than "arr.splice"
// The syntax:
/*
    arr.slice([start], [end])
*/
