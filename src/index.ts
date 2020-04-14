export type Rule<TArg = any> = (arg: TArg) => boolean;

type RuleComposer = <TArg = any>(...rules: Rule<TArg>[]) => Rule<TArg>;

type Executor = (rules: Rule<any>[], arg: any) => boolean;

function makeRuleComposer(executor: Executor): RuleComposer {
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

/**
 * Returns composer that returns true if all rules returns true
 *
 * ```js
 * import { and } from "@csvenke/compose-rules";
 *
 * // Returns true if number is larger than one
 * const isNumberLargerThanOne = n => n > 1;
 *
 * // Returns true if number is less than ten
 * const isNumberLessThanTen = n => n < 10;
 *
 * // Returns true if all rules returns true
 * const hasValidValue = and(isNumberLargerThanOne, isNumberLessThanTen);
 *
 * console.log(hasValidValue(11)); // false
 * console.log(hasValidValue(5)); // true
 * ```
 *
 * @since v1.0.0
 */
export const and = makeRuleComposer((rules, arg) => {
  const results = resolveRules(rules, arg);
  return results.every(isTrue);
});

/**
 * Returns composer that returns true if some rules returns true
 *
 * ```js
 * import { or } from "@csvenke/compose-rules";
 *
 * // Returns true if name is John
 * const isNamedJohn = name => name === "John"
 *
 * // Returns true if name is Jane
 * const isNamedJane = name => name === "Jane";
 *
 * // Returns true if name is John or Jane
 * const isValidName = or(isNamedJohn, isNamedJane);
 *
 * console.log(isValidName("Billy")) // false
 * console.log(isValidName("John")) // true
 * console.log(isValidName("Jane")) // true
 * ```
 *
 * @since v1.1.0
 */
export const or = makeRuleComposer((rules, arg) => {
  const results = resolveRules(rules, arg, true);
  return results.some(isTrue);
});

/**
 * Returns composer that returns true if all rules returns false
 *
 * ```js
 * import { not } from "@csvenke/compose-rules";
 *
 * // Returns true if name is John
 * const isNamedJohn = name => name === "John"
 *
 * // Returns true if name is Jane
 * const isNamedJane = name => name === "Jane";
 *
 * // Returns true if name is not John or Jane
 * const isValidName = not(isNamedJohn, isNamedJane);
 *
 * console.log(isValidName("Billy")) // true
 * console.log(isValidName("John")) // false
 * console.log(isValidName("Jane")) // false
 * ```
 *
 * @since v1.1.0
 */
export const not = makeRuleComposer((rules, arg) => {
  const results = resolveRules(rules, arg, true);
  return results.every(isFalse);
});

/**
 * Returns composer that returns false if all rules returns true
 *
 * ```js
 * import { nand } from "@csvenke/compose-rules";
 *
 * // Returns true if number is larger than one
 * const isNumberLargerThanOne = n => n > 1;
 *
 * // Returns true if number is less than ten
 * const isNumberLessThanTen = n => n < 10;
 *
 * // Returns false if all rules returns true
 * const hasValidValue = nand(isNumberLargerThanOne, isNumberLessThanTen);
 *
 * console.log(hasValidValue(11)); // true
 * console.log(hasValidValue(5)); // false
 * ```
 *
 * @since v2.2.0
 */
export const nand = makeRuleComposer((rules, arg) => {
  const rule = not(and(...rules));
  return rule(arg);
});

/**
 * Returns composer that returns false if some rules returns true
 *
 * ```js
 * import { nor } from "@csvenke/compose-rules";
 *
 * // Returns true if name is John
 * const isNamedJohn = name => name === "John"
 *
 * // Returns true if name is Jane
 * const isNamedJane = name => name === "Jane";
 *
 * // Returns false if name is John or Jane
 * const isValidName = nor(isNamedJohn, isNamedJane);
 *
 * console.log(isValidName("Billy")) // true
 * console.log(isValidName("John")) // false
 * console.log(isValidName("Jane")) // false
 * ```
 *
 * @since v2.3.0
 */
export const nor = makeRuleComposer((rules, arg) => {
  const rule = not(or(...rules));
  return rule(arg);
});
