import { NextRequest, NextResponse } from 'next/server';
import { getDefaultLocale } from '@/lib/middleware/locale';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only handle base path to avoid touching asset/image requests
  if (pathname === '/' || pathname.length === 0) {
    const url = req.nextUrl.clone();
    url.pathname = `/${getDefaultLocale()}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Only run on the base path for maximum performance
  matcher: ['/'],
};


