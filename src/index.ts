type Rule = (arg: any) => boolean;

interface RuleComposerConfig {
  resultValidator: (results: boolean[]) => boolean;
}

const makeRuleComposer = (config: RuleComposerConfig) => (...rules: Rule[]) => (
  arg: any
) => {
  const { resultValidator } = config;
  const results = rules.map(rule => rule(arg));
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
