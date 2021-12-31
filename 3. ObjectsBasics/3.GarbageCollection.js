// Garbage Collection
console.log("--- GARBAGE COLLECTION ---");
// Everything written in code takes memory,
// when something is not needed any more, JS automatically and invisibly discovers it and cleans it up

// Reachability
// 1. The main concept of memory management in JS is reachability
//  "reachable" values are those that are accessible or usable, they are guaranteed to be stored in memory
//  There is a base set of inherently reachable values, that cannot be deleted
//  • currently executing functions, its local and variables and parameters
//  • other functions on the current chain of nestes calls, their local variables and parameters
//  • global variables
//  These values are called roots
// 2. Any other value is considered reachable if it is reachable from a root by a reference or by a chain of references
// In JS there a background process called "garbage collector" which monitors all objects and removes those that have become unreachable

// Example
let user = { name: "Jake" };
// global variable "user" references the object "{ name: "Jake" }"
// the "name" property of the "Jake" object stores a primitive
// if the value of "user" is overwritten the reference is lost and "Jake" becomes unreachable
// so "garbage collector" will dispose of the data and free the memory
let admin = user;
// now "admin" also refers to "Jake" object so rewriting "user" will not cause it to be unreachable
// if "admin" is also overwritten, "Jake" object will be removed

// Interlinked Objects
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman,
  };
}

let family = marry(
  {
    name: "Mr. Pig",
  },
  {
    name: "Tree Trunks",
  }
);
// right now, all objects are reachable
delete family.father;
console.log(family.mother.husband);
// only one of two references to "Mr. Pig" object has been removed so it is still reachable
delete family.mother.husband;
console.log(family.mother.husband);
// now both references to "Mr. Pig" object have been removed so it is unreachable and removed

// Unreachable Island
family = null;
// all objects in "family" are removed

// Internal Algorithms
// The basic garbage collection algorithm is called "mark-and-sweep"
// These "garbage collection" steps are regularly performed
// • the garbage collector takes roots and "marks" (remembers) them
// • visits and "marks" all references from them
// • visits marked objects and marks their references, all visited objects are remembered
//   so as not to visit the same object twice in the future
// • continues until every reachable (from the roots) references are visited
// • all objects except marked ones are removed

// Some optimizations to run faster:
// • Generational Collection -
//   Objects are split into two sets: "new ones" and "old ones".
//   Many objects do their job and die fast, they can be cleaned up aggressively.
//   Those that survive for long enough, become "old" and are examined less often.
// • Incremental Collection -
//   Instead of marking these objects all at once, they are examined in parts,
//   causing many tiny delays instead of a big one
// • Idle-time Collection -
//   Garbage collector tries to only run while CPU is idle, to reduce possible effect on the execution

