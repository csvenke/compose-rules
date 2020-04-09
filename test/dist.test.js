import test from "ava";
import composeRules from "../dist";

const isAlwaysTrue = () => true;
const isAlwaysFalse = () => false;
const isLargerThanOne = n => n > 1;
const isLessThanTen = n => n < 10;
const isLessThanEigth = n => n < 8;

test("should return true when all rules return true", t => {
  const myRule = composeRules(isLargerThanOne, isLessThanTen, isLessThanEigth);

  t.is(myRule(2), true);
  t.is(myRule(3), true);
  t.is(myRule(4), true);
  t.is(myRule(5), true);
  t.is(myRule(6), true);
  t.is(myRule(7), true);
});

test("should return false when one rule returns false", t => {
  const myRule = composeRules(isLargerThanOne, isLessThanTen, isLessThanEigth);

  t.is(myRule(1), false);
  t.is(myRule(8), false);
  t.is(myRule(9), false);
  t.is(myRule(10), false);
});

test("should return true when composing composed rules", t => {
  const myRule1 = composeRules(isAlwaysTrue, isAlwaysTrue, isAlwaysTrue);
  const myRule2 = composeRules(isAlwaysTrue, isAlwaysTrue, isAlwaysTrue);
  const myRule3 = composeRules(isAlwaysTrue, isAlwaysTrue, isAlwaysTrue);
  const myRule4 = composeRules(myRule1, myRule2, myRule3);

  t.is(myRule4(4), true);
});

test("should return false when composing composed rules", t => {
  const myRule1 = composeRules(isAlwaysTrue, isAlwaysFalse, isAlwaysFalse);
  const myRule2 = composeRules(isAlwaysTrue, isAlwaysTrue, isAlwaysFalse);
  const myRule3 = composeRules(isAlwaysTrue, isAlwaysTrue, isAlwaysFalse);
  const myRule4 = composeRules(myRule1, myRule2, myRule3);

  t.is(myRule4(4), false);
});

test("should return true when composing composed composed composed rules", t => {
  const myRule1 = composeRules(isAlwaysTrue, isAlwaysTrue);
  const myRule2 = composeRules(myRule1, myRule1, myRule1);
  const myRule3 = composeRules(
    myRule2,
    myRule2,
    myRule2,
    myRule1,
    isAlwaysTrue
  );
  const myRule4 = composeRules(myRule1, myRule2, myRule3, isAlwaysTrue);

  t.is(myRule4(4), true);
});

test("should return false when composing composed composed composed rules", t => {
  const myRule1 = composeRules(isAlwaysTrue, isAlwaysFalse);
  const myRule2 = composeRules(myRule1, myRule1, myRule1);
  const myRule3 = composeRules(
    myRule2,
    myRule2,
    myRule2,
    myRule1,
    isAlwaysTrue
  );
  const myRule4 = composeRules(myRule1, myRule2, myRule3, isAlwaysTrue);

  t.is(myRule4(4), false);
});
