import test from "ava";
import { TestCase } from "./testCases";

export const runTestCases = (
  name: string,
  composer: any,
  testCases: TestCase[]
) => {
  testCases.forEach(({ title, input, output }) => {
    test(`${name} > ${title}`, t => {
      const rule = composer(...input.rules);
      const result = rule(input.arg);
      t.is(result, output[name]);
    });
  });
};
