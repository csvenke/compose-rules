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

```js
import composeRules from "@csvenke/compose-rules";

const isNumber = n => typeof n === "number";
const isLessThanTen = n => n < 10;
const isGreaterThanFive = n => n > 5;

const hasValidValue = composeRules(isNumber, isLessThanTen, isGreaterThanFive);

if (hasValidValue(6)) {
  // do something
}
```

```js
import { and, or } from "@csvenke/compose-rules";

const isString = name => typeof name === "string";
const isNamedJohn = name => name === "John";
const isNamedJane = name => name === "Jane";

const hasValidName = and(isString, or(isNamedJohn, isNamedJane));

if (hasValidName("John")) {
  // do something
}
```

## License

MIT
