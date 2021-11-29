import { TransProps as NextTransProps } from 'next-translate';
import NextTrans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useCallback } from 'react';

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
  en: 'English',
  es: 'Español',
  fr: 'Français',
  gsw: 'Deutsch (Schweiz)',
  id: 'Indonesia',
  it: 'Italiano',
  ko: '한국어',
  pl: 'Polski',
  ro: 'Română',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
} as const;

export type AvailableLanguage = keyof typeof availableLanguages;

export function useGiscusTranslation(namespace?: 'common'): {
  t: GiscusTranslate<CommonI18n>;
  lang: AvailableLanguage;
};
export function useGiscusTranslation(namespace: 'config'): {
  t: GiscusTranslate<ConfigI18n>;
  lang: AvailableLanguage;
};
export function useGiscusTranslation(namespace: Namespace = 'common') {
  const { t, lang } = useTranslation(namespace);
  return { t, lang };
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
  code: <code />,
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
  en: new Intl.DateTimeFormat('en', dateFormat),
  es: new Intl.DateTimeFormat('es', dateFormat),
  fr: new Intl.DateTimeFormat('fr', dateFormat),
  gsw: new Intl.DateTimeFormat('gsw', dateFormat),
  id: new Intl.DateTimeFormat('id', dateFormat),
  it: new Intl.DateTimeFormat('it', dateFormat),
  pl: new Intl.DateTimeFormat('pl', dateFormat),
  ko: new Intl.DateTimeFormat('ko', dateFormat),
  ro: new Intl.DateTimeFormat('ro', dateFormat),
  'zh-CN': new Intl.DateTimeFormat('zh-CN', dateFormat),
  'zh-TW': new Intl.DateTimeFormat('zh-TW', dateFormat),
};

const shortDateFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
};

const shortDateFormatters: Record<AvailableLanguage, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en', shortDateFormat),
  es: new Intl.DateTimeFormat('es', shortDateFormat),
  fr: new Intl.DateTimeFormat('fr', shortDateFormat),
  gsw: new Intl.DateTimeFormat('gsw', shortDateFormat),
  id: new Intl.DateTimeFormat('id', shortDateFormat),
  it: new Intl.DateTimeFormat('it', shortDateFormat),
  ko: new Intl.DateTimeFormat('ko', shortDateFormat),
  pl: new Intl.DateTimeFormat('pl', shortDateFormat),
  ro: new Intl.DateTimeFormat('ro', shortDateFormat),
  'zh-CN': new Intl.DateTimeFormat('zh-CN', shortDateFormat),
  'zh-TW': new Intl.DateTimeFormat('zh-TW', shortDateFormat),
};

const shortDateYearFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

const shortDateYearFormatters: Record<AvailableLanguage, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en', shortDateYearFormat),
  es: new Intl.DateTimeFormat('es', shortDateYearFormat),
  fr: new Intl.DateTimeFormat('fr', shortDateYearFormat),
  gsw: new Intl.DateTimeFormat('gsw', shortDateYearFormat),
  id: new Intl.DateTimeFormat('id', shortDateYearFormat),
  it: new Intl.DateTimeFormat('it', shortDateYearFormat),
  ko: new Intl.DateTimeFormat('ko', shortDateYearFormat),
  pl: new Intl.DateTimeFormat('pl', shortDateYearFormat),
  ro: new Intl.DateTimeFormat('ro', shortDateYearFormat),
  'zh-CN': new Intl.DateTimeFormat('zh-CN', shortDateYearFormat),
  'zh-TW': new Intl.DateTimeFormat('zh-TW', shortDateYearFormat),
};

const relativeTimeFormat: Intl.RelativeTimeFormatOptions = {
  localeMatcher: 'best fit',
  numeric: 'auto',
  style: 'long',
};

const relativeTimeFormatters: Record<AvailableLanguage, Intl.RelativeTimeFormat> = {
  en: new Intl.RelativeTimeFormat('en', relativeTimeFormat),
  es: new Intl.RelativeTimeFormat('es', relativeTimeFormat),
  fr: new Intl.RelativeTimeFormat('fr', relativeTimeFormat),
  gsw: new Intl.RelativeTimeFormat('gsw', relativeTimeFormat),
  id: new Intl.RelativeTimeFormat('id', relativeTimeFormat),
  it: new Intl.RelativeTimeFormat('it', relativeTimeFormat),
  ko: new Intl.RelativeTimeFormat('ko', relativeTimeFormat),
  pl: new Intl.RelativeTimeFormat('pl', relativeTimeFormat),
  ro: new Intl.RelativeTimeFormat('ro', relativeTimeFormat),
  'zh-CN': new Intl.RelativeTimeFormat('zh-CN', relativeTimeFormat),
  'zh-TW': new Intl.RelativeTimeFormat('zh-TW', relativeTimeFormat),
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

export function useRelativeTimeFormatter() {
  const { lang } = useTranslation('common');
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

      if (diffInYears > 0) return sdyf.format(dateObj);
      if (diffInDays >= 30) return sdf.format(dateObj);
      if (diffInDays > 0) return rtf.format(-diffInDays, 'day');
      if (diffInHours > 0) return rtf.format(-diffInHours, 'hour');
      if (diffInMinutes > 0) return rtf.format(-diffInMinutes, 'minute');
      return rtf.format(-diffInSeconds, 'second');
    },
    [sdyf, sdf, rtf],
  );
}
