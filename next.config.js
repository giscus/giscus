const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPreact = require('next-plugin-preact');
const nextTranslate = require('next-translate-plugin');

const workaround = require('next-translate-plugin/lib/cjs/utils.js');

const fallbacks = require('./i18n.fallbacks.json');

// https://github.com/aralroca/next-translate/issues/851#issuecomment-1173611946
workaround.defaultLoader = `
  (l, n) => {
    const lang = ${JSON.stringify(fallbacks)}[l] ?? l;
    return import(\`@next-translate-root/locales/\${lang}/\${n}\`).then(m => m.default);
  }
`;

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

const config = withBundleAnalyzer(
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

module.exports = config;
