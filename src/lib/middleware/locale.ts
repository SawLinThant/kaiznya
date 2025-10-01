import { locales, defaultLocale } from '@/lib/constants';

// Paths that should bypass locale redirect (assets, API, Next internals)
const PUBLIC_FILE = /\.(?:.*)$/; // any file with an extension

export function isPublicAsset(pathname: string): boolean {
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap')
  ) {
    return true;
  }
  // treat any path with a dot as a file
  return PUBLIC_FILE.test(pathname);
}

export function hasLocalePrefix(pathname: string): boolean {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return false;
  return locales.includes(parts[0] as (typeof locales)[number]);
}

export function ensureLocalePath(pathname: string, locale: string = defaultLocale): string {
  if (hasLocalePrefix(pathname)) return pathname;
  if (pathname === '/' || pathname.length === 0) return `/${locale}`;
  return `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

export function getDefaultLocale(): string {
  return defaultLocale;
}


