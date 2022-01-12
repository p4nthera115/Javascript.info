// WeakMap and WeakSet
console.log("--- WEAKMAP AND WEAKSET ---");

// WeakMap
console.log("");
console.log("--- WEAKMAP ---");

// The first difference between "Map" and "WeakMap" is that keys must be objects, not primitive values:
let weakMap = new WeakMap();
let obj = {};

weakMap.set(obj, "ok");

// weakMap.set("test", "test"); // error, invalid value used as weak map key

let map = new Map();

console.log(map.set("test", "test")); // works

// Now if an object is used as the key, and there are no references to that object - it will be removed.
let finn = { name: "Finn" };

weakMap = new WeakMap();
weakMap.set(finn, "...");

console.log(weakMap.has(finn)); // true

finn = null;

console.log(weakMap.has(finn)); // false (finn removed)

// map comparison:
finn = { name: "Finn" };

map = new Map();
map.set(finn, "...");

finn = null;

console.log(map); // { { name: 'Finn' } => '...' }

// "WeakMap" is fundamentally different in this aspect, it does not prevent garbage-collection of key object.

// "WeakMap" has only the following methods:
// • weakMap.get(key)
// • weakMap.set(key, value)
// • weakMap.delete(key)
// • weakMap.has(key)

// Because the JS engine decides when to perform garbage-collection, the contents of
// "WeakMap" is not known as it is not clear when the cleanup happens.
// At any one moment, the element count of "WeakMap" may or may not have been cleaned up, or partially cleaned up.
// For this reason, methods that access all keys/values are not supported ("keys()", "values()", "entries()").

// Use Case: Additional Data
console.log("");
console.log("--- USE CASE: ADDITIONAL DATA ---");

// The main area of application for "WeakMap" is an additional data storage.
// If working with an object that "belongs" to another code, maybe a third-party library, and would
// like to stor some data associated with it, that should only exist while the object is alive - then
// "WeakMap" is what is needed.

// Data is put into a "WeakMap", using hte object as the key, and when the object is garbage collected,
// that data will automatically disappear as well.
finn = {};
weakMap.set(finn, "enchiridion");
// if finn dies, the enchiridion will be destroyed automatically

// Code that keeps a visit count for users.
// The information is stored in a map: a user object is the key and the visit count is the value.
// When a user leaves (its object gets garbage collected), their visit count should no longer be stored.
// Example of a counting function with "Map":

// visitsCount.js
let visitsCountMap = new Map();

function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}

// main.js
finn = { name: "Finn" };

countUser(finn); // count finn's visit
console.log(visitsCountMap);

finn = null; // finn leaves
console.log(visitsCountMap); // visit remains in memory

// Now "finn" object should be garbage collected, but remains in the memory as it is a key in "visitsCountMap".
// "visitsCountMap" needs to be cleaned when removing users, otherwise it will grow in memory indefinitely.
// Such cleaning become a tedious task, this can be avoided by using "WeakMap" instead:

// visitscount.js
visitsCountMap = new WeakMap();

// increase visit count
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}

finn = { name: "Finn" };

countUser(finn); // count finn's visit
console.log(visitsCountMap.has(finn)); // true

finn = null; // finn leaves
console.log(visitsCountMap.has(finn)); // false (finn removed)

// Use Case: Caching
console.log("");
console.log("--- USE CASE: CACHING ---");

// Another common use case is caching.
// "cache" results caan be stored from a function, so that future calls on the same object can reuse it

// Using Map to achieve this (not optimal scenario):

// cache.js
let cache = new Map();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
  }
  return cache.get(obj);
}

// Now "process()" is used in another file:

// main.js
obj = {}; // some object

let result1 = process(obj); // calculated

let result2 = process(obj); // remembered result taken from cache

obj = null; // object not needed anymore

console.log(cache.size); // 1, object is still in cache, taking memory

// For multiple calls of "process(obj)" with the same object, it only calculates the result the first time,
// and then just takes it from the cache. Downside is that "cache" needs to be cleaned when the object is
// not needed any more.

// If "WeakMap" is used instead, the cached result will be removed from memory automatically after the object
// is garbage collected.

// cache.js
cache = new WeakMap();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }
  return cache.get(obj);
}

// main.js
obj = {}; // some object

result1 = process(obj);
result2 = process(obj);

console.log(cache.has(obj)); // true

obj = null; // object no longer needed

console.log(cache.has(obj)); // false, obj removed

// WeakSet
console.log("");
console.log("--- WEAKSET ---");

// "WeakSet" behaves similarly:
// • It is anologous to "Set", but only objects may be added to "WeakSet" (not primitives).
// • An object exists in the set while it is reachable from somewhere else.
// • Like "Set", it supports "add", "has" and "delete", but not "size", "keys()" and no iterations.

// Being "weak", it also serves as additional storage. But not for arbitrary data,
// rather for "yes/no" facts. A membership in "WeakSet" may mean something about the object.

// For instance, users can be added to "WeakSet" to keep track of those who visited a site:
let visitedSet = new WeakSet();

finn = { name: "Finn" };
let jake = { name: "Jake" };
let BMO = { name: "BMO" };

visitedSet.add(finn); // Finn visits
visitedSet.add(jake); // then Jake
visitedSet.add(finn); // then Finn again

// visitedSet has 2 users now

// check if Finn visited
console.log(visitedSet.has(finn)); // true

// check if BMO visited
console.log(visitedSet.has(BMO)); // false

finn = null;

// visitedSet cleaned automatically
console.log(visitedSet.has(finn)); // false

// The most notable limitation of "WeakMap" and "WeakSet" is the absence of iterations, and the
// inability to get all current content.
// Their main job is to be an "additional" storage of data for objects which are stored/managed elsewhere.