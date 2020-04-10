type Rule = (arg: any) => boolean;

interface RuleComposerConfig {
  resultValidator: (results: boolean[]) => boolean;
}

const getResults = (rules: Rule[], arg: any) => {
  return rules.reduce<boolean[]>((acc, rule) => [...acc, rule(arg)], []);
};

const makeRuleComposer = (config: RuleComposerConfig) => (...rules: Rule[]) => (
  arg: any
) => {
  const { resultValidator } = config;
  const results = getResults(rules, arg);
  return resultValidator(results);
};

const and = makeRuleComposer({
  resultValidator: results => results.every(result => result)
});

const or = makeRuleComposer({
  resultValidator: results => results.some(result => result)
});

const not = makeRuleComposer({
  resultValidator: results => results.every(result => !result)
});

export { and, or, not };
export default and;
