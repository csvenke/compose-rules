import makeRuleComposer, {
  RuleFunction,
  RuleResult,
  RuleComposerConfig
} from "../makeRuleComposer";

const getResults = (rules: RuleFunction[], arg: any) => {
  return rules.reduce<RuleResult[]>((acc, rule) => [...acc, rule(arg)], []);
};

const validateResults = (results: RuleResult[]) => {
  const validateResult = (result: RuleResult) => result;
  return results.every(validateResult);
};

const config: RuleComposerConfig = {
  getResults,
  validateResults
};

const composeRules = makeRuleComposer(config);

export default composeRules;
