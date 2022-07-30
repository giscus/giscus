module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@next/next/no-img-element': 'off',
  },
  globals: {
    React: 'writable',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // Broken with next.js anchors https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402
        // It also doesn't work with next-translate `components` prop in `<Trans>`
        'jsx-a11y/anchor-has-content': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['public/**'],
};
