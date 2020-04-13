import { runTestCases } from "./helpers/utils";
import {
  isAlwaysTrue,
  isAlwaysFalse,
  isNamedJohn,
  isNamedJane,
  isTrue,
  isEven
} from "./helpers/rules";
import { and, or, not } from "../dist";

const testCases = [
  {
    title: "should return expected result when all rules returns true",
    input: {
      arg: undefined,
      rules: [isAlwaysTrue, isAlwaysTrue, isAlwaysTrue]
    },
    output: {
      and: true,
      not: false,
      or: true
    }
  },
  {
    title: "should return expected result when first rule returns false",
    input: {
      arg: undefined,
      rules: [isAlwaysFalse, isAlwaysTrue, isAlwaysTrue]
    },
    output: {
      and: false,
      not: false,
      or: true
    }
  },
  {
    title: "should return expected result when second rule returns false",
    input: {
      arg: undefined,
      rules: [isAlwaysTrue, isAlwaysFalse, isAlwaysTrue]
    },
    output: {
      and: false,
      not: false,
      or: true
    }
  },
  {
    title: "should return expected result when third rule returns false",
    input: {
      arg: undefined,
      rules: [isAlwaysTrue, isAlwaysTrue, isAlwaysFalse]
    },
    output: {
      and: false,
      not: false,
      or: true
    }
  },
  {
    title: "should return expected result when all rules returns false",
    input: {
      arg: undefined,
      rules: [isAlwaysFalse, isAlwaysFalse, isAlwaysFalse]
    },
    output: {
      and: false,
      not: true,
      or: false
    }
  },
  {
    title:
      "should return expected result when arg is string and rule returns true",
    input: {
      arg: "John",
      rules: [isNamedJohn]
    },
    output: {
      and: true,
      or: true,
      not: false
    }
  },
  {
    title:
      "should return expected result when arg is string and rule returns false",
    input: {
      arg: "John",
      rules: [isNamedJane]
    },
    output: {
      and: false,
      or: false,
      not: true
    }
  },
  {
    title: "should return expected result when arg is true",
    input: {
      arg: true,
      rules: [isTrue]
    },
    output: {
      and: true,
      or: true,
      not: false
    }
  },
  {
    title: "should return expected result when arg is false",
    input: {
      arg: false,
      rules: [isTrue]
    },
    output: {
      and: false,
      or: false,
      not: true
    }
  },
  {
    title:
      "should return expected result when arg is number and rule returns true",
    input: {
      arg: 42,
      rules: [isEven]
    },
    output: {
      and: true,
      or: true,
      not: false
    }
  },
  {
    title:
      "should return expected result when arg is number and rule returns false",
    input: {
      arg: 43,
      rules: [isEven]
    },
    output: {
      and: false,
      or: false,
      not: true
    }
  }
];

runTestCases("and", and, testCases);
runTestCases("or", or, testCases);
runTestCases("not", not, testCases);
