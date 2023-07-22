"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserAuth } from '@/context/authContext';

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const {user,userSettings} = UserAuth();
    const userIsAuthenticated = (user !== null);

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push('/');
      }
      else{
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}
