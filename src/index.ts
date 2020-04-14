type Rule<A = any, B = boolean> = (arg: A) => B;

type RuleComposer<A> = <T = any>(...rules: Rule<T, A>[]) => Rule<T, A>;

type Executor<A> = (rules: Rule<any, A>[], arg: any) => A;

function makeRuleComposer<A = boolean>(executor: Executor<A>): RuleComposer<A> {
  return (...rules) => arg => executor(rules, arg);
}

function resolveRules(rules: Rule[], arg: any, breakOn = false) {
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

export const and = makeRuleComposer((rules, arg) => {
  const results = resolveRules(rules, arg);
  return results.every(isTrue);
});

export const or = makeRuleComposer((rules, arg) => {
  const results = resolveRules(rules, arg, true);
  return results.some(isTrue);
});

export const not = makeRuleComposer((rules, arg) => {
  const results = resolveRules(rules, arg, true);
  return results.every(isFalse);
});

export const nand = makeRuleComposer((rules, arg) => {
  const rule = not(and(...rules));
  return rule(arg);
});

export const nor = makeRuleComposer((rules, arg) => {
  const rule = not(or(...rules));
  return rule(arg);
});
