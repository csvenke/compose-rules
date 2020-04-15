<h1 align="center" style="border-bottom: none;">@csvenke/compose-rules</h1>
<h3 align="center">Dead simple helpers for writing composable rules</h3>
<p align="center">
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
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#install">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#why">Why</a> •
  <a href="#development">Development</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

**@csvenke/compose-rules** provides dead simple helpers for writing composable rules.
Attack complex problems by dividing them into smaller easier problems.

> "Nothing is particularly hard if you divide it into small jobs" - [Henry Ford](https://no.wikipedia.org/wiki/Henry_Ford)

## Overview

- Compose your rules with a dead simple API!

```js
import { and, or, not } from "@csvenke/compose-rules";

const myRule = and(myRule1, or(myRule2, myRule3), not(myRule4));
```

- Rich typescript support!

```ts
import { and, Rule } from "@csvenke/compose-rules";

type MyRule = Rule<[string, string]>;

const myRule1: MyRule = (firstName, lastName) => true;

const myRule2: MyRule = (firstName, lastName) => true;

// type inteference from first rule!
const myRule = and(myRule1, myRule2);

myRule("John", "Doe"); // Ok!
myRule("John"); // Error!
```

- No dependencies!
- Tiny bundle size!
- Tree shakeable and side effect free!
- 100% test coverage!

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

[Try it out online with repl.it!](https://repl.it/@csvenke/PunyCalculatingServers)

```js
import { and } from "@csvenke/compose-rules";

const isLargerThanOne = n => n > 1;

const isLessThanTen = n => n < 10;

const isValidValue = and(isLargerThanOne, isLessThanTen);

console.log(isValidValue(4)); // true
console.log(isValidValue(14)); // false
```

## Documentation

The documentation can be found [here](https://csvenke.github.io/compose-rules)

## Why

Let's say you need to verify that some value complies with a series of requirements.

- It must be a number
- It must be larger than 1
- It must be less than 10
- It must be an odd number
- It must be a prime number

You could just write a function that verifies all those requirements, but requirements tend to change and changes tend to cause regression in your code.

You should instead write separate functions that verify each requirement and then compose all those functions into a single function that verifies all the requirements.

The main benefit of this approach is when requirements change you simply add/remove/edit specific functions from the composer without affecting the other functions.

See the example below for what that might look like.

### Example

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
  for (let i = 2, s = Math.sqrt(n); i <= s; i++) if (n % i === 0) return false;
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
