const withPreact = require('next-plugin-preact');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withPreact({
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
  }),
);
