'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/login-form';
import { useAppSelector } from '@/redux/hook';
import { ThemeToggle } from '@/components/ThemeToggel';

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/app/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null; // Return null while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
      <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Dashboard Login</h1>
          <p className="text-muted-foreground mt-2">Enter your credentials to access the dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}