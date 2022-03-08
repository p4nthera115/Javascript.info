// Static Properties and Methods
console.log("--- STATIC PROPERTIES AND METHODS ---");

// A method can also be assigned to the class function itself, not to its "prototype".
// Such methods are called 'static'.

// In a class, they are prepended by "static" keyword:
let User = class User {
  static staticMethod() {
    console.log(this === User);
  }
};
User.staticMethod(); // true

// This does the same as assigning it as a property directly:
User = class User {};
User.staticMethod = function () {
  console.log(this === User);
};
User.staticMethod(); // true

// The value of "this" in "User.staticMethod()" call is the class constructor "User" itself.

// Usually, static methods are used to implement functions that belong to the class,
// but not to any particular object of it.

// For instance, using "Article" objects that need a function to compare them as an example.
// A natural solution would be to add "Article.compare" method:
let Article = class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
};

let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1)),
];

console.log(articles[0].title); // HTML

articles.sort(Article.compare); // sorts by date

console.log(articles[0].title); // CSS

// Here "Article.compare" stands 'above' articles, as a means to compare them.
// It is not a method of an article, but rather of the whole class.

// Another example would be a so-called "factory" method.
// There needs to be a few ways to create an article:
// 1. Create by given parameters ("title", "date", etc.).
// 2. Create an empty article with today's date.

// The first way can be implemented by the constructor.
// The second can be done by making a static method of the class.

// "Article.createTodays()":
Article = class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static createTodays() {
    // this = Article
    return new this("Today's Digest", new Date());
  }
};

let article = Article.createTodays();

console.log(article.title); // Today's Digest

// Now every time a "Today's Digest" needs to be created, "Article.createTodays()" can be called.
// That is not a method of an article, but a method of the whole class.

// Static methods are also used in database-related classes to search/save/remove entries from the database,
// like this:
/*
    // assuming Article is a special class for managing articles
    // static method to remove the article:
    Article.remove({ id: 12345 });
*/

// Static Properties
console.log();
console.log("--- STATIC PROPERTIES ---");

// ~~ This is a recent addition to he language ~~

// Static properties  are also possible, they look like regular class properties, but prepended by "static":
Article = class Article {
  static publisher = "Finn Mertens";
};

console.log(Article.publisher); // Finn Mertens

// This is the same as a direct assignment to "Article":
Article.publisher = "Jake The Dog";

console.log(Article.publisher); // Jake The Dog

// Inheritance of Static Properties and Methods
console.log();
console.log("--- INHERITANCE OF STATIC PROPERTIES AND METHODS ---");

// Static properties and methods are inherited.

// For instance, "Animal.compare" and "Animal.planet" in the code below are inherited
// and accessible as "Rabbit.compare" and "Rabbit.planet":
let Animal = class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
};

// Inherit from Animal
let Rabbit = class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }
};

let rabbits = [new Rabbit("White Rabbit", 10), new Rabbit("Black Rabbit", 5)];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Black Rabbit runs with speed 5.

console.log(Rabbit.planet); // Earth

// Now when "Rabbit.compare" is called, the inherited "Animal.compare" will be called.

// This works using prototypes.
// "extends" gives "Rabbit" the "[[Prototype]]" reference to "Animal".

// So, "Rabbit extends Animal" creates two "[[Prototype]]" references:
// 1. "Rabbit" function prototypally inherits from "Animal" function.
// 2. "Rabbit.prototype" prototypally inherits from "Animal.prototype".

// As a result, inheritance works both for regular and static methods.

// The code:
Animal = class Animal {};
Rabbit = class Rabbit extends Animal {};

// for statics
console.log(Rabbit.__proto__ === Animal); // true

// for regular methods
console.log(Rabbit.prototype.__proto__ === Animal.prototype); // true
