// Promisification
console.log("--- PROMISIFICATION ---");

// "Promisification" is the conversion of a function that accepts a callback into a function that returns a promise.
// Such transformations are often required in real-life, as many functions and libraries are callback-based.
// But promises are more convenient so it makes sense to promisify them.

// Example, "loadscript(src, callback)" from the chapter 10.1 "Introduction: callbacks":
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error from ${src}`));

  document.head.append(script);
}
// usage:
// loadScript("path/script.js", (err, script) => {...})

// The function loads a script with the given "src", and then calls "callback(err)" in case of an error,
// or "callback(null, script)" in case of successful loading.

// Promisify:

// Make new function "loadScriptPromise(src)", that does the same, but returns a promise instead of using callbacks.

let loadScriptPromise = function (src) {
  return new Promise((res, rej) => {
    loadScript(src, (err, script) => {
      if (err) rej(err);
      else res(script);
    });
  });
};
// usage:
// loadScriptPromise("path/script.js").then(...)

// The new function is a wrapper around the original "loadScript" function.
// It calls it providing its own callback that translates to promise "res/rej".

// In practice, more than one function may need to be promisified, so a helper is would be used.
// "promisify(f)": it accepts a to-promisify function "f" and returns a wrapper function:
function promisify(f) {
  return function (...args) {
    return new Promise((res, rej) => {
      function callback(err, result) {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      }
      args.push(callback); // append the custom callback to the end of f arguments
      f.call(this, ...args); //call the original function
    });
  };
}
// usage:
// let loadScriptPromise = promisify(loadScript);
// loadScriptPromise(...).then(...);

// If the original "f" expects a callback with more arguments "callback(err, re1, res2, ...)",
// the helper can be improved:
// • When called as "promisify(f) it should work similar to the version aboce.
// • When calles as "promisify(f, true)", it should return the promist that resolves with the array of callback result.
//   That is exactly for callbacks with many arguments.

// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((res, rej) => {
      function callback(err, ...results) {
        if (err) {
          rej(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          res(manyArgs ? results : result[0]);
        }
      }
      args.push(callback);
      f.call(this, ...args);
    });
  };
}
// usage:
// f = promisify(f, true);
// f(...).then(arrayOfResults => ..., err => ...);

// Essentially the same as first function, but "res" is called with only one or all arguments 
// depending on whether "manyArgs" is truthy.
