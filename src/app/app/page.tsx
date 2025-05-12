'use client';

import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'

const Page = () => {
  const router = useRouter();
   const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
 
   useEffect(() => {
     if (isAuthenticated) {
       router.push('/app/appealTable');
     }
   }, [isAuthenticated, router]);
 
   if (isAuthenticated) {
     return null; // Return null while redirecting
   }

  return <>
  Loading
  </>
}

export default Page