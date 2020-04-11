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
      format: "cjs",
      exports: "named"
    },
    {
      file: pkg.module,
      format: "esm",
      exports: "named"
    }
  ],
  plugins: [typescript(tsconfig), babel(), terser()]
};

module.exports = config;
