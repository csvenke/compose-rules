import test from "ava";
import { and, or, not } from "../dist";

const isAlwaysTrue = () => true;
const isAlwaysFalse = () => false;
const isLargerThanOne = arg => arg > 1;
const isLessThanTen = arg => arg < 10;
const isLessThanEigth = arg => arg < 8;

const isString = arg => typeof arg === "string";
const isNamedJohn = arg => arg === "John";
const isNamedJane = arg => arg === "Jane";

test("should return true when all rules return true", t => {
  const myRule = and(isLargerThanOne, isLessThanTen, isLessThanEigth);

  t.is(myRule(2), true);
  t.is(myRule(3), true);
  t.is(myRule(4), true);
  t.is(myRule(5), true);
  t.is(myRule(6), true);
  t.is(myRule(7), true);
});

test("should return false when one rule returns false", t => {
  const myRule = and(isLargerThanOne, isLessThanTen, isLessThanEigth);

  t.is(myRule(1), false);
  t.is(myRule(8), false);
  t.is(myRule(9), false);
  t.is(myRule(10), false);
});

test("should return true when composing composed rules", t => {
  const myRule1 = and(isAlwaysTrue, isAlwaysTrue, isAlwaysTrue);
  const myRule2 = and(isAlwaysTrue, isAlwaysTrue, isAlwaysTrue);
  const myRule3 = and(isAlwaysTrue, isAlwaysTrue, isAlwaysTrue);
  const myRule4 = and(myRule1, myRule2, myRule3);

  t.is(myRule4(4), true);
});

test("should return false when composing composed rules", t => {
  const myRule1 = and(isAlwaysTrue, isAlwaysFalse, isAlwaysFalse);
  const myRule2 = and(isAlwaysTrue, isAlwaysTrue, isAlwaysFalse);
  const myRule3 = and(isAlwaysTrue, isAlwaysTrue, isAlwaysFalse);
  const myRule4 = and(myRule1, myRule2, myRule3);

  t.is(myRule4(4), false);
});

test("should return true when composing composed composed composed rules", t => {
  const myRule1 = and(isAlwaysTrue, isAlwaysTrue);
  const myRule2 = and(myRule1, myRule1, myRule1);
  const myRule3 = and(myRule2, myRule2, myRule2, myRule1, isAlwaysTrue);
  const myRule4 = and(myRule1, myRule2, myRule3, isAlwaysTrue);

  t.is(myRule4(4), true);
});

test("should return false when composing composed composed composed rules", t => {
  const myRule1 = and(isAlwaysTrue, isAlwaysFalse);
  const myRule2 = and(myRule1, myRule1, myRule1);
  const myRule3 = and(myRule2, myRule2, myRule2, myRule1, isAlwaysTrue);
  const myRule4 = and(myRule1, myRule2, myRule3, isAlwaysTrue);

  t.is(myRule4(4), false);
});

test("should return expected result when combining 'and' and 'or'", t => {
  const myRule = and(isString, or(isNamedJane, isNamedJohn));

  t.is(myRule("John"), true);
  t.is(myRule("Jane"), true);
  t.is(myRule("Bill"), false);
});

test("should return expected result when combining 'and' and 'not'", t => {
  const myRule = and(
    isAlwaysTrue,
    not(isAlwaysFalse, isAlwaysFalse, isAlwaysFalse)
  );

  t.is(myRule(123), true);
});
