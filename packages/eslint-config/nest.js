const base = require('./index.js');

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...base,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
    },
  },
];

module.exports = config;
