import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

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
  plugins: [typescript({ useTsconfigDeclarationDir: true }), babel(), terser()]
};

module.exports = config;
