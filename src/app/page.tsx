'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hook';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    // Redirect to the appropriate page based on authentication status
    if (isAuthenticated) {
      router.push('/app/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // This is just a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
  );
}