'use client';

import React from 'react';
import { useToast } from '@/components/ui/toast/ToastContext';
import { Toast } from './Toast';
import { AnimatePresence, motion } from 'framer-motion';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-full max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Toast
              id={toast.id}
              title={toast.title}
              description={toast.description}
              action={toast.action}
              type={toast.type}
              duration={toast.duration}
              onClose={dismiss}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}