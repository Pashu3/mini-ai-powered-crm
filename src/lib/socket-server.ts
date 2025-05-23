import { Server as SocketIOServer } from 'socket.io';
import { getToken } from 'next-auth/jwt';

const userConnections = new Map<string, string[]>();

export const initSocketConnection = (io: SocketIOServer) => {
  io.on('connection', async (socket) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        console.log('Socket connection rejected: No token provided');
        socket.disconnect(true);
        return;
      }

      let userId: string;
      try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        userId = payload.sub || payload.id;
        
        if (!userId) {
          throw new Error('Invalid token payload');
        }
      } catch (error) {
        console.log('Socket connection rejected: Invalid token', error);
        socket.disconnect(true);
        return;
      }

      // Store connection for this user
      socket.data.userId = userId;
      
      // Add to user's room for targeted messages
      socket.join(`user:${userId}`);
      
      // Track this connection
      if (!userConnections.has(userId)) {
        userConnections.set(userId, []);
      }
      userConnections.get(userId)?.push(socket.id);
      
      console.log(`User ${userId} connected with socket ${socket.id}`);

      // Listen for client events
      socket.on('request_notification_count', async () => {
        // User is requesting their current notification count
        try {
          const { getUnreadNotificationsCount } = await import('@/services/notification-service');
          const count = await getUnreadNotificationsCount(userId);
          socket.emit('notification_count_update', { count });
        } catch (error) {
          console.error('Error sending notification count:', error);
        }
      });

      // Clean up on disconnect
      socket.on('disconnect', () => {
        const connections = userConnections.get(userId) || [];
        const updatedConnections = connections.filter(id => id !== socket.id);
        
        if (updatedConnections.length > 0) {
          userConnections.set(userId, updatedConnections);
        } else {
          userConnections.delete(userId);
        }
        
        console.log(`User ${userId} disconnected socket ${socket.id}`);
      });

    } catch (error) {
      console.error('Error handling socket connection:', error);
      socket.disconnect(true);
    }
  });

  return io;
};

// Helper to emit events to a specific user
export const emitToUser = (userId: string, event: string, data: any) => {
  if (!global.socketIoServer) {
    console.log(`Socket server not initialized, couldn't emit to user ${userId}`);
    return;
  }
  
  global.socketIoServer.to(`user:${userId}`).emit(event, data);
  console.log(`Emitted ${event} to user ${userId}`, data);
};

// Helper to emit events to all users
export const emitToAll = (event: string, data: any) => {
  if (!global.socketIoServer) {
    console.log(`Socket server not initialized, couldn't broadcast`);
    return;
  }
  
  global.socketIoServer.emit(event, data);
  console.log(`Broadcasted ${event} to all users`);
};

// Check if a user is currently connected
export const isUserConnected = (userId: string) => {
  return userConnections.has(userId) && userConnections.get(userId)!.length > 0;
};

// Get count of connected users
export const getConnectedUsersCount = () => {
  return userConnections.size;
};