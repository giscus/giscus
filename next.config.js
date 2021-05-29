const withPreact = require('next-plugin-preact');

module.exports = withPreact({
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()',
          },
        ],
      },
    ];
  },
});
