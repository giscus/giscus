module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          debug: true,
          targets: {
            browsers: '>0.3%, not ie 11, not dead, not op_mini all',
          },
        },
      },
    ],
  ],
};
