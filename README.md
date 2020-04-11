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

```ts
import composeRules from "@csvenke/compose-rules";

const isLargerThanOne = arg => arg > 1;
const isLessThanTen = arg => arg < 10;

const hasValidValue = composeRules(isLargerThanOne, isLessThanTen);

if (hasValidValue(7)) {
  // do something
}
```

## API

### **and**

Will resolve all rules in left-to-right order.  
Returns a rule function that returns true if all rules are true.

```js
import { and } from "@csvenke/compose-rules";

const isLargerThanOne = n => n > 1;
const isLessThanTen = n => n < 10;

const hasValidValue = and(isLargerThanOne, isLessThanTen);

console.log(hasValidValue(11)); // false
console.log(hasValidValue(5)); // true
```

### **or**

Will resolve all rules in left-to-right order.  
Returns a rule function that returns true if some rules are true.

```js
import { or } from "@csvenke/compose-rules";

const isNamedJohn = name => name === "John";
const isNamedJane = name => name === "Jane";

const hasValidName = or(isNamedJohn, isNamedJane);

console.log(hasValidName("Bill")); // false
console.log(hasValidName("Jane")); // true
```

### **not**

Will resolve all rules in left-to-right order.  
Returns a rule function that returns true if all rules are false.

```js
import { not } from "@csvenke/compose-rules";

const isNamedJohn = name => name === "John";
const isNamedJane = name => name === "Jane";

const hasValidName = not(isNamedJohn, isNamedJane);

console.log(hasValidName("Bill")); // true
console.log(hasValidName("Jane")); // false
console.log(hasValidName("John")); // false
```

## License

MIT
