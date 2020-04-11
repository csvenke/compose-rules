type RuleFunction = (arg: any) => boolean;

type RuleComposerConfig = {
  getResults: (rules: RuleFunction[], arg: any) => boolean[];
  getResult: (results: boolean[]) => boolean;
};

const makeRuleComposer = (config: RuleComposerConfig) => (
  ...rules: RuleFunction[]
) => (arg: any) => {
  const { getResults, getResult } = config;
  const results = getResults(rules, arg);
  const result = getResult(results);
  return result;
};

const getResults = (rules: RuleFunction[], arg: any) =>
  rules.map(rule => rule(arg));

const and = makeRuleComposer({
  getResults: (rules, arg) => {
    let results = [];
    for (let rule of rules) {
      const result = rule(arg);
      results.push(result);
      if (!result) {
        break;
      }
    }
    return results;
  },
  getResult: results => results.every(result => result)
});

const or = makeRuleComposer({
  getResults,
  getResult: results => results.some(result => result)
});

const not = makeRuleComposer({
  getResults,
  getResult: results => results.every(result => !result)
});

export { and, or, not };
export default and;
