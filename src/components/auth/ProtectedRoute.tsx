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
  redirectTo = '/sign-in' 
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
      <div className="w-full bg-steeldark-600 text-steelpolished-400 min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-steelpolished-500">Loading...</p>
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
      <div className="w-full bg-steeldark-600 text-steelpolished-400 min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-steelpolished-400 mb-4">Sign In Required</h1>
            <p className="text-steelpolished-500 mb-8">
              Please sign in to access this page.
            </p>
            <Link href={redirectTo}>
              <button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors">
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
