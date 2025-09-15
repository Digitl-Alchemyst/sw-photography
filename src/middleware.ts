import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    '/',
    '/gallery',
    '/gallery/(.*)',
    '/blog',
    '/blog/(.*)',
    '/about',
    '/contact',
    '/shop',
    '/shop/(.*)',
    '/api/webhooks/(.*)',
    '/api/sanity/(.*)',
    '/api/products/(.*)',
    '/api/orders/(.*)',
    '/checkout',
    '/checkout/(.*)',
  ],
  // Routes that require authentication
  ignoredRoutes: [
    '/api/webhooks/clerk',
    '/api/sanity/revalidate',
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
