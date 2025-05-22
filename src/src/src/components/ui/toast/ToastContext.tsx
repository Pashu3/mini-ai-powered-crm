'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

// Simple ID generator without requiring uuid package
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  type?: ToastType;
  duration?: number;
}

export interface ToastContextProps {
  toasts: Array<ToastOptions & { id: string }>;
  toast: (options: ToastOptions) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  toast: () => {},
  dismiss: () => {},
  dismissAll: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<ToastOptions & { id: string }>>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = generateId();
    setToasts((prev) => [...prev, { ...options, id }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);