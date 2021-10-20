import { LoaderConfig } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import { useCallback } from 'react';

interface TranslationQuery {
  [name: string]: string | number;
}
interface TranslationQueryCount extends TranslationQuery {
  count: number;
}

type I18n = typeof import('../locales/en/common.json') & typeof import('../locales/en/config.json');

type PluralSuffixes = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' | number;

type I18nKeysRequireCount = {
  [K in keyof I18n]: K extends `${infer R}_${PluralSuffixes}`
    ? R
    : I18n[K] extends Record<string, unknown>
    ? {
        [J in keyof I18n[K]]: J extends PluralSuffixes ? K : never;
      }[keyof I18n[K]]
    : never;
}[keyof I18n];

type I18nKeysNoCount = {
  [K in keyof I18n]: K extends `${string}_${PluralSuffixes}`
    ? never
    : I18n[K] extends Record<string, unknown>
    ? never
    : K;
}[keyof I18n];

export interface GiscusTranslate {
  (i18nKey: I18nKeysRequireCount, query: TranslationQueryCount): string;
  (i18nKey: I18nKeysNoCount, query?: TranslationQuery): string;
}

export const availableLanguages = {
  en: 'English',
  pl: 'Polish',
  ro: 'Romanian',
} as const;

export type AvailableLanguage = keyof typeof availableLanguages;

const availableLocales = Object.keys(availableLanguages);

export function getLoaderConfig(lang: AvailableLanguage, pathname: string): LoaderConfig {
  return {
    locale: lang,
    locales: availableLocales,
    loader: false,
    defaultLocale: 'en',
    pathname,
    pages: {
      '*': ['common'],
    },
    async loadLocaleFrom(language, namespace) {
      return import(`../locales/${language}/${namespace}.json`).then((m) => m.default);
    },
  };
}

export function useGiscusTranslation() {
  const { t, lang } = useTranslation('common');
  return { t: t as GiscusTranslate, lang };
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
  pl: new Intl.DateTimeFormat('pl', dateFormat),
  ro: new Intl.DateTimeFormat('ro', dateFormat),
};

const shortDateFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
};

const shortDateFormatters: Record<AvailableLanguage, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en', shortDateFormat),
  pl: new Intl.DateTimeFormat('pl', shortDateFormat),
  ro: new Intl.DateTimeFormat('ro', shortDateFormat),
};

const shortDateYearFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

const shortDateYearFormatters: Record<AvailableLanguage, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en', shortDateYearFormat),
  pl: new Intl.DateTimeFormat('pl', shortDateYearFormat),
  ro: new Intl.DateTimeFormat('ro', shortDateYearFormat),
};

const relativeTimeFormat: Intl.RelativeTimeFormatOptions = {
  localeMatcher: 'best fit',
  numeric: 'auto',
  style: 'long',
};

const relativeTimeFormatters: Record<AvailableLanguage, Intl.RelativeTimeFormat> = {
  en: new Intl.RelativeTimeFormat('en', relativeTimeFormat),
  pl: new Intl.RelativeTimeFormat('pl', relativeTimeFormat),
  ro: new Intl.RelativeTimeFormat('ro', relativeTimeFormat),
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
      if (diffInDays > 0) return rtf.format(diffInDays, 'day');
      if (diffInHours > 0) return rtf.format(diffInHours, 'hour');
      if (diffInMinutes > 0) return rtf.format(diffInMinutes, 'minute');
      return rtf.format(diffInSeconds, 'second');
    },
    [sdyf, sdf, rtf],
  );
}
