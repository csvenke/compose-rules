
<a href="https://www.npmjs.com/package/@csvenke/compose-rules">
  <img src="https://badgen.net/npm/v/@csvenke/compose-rules" alt="npm package" />
</a>
<a href="https://bundlephobia.com/result?p=@csvenke/compose-rules">
  <img src="https://badgen.net/bundlephobia/min/@csvenke/compose-rules" alt="min bundle size" />
</a>
<a href="https://github.com/csvenke/compose-rules/actions?query=workflow%3Amaster">
  <img src="https://github.com/csvenke/compose-rules/workflows/master/badge.svg" alt="master workflow" />
</a>

# @csvenke/compose-rules

## Installing

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

const isLessThanTen = n => n < 10;
const isGreaterThanFive = n => n > 5;

const myRule = composeRules(isLessThanTen, isGreaterThanFive);

if (myRule(7)) {
  // do something
}
```

## License

MIT
