// const header = document.querySelector("h1");
// header.innerText = "Nullish coalescing operator '??'";

// ?? (nullish coalescing operator)
// recent addition to JS
console.log("");
console.log("--- NULLISH COALESCING OPERATOR ---");

// treats null and undefined similarly
// an expression is "defined" when it's neither null nor undefined
// ?? returns first argument that is not null or undefined
console.log(1 ?? null);
console.log(undefined ?? "hi");
console.log(null ?? undefined ?? 0 ?? null);

// result = (a ?? b);
// can be written as
// result = (a !== null && a !== undefined) ? a : b;

// common use for ?? is to provide a default value for potentially undefined variable
let user;
console.log(user ?? "anonymous");

user = "Gunter";
console.log(user ?? "anonymous");

// comparison with || (OR)
// || returns the first truthy value
// || does not distinguish between falsy values
// ?? returns the first defined value

// example of using ?? for defaults
let height = 0;

console.log(height || 100);
console.log(height ?? 100);

// JS forbids using ?? together with && and || unless precedence is explicitly specified with brackets
// let x = 2 && 2 ?? 3; // syntax error
let x = (1 && 2) ?? 3;
console.log(x);
