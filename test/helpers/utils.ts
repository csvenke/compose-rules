import test from "ava";

export const runTestCases = (name: string, composer: any, testCases: any) => {
  testCases.forEach(({ title, input, output }) => {
    test(`${name} > ${title}`, t => {
      const rule = composer(...input.rules);
      const result = rule(input.arg);
      t.is(result, output[name]);
    });
  });
};
