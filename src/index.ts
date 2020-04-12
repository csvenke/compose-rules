type RuleResult = boolean;

type Rule<T> = (arg: T) => RuleResult;

type ResolveResult = (results: RuleResult[]) => RuleResult;

type ResolveRules<T> = (rules: Rule<T>[], arg: T) => RuleResult[];

type RuleComposerConfig<T> = {
  resolveRules: ResolveRules<T>;
  resolveResult: ResolveResult;
};

function makeRuleComposer<T = any>(config: RuleComposerConfig<T>) {
  const { resolveRules, resolveResult } = config;
  return (...rules: Rule<T>[]): Rule<T> => arg => {
    const results = resolveRules(rules, arg);
    const result = resolveResult(results);
    return result;
  };
}

function resolveRules<T>(rules: Rule<T>[], arg: T) {
  let results = [];
  for (let rule of rules) {
    const result = rule(arg);
    results.push(result);
    if (!result) {
      break;
    }
  }
  return results;
}

function resolveAllRules<T>(rules: Rule<T>[], arg: T) {
  return rules.map(rule => rule(arg));
}

const and = makeRuleComposer({
  resolveRules: resolveRules,
  resolveResult: results => results.every(result => result)
});

const or = makeRuleComposer({
  resolveRules: resolveAllRules,
  resolveResult: results => results.some(result => result)
});

const not = makeRuleComposer({
  resolveRules: resolveRules,
  resolveResult: results => results.every(result => !result)
});

export { and, or, not };
