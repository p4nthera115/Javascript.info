// Decorators and Forwarding, call/apply
console.log("--- DECORATORS AND FORWARDING, CALL/APPLY ---");

// JS gives a lot of flexibility when dealing with functions. They can be passed around, used as objects,
// and in this chapter will cover how to forward calls between them and decorate them.

// Transparent caching
console.log("");
console.log("--- TRANSPARENT CACHING ---");

// Function "slow(x)" is CPU-heavy, but its results are stable. In other words, for the same "x" it always returns the
// same result.
// If the function is called often, the results can be cached (remembered) to avoid spending extra-time on recalculations.
// But instead of adding that functionality into "slow()", a wrapper function that adds caching can be created:
function slow(x) {
  // there can be a heavy CPU-intensive job here
  console.log(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      // if there is such key in cache
      return cache.get(x); // read the result from it
    }
    let result = func(x); // otherwise call func

    cache.set(x, result); // and cache the result
    return result;
  };
}

slow = cachingDecorator(slow);

console.log(slow(1)); // slow(1) is cached and the result returned
console.log("Again: " + slow(1)); // slow(1) result returned from cache

console.log(slow(2)); // slow(2) is cached and the result returned
console.log("Again: " + slow(2)); // slow(2) result returned from cache

// In the above code "cachingDecorator" is a decorator: a special function that takes another function and
// alters its behaviour.
// The idea is to call "cachingDecorator" for any function, and it will return the caching wrapper.

// The result of "cachingDecorator(func)" is a "wrapper": "function(x)" that "wraps" the call of
// "func(x)" into caching logic.

// There are several benefits of using a seperate "cachingDecorator" instead of altering the code of "slow" itself:
// • The "cachingDecorator" is reusable. It can be applied to another function.
// • The caching logic is seperate, it did not increase the complexity of "slow" itself.
// • Multiple decorators can ve combined if needed.

// Using "func.call" for the context
console.log("");
console.log('--- USING THE "func.call" FOR THE CONTEXT ---');

// The caching decorator mentioned above is not suited to work with object methods.
// For instance, in the code below "worker.slow()" stops working after the decoration:
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    console.log("Called with " + x);
    return x * this.someMethod();
  },
};

console.log(worker.slow(1)); // the original method works

worker.slow = cachingDecorator(worker.slow); // make it caching using previously created caching decorator

// console.log(worker.slow(2)); // Error: this.someMethod is not a function

// The error occurs due to "this = undefined", the wrapper calls the original function as "func(x)".
// The wrapper passes the call to the original method, but without the context "this", hence the error.

// To fix this, there is a special built-in function method "func.call(context, ...args)"
// that allows to call a function explicitly setting "this".
// Syntax:
/*
    func.call(context, arg1, arg2, ...)
*/

// It runs "func" providing the first argument as "this", and the next as the arguments.

// These two calls do almost the same:
/*
    func(1, 2, 3);
    func.call(obj, 1, 2, 3);
*/
// They both call "func" with arguments "1", "2" and "3".
// The only difference is that "func.call" also sets "this" to "obj".

// Example, "sayHi" is called in the context of different object: "sayHi.call(user)" runs "sayHi"
// providinf "this = user", and the nect line sets "this = admin":
function sayHi() {
  console.log(this.name);
}

let user = { name: "Finn" };
let admin = { name: "Admin" };

// use call to pass different object as "this"
sayHi.call(user); // Finn
sayHi.call(admin); // Admin

// Here "call" is used to call "say" with the given context and phrase:
function say(phrase) {
  console.log(this.name + ": " + phrase);
}

user = { name: "Finn" };

// user becomes this, and "Hello" becomes the first argument
say.call(user, "Hello"); // Finn: Hello

// "call" can be used in the wrapper to pass the context to the original function:

worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    console.log("Called with " + x);
    return x * this.someMethod();
  },
};

function cachingDecorator(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x);
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow);

console.log(worker.slow(2)); // 2, works now

// See how "this" is passed along:
// 1. After the decoration "worker.slow" is now the wrapper "function (x) {...}".
// 2. So when "worker.slow(2)" is executed, the wrapper gets "2" as an argument and "this = worker".
// 3. Inside the wrapper, assuming the result is not yet cached, "func.call(this, x)" passed the current
//    "this (= worker)" and the current argument ("=2") to the original method.

// Going multi-argument
console.log("");
console.log("--- GOING MULTI-ARGUMENT ---");

// Make "cachingDecorator" even more universal. Until now it only worked with single-argument functions.
// Now how to cache the multi-argument "worker.slow" method?
worker = {
  slow(min, max) {
    return min + max;
  },
};
// should remember same-argument calls
worker.slow = cachingDecorator(worker.slow);

// Previously, for a single argument "x", "cache.set(x, result)" could be used to save the result and
// "cache.get" to retrieve it.
// Now the result of a combination of arguments "(min, max)" needs to be remembered.
// The native "Map" takes single value only as the key.

// There are many solutions possible:
// 1. Implement a new (or use a third-party) map-like data structure that is more versatile
//    and allows multi-keys.
// 2. Use nested maps: "cache.set(min)" will be a "Map" that stores that pair "(max, result)".
//    So the "result" can be gotten as "cache.get(min).get(max)".
// 3. Join two values into one. In this particular case, a string "min, max" can be used as the "Map" key.
//    For flexibility, a hashing function can be allowed to provide for the decorator, that knows how to make one
//    value from many.
// For many practical applications, the 3rd variant is good enough, so that will be used going further.
// Also all arguments in "func.call" need to be passed, not just "x".
// So "func.call(this, x)" should be replaces with "func.call(this, ...arguments)" as to acquire an array.

// A more powerful "cachingDecorator":
worker = {
  slow(min, max) {
    console.log(`Called with ${min}, ${max}`);
    return min + max;
  },
};

function cachingDecorator1(func, hash) {
  let cache = new Map();
  return function () {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ", " + args[1];
}

worker.slow = cachingDecorator1(worker.slow, hash);

console.log(worker.slow(3, 5)); // works
console.log("Again " + worker.slow(3, 5)); // same (cached)

// There are two changes:
// • In the line "(*)" it calls "hash" to create a single key from "arguments".
//   Here a simple "joining" function is usedm it turns argumetns "(3, 5)" into the key "3,5".
//   More complex cases may require other hashing functions.
// • Then "(**)" uses "func.call(this, ...arguments)" to pass both the context and all arguments
//   the wrapper got (not just the first one) to the original function.

// func.apply
console.log("");
console.log("--- func.apply ---");

// Instead of "func.call(this, ....arguments)", "func.apply(this, arguments)" can be used.
// The syntax of built-in method "func.apply":
/*
  func.apply(context, args)
*/
// It runs the "func" setting "this = context" and using an array-like object "args" as the list of arguments.
// The only syntax difference between "call" and "apply" is that "call" expects a list of arguments,
// while "apply" takes an array-like object with them.

// There is only a subtle difference regarding "args":
// • The spread syntax "..." allows to pass iterable "args" as the list to "call".
// • The "apply" accepts only array-like "args".

// Passing all arguments along with the context to another function is called call forwarding.
// That is the simplest form of it:
wrapper = function () {
  return func.apply(this, arguments);
};
// When an external code calls such "wrapper", it is indistinguishible from the call of the original function "func".

// Borrowing a Method
console.log("");
console.log("--- BORROWING A METHOD ---");

// One more minor improvement in the hashing function:
function hash(args) {
  return args[0] + ", " + args[1];
}
// As of now, it works only on two arguments. It would be better if it could glue any number of "args".
// The natural solution would be to use "arr.join" method:
function hash(args) {
  // return args.join(); // Error: arguments.join is not a function
}
// This will not work. Because "hash(arguments)" is being called,
// and "arguments" object is both iterable and array-like, but not a real array.

// There is an easy way to use array join:
function hash() {
  console.log([].join.call(arguments)); // 1, 2
}
hash(1, 2);
// The trick is called method borrowing.

// A join method is took (borrowed) from a regular array ([].join) and "[].join.call"
// is used to run it in the context of "arguments".

// It works because the internal algorithm of the native method "arr.join(glue)" is very simple.

// Taken from the specification almost "as-is":
// 1. Let "glue" be the first argument or, ig no arguments, then a comma ",".
// 2. Let "result" be an empty string.
// 3. Append "this[0]" to "result".
// 4. "glue" and "this[1]".
// 5. "glue" and "this[2]".
// 6. ...Do so until "this.length" items are glued.
// 7. Return "result".

// So, technically it takes "this" and joins "this[0]", "this[1]" ...etc together.
// It is intentionally written in a way that allows any array-like "this" (many methods follow this practice).
// That is why it also works with "this = arguments".

// Decorators and function properties
console.log("");
console.log("--- DECORATORS AND FUNCTION PROPERTIES ---");

// It is generally safe to replace a function or a method with a decorated one.
// But, if the original function had properties on it, like "func.calledCount" or whatever,
// then the decorated one will not provide them. Because that is a wrapper. 

// E.g. in the example above if "slow" function had any properties on it, then "cachingDecorator(slow)"
// is a wrapper without them.

// Some decorators may probide their own properties. 
// E.g. a decorator may count how many times a function was invoked and how much time it took,
// and expose this information via wrapper properties.

// There exists a way to create decorators that keep access to function properties,but this requires using a 
// special "Proxy" object to wrap a function. 