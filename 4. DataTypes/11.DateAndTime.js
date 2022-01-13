// Date and Time
console.log("--- DATE AND TIME ---");

// The built-in object "Date" stores the date, time and provides methods for date/time management.
// For example, can be used to store creation/modification times, to measure time, or just print out the current date.

// Creation
console.log("");
console.log("-- CREATION --");

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
console.log("-- ACCESS DATE COMPONENTS --");

// There are methods to access the year, month and so on from the "Date" object:
// • "getFullYear()" - Get the year (4 digits)
// • "getMonth()" - Get the month, from 0 to 11
// • "getDate()" - Get the day of month, from 1 to 31.
// • "getHours(), getMinutes(), getSeconds(), getMilliseconds()" -
//    Get the corresponding time components.
// • "getDay()" - Get the day of week, from "0" (Sunday) to "6" (Saturday).
//    The first day is always Sunday, in some countries that is not so, but cannot be changed.

// All methods above return the components relative to the local time zone.
// There also their UTC-counterparts: "getUTCFullYear()", "getUTCMonth()", "getUTCDay()" etc.

// • "getTime()" - Returns the timestamp for the date - a number of milliseconds passed from 01/01/1970 UTC+0.
// • "getTimezoneOffset()" - Returns the difference between UTC and the local time zone, in minutes:
console.log(new Date().getTimezoneOffset());

// Setting Date Components
console.log("");
console.log("--- SETTING DATE COMPONENTS ---");

// The following methods allow to set date/time components:
// • setFullYear(year, [month], [date])
// • setMonth(monthm [date])
// • setDate(date)
// • setHours(hour, [min], [sec], [ms])
// • setMinutes(min, [sec], [ms])
// • setSeconds(sec, [ms])
// • setMilliseconds(ms)
// • setTimes(milliseconds) - sets the whole date by milliseconds since 01/01/1970 UTC

// All of them except "setTime()" has a UTC variant.

// Example:
let today = new Date();

today.setHours(0);
console.log(today); // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
console.log(today); // still today, now 00:00:00 sharp.

// Autocorrection
console.log("");
console.log("--- AUTOCORRECTION ---");

// With the autocorrection feature of "Date" objects, out-of-range values can be set, and it will aut-adjust itself.
// Example
date = new Date(2013, 0, 32); // 32 Jan 2013
console.log(date); // 1st Feb 2013
// Out-of-range date components are distributed automatically.

// Autocorrection automatically takes into account leap years:
date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);
console.log(date); // 1 Mar 2016

date = new Date(2017, 1, 28);
date.setDate(date.getDate() + 2);
console.log(date); // 2 Mar 2017

// The feature is often used to get the date after the given period of time.
// Example:
// get 70 seconds from now
date = new Date();
date.setSeconds(date.getSeconds() + 70);
console.log(date);

// Can also set zero or even negative values:
date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // set day 1 of month
console.log(date);

date.setDate(0); // min day is 1 so the last day of the previous month is assumed
console.log(date);

// Date to Number, Date Diff
console.log("");
console.log("--- DATE TO NUMBER, DATE DIFF ---");

// When a "Date" object is converted to number, it becomes the timestamp same as "date.getTime()" :
date = new Date();
console.log(+date); // number of milliseconds, same as date.getTime()

// The important side effect: dates can be subtracted, the result is their difference in ms.
// That can be used for time measurements:
let start = new Date(); // start measuring time

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // end measuring tie

console.log(`The loop took ${end - start} ms`);

// Date.now()
console.log("");
console.log("--- DATE.NOW() ---");

// If only time needs to be measured, the "Date" object is not needed.
// A special methods "Date.now()" returns the current timestamp.
// It is semantically equivalent to "new Date().getTime()", but it does not create
// an intermediate "Date" object. So it is faster and does not pressure on garbage collection.
start = Date.now();

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

end = Date.now();

console.log(`The loop took ${end - start} ms`); // subtract numbers, not dates

// Benchmarking
console.log("");
console.log("--- BENCHMARKING ---");

// Example of a "benchmark":
// date1 and date2, which function returns their difference in ms faster?
function diffSubtract(date1, date2) {
  return date2 - date1;
}
// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
// These do exactly the same thing, but one uses an explicit "date.getTIme()" to get the date in ms,
// and the other relies on a date-to-number transform. Their result is always the same.
// Measure:
function diffSubtract(date1, date2) {
  return date2 - date1;
}
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

console.log(`Time of diffSubtract: ${bench(diffSubtract)}ms`);
console.log(`Time of diffGetTime: ${bench(diffGetTime)}ms`);

// "getTime()" is much faster as there is no type conversion.

// For reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.
// Example:
function diffSubtract(date1, date2) {
  return date2 - date1;
}
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

// run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}

console.log(`Time of diffSubtract: ${time1}ms`);
console.log(`Time of diffGetTime: ${time2}ms`);

// Date.parse from a String
console.log("");
console.log("--- DATE.PARSE FROM A STRING ---");

// "Date.parse(str)" can read a date from a string.
// The string format should be: "YYYY-MM-DDTHH:mm:ss.sssZ", where:
// • "YYYY-MM-DD" - is the date: year-month-day.
// • The character "T" is used as the delimiter.
// • "HH:mm:ss.sss" - is the time: hours, minutes, seconds and milliseconds.
// • The optional "Z" part denotes the time zone in the format "+-hh:mm".
//   A single letter "Z" would mean UTC+0.

// Shorter variants are also possible, like "YYYY-MM-DD" or "YYYY-MM" or even "YYYY".

// The call to "Date.parse(str)" parses the string in the given format and returns the
// timestamp (number of milliseconds from 1 Jan 1970 UTC+0).
// If format is invalid, returns "NaN".

// Example:
let ms = Date.parse("2012-01-26T13:51:50.417-07:00");
console.log(ms); // 1327611110417 (timestamp)
// instantly create a "new Date" object from timestamp:
date = new Date(ms);
console.log(date); // 2012-01-26T20:51:50.417Z
