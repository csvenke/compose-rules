![master](https://github.com/csvenke/compose-rules/workflows/master/badge.svg)

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
