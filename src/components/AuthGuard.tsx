'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: ('PATIENT' | 'DOCTOR' | 'ADMIN')[];
}

export function AuthGuard({ children, requireAuth = false, allowedRoles }: AuthGuardProps) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getCurrentUser();

    if (requireAuth && !isAuthenticated) {
      // Redirect to login if auth is required but user is not authenticated
      router.push('/');
      return;
    }

    if (isAuthenticated && allowedRoles && user) {
      // Check if user has the allowed role
      if (!allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role
        if (user.role === 'PATIENT') {
          router.push('/patient/dashboard');
        } else if (user.role === 'DOCTOR') {
          router.push('/doctor/dashboard');
        } else {
          router.push('/');
        }
      }
    }
  }, [requireAuth, allowedRoles, router]);

  return <>{children}</>;
}
