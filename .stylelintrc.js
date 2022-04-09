module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': '[A-z]+(-[a-z]+)*',
    'max-line-length': [
      120,
      {
        ignorePattern: '/@apply\\s+/',
      },
    ],
  },
};
