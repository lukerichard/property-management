import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');
  const { pathname } = request.nextUrl;

  // Skip auth check for login and register pages
  if (pathname === '/landlord/login' || pathname === '/tenant/login' || 
      pathname === '/landlord/register' || pathname === '/tenant/register') {
    // If user is already authenticated and trying to access login/register pages
    if (authCookie) {
      const dashboardPath = pathname.startsWith('/landlord') ? '/landlord/dashboard' : '/tenant/dashboard';
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
    return NextResponse.next();
  }

  // For all other protected routes, check authentication
  if (!authCookie && (pathname.startsWith('/landlord') || pathname.startsWith('/tenant'))) {
    const loginPath = pathname.startsWith('/landlord') ? '/landlord/login' : '/tenant/login';
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/landlord/:path*',
    '/tenant/:path*'
  ]
}; 