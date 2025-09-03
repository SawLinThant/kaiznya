import 'server-only';
import type { Locale } from './constants';

const dictionaries = {
  en: () => import('../locales/en.json').then((module) => module.default),
  my: () => import('../locales/my.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale | string) => {
  const key = (locale as string) || 'en';
  if (!(key in dictionaries)) {
    // Fallback safely to English for unknown locales (e.g., requests to /serviceWorker.js)
    return dictionaries.en();
  }
  // @ts-expect-error safe after guard
  return dictionaries[key]();
};

// Type for translation keys with dot notation support
export type TranslationKey = string;

// Helper function for nested key access
export function getNestedTranslation(obj: any, key: string): string {
  return key.split('.').reduce((current, keyPart) => {
    return current && current[keyPart] ? current[keyPart] : key;
  }, obj);
}

// Type for dictionary structure
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>; 