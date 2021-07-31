import { useState, useEffect, useRef, MutableRefObject, Dispatch, SetStateAction } from 'react';
import { getThemeUrl, resolveTheme } from './utils';
import { Theme } from './variables';

export function useComponentVisible<T extends HTMLElement>(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return [ref, isComponentVisible, setIsComponentVisible] as [
    MutableRefObject<T>,
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ];
}

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  return isMounted;
}

export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function onThemeError() {
  document.head.removeChild(this);
}

function onThemeLoad() {
  const existingLink = document.querySelector<HTMLLinkElement>('link#giscus-theme');
  if (existingLink) document.head.removeChild(existingLink);
  this.id = 'giscus-theme';
  this.removeEventListener('load', onThemeLoad);
  this.removeEventListener('error', onThemeError);
}

export function useThemeChanger(themeUrl: string) {
  useEffect(() => {
    const link = document.createElement('link');

    link.id = 'giscus-theme-temp';
    link.rel = 'stylesheet';
    link.crossOrigin = 'anonymous';
    link.href = themeUrl;
    link.addEventListener('load', onThemeLoad, { once: true });
    link.addEventListener('error', onThemeError, { once: true });

    document.head.appendChild(link);
  }, [themeUrl]);
}

export function useTheme(initialTheme: Theme) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const resolvedTheme = resolveTheme(theme);
  const themeUrl = getThemeUrl(resolvedTheme, theme);

  useThemeChanger(themeUrl);

  return { theme, resolvedTheme, themeUrl, setTheme };
}
