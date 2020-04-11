import test from "ava";
import { and, or, not } from "../dist";

const isAlwaysTrue = () => true;
const isAlwaysFalse = () => false;
const isLargerThanOne = (arg: number) => arg > 1;
const isLessThanTen = (arg: number) => arg < 10;
const isLessThanEigth = (arg: number) => arg < 8;

const isString = (arg: string) => typeof arg === "string";
const isNamedJohn = (arg: string) => arg === "John";
const isNamedJane = (arg: string) => arg === "Jane";

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

test("should stop resolving rules when first rule fails", t => {
  interface Person {
    firstName: string;
    lastName: string;
  }
  const jane = {
    firstName: "Jane",
    lastName: "Doe"
  };
  const john = {
    firstName: "John",
    lastName: "Doe"
  };
  const none = undefined;

  const isPerson = (arg: any) =>
    typeof arg?.firstName === "string" && typeof arg?.lastName === "string";
  const isNamedJohnDoe = (arg: Person) =>
    arg.firstName === "John" && arg.lastName === "Doe";
  const isNamedJaneDoe = (arg: Person) =>
    arg.firstName === "Jane" && arg.lastName === "Doe";

  const myRule = and(isPerson, or(isNamedJaneDoe, isNamedJohnDoe));

  t.is(myRule(none), false);
  t.is(myRule(john), true);
  t.is(myRule(jane), true);
});
