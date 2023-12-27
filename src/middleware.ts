import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

import { defaultLocale, locales } from './utils/language';

const getLocale = (request: NextRequest) => {
  const { headers } = request;
  const acceptLanguage = headers.get('accept-language');
  if (acceptLanguage === null) return defaultLocale;

  const negotiator = new Negotiator({
    headers: { 'accept-language': acceptLanguage },
  });
  const lacalesStr = locales.map((locale) => locale);

  const locale = negotiator.language(lacalesStr) || defaultLocale;
  return locale;
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const url = new URL(request.url);
  const origin = url.origin;
  const { pathname } = request.nextUrl;

  requestHeaders.set('x-origin', origin);
  requestHeaders.set('x-pathname', pathname);

  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return response;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  matcher: ['/((?!_next).*)'],
};
