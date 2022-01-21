// Introduction: callbacks
console.log("--- INTRODUCTION: CALLBACKS ---");
const header = document.querySelector("h1");
header.innerText = "Introduction: callbacks";

// Many functions are provided by JS host environments that allow to schedule asynchronous actions.
// In other words, actions that can be initiated at one point, but finish later.
// "setTimeout" is one such function.

// Function "loadScript(src)", loads a script with the given "src":
function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement("script");
  script.src = src;
  document.head.append(script);
}
// It inserts the document a new dynamicaly created, tag "<script src="...">" with the given "src".
// The browser automatically starts loading it and executes when complete.
// loadScript("10.Promises,asyncawait/1. Introduction, callbacks/testScript.js");

// The script is executed "asynchronously", as it starts loading now, but runs later,
// when the function has already finished.
// Any code below "loadScript()" does not wait until the script finishes loading.

// The new script needs to be used as soon as it loads. It declares new functions and there is a want to run them.
// If this is done immediately after the "loadScript()" call, it will not work:
// someFunction(); // ReferenceError: someFunction is not defined

// Naturally, the browser probably did not have time to load the script. As of now, the "loadScript" funtion does not
// provide a way to track the load completion. The script loads and eventually runs, that is all.
// But when it happens would want to be known, to be able to use new function and variables from that script.

// Add a "callback" function as a second argument to "loadScript" that should execute when the script loads:
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}

// Now, to call new functions from the script, they should be written in the callback:
loadScript(
  "10.Promises,asyncawait/1. Introduction, callbacks/testScript.js",
  function () {
    console.log(" ");
    console.log("-- intro --");
    someFunction();
  }
);

// That is the idea: the second arhument is a function (usually anonymous) that runs when the action is completed.
// loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
//   alert(`Cool, the script ${script.src} is loaded`);
//   alert( _ ); // function declared in the loaded script
// });
// This is called a "callback-based" style of asynchronous programming.
// A function that does something asynchronously should provide a "callback" argument where the function is put to run
// after it is complete.
// It is done here in "loadScript" but is a general approach.

// Callback in Callback
console.log(" ");
console.log("--- CALLBACK IN CALLBACK ---");

// Load two scripts sequentially -
// Put the second "loadScript" call inside the callback:
loadScript(
  "10.Promises,asyncawait/1. Introduction, callbacks/testScript.js",
  function () {
    console.log(" ");
    console.log("-- callback in callback --");
    loadScript(
      "10.Promises,asyncawait/1. Introduction, callbacks/testScript2.js",
      function () {
        someFunction2();
      }
    );
  }
);
// After the outer "loadScript" is complete, the callback initiates the inner one.
// More scripts can continue to be added.

// Handling Errors
console.log(" ");
console.log("--- HANDLING ERRORS ---");

// Improved version of "loadScript" that tracks loading errors:
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Error loading ${src}`));

  document.head.append(script);
}

// Usage:
// loadScript(
//   "10.Promises,asyncawait/1. Introduction, callbacks/testScript.js",
//   function (error, script) {
//     if (error) {
//     } else {
//     }
//   }
// );

// The recipe used in the above example is again quite common, it is called the "error-first callback" style.
// The convention is:
// 1. The first argument of the "callback" is reversed for an error if it occurs.
//    Then "callback(err)" is called.
// 2. The second argument (and the next ones if needed) are for the successful result.
//    Then "callback(null, result1, result2...)" is called.
// So the single "callback" function is used both for reporting errors and passing back result.

// Pyramid of Doom
console.log(" ");
console.log("--- PYRAMID OF DOOM ---");

// With asynchronous actions, as calls become more nested, the code becomes deeper and increasingly
// more difficult to manage.
// That is sometimes called "callback hell" or "pyramid of doom".

// The problem can be alleviated by making every action a standalone function, like this:
loadScript(
  "10.Promises,asyncawait/1. Introduction, callbacks/testScript.js",
  step1
);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript(
      "10.Promises,asyncawait/1. Introduction, callbacks/testScript2.js",
      step2
    );
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript(
      "10.Promises,asyncawait/1. Introduction, callbacks/testScript3.js",
      step3
    );
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}

// This does the same thing, and there is no deep nesting because every action is a seperate top-level function.

// "Promises" are a better way of dealing with this, described in the next chapter.
