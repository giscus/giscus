import useTranslation from 'next-translate/useTranslation';
import { useCallback } from 'react';

interface TranslationQuery {
  [name: string]: string | number;
}
interface TranslationQueryCount extends TranslationQuery {
  count: number;
}

type I18n = typeof import('../locales/en/common.json');

type PluralSuffixes = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' | number;

type I18nKeysRequireCount = {
  [K in keyof I18n]: K extends `${infer R}_${PluralSuffixes}` ? R : I18n[K] extends Record<string, unknown> ? {
    [J in keyof I18n[K]]: J extends PluralSuffixes ? K : never
  }[keyof I18n[K]] : never
}[keyof I18n];

type I18nKeysNoCount = {
  [K in keyof I18n]: K extends `${string}_${PluralSuffixes}` ? never : I18n[K] extends Record<string, unknown> ? never : K
}[keyof I18n];

interface GiscusTranslate {
  (i18nKey: I18nKeysRequireCount, query: TranslationQueryCount): string;
  (i18nKey: I18nKeysNoCount, query?: TranslationQuery): string;
}


export const useGiscusTranslation = () => {
  const { t, lang } = useTranslation('common');
  return { t: t as GiscusTranslate, lang };
};

const dateFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'short',
};

const dateFormatters = {
  en: new Intl.DateTimeFormat('en', dateFormat),
  pl: new Intl.DateTimeFormat('pl', dateFormat),
  ro: new Intl.DateTimeFormat('ro', dateFormat),
} as const;

export const useDateFormatter = () => {
  const { lang } = useTranslation('common');
  const intl: Intl.DateTimeFormat = dateFormatters[lang] ?? dateFormatters.en;

  return useCallback((date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return intl.format(dateObj);
  }, [intl]);
}
