module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            browsers: '>0.3%, not ie 11, not dead, not op_mini all',
          },
        },
      },
    ],
  ],
};
