import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    matcher: [
        '/((?!api|about|privacy|terms|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt|$).*)',
    ],
}

export default withAuth(
  function middleware(request: NextRequest) {
    const token = request.cookies.get('kinde_token');
    const { pathname } = request.nextUrl;
    const isAuthPage = pathname === '/auth';

    if (token && isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  },
  {
    loginPage: '/auth',
    isReturnToCurrentPage: false
  }
);