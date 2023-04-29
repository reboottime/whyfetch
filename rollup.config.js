const typescript = require("@rollup/plugin-typescript").default;
const nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve;
const commonjs = require("@rollup/plugin-commonjs").default;
const { terser } = require("rollup-plugin-terser");

const plugins = [
  typescript(),
  nodeResolve({ browser: true }),
  commonjs(),
  terser(),
];

module.exports = {
  input: "src/index.ts",
  output: [
    {
      format: "umd",
      name: "MyLibrary",
      file: "dist/index.js",
      sourcemap: true,
    },
    {
      format: "umd",
      name: "MyLibrary",
      file: "dist/index.min.js",
      sourcemap: true,
    },
    {
      format: "es",
      file: "dist/esm/index.js",
      sourcemap: true,
    },
  ],
  plugins,
  external: [],
};