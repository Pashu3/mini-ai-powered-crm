'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthContextProvider } from '@/context/auth-context';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </SessionProvider>
  );
}