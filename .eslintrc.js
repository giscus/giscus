module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'next/core-web-vitals', 'plugin:prettier/recommended'],
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
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'public/client.js',
    'public/js/iframeResizer.contentWindow.min.js',
    'public/js/iframeResizer.min.js',
  ],
};
