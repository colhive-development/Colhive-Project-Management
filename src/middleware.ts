import { auth } from '@/lib/auth';
import getCurrentUser from './functions/getCurrentUser';

export default auth(async (request) => {
  const user = await getCurrentUser();

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      return Response.redirect(new URL('/authenticate', request.url));
    } else if (!user.setUP) {
      return Response.redirect(new URL('/first-login', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/verify-email')) {
    if (request.nextUrl.searchParams.size === 0) {
      return Response.redirect(new URL('/', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/first-login')) {
    if (!user) {
      return Response.redirect(new URL('/authenticate', request.url));
    } else if (user.setUP) {
      return Response.redirect(new URL('/dashboard', request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith('/authenticate') && user) {
    return Response.redirect(new URL('/dashboard', request.url));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
