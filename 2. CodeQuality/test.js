// First Variant
// describe("pow", function () {
//   it("raises to n-th power", function () {
//     assert.equal(pow(2, 3), 8);
//     assert.equal(pow(3, 4), 81);
//   });
// });

// Second Variant
// describe("pow", function () {
//   it("2 raised to power 3 is 8", function () {
//     assert.equal(pow(2, 3), 8);
//   });

//   it("3 raised to power 4 is 81", function () {
//     assert.equal(pow(3, 4), 81);
//   });
// });

// when "assert" triggers an error, "it" block immediately terminates
// first variant, if first assert fails, second assert will never be seen
// second variant avoids that by making 2 seperate tests, giving more information

// one test checks one thing

// describe("pow", function () {
//   function makeTest(x) {
//     let expected = x * x * x;
//     it(`${x} in the power 3 is ${expected}`, function () {
//       assert.equal(pow(x, 3), expected);
//     });
//   }
//   for (let x = 1; x <= 5; x++) {
//     makeTest(x);
//   }
// });

// "makeTest" and "for" should be grouped together as they share a common task (check how "pow" raises into the given power)

describe("pow", function () {
  describe("raises x to power 3", function () {
    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function () {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }
  });

  it("for negative n the result is NaN", function () {
    assert.isNaN(pow(2, -1));
  });

  it("for non-integer n the result is NaN", function () {
    assert.isNaN(pow(2, 1.5));
  });
});
