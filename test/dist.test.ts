import test from "ava";
import { and, or, not } from "../dist";

interface Person {
  firstName: string;
  lastName: string;
}

const isAlwaysTrue = () => true;

const isAlwaysFalse = () => false;

const isPerson = (person?: Person) =>
  typeof person?.firstName === "string" && typeof person?.lastName === "string";

const isNamedJohnDoe = (person: Person) =>
  person.firstName === "John" && person.lastName === "Doe";

const testCases = [
  {
    title: "and > should return true when all rules returns true",
    data: {
      arg: 42,
      rule: and(isAlwaysTrue, isAlwaysTrue, isAlwaysTrue),
      result: true
    }
  },
  {
    title: "and > should return false when some rules return false",
    data: {
      arg: 42,
      rule: and(isAlwaysTrue, isAlwaysTrue, isAlwaysFalse),
      result: false
    }
  },
  {
    title: "and > should return false without resolving the last rule",
    data: {
      arg: undefined,
      rule: and(isPerson, isNamedJohnDoe),
      result: false
    }
  },
  {
    title: "or > should return true when some rules returns true",
    data: {
      arg: 42,
      rule: or(isAlwaysFalse, isAlwaysTrue, isAlwaysFalse),
      result: true
    }
  },
  {
    title: "or > should return false when all rules returns false",
    data: {
      arg: 42,
      rule: or(isAlwaysFalse, isAlwaysFalse, isAlwaysFalse),
      result: false
    }
  },
  {
    title: "not > should return true when all rules returns false",
    data: {
      arg: 42,
      rule: not(isAlwaysFalse, isAlwaysFalse, isAlwaysFalse),
      result: true
    }
  },
  {
    title: "not > should return false when all rules returns true",
    data: {
      arg: 42,
      rule: not(isAlwaysTrue, isAlwaysTrue, isAlwaysTrue),
      result: false
    }
  },
  {
    title: "and > should return true when combining all composers",
    data: {
      arg: 42,
      rule: and(
        isAlwaysTrue,
        isAlwaysTrue,
        or(isAlwaysTrue, isAlwaysFalse),
        not(isAlwaysFalse, isAlwaysFalse)
      ),
      result: true
    }
  },
  {
    title: "and > should return false when combining all composers",
    data: {
      arg: 42,
      rule: and(
        isAlwaysTrue,
        isAlwaysFalse,
        or(isAlwaysTrue, isAlwaysFalse),
        not(isAlwaysFalse, isAlwaysFalse)
      ),
      result: false
    }
  },
  {
    title: "or > should return true when combining all composers",
    data: {
      arg: 42,
      rule: or(
        isAlwaysTrue,
        isAlwaysTrue,
        or(isAlwaysTrue, isAlwaysFalse),
        not(isAlwaysFalse, isAlwaysFalse)
      ),
      result: true
    }
  },
  {
    title: "or > should return false when combining all composers",
    data: {
      arg: 42,
      rule: or(
        isAlwaysFalse,
        isAlwaysFalse,
        and(isAlwaysTrue, isAlwaysFalse),
        not(isAlwaysTrue, isAlwaysFalse)
      ),
      result: false
    }
  },
  {
    title: "not > should return true when combining all composers",
    data: {
      arg: 42,
      rule: not(
        isAlwaysFalse,
        isAlwaysFalse,
        or(isAlwaysTrue, isAlwaysFalse),
        and(isAlwaysFalse, isAlwaysFalse)
      ),
      result: true
    }
  },
  {
    title: "not > should return false when combining all composers",
    data: {
      arg: 42,
      rule: not(
        isAlwaysTrue,
        isAlwaysTrue,
        or(isAlwaysFalse, isAlwaysTrue),
        and(isAlwaysTrue, isAlwaysTrue)
      ),
      result: false
    }
  }
];

testCases.forEach(testCase => {
  const { title, data } = testCase;
  test(title, t => {
    t.deepEqual(data.rule(data.arg), data.result);
  });
});
