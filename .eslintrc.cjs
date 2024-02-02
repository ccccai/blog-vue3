/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  rules: {
    'no-console': import.meta.env.MODE === 'production' ? 'warn' : 'off',
    'no-debugger': import.meta.env.MODE === 'production' ? 'warn' : 'off',
    'vue/require-default-prop': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/html-self-closing': ['off'],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/html-closing-bracket-newline': ['off'],
    'vue/html-indent': 'off',
    '@typescript-eslint/no-this-alias': 'off'
  }
}
