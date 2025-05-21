'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';
// Update the import path to our custom toast implementation
import { useToast } from '@/components/ui/toast/ToastContext';

type SocketContextType = {
  isConnected: boolean;
  lastNotification: any;
};

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  lastNotification: null,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { socket, isConnected, lastMessage } = useSocket();
  const [lastNotification, setLastNotification] = useState<any>(null);
  const { toast } = useToast();

  // When receiving a new notification
  useEffect(() => {
    if (lastMessage) {
      setLastNotification(lastMessage);
      
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

  return (
    <SocketContext.Provider value={{ isConnected, lastNotification }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocketContext = () => useContext(SocketContext);