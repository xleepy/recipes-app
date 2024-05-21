// https://gist.github.com/developit/4bd3fa6f2d01300d4a7f353d71c9a708
module.exports = {
  env: {
    browser: true,
  },
  plugins: ['eslint-plugin-react-compiler'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'react-compiler/react-compiler': 'error',
    'react/no-unknown-property': ['error', { ignore: ['class'] }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {
    react: {
      pragma: 'h',
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'build/'],
};
