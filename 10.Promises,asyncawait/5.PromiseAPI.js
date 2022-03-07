// Promise API
console.log("--- PROMISE API ---");

// There are 6 static methods in the "Promise" class.

// Promise.all
console.log(" ");
console.log("--- PROMISE.ALL ---");

// "Promise.all" takes an array of promises (can be any iterable but usually an array) and returns a new promise.
// Syntax:
/*
    let promise = Promise.all([...promises...]);
*/
// The new promise resolves when all listed promises are resolved, and the array of their results become its result.

// Example, the "Promise.all" below settles after 3 seconds, and then its result is an array "[1, 2, 3]":
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(console.log); // 1, 2, 3 when promises are ready: rach promise contributes an array number
// Note: The order of the resulting array members is the same as in its source promises.
//       Even though the first promise takes the longest time to resolve, it is still first in the array of results.

// A common trick is to map an array of job data into an array of promises, and then wrap that into "Promise.all".
// For instance, with an array of URLs, they can be fetched like this:
let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// map every url to the promise of the fetch
let requests = urls.map((url) => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests).then((responses) =>
  responses.forEach((response) =>
    console.log(`${response.url}: ${response.status}`)
  )
);

// A bigger example with fetching user information for an array of GitHub users by their names:
let names = ["iliakan", "remy", "jeresig"];

requests = names.map((name) => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then((responses) => {
    // all responses are resolved successfully
    for (let response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then((users) => users.forEach((user) => console.log(user.name)));

//  ~~ If any of the promises are rejects, the promise returned by "Promise.all" immediately rejects with that error. ~~
// Example:
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]);
// Here, the second promise rejects in two second. That leads to an immediate rejection of "Promise.all", so ".catch"
// executes: the rejection error becomes the outcome of the entire "Promise.all".

// Promise.allSettled
console.log(" ");
console.log("--- PROMISE.ALLSETTLED ---");

// "Promise.all" rejects as a whole if any promise rejects.
// "Promise.allSettled" waits for all promises to settle, regardless of the result.
// The resulting array has:
// • "{ status: "fulfilled", value:result }" for successful responses,
// • "{ status: "rejected", reason:error } for errors.

// Example, fetch information about multiple users, even if one request fails:
urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  results.forEach((result, num) => {
    // (*)
    if (result.status == "fulfilled") {
      console.log(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      console.log(`${urls[num]}: ${result.reason}`);
    }
  });
});

// The "results" in line "(*)" will be:
/*
    [
        { status: "fulfilled", value: ...response... },
        { status: "fulfilled", value: ...response... },
        { status: "rejected", value: ...error object... },
    ]
*/

// So for each promise, its status and "value/error" is shown.

// Polyfill
console.log(" ");
console.log("-- Polyfill --");

// If the browser does not support "Promise.allSettled", it is easy to polyfill:
if (!Promise.allSettled) {
  const rejectHandler = (reason) => ({ status: "rejected", reason });

  const resolveHandler = (value) => ({ status: "fulfilled", value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map((p) =>
      Promise.resolve(p).then(resolveHandler, rejectHandler)
    );
    return Promise.all(convertedPRomises);
  };
}

// In this code, "promises.map" takes input values, turns them into promises with "(p) => Promise.resolve(p)",
// and then adds ".then" handler to every one.

// That handler turns a successful result "value" into "{ status: "fulfilled", value }",
// and an error "reason" into "{ status: "rejected", reason }".
// That is exactly the format of "Promise.allSettled".

// Promise.race
console.log(" ");
console.log("--- PROMISE.RACE ---");

// Similar to "Promise.all", waits only for the first settled promise and gets its result (or error).
// Syntax:
/*
    let promise = Promise.race(iterable);
*/

// For instance, here the result will be "1":
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Oops")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(console.log); // 1
// The first promise here was the fastest , so it became the result. After the first
// settled promise "wins the race", all further results/error are ignored.

// Promise.any
console.log(" ");
console.log("--- PROMISE.ANY ---");

// Similar to "Promise.race", but waits only for the first fulfilled promise and gets its result.
// If all of the given promises are rejected, then the returned promise is rejected with
// "AggregateError" - a special error object that stores all promise errors in its "errors" property.

// Syntax:
/*
    let promise = Promise.any(iterable);
*/

// Here, Result will be "2":
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Error")), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(console.log);

// The first promise here was fasted, but it was rejected, so the second promise became the result. After the first
// fulfilled promise "wins the race", all further results are ignored.

// Example of when all promises fail:
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Ouch!")), 1000)
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Error!")), 2000)
  ),
]).catch((error) => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error
});
// Error objects for failed promises are available in the "errors" property of the "AggregateError" object.

// Promise.resolve/reject
console.log(" ");
console.log("--- PROMISE.RESOLVE/REJECT ---");

// Methods "Promise.resolve" and "Promise.reject" are rarely needed in modern codem because "async/await" syntax
// makes them somewhat obsolete.

// They are covered here for completeness.

// Promise.resolve
console.log("-- Promise.resolve --");

// "Promise.resolve(value)" creates a resolved promise with the result "value".

// Same as:
// let promise = new Promise(resolve => resolve(value));

// The method is used for compatibility, when a function is expected to return a promise.

// For example, the "loadCached" function below fecthes a URL and caches its content. For future calls with the same
// URL it immediately gets the previoud content from cache, but uses "Promise.resolve" to make a promise of it,
// so the returned value is always a promise:
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }
  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      cache.set(url, text);
      return text;
    });
}
// "loadCached(url).then(...)" can be written because the function is guaranteed to return a promise.
// ".then" can always be used after "loadCached". That is the purpose of "Promise.resolve" in the line "(*)".

// Promise.reject
console.log(" ");
console.log("-- Promise.reject --");

// "Promise.reject(error)" creates a rejected promise with "error".
// Same as:
// let promise = new Promise((resolve, reject) => reject(error));

// In practice, this methos is almost never used.
