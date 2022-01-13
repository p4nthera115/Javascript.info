// Date and Time
console.log("--- DATE AND TIME ---");

// The built-in object "Date" stores the date, time and provides methods for date/time management.
// For example, can be used to store creation/modification times, to measure time, or just print out the current date.

// Creation
console.log("");
console.log("-- Creation --");

// To create a new "Date" object call "new Date()" with one of the following arguments:

// "new Date()" - without arguments, create a "Date" object for the current date and time:
let now = new Date();
console.log(now);

// "new Date(milliseconds)" - create a "Date" object with the time equal to number of milliseconds passed after
// 01/01/1970 UTC+0:
let Jan01_1970 = new Date(0);
console.log(Jan01_1970);
// now add 24 hours, get 02/01/1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log(Jan02_1970);

// An integer number representing the number of milliseconds that has passed since the beginning of 1970
// is called a "timestamp".

// Dates before 01/01/1970 have negative timestamps, e.g.:
// 31 Dec 1969
let Dec31_1969 = new Date(-24 * 3600 * 1000);
console.log(Dec31_1969);

// "new Date(datestring)" - if there is a single argument, and it is a string, then it is parsed automatically.
// The algorithm is the same as "Date.parse" uses.
let date = new Date("2022-01-13");
console.log(date);
// The time is not set, so it's assumed to be midnight GMT and
// is adjusted according to the timezone the code is run in
// So the result could be
// Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
// or
// Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)

// "new Date(year, month, date, hours, minutes, seconds, ms)" - crate the date with the given components in
// the local time zone. Only the first two arguments are obligatory.
// • The "year" must have 4 digits.
// • The "month" count starts with 0 (Jan), up to 11 (Dec).
// • The "date" parameter is actually the day of the month, if absent "1" is assumed.
// • If "hours/minutes/seconds/ms" is abdent, they are assumed to be equal "0".
// Example:
let date1 = new Date(2011, 0, 1, 0, 0, 0, 0);
let date2 = new Date(2011, 0, 1);
console.log(date1);
console.log(date2);
// maximal precision is 1 ms

// Access Date Components
console.log("");
console.log("-- Access date components --");

// There are methods to access the year, month and so on from the "Date" object:
// • "getFullYear()" - Get the year (4 digits)
// • "getMonth()" - Get the month, from 0 to 11
// • "getDate()" - Get the day of month, from 1 to 31.
// • "getHours(), getMinutes(), getSeconds(), getMilliseconds()" -
//    Get the corresponding time components.

