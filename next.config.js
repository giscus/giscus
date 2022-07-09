const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPreact = require('next-plugin-preact');
const nextTranslate = require('next-translate');

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: `frame-ancestors 'self';`,
  },
];

const swr = 60 * 60 * 24 * 7; // 7 days

module.exports = withBundleAnalyzer(
  withPreact(
    nextTranslate({
      async headers() {
        return [
          {
            source: '/(.*)',
            headers: securityHeaders,
          },
          {
            source: '/',
            headers: [
              {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN',
              },
            ],
          },
          {
            source: '/(themes/(?:.*)|client\\.js)',
            headers: [
              {
                key: 'Cache-Control',
                value: `public, max-age=0, stale-while-revalidate=${swr}`,
              },
            ],
          },
        ];
      },
      experimental: {
        browsersListForSwc: true,
        legacyBrowsers: false,
        esmExternals: false,
      },
    }),
  ),
);
