module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': [0 ,'error', 'windows'],
    'space-before-function-paren': ["warn", "always"],
    'comma-dangle': 'off',
    'max-len': 'off',
    'global-require': 0,
    'no-plusplus': 0,
    'import/extensions': 0,
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    'semi': ["warn", "never"],
    'no-underscore-dangle': 0,
    'operator-assignment': 0,
    'indent': ['warn', 4],
    'no-restricted-globals': 0,
    'prefer-spread': 'off',
    'no-unused-vars': 'off',
    'eol-last': 'warn',
    'consistent-return': 'off',
    'no-alert': 'off',
    'no-restricted-syntax': 'off',
    'prefer-destructuring': 'off',
    'no-new-func': 'off',
    'radix': 'off',
    'vue/require-v-for-key': 0,
    'prefer-promise-reject-errors': 0
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
