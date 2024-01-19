const {
  plugins,
  extends: preactExtends,
  env,
  ...rest
} = require('eslint-config-preact');

module.exports = {
  ...rest,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
    requireConfigFile: false,
    project: ['./tsconfig.json'],
  },
  plugins: plugins.filter((plugin) => plugin !== 'jest'),
  env: Object.fromEntries(
    Object.keys(env)
      .filter((key) => key !== 'jest/globals')
      .map((key) => [key, env[key]])
  ),
  extends: [
    'standard-with-typescript',
    ...preactExtends.filter((ext) => ext !== 'plugin:jest/recommended'),
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    semi: 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      extends: 'standard-with-typescript',
    },
  ],
};
