import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Pages that don't require authentication
const publicPages = [
  '/', 
  '/auth/login', 
  '/auth/register', 
  '/auth/forgot-password',
  '/auth/reset-password'
];

export async function middleware(request: NextRequest) {
  // Skip middleware for Next.js assets, public files, and API routes
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('/api/') ||
    pathname.startsWith('/public/')
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;
  const path = pathname;
  
  // Check if the page is a public page
  const isPublicPage = publicPages.some(page => 
    path === page || 
    path.startsWith(page + '/') 
  );
  
  // Redirect to login if accessing a protected page while unauthenticated
  if (!isAuthenticated && !isPublicPage) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if accessing login/register while authenticated
  if (isAuthenticated && (
    path === '/auth/login' || 
    path === '/auth/register' ||
    path === '/auth/forgot-password' ||
    path.startsWith('/auth/reset-password')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except specific Next.js paths
    '/((?!_next/static|_next/image|favicon.ico).*)' 
  ],
};