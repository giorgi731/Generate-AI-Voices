import { NextRequest, NextResponse } from 'next/server';
import csrf from 'edge-csrf';

import HttpStatusCode from '~/core/generic/http-status-code.enum';
import configuration from '~/configuration';

const CSRF_TOKEN_HEADER = 'X-CSRF-Token';
const CSRF_SECRET_COOKIE = 'csrfSecret';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|locales|assets|api/stripe/webhook).*)',
  ],
};

const csrfMiddleware = csrf({
  cookie: {
    secure: configuration.production,
    name: CSRF_SECRET_COOKIE,
  },
});

export async function middleware(request: NextRequest) {
  return await withCsrfMiddleware(request);
}

async function withCsrfMiddleware(request: NextRequest) {
  // Bypass CSRF validation for the /api endpoint
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  requestHeaders.set('x-origin', origin);
  requestHeaders.set('x-pathname', pathname);
  if (request.url.includes('/api')) {
    return NextResponse.next({request: {
      headers: requestHeaders
    }});
  }

  if (request.url.includes('/ai-voice-generator')) {
    return NextResponse.next({request: {
      headers: requestHeaders
    }});
  }
  const csrfResponse = NextResponse.next({request: {
    headers: requestHeaders
  }});
  const csrfError = await csrfMiddleware(request, csrfResponse);

  if (csrfError) {
    return NextResponse.json('Invalid CSRF token', {
      status: HttpStatusCode.Forbidden,
    });
  }

  const token = csrfResponse.headers.get(CSRF_TOKEN_HEADER);
  if (token) {
    requestHeaders.set(CSRF_TOKEN_HEADER, token ?? '');
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    const nextCsrfSecret = csrfResponse.cookies.get(CSRF_SECRET_COOKIE)?.value ?? '';
    if (nextCsrfSecret) {
      response.cookies.set(CSRF_SECRET_COOKIE, nextCsrfSecret);
    }
    return response;
  }

  return csrfResponse;
}
