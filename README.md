<a href="https://www.npmjs.com/package/@csvenke/compose-rules">
  <img src="https://badgen.net/npm/v/@csvenke/compose-rules" alt="npm package" />
</a>
<a href="https://bundlephobia.com/result?p=@csvenke/compose-rules">
  <img src="https://badgen.net/bundlephobia/min/@csvenke/compose-rules" alt="min bundle size" />
</a>
<a href="https://github.com/csvenke/compose-rules/actions?query=workflow%3Amaster">
  <img src="https://github.com/csvenke/compose-rules/workflows/master/badge.svg" alt="master workflow" />
</a>
<a href="https://github.com/csvenke/compose-rules/actions?query=workflow%3A%22pull+request%22">
  <img src="https://github.com/csvenke/compose-rules/workflows/pull%20request/badge.svg" alt="pull request workflow" />
</a>
<a href="https://github.com/semantic-release/semantic-release">
  <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic release" />
</a>

# @csvenke/compose-rules

> Simple helper functions for writing composable business rules

## Install

Using npm

```
npm install --save @csvenke/compose-rules
```

Using yarn

```
yarn add @csvenke/compose-rules
```

## Usage

[Try it out online with repl.it!](https://repl.it/@csvenke/WorseMiserlyScale)

```js
import { and, not } from "@csvenke/compose-rules";

/**
 * Returns true if n is number
 */
const isNumber = n => typeof n === "number";

/**
 * Returns true if n is larger than one
 */
const isNumberLargerThanOne = n => n > 1;

/**
 * Returns true if n is less than ten
 */
const isNumberLessThanTen = n => n < 10;

/**
 * Returns true if n is even
 */
const isNumberEven = n => n % 2 === 0;

/**
 * Returns true if n is odd
 */
const isNumberOdd = not(isNumberEven);

/**
 * Returns true if n is prime
 */
const isNumberPrime = n => {
  for (let i = 2; i < n; i++) if (n % i === 0) return false;
  return n > 1;
};

/**
 * Returns true if all rules returns true
 */
const isValidValue = and(
  isNumber,
  isNumberLargerThanOne,
  isNumberLessThanTen,
  isNumberOdd,
  isNumberPrime
);

console.log(isValidValue(5)); // true
console.log(isValidValue(8)); // false
console.log(isValidValue("Hello")); // false
console.log(isValidValue(undefined)); // false
```

## API

### **and**

> Returns a rule function that returns true if all rules are true.

#### Example

```js
import { and } from "@csvenke/compose-rules";

/**
 * Returns true if n is larger than one
 */
const isNumberLargerThanOne = n => n > 1;

/**
 * Returns true if n is less than ten
 */
const isNumberLessThanTen = n => n < 10;

/**
 * Returns true if all rules returns true
 */
const hasValidValue = and(isNumberLargerThanOne, isNumberLessThanTen);

console.log(hasValidValue(11)); // false
console.log(hasValidValue(5)); // true
```

### **or**

> Returns a rule function that returns true if some rules are true.

#### Example

```js
import { or } from "@csvenke/compose-rules";

/**
 * Returns true if name equal 'John'
 */
const isNamedJohn = name => name === "John";

/**
 * Returns true if name equals 'Jane'
 */
const isNamedJane = name => name === "Jane";

/**
 * Returns true if name equals 'John' or 'Jane'
 */
const hasValidName = or(isNamedJohn, isNamedJane);

console.log(hasValidName("Billy")); // false
console.log(hasValidName("John")); // true
console.log(hasValidName("Jane")); // true
```

### **not**

> Returns a rule function that returns true if all rules are false.

#### Example

```js
import { not } from "@csvenke/compose-rules";

/**
 * Returns true if name is 'John'
 */
const isNamedJohn = name => name === "John";

/**
 * Returns true if name is 'Jane'
 */
const isNamedJane = name => name === "Jane";

/**
 * Returns true if name is not 'John' or 'Jane'
 */
const hasValidName = not(isNamedJohn, isNamedJane);

console.log(hasValidName("John")); // false
console.log(hasValidName("Jane")); // false
console.log(hasValidName("Billy")); // true
```

## Development

Installing dependencies

```
yarn install
```

Running tests

```
yarn test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.

## License

[MIT](https://github.com/csvenke/compose-rules/blob/master/LICENSE)
