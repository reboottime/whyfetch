module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['src/**/*.ts'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import-order',
    'eslint-plugin-import',
    'typescript-sort-keys',
  ],
  rules: {
    'additional-rule': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'multiline-ternary': ['error', 'always'],
    'no-console': 'error',
    'import/newline-after-import': [
      'error',
      {
        count: 1,
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'while',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'if',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'if',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'while',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'function',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'for',
      },
      {
        blankLine: 'always',
        prev: 'for',
        next: '*',
      },
    ],
  },
};
