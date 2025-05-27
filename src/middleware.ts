import { NextRequest, NextResponse } from 'next/server';
import { AUTH_CONFIG } from './constants/routes';
import { isExactPublicPath, isPrivatePath, isPublicPathPrefix } from './utils/privateRoutesHelper';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  const isPublic = isExactPublicPath(pathname) || isPublicPathPrefix(pathname);
  const isPrivate = isPrivatePath(pathname);

  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));

  if (token && isPublic) return redirectTo(AUTH_CONFIG.authenticatedRedirect);

  if (!token && isPrivate) return redirectTo(AUTH_CONFIG.unauthenticatedRedirect);

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/complete-auth',
    '/forgot-password',
    '/reset-password/:path*',
    '/settings/:path*',
    '/chats/:path*'
  ],
};