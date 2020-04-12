type Rule<T> = (arg: T) => boolean;

type Handler = <T>(rules: Rule<T>[], arg: T) => boolean;

function makeRuleComposer(handler: Handler) {
  return <T = any>(...rules: Rule<T>[]): Rule<T> => arg => handler(rules, arg);
}

function resolveRules(rules: Rule<any>[], arg: any, breakOn = false) {
  let results = [];
  for (let rule of rules) {
    const result = rule(arg);
    results.push(result);
    if (result === breakOn) {
      break;
    }
  }
  return results;
}

function isTrue(result: boolean) {
  return result === true;
}

function isFalse(result: boolean) {
  return result === false;
}

const and = makeRuleComposer((rules, arg) => {
  const results = resolveRules(rules, arg);
  return results.every(isTrue);
});

const or = makeRuleComposer((rules, arg) => {
  const results = resolveRules(rules, arg, true);
  return results.some(isTrue);
});

const not = makeRuleComposer((rules, arg) => {
  const results = resolveRules(rules, arg);
  return results.every(isFalse);
});

export { and, or, not };
