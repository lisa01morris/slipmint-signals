import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPrefixes = ['/dashboard', '/academy', '/signals', '/tools', '/referrals', '/account'];

export function middleware(req: NextRequest) {
  const isProtected = protectedPrefixes.some((prefix) => req.nextUrl.pathname.startsWith(prefix));

  if (!isProtected) return NextResponse.next();

  // Replace this placeholder with a real auth/session check.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/academy/:path*', '/signals/:path*', '/tools/:path*', '/referrals/:path*', '/account/:path*'],
};
