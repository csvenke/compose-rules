import makeRuleComposer from "../makeRuleComposer";
import { RuleFunction, RuleResult } from "../types";

const getResults = (rules: RuleFunction[], arg: any) => {
  return rules.reduce<RuleResult[]>((acc, rule) => [...acc, rule(arg)], []);
};

const validateResults = (results: RuleResult[]) => {
  const validateResult = (result: RuleResult) => result;
  return results.every(validateResult);
};

const composeRules = makeRuleComposer({ getResults, validateResults });

export default composeRules;
