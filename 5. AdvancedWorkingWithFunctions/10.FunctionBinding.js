// Function Binding
console.log("--- FUNCTION BINDING ---");

// When passing object methods as callbacks, for instance to "setTimeout",
// there is a known problem: "losing 'this'".

// Losing "this"
console.log("");
console.log('--- LOSING "THIS" ---');

// Once a method is passed somewhere seperately from the object - "this" is lost.
// Here is how it may happen with "setTimeout":
let user = {
  firstName: "Finn",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  },
};
setTimeout(user.sayHi, 500); // Hello, undefined!
// "setTimeout" got the function "user.sayHi", seperately from the object. The last line can be rewritten as:
let f = user.sayHi;
setTimeout(f, 600); // lost user context
// The method "setTimeout" in-browser is a little special: it sets "this = window" for the function call
// (for Node.js, "this" becomes the timer object, but does not matter here). So for "this.firstName" it tries to cget
// "window.firstName", which does not exist. In other similar cases usually "this" just becomes "undefined".

// The task is quite typical - an object method must be passed somewhere else (here - to the scheduler) where it will
// be called. How to make sure that it will be called in the right context?

// Solution 1: a wrapper
console.log("");
console.log("--- SOLUTION 1: A WRAPPER ---");

// The simplest solution is to use a wrapping function:
user = {
  firstName: "Finn",
  sayHey() {
    console.log(`Hello, ${this.firstName}!`);
  },
};

setTimeout(function () {
  user.sayHey();
}, 700);
// it works because it receives "user" from the outer lexical environment, and then calls the
// the method normally.
// Same, but shorter:
setTimeout(() => user.sayHey(), 800);

// If there is a delay the "user" might change value and call the wrong object:
setTimeout(() => user.sayHey(), 1000);
// the value of user changes within 1 second
user = {
  sayHey() {
    console.log("Another user in setTimeout");
  },
};
// next solution fixes this problem.

// Solution 2: bind
console.log("");
console.log("--- SOLUTION 2: BIND ---");

// Functions provide a built-in method "bind" that allows to fix "this".
// Basic syntax:
/*
  let boundFunc = func.bind(context);
*/
// The result of "func.bind(context)" is a special function-like "exotic object",
// that is callable as function and transparently passes the call to "func" setting "this = context".
// In other words, calling "boundFunc" is like "func" with fixed "this".
// For instance, here "funcUser" passes a call to "func" with "this = user":
let usr = {
  firstName: "Finn",
};
function func() {
  console.log(this.firstName);
}
let funcUser = func.bind(usr);
funcUser(); // Finn
// Here "func.bind(user)" as a "bound variant" of "func", with fixed "this = user".

// All arguments are passed to the original "func" "as is", for instance:
usr = {
  firstName: "Finn",
};

function func1(phrase) {
  console.log(phrase + ", " + this.firstName);
}

// bind this to usr
funcUser1 = func1.bind(usr);

funcUser1("Hello");

// Try with an object method:
usr = {
  firstName: "Finn",
  sayHi() {
    console.log(`Hello, ${this.firstName} :)`);
  },
};

let sayHi = usr.sayHi.bind(usr); // (*)

sayHi(); // Hello, Finn :)

// even if the value of usr changes within 1 second
// sayHi uses the pre-bound value which is referenced to the old usr object
usr = {
  sayHi() {
    console.log("Another usr in setTimeout :(");
  },
};

// In line "(*)", the method "usr.sayHi" is bound to "usr" object.
// The "sayHi" is a "bound" funtion, that can be called alone or passed to "setTimeout" -
// the context will always be right.

// Only "this" is fixed by "bind":
user1 = {
  firstName: "Jake",
  say(phrase) {
    console.log(`${phrase}, ${this.firstName}!`);
  },
};

let say = user1.say.bind(user1);

say("Hey"); // Hey, Jake!
say("Bye"); // Bye, Jake!

// Partial Functions
console.log("");
console.log("--- PARTIAL FUNCTIONS ---");

// Arguments can also be bound, not only "this". It is rarely done but can sometimes be useful.
// Full syntax of "bind":
/*
  let bound = func.bind(context, [arg1], [arg2], ...);
*/
// It allows to bind context as "this" and starting arguments of the function.

// Example, a multiplication function "mul(a, b)":
function mul(a, b) {
  return a * b;
}

// user "bind" to create a function "double" on its base:
let double = mul.bind(null, 2);

console.log(double(3)); // 6
console.log(double(4)); // 8
console.log(double(38)); // 76

// The call to "mul.bind(null, 2)" creates a  new function "double" that passes calls to "mul", fixing "null"
// as the context and "2" as the first argument. Further arguments are passed "as is".
// This is called "partial function application" - create a new function by fixing some parameters of the existing one.

// Note: "this" is not used here, but "bind" requires it, so something like "null" must be put in its place.

// The benefit of partial functions are that they can be used without having to provide the first argument every time
// as it is fixed with "bind".
// For instance, there is a function "send(from, to, text)". Inside a "user" object a partial variant
// of "sendTo(to, text)" may be used, that sends from the current user.

// Going Partial Without Context
console.log("");
console.log("--- GOING PARTIAL WTIHOUT CONTEXT ---");

// The context in "bind" can not be omitted.
// A function "partial" for binding only arguments can be easily implemented.
// Like this:
function partial(func, ...argsBound) {
  return function (...args) {
    return func.call(this, ...argsBound, ...args);
  };
}

// usage:
let user2 = {
  firstName: "BMO",
  speak(time, phrase) {
    console.log(`[${time}] ${this.firstName}: ${phrase}!`);
  },
};

// add partial method with fixed time
user2.sayNow = partial(
  user2.speak,
  new Date().getHours() + ":" + new Date().getMinutes()
);

user2.sayNow("Hello"); // [HH:MM] BMO: Hello!

// The result of "partial(func[, arg1, arg2...])" call is a wrapper (line 177) that calls "func" with:
// • Same "this" as it gets (for "use.sayNow" call its "user2")
// • Then gives it "...argsBound" - arguments from the "partial" call ("HH:MM")
// • Then gives it "...args" - argumetns given to the wrapper ("Hello")
