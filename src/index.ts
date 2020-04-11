type RuleFunction = (arg: any) => boolean;

type RuleComposerConfig = {
  resolveRules: (rules: RuleFunction[], arg: any) => boolean[];
  resolveResult: (results: boolean[]) => boolean;
};

const makeRuleComposer = (config: RuleComposerConfig) => (
  ...rules: RuleFunction[]
) => (arg: any) => {
  const { resolveRules, resolveResult } = config;
  const results = resolveRules(rules, arg);
  const result = resolveResult(results);
  return result;
};

const resolveRulesWithBail = (rules: RuleFunction[], arg: any) => {
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

const and = makeRuleComposer({
  resolveRules: resolveRulesWithBail,
  resolveResult: results => results.every(result => result)
});

const not = makeRuleComposer({
  resolveRules: resolveRulesWithBail,
  resolveResult: results => results.every(result => !result)
});

const or = makeRuleComposer({
  resolveRules: resolveAllRules,
  resolveResult: results => results.some(result => result)
});

export { and, or, not };
export default and;
