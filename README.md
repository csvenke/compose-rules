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

Using yarn

```
yarn add @csvenke/compose-rules
```

Using npm

```
npm install --save @csvenke/compose-rules
```

## Usage

Try it out online with [replit](https://repl.it/@csvenke/WorseMiserlyScale)

```js
import { and } from "@csvenke/compose-rules";

const isNumber = n => typeof n === "number";
const isLargerThanOne = n => n > 1;
const isLessThanTen = n => n < 10;

const isValidValue = and(isNumber, isLargerThanOne, isLessThanTen);

console.log(isValidValue(4)); // true
console.log(isValidValue(14)); // false
```

## API

### **and**

> Returns a rule function that returns true if all rules are true.  
> Resolves rules in left-to-right order.

#### Example

```js
import { and } from "@csvenke/compose-rules";

const isLargerThanOne = n => n > 1;
const isLessThanTen = n => n < 10;

const hasValidValue = and(isLargerThanOne, isLessThanTen);

console.log(hasValidValue(11)); // false
console.log(hasValidValue(5)); // true
```

### **or**

> Returns a rule function that returns true if some rules are true.  
> Resolves rules in left-to-right order.

#### Example

```js
import { or } from "@csvenke/compose-rules";

const isNamedJohn = name => name === "John";
const isNamedJane = name => name === "Jane";

const hasValidName = or(isNamedJohn, isNamedJane);

console.log(hasValidName("Bill")); // false
console.log(hasValidName("Jane")); // true
```

### **not**

> Returns a rule function that returns true if all rules are false.  
> Resolves rules in left-to-right order.

#### Example

```js
import { not } from "@csvenke/compose-rules";

const isNamedJohn = name => name === "John";
const isNamedJane = name => name === "Jane";

const hasValidName = not(isNamedJohn, isNamedJane);

console.log(hasValidName("Bill")); // true
console.log(hasValidName("Jane")); // false
console.log(hasValidName("John")); // false
```

## Development

Installing dependencies

```
yarn install
```

Building project

```
yarn build
```

Running tests

```
yarn test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.

## License

[MIT](https://github.com/csvenke/compose-rules/blob/master/LICENSE)
