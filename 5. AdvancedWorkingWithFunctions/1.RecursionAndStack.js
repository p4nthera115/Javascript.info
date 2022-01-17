// Recursion and Stack
console.log("");
console.log("--- RECURSION AND STACK ---");

// When a function solves a task, in the process it can call many other functions.
// A partial case of this is when a function calls itself. That is called recursion.

// Two ways of thinking
console.log("");
console.log("--- TWO WAYS OF THINKING ---");

// Simple function that raises "x" to a natural power of "n":
// Two ways to implement this:

// 1. Iterative thinking: the "for" loop:
function pow(x, n) {
  let result = 1;

  // multiply result by (xn) times in the loop
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
// Does not return anything until "n == 1".

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

//  As the function finished, its execution context is no longer needed, so it is removed from memory.
// The previous one is restored off the top of the stack:
// • Context: { x: 2, n: 2, at line 5 }   call: pow(2, 2)
// • Context: { x: 2, n: 2, at line 5 }   call: pow(2, 3)
// The execution of "pow(2, 2)" is resumed. It has the result of the subcall "pow(2, 1)",
// so it also can finish the evaluation of "x * pow(x, n - 1)", returning 4.

// Then the previous context is restored:
// • Context: { x: 2, n: 3, at line 5 }   call: pow(2, 3)
// When it finishes, the result is "pow(2, 3) = 8".
// The recursion depth in this case was: 3.

// Contexts take memory. In the above case,
// raising to the power of "n" actually requires the memory for "n" contexts, for all lower values of "n".

// A loop based algorithm is more memory-saving:
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
// The iterative "pow" uses a single context changing "i" and "result" in the process.
// Its memory requirements are small, fixed and do not depend on "n".

// Any recursion can be written as a loop. The loop variant usually can be made more effective.
// Loops become harder to use when functions use different recursive subcalls depending on conditions
// and merges their results or when the branching becomes more intricate.
// Optimization for a loop may be unneeded and not worth the effort.
// Recursion can give a shorter code that is easier to support and understand.

// Recursive Traversals
console.log("");
console.log("--- RECURSIVE TRAVERSALS ---");

// Another great application of recursion is a recursive traversal.
// Example: Imagine a company, the staff structure can be presented as an object:
let company = {
  sales: [
    {
      name: "Finn",
      salary: 1000,
    },
    {
      name: "Jake",
      salary: 1600,
    },
  ],

  development: {
    sites: [
      {
        name: "Cinnamon Bun",
        salary: 2000,
      },
      {
        name: "Peppermint Butler",
        salary: 1800,
      },
    ],

    internals: [
      {
        name: "Starchy",
        salary: 1300,
      },
    ],
  },
};
// In other words, a company has department.
// • A departmant may have an array of staff. For instance,
//   "sales" department has 2 emmployees: Finn and Jake.
// • Or a department may split into sub-departments, like "development" has two branches:
//   "sites" and "internals". Each of them has their own staff.
// • It is also possible that when a sub-department grows, it divides into
//   sub-sub-departments (or teams).
//   For instance, the "sites" department in the future may be split into teams for "siteA" and "siteB".
//   And they, potentially, can split even more.

// A function to get the sum of all salaries -
// An iterative approach is not easy as it would require many subloops for all the sub-departments,
// this will get complicated and will look ugly.

// Try recursion -
// When the function gets a  department to sum, there are two possible cases:
// 1. Either it is a "simple" department with an array of people - then the salaries can be summed in a simple loop.
// 2. Or it is an object with "N" sub-departments - then "N" amount of recursive calls can be made to get the sum
//    for each of the sub-departments and combine the results.

// The 1st case is the base of recursion, the trivial case, when an array is received.
// The 2nd case, when an object is received, is the recursive step. A complex task is split into subtasks for
// smaller departments. They may in turn split again, but sooner or later the split will finish at (1).

// The code:
// same object
company = {
  sales: [
    {
      name: "Finn",
      salary: 1000,
    },
    {
      name: "Jake",
      salary: 1600,
    },
  ],

  development: {
    sites: [
      {
        name: "Cinnamon Bun",
        salary: 2000,
      },
      {
        name: "Peppermint Butler",
        salary: 1800,
      },
    ],

    internals: [
      {
        name: "Starchy",
        salary: 1300,
      },
    ],
  },
};

// the function
function sumSalaries(department) {
  if (Array.isArray(department)) {
    // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else {
    // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for sub-departments, sum the results
    }
    return sum;
  }
}

console.log(sumSalaries(company)); // 7700

// The principle: for an object, subcalls are made, while arrays give immediate results.
// The code ises smart features that have been covered:
// • Method "arr.reduce" gets the sum of the arrays.
// • Loop "for(val of Object.values(obj))" iterates over object values:
//   "Object.values" returns an array of them.

// Recursive Structures
console.log("");
console.log("--- RECURSIVE STRUCTURES ---");

// A recursive (recusively-defined) data structure is a structure that replicates itself in parts.
// It is seen in the company structure example above.
// A company department is:
// • Either an array of people.
// • Or an object with departments.

// For web-developers HTML and XML documents are a better-known example.
// In the HTML document, an HTML-tag may contain a list of:
// Text pieces.
// HTML-comments.
// Other HTML-tags (that in turn may contain text pieces/comments or other tags etc).
// This is again a recursive definition.

// Linked list
console.log("");
console.log("-- Linked list --");

// "Linked list" is a recursive structure that can be a better alternative for arrays in some cases.

// To store an ordered list of objects, the natural choice would be an array:
// let arr = [obj1, obj2, obj3];
// But, as noted in "4. DataTypes/5.ArrayMethods.js", inserting and deleting elements can be problematic
// when working with the beginning of the array, due to mass-renumbering.
// If fast insertion/deletion is needed, the "linked list" data structure can be used.

// The linked list element is recursively defined as an object with:
// • "value".
// • "next" property referencing the next linked list element of "null" if that is the end.

// Example:
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

// Alternative code for creation:

list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
// Here all objects can be seen clearly, each one has the "value" and "next" pointing to the neighbour.
// The "list" variable is the first object in the chain, so following "next" pointers from it
// any element can be reached.

// The list can be split into multiple parts and later joined back:
let secondList = list.next.next;
list.next.next = null;

// to join:
list.next.next = secondList;

// Items in any place can be inserted or removed.
// For instance, to prepend a new value, the head of the list needs to be updated:
list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
// prepend the new value to the lest
list = { value: "new item", next: list };

// To remove a value from the middle, change "next" of the previous one:
list.next = list.next.next;
console.log(list);

// "list.next" jumped over "1" to value "2". The value "1" is now excluded from the chain and
// will be removed automatically if it is not stored anywhere else.

// The main drawback is that an element can not be easily accessed using its number.
// In an array "arr[n]" is a direct referenct, but in a list "next" needs to be written "N" amount of times.

// Lists can be enhanced:
// • Property "prev" can be added in addition to "next" to reference previous elements, to move back easily.
// • A variable "tall" can also be added to reference the last element of the list
//   (and update it when adding/removing elements from the end).
// • The data structure may vary according to the required needs.

// Tasks
console.log("");
console.log("--- TASKS ---");

// Sum All Numbers Till The Given One
console.log("");
console.log("--- TASK 1 ---");
// Write a function "sumTo(n)" that calculates the sum of numbers "1 + 2 + ... + n"
// 3 solutions:
// 1. Using a for loop.
// 2. Using a recursion, cause "sumTo(n) = n + sumTo(n - 1)" for "n > 1".
// 3. Using arithmetic progression formula.

// Loop:
console.log("-- loop --");
function sumTo(n) {
  sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log(sumTo(1)); // 1
console.log(sumTo(2)); // 3
console.log(sumTo(3)); // 6
console.log(sumTo(4)); // 10
console.log(sumTo(100)); // 5050

// Recursion:
console.log("-- recursion --");
function sumTo1(n) {
  let sum = 0;
  if (sum === n) {
    return sum;
  } else {
    return (sum += n + sumTo1(n - 1));
  }
}

// Their recursion solution:
// function sumTo(n) {
//   if (n == 1) return 1;
//   return n + sumTo(n - 1);
// }

console.log(sumTo1(1));
console.log(sumTo1(2));
console.log(sumTo1(3));
console.log(sumTo1(4));
console.log(sumTo1(100));

// Arithmetic Progression:
console.log("-- arithmetic progression --");
function sumTo2(n) {
  return (n * (n + 1)) / 2;
}

console.log(sumTo2(1));
console.log(sumTo2(2));
console.log(sumTo2(3));
console.log(sumTo2(4));
console.log(sumTo2(100));

// Output A Single-linked List
console.log("--- TASK 2 ---");
// Write a function "printList(list)" that outputs list items one-by-one.
// 2 variants:
// 1. Using loop
// 2. Using recursion

list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

// Loop:
console.log("-- loop --");

function printList(list) {
  let item = list;
  while (item) {
    console.log(item.value);
    item = item.next;
  }
}

printList(list);

// Recursion:
console.log("-- recursion --");

function printList1(list) {
  console.log(list.value);
  if (list.next) {
    printList1(list.next);
  }
}

printList1(list);
