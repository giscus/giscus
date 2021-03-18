module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['@typescript-eslint', 'react'],
  rules: {},
  globals: {
    React: 'writable',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
