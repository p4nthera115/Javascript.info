// Scheduling: setTimeout and setInterval
console.log("--- SCHEDULING: SETTIMEOUT AND SETINTERVAL ---");

// There are two methods to "schedule" a call:
// • "setTimeout" allows to run a function once after the interval of time.
// • "setInterval" allows to run a function repeatedly, starting after the interval of time,
//   then repeating continuously at the interval.

// These methods are not part of the JS spec, but most environments have the internal scheduler and
// provide these methods. In particular, they are supported in all browsers and Node.js.

// setTimeout
console.log("--- setTimeout ---");

// The syntax:
/*
    let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
*/

// Parameters:
// • "func|code" -
//   Function or a string of code to execute. Usually, that is a function.
//   For historical reasons, a string of code can be passed, but is not recommended.
// • "delay" -
//   The delay before run, in milliseconds, default = 0.
// • "arg1","arg2"... -
//   Arguments for the function.

// Example:
function sayHi() {
  console.log("Hi");
}
setTimeout(sayHi, 100); // calls sayHi() after one second

// with arguments:

function sayHey(phrase, who) {
  console.log(phrase + ", " + who);
}
setTimeout(sayHey, 100, "Hey", "Finn");

// If the first argument is a string, JS creates a function from it:

// Cancelling with clearTimeout
console.log("");
console.log("--- CANCELLING WITH CLEARTIMEOUT ---");

// A call to "setTimeout" returns a "timer identifier" "timerId" that can be used to cancel the execution.
// Syntax to cancel:
/*
    let timerId = setTimeout(...);
    clearTimeout(timerId);
*/

let timerId = setTimeout(() => console.log("never happens"), 100);
console.log(timerId); // timer identifier

clearTimeout(timerId);
console.log(timerId);

// setInterval
console.log("");
console.log("--- setInterval ---");

// "setInterval" has same syntax as "setTimeout":
/*
    let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
*/

// All arguments have the same meaning. But unlike "setTimeout" it runs the function
// not only once, but refularly after the given interval time.
// To stop further calls, "clearInterval(timerId)" is called.

// Example, message shows every 2 seconds and stops after 5:
timerId = setInterval(() => console.log("tick"), 1000);
setTimeout(() => {
  clearInterval(timerId);
  console.log("stop"), 5000;
});

// Nested setTimeout
console.log("");
console.log("--- NESTED setTimeout ---");

// There are two ways of running something regularly.
// One is "setInterval". The other one is a nested "setTimeout", like this:

timerId = setTimeout(function tick() {
  console.log("tick");
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);

// The "setTimeout" above schedules the next call right at the end of the current one (*).

// ~ Nested "setTimeout" allows to set the delay between the executions more precisely than "setInterval" ~

// Zero delay setTimeout
console.log("");
console.log("--- ZERO DELAY setTimeout ---");

// There is a special use case: "setTimeout(func, 0)", or just "setTimeout(func)".

// This schedules the execution of "func" as soon as possible. But the scheduler will invoke it only after the
// currently executing script is complete.

// So the function is scheduled to run "right after" the current script.

// For instancem this outputs "Hello", then immediately "World":
setTimeout(() => console.log("World"));
console.log("Hello");

// The first line "puts the call into calender after 0ms". But the scheduler will only "check the calender" after the
// current script is complete, so "Hello" is first, and "World" - after it.