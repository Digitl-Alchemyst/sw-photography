'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  fallback,
  redirectTo = '/sign-in',
}: ProtectedRouteProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn && redirectTo) {
      router.push(redirectTo);
    }
  }, [isLoaded, isSignedIn, redirectTo, router]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>
            <div className='mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent' />
            <p className='text-steelpolished-500'>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Not signed in
  if (!isSignedIn) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className='min-h-screen w-full bg-steeldark-600 text-steelpolished-400'>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>
            <h1 className='mb-4 text-3xl font-bold text-steelpolished-400'>Sign In Required</h1>
            <p className='mb-8 text-steelpolished-500'>Please sign in to access this page.</p>
            <Link href={redirectTo}>
              <button className='rounded-lg bg-accent px-6 py-3 text-white transition-colors hover:bg-accent/90'>
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Signed in - render children
  return <>{children}</>;
}
