module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': '[A-z]+(-[a-z]+)*',
    'color-function-notation': ['modern', { ignore: ['with-var-inside'] }],
  },
};
