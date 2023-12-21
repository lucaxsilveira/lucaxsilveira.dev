import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from './utils/language';

const getLocale = (request: NextRequest) => {
  const { headers } = request;
  const acceptLanguage = headers.get('accept-language');
  const negotiator = new Negotiator({
    headers: { 'accept-language': acceptLanguage },
  });
  const locale = negotiator.language(locales) || defaultLocale;
  return locale;
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const url = new URL(request.url);
  const origin = url.origin;
  const { pathname } = request.nextUrl;

  requestHeaders.set('x-origin', origin);
  requestHeaders.set('x-pathname', pathname);

  // return NextResponse.next({
  //   request: {
  //     headers: requestHeaders,
  //   },
  // });

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  matcher: ['/((?!_next).*)'],
};
