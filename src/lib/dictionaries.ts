import 'server-only';
import type { Locale } from './constants';

const CDN_DICTIONARY_URLS: Record<string, string> = {
  en: 'https://cdn.kanaiya.shop/kanaiya_json/locale/en.json',
  my: 'https://cdn.kanaiya.shop/kanaiya_json/locale/my.json',
  th: 'https://cdn.kanaiya.shop/kanaiya_json/locale/th.json',
};

async function fetchDictionary(url: string) {
  const res = await fetch(url, {
    // Cache on the server for a short period to reduce load
    next: { revalidate: 300 },
    headers: { 'Accept': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Failed to load dictionary from ${url}: ${res.status}`);
  }
  return res.json();
}

const dictionaries = {
  en: () => fetchDictionary(CDN_DICTIONARY_URLS.en),
  my: () => fetchDictionary(CDN_DICTIONARY_URLS.my),
  th: () => fetchDictionary(CDN_DICTIONARY_URLS.th),
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