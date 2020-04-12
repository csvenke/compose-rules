import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const tsconfig = {
  useTsconfigDeclarationDir: true
};

const config = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "esm"
    }
  ],
  treeshake: {
    moduleSideEffects: false
  },
  plugins: [typescript(tsconfig), babel(), terser()]
};

module.exports = config;
