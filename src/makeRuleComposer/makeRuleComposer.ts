export type RuleResult = boolean;

export type RuleFunction = (arg: any) => boolean;

export interface RuleComposerConfig {
  getResults: (rules: RuleFunction[], arg: any) => RuleResult[];
  validateResults: (results: RuleResult[]) => boolean;
}

const makeRuleComposer = (config: RuleComposerConfig) => <T = any>(
  ...rules: RuleFunction[]
) => (arg: T) => {
  const { getResults, validateResults } = config;
  const results = getResults(rules, arg);
  return validateResults(results);
};

export default makeRuleComposer;
