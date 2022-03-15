// Mixins
console.log("--- MIXINS ---");

// In JS, inheritance can only be from a single object.
// There can be only one "[[Prototype]]" for an object. And a class may extend only one other class.

// A "mixin" is a class containing mehod that can be used by other classes without a need to inherit from it.
// In other words, a "mixin" provides methods that implement a certain behaviour,,
// but it is not used alone, it is used to add the behaviour to other classes.

// A mixin example
console.log();
console.log("--- A  MIXIN EXAMPLE ---");

// The simplest way to implement a mixin in JS is to make an object with useful methods, so they can
// easily be merged into a prototype of any class.

// For instance here the mixin "sayHiMixin" is used to add some "speech" for "User":
// mixin
let sayHiMixin = {
  sayHi() {
    console.log(`Hey ${this.name}`);
  },
  sayBye() {
    console.log(`Bye ${this.name}`);
  },
};

//usage:
let User = class User {
  constructor(name) {
    this.name = name;
  }
};

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude

// There is no inheritance, but a simple method copying.
// So "User" may inherit from another calss and also include the mixin to "mix-in" the additional methods, like this:
/*
    class User extends Person {
        // ...
    }

    Object.assign(User.prototype, sayHiMixin);
*/
// Mixins can make use of inheritance inside themselves.

// For instance, here "sayHiMixin" inherits from "SayMixin":
let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};
sayHiMixin = {
  __proto__: sayMixin, // (or "object.setPrototypeOf" can be used to set the prototype here)

  sayHi() {
    // call parent method
    super.say(`Hey ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  },
};

User = class User {
  constructor(name) {
    this.name = name;
  }
};

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hey Dude

// The call to the parent method "super.say()" from "sayHiMixin" (at lines labelled "(*)")
// looks for the method in the prototype of that mixin, not the class.

// This is because methods "sayHi" and "sayBye" were initially created in "sayHiMixin".
// So even though they got copied, their "[[HomeObject]]" internal property references "sayHiMixin".

// As "super" looks for parent methods in "[[HomeObject]].[[Prototype]]",
// that means it searches "sayHiMixin.[[Prototype]]", not "User.[[Prototype]]".

// EventMixin
console.log();
console.log("--- EventMixin ---");

// An important feature of many browser objects (for instance) is that they can generate events.
// Events are a great way to "broadcast information" to anyone who wants it.
// The following mixin will be able to easily add event-related functions to any class/object.

// • The mixin will provide a method ".trigger(name, [...data])" to "generate an event"
//   when something important happens to it. The "name" argument is a name of the event,
//   optionally followed by additional arguments with event data.
// • Also the method ".on(name, handler)" that adds "handler" function as the listener to events
//   with the given name. It will be called when an event with the given "name" triggers,
//   and get the arguments from the ".trigger" call.
// • ...And the method ".off(name, handler)" that removes the "handler" listener.

// After adding the mixin, an object "user" will be able to generate an event "login" when the visitor logs in.
// And another object, say, "calender" may want to listen for such events to load the calendar for the logged-in person.

// Or, a "menu" can generate the even "select" when a menu item is selected, and other objects may assign handlers to
// react on that event. And so on.

// The code:
let eventMixin = {
  /**
   * subcribe to event, usage:
   * menu.on("select", function(item) { ... })
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Cancel the subscription, usage:
   * menu.off("select", handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Generate an event with the given name and data
   * this.trigger("select", data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // no handlers for that event name
    }

    // call the handlers
    this._eventHandlers[eventName].forEach((handler) =>
      handler.apply(this, args)
    );
  },
};

// • ".on(eventName, handler)" - assigns function "handler" to run when the event with that name occurs.
//   Technically, there is an "_eventHandlers" property that stores an array of handlers for each ecent name,
//   and it just adds it to the list.
// • ".off(eventName, handler)" - removes the function from the handlers list.
// • ".trigger(eventName, ...args)" - generates the event: all handlers from "_eventHandlers[eventName]" are called,
//   with a list of arguments "...args".

// Usage:

// make a class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// add the mixin with event-related methods
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// add a handler, to be called on selection:
menu.on("select", (value) => console.log(`Value selected: ${value}`));

// triggers the event => the handler above runs and shows:
// value selected: 123
menu.choose("123");

// Now if any code is wanted to react to a menu selection, it can be listened for with "menu.on(...)".

// And "eventMixin" mixin makes it easy to add such behaviour to as many classes as wanted,
// without interfering with the inheritance chain.
