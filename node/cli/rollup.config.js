import rust from "@wasm-tool/rollup-plugin-rust";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: {
    cli: "src/cli.ts",
  },
  output: {
    sourcemap: false,
    format: "cjs",
    dir: "dist",
  },
  plugins: [
    rust({
      debug: process.env["RELEASE"] !== "true",
      nodejs: true,
      inlineWasm: process.env["SEPARATE_WASM"] !== "true",
      cargoArgs: ["--no-default-features", "--features=internal-node"],
    }),
    resolve({ jsnext: true, preferBuiltins: true }),
    commonjs({ include: ["src/*.ts", "node_modules/**"] }),
    typescript(),
  ],
};
