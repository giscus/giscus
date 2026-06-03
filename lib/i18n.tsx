import { TransProps as NextTransProps } from 'next-translate';
import NextTrans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { HTMLAttributes, useCallback } from 'react';
import fallbacks from '../i18n.fallbacks.json';

interface TranslationQuery {
  [name: string]: string | number;
}
interface TranslationQueryCount extends TranslationQuery {
  count: number;
}

type Namespace = 'common' | 'config';

export type CommonI18n = typeof import('../locales/en/common.json');
export type ConfigI18n = typeof import('../locales/en/config.json');
export type I18n = CommonI18n & ConfigI18n;

type PluralSuffixes = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' | number;

type I18nKeysRequireCount<I18Namespace = I18n> = {
  [K in keyof I18Namespace]: K extends `${infer R}_${PluralSuffixes}`
    ? R
    : I18Namespace[K] extends Record<string, unknown>
      ? {
          [J in keyof I18Namespace[K]]: J extends PluralSuffixes ? K : never;
        }[keyof I18Namespace[K]]
      : never;
}[keyof I18Namespace];

type I18nKeysNoCount<I18Namespace = I18n> = {
  [K in keyof I18Namespace]: K extends `${string}_${PluralSuffixes}`
    ? never
    : I18Namespace[K] extends Record<string, unknown>
      ? never
      : K;
}[keyof I18Namespace];

export interface GiscusTranslate<I18Namespace = I18n> {
  (i18nKey: I18nKeysRequireCount<I18Namespace>, query: TranslationQueryCount): string;
  (i18nKey: I18nKeysNoCount<I18Namespace>, query?: TranslationQuery): string;
}

export const availableLanguages = {
  ar: 'العربية',
  be: 'Беларуская',
  bg: 'български',
  ca: 'Català',
  cs: 'Čeština',
  da: 'Dansk',
  de: 'Deutsch',
  en: 'English',
  eo: 'Esperanto',
  es: 'Español',
  eu: 'Euskera',
  fa: 'فارسی',
  fr: 'Français',
  gr: 'Ελληνικά',
  hbs: 'Srpsko-Hrvatski',
  he: 'עברית',
  hi: 'हिन्दी',
  hu: 'Magyar',
  id: 'Indonesia',
  it: 'Italiano',
  ja: '日本語',
  kh: 'ភាសាខ្មែរ',
  ko: '한국어',
  nl: 'Nederlands',
  pl: 'Polski',
  pt: 'Português',
  ro: 'Română',
  ru: 'Русский',
  th: 'ภาษาไทย',
  tr: 'Türkçe',
  vi: 'Việt Nam',
  uk: 'Українська',
  uz: "O'zbek",
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'zh-HK': '香港繁體',
} as const;

export const rtlLanguages = new Set(['ar', 'fa', 'he']);

export type AvailableLanguage = keyof typeof availableLanguages;

export function getDir(lang?: AvailableLanguage): HTMLAttributes<HTMLElement>['dir'] {
  if (!lang) return 'auto';
  return rtlLanguages.has(lang) ? 'rtl' : 'ltr';
}

export function useGiscusTranslation(namespace?: 'common'): {
  t: GiscusTranslate<CommonI18n>;
  lang: AvailableLanguage;
  dir: HTMLAttributes<HTMLElement>['dir'];
};
export function useGiscusTranslation(namespace: 'config'): {
  t: GiscusTranslate<ConfigI18n>;
  lang: AvailableLanguage;
  dir: HTMLAttributes<HTMLElement>['dir'];
};
export function useGiscusTranslation(namespace: Namespace = 'common') {
  const { t, lang } = useTranslation(namespace);
  const dir = getDir(lang as AvailableLanguage);
  return { t, lang, dir };
}

type BaseTransProps = Omit<Omit<NextTransProps, 'i18nKey'>, 'values'>;
interface TransRequireCount {
  i18nKey:
    | `common:${I18nKeysRequireCount<CommonI18n>}`
    | `config:${I18nKeysRequireCount<ConfigI18n>}`;
  values: TranslationQueryCount;
}
interface TransNoCount {
  i18nKey: `common:${I18nKeysNoCount<CommonI18n>}` | `config:${I18nKeysNoCount<ConfigI18n>}`;
  values?: TranslationQuery;
}
type TransProps = BaseTransProps & (TransRequireCount | TransNoCount);

const defaultTransComponents = {
  code: <code dir="ltr" />,
  em: <em />,
  strong: <strong />,
};

export function Trans({ i18nKey, values, components, defaultTrans, fallback }: TransProps) {
  return (
    <NextTrans
      i18nKey={i18nKey}
      values={values}
      components={{ ...defaultTransComponents, ...components }}
      defaultTrans={defaultTrans}
      fallback={fallback}
    />
  );
}

const dateFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'short',
};

const dateFormatters: Record<AvailableLanguage, Intl.DateTimeFormat> = {
  ar: new Intl.DateTimeFormat('ar', dateFormat),
  be: new Intl.DateTimeFormat('be', dateFormat),
  bg: new Intl.DateTimeFormat('bg', dateFormat),
  ca: new Intl.DateTimeFormat('ca', dateFormat),
  cs: new Intl.DateTimeFormat('cs', dateFormat),
  da: new Intl.DateTimeFormat('da', dateFormat),
  de: new Intl.DateTimeFormat('de', dateFormat),
  en: new Intl.DateTimeFormat('en', dateFormat),
  eo: new Intl.DateTimeFormat('eo', dateFormat),
  es: new Intl.DateTimeFormat('es', dateFormat),
  eu: new Intl.DateTimeFormat('eu', dateFormat),
  fa: new Intl.DateTimeFormat('fa', dateFormat),
  fr: new Intl.DateTimeFormat('fr', dateFormat),
  gr: new Intl.DateTimeFormat('gr', dateFormat),
  hbs: new Intl.DateTimeFormat('hbs', dateFormat),
  he: new Intl.DateTimeFormat('he', dateFormat),
  hi: new Intl.DateTimeFormat('hi', dateFormat),
  hu: new Intl.DateTimeFormat('hu', dateFormat),
  id: new Intl.DateTimeFormat('id', dateFormat),
  it: new Intl.DateTimeFormat('it', dateFormat),
  ja: new Intl.DateTimeFormat('ja', dateFormat),
  nl: new Intl.DateTimeFormat('nl', dateFormat),
  pl: new Intl.DateTimeFormat('pl', dateFormat),
  pt: new Intl.DateTimeFormat('pt', dateFormat),
  kh: new Intl.DateTimeFormat('kh', dateFormat),
  ko: new Intl.DateTimeFormat('ko', dateFormat),
  ro: new Intl.DateTimeFormat('ro', dateFormat),
  ru: new Intl.DateTimeFormat('ru', dateFormat),
  th: new Intl.DateTimeFormat('th', dateFormat),
  tr: new Intl.DateTimeFormat('tr', dateFormat),
  vi: new Intl.DateTimeFormat('vi', dateFormat),
  uk: new Intl.DateTimeFormat('uk', dateFormat),
  uz: new Intl.DateTimeFormat('uz', dateFormat),
  'zh-CN': new Intl.DateTimeFormat('zh-CN', dateFormat),
  'zh-TW': new Intl.DateTimeFormat('zh-TW', dateFormat),
  'zh-HK': new Intl.DateTimeFormat('zh-HK', dateFormat),
};

const shortDateFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
};

const shortDateFormatters: Record<AvailableLanguage, Intl.DateTimeFormat> = {
  ar: new Intl.DateTimeFormat('ar', shortDateFormat),
  be: new Intl.DateTimeFormat('be', shortDateFormat),
  bg: new Intl.DateTimeFormat('bg', shortDateFormat),
  ca: new Intl.DateTimeFormat('ca', shortDateFormat),
  cs: new Intl.DateTimeFormat('cs', shortDateFormat),
  da: new Intl.DateTimeFormat('da', shortDateFormat),
  de: new Intl.DateTimeFormat('de', shortDateFormat),
  en: new Intl.DateTimeFormat('en', shortDateFormat),
  eo: new Intl.DateTimeFormat('eo', shortDateFormat),
  es: new Intl.DateTimeFormat('es', shortDateFormat),
  eu: new Intl.DateTimeFormat('eu', shortDateFormat),
  fa: new Intl.DateTimeFormat('fa', shortDateFormat),
  fr: new Intl.DateTimeFormat('fr', shortDateFormat),
  gr: new Intl.DateTimeFormat('gr', shortDateFormat),
  hbs: new Intl.DateTimeFormat('hbs', shortDateFormat),
  he: new Intl.DateTimeFormat('he', shortDateFormat),
  hi: new Intl.DateTimeFormat('hi', shortDateFormat),
  hu: new Intl.DateTimeFormat('hu', shortDateFormat),
  id: new Intl.DateTimeFormat('id', shortDateFormat),
  it: new Intl.DateTimeFormat('it', shortDateFormat),
  ja: new Intl.DateTimeFormat('ja', shortDateFormat),
  kh: new Intl.DateTimeFormat('kh', shortDateFormat),
  ko: new Intl.DateTimeFormat('ko', shortDateFormat),
  nl: new Intl.DateTimeFormat('nl', shortDateFormat),
  pl: new Intl.DateTimeFormat('pl', shortDateFormat),
  pt: new Intl.DateTimeFormat('pt', shortDateFormat),
  ro: new Intl.DateTimeFormat('ro', shortDateFormat),
  ru: new Intl.DateTimeFormat('ru', shortDateFormat),
  th: new Intl.DateTimeFormat('th', shortDateFormat),
  tr: new Intl.DateTimeFormat('tr', shortDateFormat),
  vi: new Intl.DateTimeFormat('vi', shortDateFormat),
  uk: new Intl.DateTimeFormat('uk', shortDateFormat),
  uz: new Intl.DateTimeFormat('uz', shortDateFormat),
  'zh-CN': new Intl.DateTimeFormat('zh-CN', shortDateFormat),
  'zh-TW': new Intl.DateTimeFormat('zh-TW', shortDateFormat),
  'zh-HK': new Intl.DateTimeFormat('zh-HK', shortDateFormat),
};

const shortDateYearFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

const shortDateYearFormatters: Record<AvailableLanguage, Intl.DateTimeFormat> = {
  ar: new Intl.DateTimeFormat('ar', shortDateYearFormat),
  be: new Intl.DateTimeFormat('be', shortDateYearFormat),
  bg: new Intl.DateTimeFormat('bg', shortDateYearFormat),
  ca: new Intl.DateTimeFormat('ca', shortDateYearFormat),
  cs: new Intl.DateTimeFormat('cs', shortDateYearFormat),
  da: new Intl.DateTimeFormat('da', shortDateYearFormat),
  de: new Intl.DateTimeFormat('de', shortDateYearFormat),
  en: new Intl.DateTimeFormat('en', shortDateYearFormat),
  eo: new Intl.DateTimeFormat('eo', shortDateYearFormat),
  es: new Intl.DateTimeFormat('es', shortDateYearFormat),
  eu: new Intl.DateTimeFormat('eu', shortDateYearFormat),
  fa: new Intl.DateTimeFormat('fa', shortDateYearFormat),
  fr: new Intl.DateTimeFormat('fr', shortDateYearFormat),
  gr: new Intl.DateTimeFormat('gr', shortDateYearFormat),
  hbs: new Intl.DateTimeFormat('hbs', shortDateYearFormat),
  he: new Intl.DateTimeFormat('he', shortDateYearFormat),
  hi: new Intl.DateTimeFormat('hi', shortDateYearFormat),
  hu: new Intl.DateTimeFormat('hu', shortDateYearFormat),
  id: new Intl.DateTimeFormat('id', shortDateYearFormat),
  it: new Intl.DateTimeFormat('it', shortDateYearFormat),
  ja: new Intl.DateTimeFormat('ja', shortDateYearFormat),
  kh: new Intl.DateTimeFormat('kh', shortDateYearFormat),
  ko: new Intl.DateTimeFormat('ko', shortDateYearFormat),
  nl: new Intl.DateTimeFormat('nl', shortDateYearFormat),
  pl: new Intl.DateTimeFormat('pl', shortDateYearFormat),
  pt: new Intl.DateTimeFormat('pt', shortDateYearFormat),
  ro: new Intl.DateTimeFormat('ro', shortDateYearFormat),
  ru: new Intl.DateTimeFormat('ru', shortDateYearFormat),
  th: new Intl.DateTimeFormat('th', shortDateYearFormat),
  tr: new Intl.DateTimeFormat('tr', shortDateYearFormat),
  vi: new Intl.DateTimeFormat('vi', shortDateYearFormat),
  uk: new Intl.DateTimeFormat('uk', shortDateYearFormat),
  uz: new Intl.DateTimeFormat('uz', shortDateYearFormat),
  'zh-CN': new Intl.DateTimeFormat('zh-CN', shortDateYearFormat),
  'zh-TW': new Intl.DateTimeFormat('zh-TW', shortDateYearFormat),
  'zh-HK': new Intl.DateTimeFormat('zh-HK', shortDateYearFormat),
};

const relativeTimeFormat: Intl.RelativeTimeFormatOptions = {
  localeMatcher: 'best fit',
  numeric: 'auto',
  style: 'long',
};

const relativeTimeFormatters: Record<AvailableLanguage, Intl.RelativeTimeFormat> = {
  ar: new Intl.RelativeTimeFormat('ar', relativeTimeFormat),
  be: new Intl.RelativeTimeFormat('be', relativeTimeFormat),
  bg: new Intl.RelativeTimeFormat('bg', relativeTimeFormat),
  ca: new Intl.RelativeTimeFormat('ca', relativeTimeFormat),
  cs: new Intl.RelativeTimeFormat('cs', relativeTimeFormat),
  da: new Intl.RelativeTimeFormat('da', relativeTimeFormat),
  de: new Intl.RelativeTimeFormat('de', relativeTimeFormat),
  en: new Intl.RelativeTimeFormat('en', relativeTimeFormat),
  eo: new Intl.RelativeTimeFormat('eo', relativeTimeFormat),
  es: new Intl.RelativeTimeFormat('es', relativeTimeFormat),
  eu: new Intl.RelativeTimeFormat('eu', relativeTimeFormat),
  fa: new Intl.RelativeTimeFormat('fa', relativeTimeFormat),
  fr: new Intl.RelativeTimeFormat('fr', relativeTimeFormat),
  gr: new Intl.RelativeTimeFormat('gr', relativeTimeFormat),
  hbs: new Intl.RelativeTimeFormat('hbs', relativeTimeFormat),
  he: new Intl.RelativeTimeFormat('he', relativeTimeFormat),
  hi: new Intl.RelativeTimeFormat('hi', relativeTimeFormat),
  hu: new Intl.RelativeTimeFormat('hu', relativeTimeFormat),
  id: new Intl.RelativeTimeFormat('id', relativeTimeFormat),
  it: new Intl.RelativeTimeFormat('it', relativeTimeFormat),
  ja: new Intl.RelativeTimeFormat('ja', relativeTimeFormat),
  kh: new Intl.RelativeTimeFormat('kh', relativeTimeFormat),
  ko: new Intl.RelativeTimeFormat('ko', relativeTimeFormat),
  nl: new Intl.RelativeTimeFormat('nl', relativeTimeFormat),
  pl: new Intl.RelativeTimeFormat('pl', relativeTimeFormat),
  pt: new Intl.RelativeTimeFormat('pt', relativeTimeFormat),
  ro: new Intl.RelativeTimeFormat('ro', relativeTimeFormat),
  ru: new Intl.RelativeTimeFormat('ru', relativeTimeFormat),
  th: new Intl.RelativeTimeFormat('th', relativeTimeFormat),
  tr: new Intl.RelativeTimeFormat('tr', relativeTimeFormat),
  vi: new Intl.RelativeTimeFormat('vi', relativeTimeFormat),
  uk: new Intl.RelativeTimeFormat('uk', relativeTimeFormat),
  uz: new Intl.RelativeTimeFormat('uz', relativeTimeFormat),
  'zh-CN': new Intl.RelativeTimeFormat('zh-CN', relativeTimeFormat),
  'zh-TW': new Intl.RelativeTimeFormat('zh-TW', relativeTimeFormat),
  'zh-HK': new Intl.RelativeTimeFormat('zh-HK', relativeTimeFormat),
};

export function useDateFormatter() {
  const { lang } = useTranslation('common');
  const intl: Intl.DateTimeFormat = dateFormatters[lang] ?? dateFormatters.en;

  return useCallback(
    (date: string | Date) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return intl.format(dateObj);
    },
    [intl],
  );
}

interface FormatParamsDate {
  format: Intl.DateTimeFormat;
  value: Date;
}

interface FormatParamsRelative {
  format: Intl.RelativeTimeFormat;
  value: number;
  unit: Intl.RelativeTimeFormatUnit;
}

function format(params: FormatParamsDate): string;
function format(params: FormatParamsRelative): string;
function format(p: FormatParamsDate | FormatParamsRelative): string {
  const isDate = !('unit' in p);
  const { locale } = p.format.resolvedOptions();

  if (locale.startsWith('zh')) {
    const dateParts = isDate
      ? p.format.formatToParts(p.value)
      : p.format.formatToParts(p.value, p.unit);
    // Add spaces between date parts
    return dateParts.map(({ value }) => value).join(' ');
  }

  return isDate ? p.format.format(p.value) : p.format.format(p.value, p.unit);
}

export function useRelativeTimeFormatter() {
  const { lang: locale } = useTranslation('common');
  const lang = fallbacks[locale] ?? locale;
  const sdyf: Intl.DateTimeFormat = shortDateYearFormatters[lang] ?? shortDateYearFormatters.en;
  const sdf: Intl.DateTimeFormat = shortDateFormatters[lang] ?? shortDateFormatters.en;
  const rtf: Intl.RelativeTimeFormat = relativeTimeFormatters[lang] ?? relativeTimeFormatters.en;

  return useCallback(
    (date: string | Date) => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const now = new Date();
      const diff = now.getTime() - dateObj.getTime();
      const diffInSeconds = Math.floor(diff / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInYears = now.getUTCFullYear() - dateObj.getUTCFullYear();

      if (diffInYears > 0) return format({ format: sdyf, value: dateObj });
      if (diffInDays >= 30) return format({ format: sdf, value: dateObj });
      if (diffInDays > 0) return format({ format: rtf, value: -diffInDays, unit: 'day' });
      if (diffInHours > 0) return format({ format: rtf, value: -diffInHours, unit: 'hour' });
      if (diffInMinutes > 0) return format({ format: rtf, value: -diffInMinutes, unit: 'minute' });
      return format({ format: rtf, value: -diffInSeconds, unit: 'second' });
    },
    [sdyf, sdf, rtf],
  );
}
