// Recursion and Stack
console.log("");
console.log("--- RECURSION AND STACK ---");

// When a function solves a task, in the process it can call many other functions.
// A partial case of this is when a function calls itself. That is called recursion.

// Two ways of thinking
console.log("");
console.log("--- TWO WAYS OF THINKING ---");

// Simple function that raises "x" to a natural power of "n":
// two ways to implement this:

// 1. Iterative thinking: the "for" loop:
function pow(x, n) {
  let result = 1;

  // multiply result by x n times in the loop
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
console.log(pow(2, 3)); // 8

// 2. Recursive thinking: simplify the task and call self:
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}
console.log(pow(2, 3)); // 8
// When "pow(x, n)" is called, the execution splits into two branches:
// 1. If "n == 1", then everythingis trivial. It is called the base of recursion, because it immediately produces the
//    obvious result: "pow(x, 1)" equals "x".
// 2. Otherwise, "pow(x, n)" can be represented as "x * pow(x, n - 1)". In maths, one would write " x^n = x * x^(n-1) ".
//    This is called a recursive step: the task can be transformed into a simpler action (multiplication by "x")
//    and a simpler call of the same task ("pow" with lower "n"). Next steps simplify further and further until
//    "n" reaches "1".
// It can also be said that "pow" recursively calls itself until "n == 1".

// Example: to calculate "pow(2, 4)" the recursive variant does these steps:
// 1. pow(2, 4) = 2 * pow(2, 3)
// 2. pow(2, 4) = 2 * pow(2, 2)
// 3. pow(2, 4) = 2 * pow(2, 1)
// 4. pow(2, 4) = 2

// So, the recursion reduces a function call to a simpler one, and then - to even more simpler, and so on,
// until the result becomes obvious.

// The maximal number of nested calls (including the first one) is called "recursion depth".
// In this case, it will be exactly "n".

// The Execution Context and Stack
console.log("");
console.log("--- THE EXECUTION CONTEXT AND STACK ---");

// The information about the process of execution of a running function is stored in its "execution context".
// The execution context is an interanal data structure that contains details about the execution of a function:
// where the control flow is now, the current variables, the value of "this" and few other internal details.

// One function call has exactly one execution context associated with it.

// When a function makes a nested call this, the following happens:
// • The current function is paused.
// • The execution context associated with it is remembered in a special data structure called "execution context stack".
// • The nested call executes.
// • After it ends, the old execution context is retrieved from the stack, and the outer function is resumed.

// What happens during the "pow(2, 3)" call.
console.log("");
console.log("-- pow(2, 3) --");
// In the beginning of the call "pow(2, 3)" the execution context will store variables: "x = 2, n = 3",
// the execution flow is at line 1 of the function:
// • Context: { x: 2, n: 3, at line 1 }   call: pow(2, 3)
// That is when the function starts to execute. The condition "n == 1" is falsy, so the flow
// continues into the second branch of "if":
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1); // <--
  }
}
console.log(pow(2, 3));
// The variables are same, but the line changes, so the context is now:
// • Context: { x: 2, n: 3, at line 5 }   call: pow(2, 3)
// To calculate "x * pow(x, n - 1)", a subcall of "pow" with new arguments "pow(2, 2)" needs to be made.

// pow(2, 2)
console.log("-- pow(2, 2) --");
// To do a nested call, JS remembers the current execution context in the "execution context stack".
// Here the same function "pow" is called, but this does not matter.
// The process is the same for all functions:
// 1. The current context is "remembered" on top of the stack.
// 2. The new context is created for the subcall.
// 3. When the subcall is finished - the previous context is popped from the stack, and its execution continues.

// Context stack when the subcall "pow(2, 2)" is entered:
// • Context: { x: 2, n: 2, at line 1 }   call: pow(2, 2)
// • Context: { x: 2, n: 3, at line 5 }   call: pow(2, 3)
// When the subcall is finished - it is easy to resume the previous context, as it keeps both variables and the
// exact place of the code where it stopped.

// pow(2, 1)
console.log("-- pow(2, 1) --");
// The process repeats: a new subcall is made at line 5, now with arguments "x = 2", "n = 1".
// A new execution context is created, the previous one is pushed on top of the stack:
// • Context: { x: 2, n: 1, at line 1 }   call: pow(2, 1)
// • Context: { x: 2, n: 2, at line 5 }   call: pow(2, 2)
// • Context: { x: 2, n: 3, at line 5 }   call: pow(2, 3)
// There are 2 old contexts now and 1 currently running for "pow(2, 1)".

// The exit
console.log("-- The exit --");
// During the execution of "pow(2, 1)", unlike before, the condition "n == 1" is truthy,
// so the first branch of "if" works:
function pow(x, n) {
  if (n == 1) {
    return x; // <--
  } else {
    return x * pow(x, n - 1);
  }
}
// There are no more nested calls, so the function finishes, returning "2".
