type RuleFunction = (arg: any) => boolean;

type RuleComposerConfig = {
  resolveRules: (rules: RuleFunction[], arg: any) => boolean[];
  resolveResult: (results: boolean[]) => boolean;
};

const makeRuleComposer = (config: RuleComposerConfig) => {
  const { resolveRules, resolveResult } = config;
  return (...rules: RuleFunction[]) => {
    return (arg: any) => {
      const results = resolveRules(rules, arg);
      const result = resolveResult(results);
      return result;
    };
  };
};

const resolveRules = (rules: RuleFunction[], arg: any) => {
  let results = [];
  for (let rule of rules) {
    const result = rule(arg);
    results.push(result);
    if (!result) {
      break;
    }
  }
  return results;
};

const resolveAllRules = (rules: RuleFunction[], arg: any) =>
  rules.map(rule => rule(arg));

export const and = makeRuleComposer({
  resolveRules,
  resolveResult: results => results.every(result => result)
});

export const not = makeRuleComposer({
  resolveRules,
  resolveResult: results => results.every(result => !result)
});

export const or = makeRuleComposer({
  resolveRules: resolveAllRules,
  resolveResult: results => results.some(result => result)
});

export default and;
