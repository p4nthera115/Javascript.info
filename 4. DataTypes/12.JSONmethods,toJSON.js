// JSON methods, toJSON
console.log("--- JSON METHODS, TOJSON ---");

// A complex object, can be converted into a string like this:
let user = {
  name: "Finn",
  age: 16,

  toString() {
    return `{ name: "${this.name}", age: ${this.age} }`;
  },
};

console.log(user);
// but in the process of development, new properties are added, old ones are renamed and removed.
// Updating "toString" will become bothersome. Looping over them may also cause problems if the object
// has nested properties.
// "JSON.stringify" handles this all.
// The JSON (JavaScript Object Notation) is general format to represent values and objects.

// JSON.stringify
console.log("");
console.log("--- JSON.STRINGIFY ---");

// "JSON.stringify" converts objects into JSON.
let student = {
  name: "Finn",
  age: 16,
  isAdmin: false,
  courses: ["html", "css", "js"],
  wife: null,
};

let json = JSON.stringify(student);
console.log(json);
// resulting "json" string is called a JSON-encoded or serialized or stringified or marshalled object.
// JSON-encoded objects have deveral differenced from the object literal:
// • String use double quotes. No single quotes or backticks in JSON. So 'Finn' becomes "Finn".
// • Object property names are also double-quoted. age: 30 becomes "age": 30

// JSON.stringify can also be applied to primitives.
// JSON supports following data types:
// • Objects {},
// • Arrays [],
// • Primitives: strings, numbers, boolean values true/false, null.

// Examples:

// a number in JSON is just a number
console.log(JSON.stringify(1)); // 1

// a string in JSON is still a string, double-quoted
console.log(JSON.stringify("test")); // "test"

console.log(JSON.stringify(true)); // true

console.log(JSON.stringify([1, 2, 3])); // [1, 2, 3]

// Some JS-specific object properties are skipped by "JSON.stringify":
// • Function properties (methods).
// • Symbolic keys and values.
// • Properties that store "undefined"
user = {
  sayHi() {
    // ignored
    console.log("Hello");
  },
  [Symbol("id")]: 123, // ignored
  something: undefined, // ignored
};
console.log(JSON.stringify(user)); // {}, empty object

// Nested objects are supported and converted automatically:
let meetup = {
  title: "Conference",
  room: {
    number: 23,
    participants: ["finn", "jake"],
  },
};
console.log(JSON.stringify(meetup));
// The important limitation: there must be no circular references:
let room = {
  number: 23,
};

meetup = {
  title: "Conference",
  participants: ["finn", "jake"],
};

meetup.place = room; // meetup references room
room.occupiedBy = meetup; // room references meetup
// JSON.stringify(meetup); // Error: Converting circular structure to JSON

// Excluding and transforming: replacer
console.log("");
console.log("-- Excluding and transforming: replacer --");

// The full syntax of "JSON.stringify" is:
/*
    let json = JSON.stringify(value[, replacer, space]);
*/
// • value - a value to encode
// • replacer - array of properties to encode or a mapping function "function(key, value)"
// • space - amount of space to use for formatting

// Most of the time ony the first argument is used, but if the replacement process needs to be fine-tuned,
// like to filter out circular references, the second argument is used.
// If an array of properties is passed to it, only those properties are encoded.
// Example:
room = {
  number: 23,
};

meetup = {
  title: "Conference",
  participants: [{ name: "Finn" }, { name: "Jake" }],
  place: room, // meetup references room
};

room.occupiedBy = meetup; // room references meetup

console.log(
  JSON.stringify(meetup, ["title", "participants", "place", "name", "number"])
);

// A function can be used instead of an array as the "replacer" so as to not have the property list so long.
// The function will be called for every "(key, value)" pair ans should return the "replaced" value,
// which will be used instead of the original one. Or "undefined" if the value is to be skipped.
// Example:
console.log("");
room = {
  number: 23,
};

meetup = {
  title: "Conference",
  participants: [{ name: "Finn" }, { name: "Jake" }],
  place: room, // meetup references room
};

room.occupiedBy = meetup; // room references meetup

console.log(
  JSON.stringify(meetup, function replacer(key, value) {
    console.log(`${key}: ${value}`);
    return key == "occupiedBy" ? undefined : value;
  })
);

// Formatting: space
console.log("");
console.log("-- Formatting: space --");

// The third argument "space" is the number of spaces to use for pretty formatting.
// The "space" argument is used exclusively for a nice output.
// Example: here "space = 2" gives an indentation of 2 spaces inside an object:
user = {
  name: "Finn",
  age: 16,
  roles: {
    isAdmin: false,
    isHero: true,
  },
};
console.log(JSON.stringify(user, null, 2));
// "space" can also be a string, in this case the string would be used instead of indentation.
console.log(JSON.stringify(user, null, "lol"));

// Custom "toJSON"
console.log("");
console.log('-- Custom "toJSON" --');

// Like "toString" for string conversion, an object may provide method "toJSON" for to-JSON conversion.
// "JSON.stringify" automatically calls it if available.
// Example:
room = {
  number: 23,
};

meetup = {
  title: "Conference",
  date: new Date(2017, 0, 1),
  room,
};

console.log(JSON.stringify(meetup, null, 2));
// add custom "toJSON" for "room" object:
room = {
  number: 23,
  toJSON() {
    return this.number;
  },
};

meetup = {
  title: "Conference",
  room,
};

console.log(JSON.stringify(room));
console.log(JSON.stringify(meetup, null, 1));
// "toJSON" is used both for the firect call "JSON.stringify(room)" and when "room" is nested in another
// encoded object.

// JSON.parse
console.log("");
console.log("--- JSON.PARSE ---");

// • "JSON.parse" decodes JSON back into objects.
// Syntax:
/*
    let value = JSON.parse(str, [reviver]);
*/
// • str - JSON-string to parse
// • reviver - Optional function(key, value) that will be called for each "(key, value)" pair
//   and can transform the value.

// Example:

// stringified array
let numbers = "[0, 1, 2, 3]";
numbers = JSON.parse(numbers);
console.log(numbers);

// for nested objects:
let userData =
  '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0, 1, 2, 3] }';
user = JSON.parse(userData);
console.log(user.friends[1]); // 1

// Using reviver
console.log("");
console.log("-- Using reviver --");

// A stringified "meetup" object from is received from the server:
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

// calling JSON.parse to decode will cause an error:
// meetup = JSON.parse(str);
// console.log(meetup.date.getDate); // error

// The calue of "meetup.date" is a string, not a "Date" object.
// To correctly transform into a "Date", pass "JSON.parse" the reviving function as the second argument,
// that returns all values "as is", but date will become a "Date":
str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

meetup = JSON.parse(str, function (key, value) {
  if (key == "date") return new Date(value);
  return value;
});

console.log(meetup.date.getDate()); // 30

// also works for nested object:

let schedule = `{
    "meetups": [
      {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
      {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
    ]
  }`;

schedule = JSON.parse(schedule, function (key, value) {
  if (key == "date") return new Date(value);
  return value;
});

console.log(schedule.meetups[1].date.getDate()); // 18
