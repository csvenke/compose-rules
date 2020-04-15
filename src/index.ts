/**
 * A function that takes n arguments and returns true or false
 *
 * @since 2.3.1
 */
export type Rule<T extends any[] = any> = (...args: T) => boolean;

type RuleComposer = <T extends any[] = any>(...rules: Rule<T>[]) => Rule<T>;

type Executor = (rules: Rule[], args: any[]) => boolean;

function makeRuleComposer(executor: Executor): RuleComposer {
  return (...rules) => (...args) => executor(rules, args);
}

function resolveRules(rules: Rule[], args: any[], breakOn = false) {
  let results = [];
  for (let rule of rules) {
    const result = rule(...args);
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
 * const isLargerThanOne = n => n > 1;
 *
 * // Returns true if number is less than ten
 * const isLessThanTen = n => n < 10;
 *
 * // Returns true if all rules returns true
 * const isValidValue = and(isLargerThanOne, isLessThanTen);
 *
 * console.log(isValidValue(11)); // false
 * console.log(isValidValue(5)); // true
 * ```
 *
 * @since 1.0.0
 */
export const and = makeRuleComposer((rules, args) => {
  const results = resolveRules(rules, args);
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
 * @since 1.1.0
 */
export const or = makeRuleComposer((rules, args) => {
  const results = resolveRules(rules, args, true);
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
 * @since 1.1.0
 */
export const not = makeRuleComposer((rules, args) => {
  const results = resolveRules(rules, args, true);
  return results.every(isFalse);
});

/**
 * Returns composer that returns false if all rules returns true
 *
 * ```js
 * import { nand } from "@csvenke/compose-rules";
 *
 * // Returns true if number is larger than one
 * const isLargerThanOne = n => n > 1;
 *
 * // Returns true if number is less than ten
 * const isLessThanTen = n => n < 10;
 *
 * // Returns false if all rules returns true
 * const isValidValue = nand(isLargerThanOne, isLessThanTen);
 *
 * console.log(isValidValue(11)); // true
 * console.log(isValidValue(5)); // false
 * ```
 *
 * @since 2.2.0
 */
export const nand = makeRuleComposer((rules, args) => {
  const rule = not(and(...rules));
  return rule(...args);
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
 * @since 2.3.0
 */
export const nor = makeRuleComposer((rules, args) => {
  const rule = not(or(...rules));
  return rule(...args);
});
