import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');
  const { pathname } = request.nextUrl;

  // If user is not authenticated and trying to access protected routes
  if (!authCookie && (pathname.startsWith('/landlord') || pathname.startsWith('/tenant'))) {
    // Redirect to the appropriate login page
    const loginPath = pathname.startsWith('/landlord') ? '/login/landlord' : '/login/tenant';
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  // If user is authenticated and trying to access login pages
  if (authCookie && (pathname === '/login/landlord' || pathname === '/login/tenant')) {
    // Redirect to the appropriate dashboard
    const dashboardPath = pathname === '/login/landlord' ? '/landlord/dashboard' : '/tenant/dashboard';
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/landlord/:path*',
    '/tenant/:path*',
    '/login/landlord',
    '/login/tenant'
  ]
}; 