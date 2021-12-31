// testing code via "re-runs", running the code again and again until problems are fixed,
// is an imperfect way of testing
// e.g. a function "f", testing: f(1) works, f(2) doesn't.
// fix code for f(2) but forgot to re-test f(1), may lead to an error
// basically human error

// automated testing are tests written seperately, in addition to the code
// they run the function in various ways and compare results with expected result

// Behavior Driven Development (BDD)
// BDD is three things in one: tests, doumentation, examples
console.log("--- BDD ---");

// development of "pow": the spec
// The best way to think of "spec" is as the technical specifications for a given unit of code to pass successfully.
console.log("");
console.log("--- SPEC ---");

// a spec has three main building blocks
/*
    describe("title", function() {...})
*/

// "it", describes case it's used in and then tests it using a function (second argument)
/*
    it("use case description", function() {...})
*/
// code inside "it" block should execute without errors

// example
// "describe()", a function in the mocha/jasmine framework (testing frameworks)
// describe() is simply a way to group our tests in Mocha. We can nest our tests in groups as deep as we deem necessary.
// describe() takes two arguments, the first is the name of the test group, and the second is a callback function.
describe("pow", function () {
  it("raises to n-th power", function () {
    assert.equal(pow(2, 3), 8);
  });
});
// "assert" function (from "Chai" library), used to check whether 'pow' works as expected.
// assert.equal, compares arguments and gives error if not they are not equal
// in example, it checks result of pow(2, 3) equals 8

// development flow
// 1. initial spec is written, with tests for the most basic functionality
// 2. initial implementation is created
// 3. run testing framework "Mocha", that runs the spec, make corrections until everything works
// 4. working initial implementation with tests
// 5. add more use cases to the spec, probably not supported by implementations yet, tests start to fail
// 6. got to 3, update implementation until tests give no error
// 7. repeat steps 3-6 until functionality is ready 

// Spec in action 
// Mocha - core testing framework, provides common testing functiong (describe, it) and the main fucntion that runs tests
// Chai - library with many assertions like "assert.equal"
// Sinon - library to spy on function, emulate built-in functions and more

