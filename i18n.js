const fallbacks = {
  gsw: 'de',
  'zh-Hans': 'zh-CN',
  'zh-Hant': 'zh-TW',
};

const workaround = require('next-translate/lib/cjs/plugin/utils.js');

// https://github.com/aralroca/next-translate/issues/851#issuecomment-1173611946
workaround.defaultLoader = `
  (l, n) => {
    const lang = ${JSON.stringify(fallbacks)}[l] ?? l;
    return import(\`@next-translate-root/locales/\${lang}/\${n}\`).then(m => m.default);
  }
`;

module.exports = {
  locales: [
    'ar',
    'de',
    'en',
    'es',
    'fa',
    'fr',
    'gsw',
    'id',
    'it',
    'ja',
    'ko',
    'nl',
    'pl',
    'pt',
    'ro',
    'ru',
    'th',
    'tr',
    'vi',
    'zh-CN',
    'zh-Hans',
    'zh-Hant',
    'zh-TW',
  ],
  fallbacks,
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/': ['config'],
  },
};
