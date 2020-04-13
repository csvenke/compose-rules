import { isAlwaysTrue, isAlwaysFalse } from "./rules";

export interface TestCase {
  title: string;
  input: {
    arg: any;
    rules: any[];
  };
  output: {
    and: boolean;
    or: boolean;
    not: boolean;
  };
}

export const logic: TestCase[] = [
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
  }
];
