// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


// Define your protected routes
const protectedRoutes = ['/waiter', '/main'];

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token');
  const isAuthenticated = authToken?.value === 'authenticated';
  const path = request.nextUrl.pathname;

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && protectedRoutes.includes(path)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', path); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated and trying to access a public route that should be restricted after login (e.g., login page)
  if (isAuthenticated && path === '/login') {
    return NextResponse.redirect(new URL('/waiter', request.url)); // Redirect to waiter page
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      * Match all request paths except for the ones starting with:
      * - _next/static (static files)
      * - _next/image (image optimization files)
      * - favicon.ico (favicon file)
      * - api/auth (NextAuth.js routes)
      */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};