'use client';

import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({
  id,
  title,
  description,
  action,
  type = 'default',
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Allow animation to complete
    }, duration);
    
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch(type) {
      case 'success':
        return <CheckCircle2 size={18} className="text-green-600 dark:text-green-400" />;
      case 'error':
        return <AlertCircle size={18} className="text-red-600 dark:text-red-400" />;
      case 'warning':
        return <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400" />;
      case 'info':
        return <Info size={18} className="text-blue-600 dark:text-blue-400" />;
      default:
        return null;
    }
  };
  
  return (
    <div
      className={cn(
        'pointer-events-auto relative flex w-full max-w-md rounded-lg shadow-md border transition-all duration-300 ease-in-out min-h-[64px]',
        {
          'bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100': type === 'default',
          'bg-white text-gray-900 border-l-4 border-l-green-500 border-gray-100 dark:bg-gray-800 dark:border-l-green-500 dark:border-gray-700 dark:text-gray-100': type === 'success',
          'bg-white text-gray-900 border-l-4 border-l-red-500 border-gray-100 dark:bg-gray-800 dark:border-l-red-500 dark:border-gray-700 dark:text-gray-100': type === 'error',
          'bg-white text-gray-900 border-l-4 border-l-amber-500 border-gray-100 dark:bg-gray-800 dark:border-l-amber-500 dark:border-gray-700 dark:text-gray-100': type === 'warning',
          'bg-white text-gray-900 border-l-4 border-l-blue-500 border-gray-100 dark:bg-gray-800 dark:border-l-blue-500 dark:border-gray-700 dark:text-gray-100': type === 'info',
          'opacity-100 translate-y-0': isVisible,
          'opacity-0 translate-y-2': !isVisible,
        }
      )}
      role="alert"
    >
      <div className="flex flex-1 p-4 items-start">
        {type !== 'default' && (
          <div className="flex-shrink-0 mr-3">
            {getIcon()}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <div className="font-semibold leading-tight">{title}</div>
          )}
          {description && (
            <div className={cn('text-sm text-gray-600 dark:text-gray-300', title ? 'mt-1' : '')}>{description}</div>
          )}
          {action && <div className="mt-3">{action}</div>}
        </div>
      </div>
      
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300);
        }}
        className="flex items-center justify-center p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
      >
        <X size={16} />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}