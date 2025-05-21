import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';

export function useSocket() {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<ReturnType<typeof io> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  // Initialize socket connection when session is available
  useEffect(() => {
    if (!session?.user) return;

    // Clean up previous socket if it exists
    if (socket) {
      socket.disconnect();
    }

    // Initialize the socket.io connection
    fetch('/api/socket')
      .then(() => {
        const socketInstance = io({
          path: '/api/socket/io',  // Make sure this matches the server path
          auth: {
            token: session.user.id, // In production use a proper JWT
          },
        });

        socketInstance.on('connect', () => {
          console.log('Socket connected');
          setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
          console.log('Socket disconnected');
          setIsConnected(false);
        });

        // Handle notification events
        socketInstance.on('notification', (data: { title: string; message: string; type?: string }) => {
          console.log('Received notification:', data);
          setLastMessage(data);
          
          // You could also trigger a browser notification here
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(data.title, {
              body: data.message,
            });
          }
        });

        setSocket(socketInstance);

        // Clean up on unmount
        return () => {
          socketInstance.disconnect();
        };
      })
      .catch((error) => {
        console.error('Failed to initialize socket:', error);
      });
  }, [session]);

  return {
    socket,
    isConnected,
    lastMessage,
  };
}