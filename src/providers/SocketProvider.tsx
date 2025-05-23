'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSocket } from '@/hooks/useSocket';
// Update the import path to our custom toast implementation
import { useToast } from '@/components/ui/toast/ToastContext';

type SocketContextType = {
  isConnected: boolean;
  lastNotification: any;
  notificationCount: number;
  updateNotificationCount: (newCountOrUpdater: number | ((prevCount: number) => number)) => void;
  resetNotificationCount: () => void;
};

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  lastNotification: null,
  notificationCount: 0,
  updateNotificationCount: () => { },
  resetNotificationCount: () => { },
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { socket, isConnected, lastMessage } = useSocket();
  const [lastNotification, setLastNotification] = useState<any>(null);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const { toast } = useToast();

  // Fetch initial notification count on mount
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch('/api/notifications/unread/count');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setNotificationCount(data.count || 0);
          }
        }
      } catch (error) {
        console.error('Error fetching notification count:', error);
      }
    };

    if (isConnected) {
      fetchUnreadCount();
    }
  }, [isConnected]);

  // When receiving a new notification
  useEffect(() => {
    if (lastMessage) {
      setLastNotification(lastMessage);

      // Increment notification count when a new notification arrives
      if (!lastMessage.isRead) {
        setNotificationCount(prevCount => prevCount + 1);
      }

      // Show a toast notification
      // Update properties to match our custom toast implementation
      toast({
        title: lastMessage.title,
        description: lastMessage.message,
        type: lastMessage.type === 'ERROR' ? 'error' :
          lastMessage.type === 'SUCCESS' ? 'success' :
            lastMessage.type === 'WARNING' ? 'warning' : 'info',
      });
    }
  }, [lastMessage, toast]);

  const updateNotificationCount = useCallback((newCountOrUpdater: number | ((prevCount: number) => number)) => {
    setNotificationCount(currentCount => {
      if (typeof newCountOrUpdater === 'function') {
        return newCountOrUpdater(currentCount);
      }
      return newCountOrUpdater;
    });
  }, []);

  const resetNotificationCount = useCallback(() => {
    setNotificationCount(0);
  }, []);

  return (
    <SocketContext.Provider value={{
      isConnected,
      lastNotification,
      notificationCount,
      updateNotificationCount,
      resetNotificationCount
    }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocketContext = () => useContext(SocketContext);