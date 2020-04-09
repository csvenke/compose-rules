import { RuleResult, RuleFunction } from "../types";

interface MakeRuleComposerConfig {
  getResults: (rules: RuleFunction[], arg: any) => RuleResult[];
  validateResults: (results: RuleResult[]) => boolean;
}

const makeRuleComposer = (config: MakeRuleComposerConfig) => <T = any>(
  ...rules: RuleFunction[]
) => (arg: T) => {
  const { getResults, validateResults } = config;
  const results = getResults(rules, arg);
  return validateResults(results);
};

export default makeRuleComposer;
