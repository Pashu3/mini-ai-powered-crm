'use client';

import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { SocketProvider } from '@/providers/SocketProvider';
import { Toaster } from '@/components/ui/Toaster';
import { ToastProvider } from '@/components/ui/toast/ToastContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToastProvider>
          <SocketProvider>
            {children}
            <Toaster />
          </SocketProvider>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}