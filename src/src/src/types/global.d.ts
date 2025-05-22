import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';

// Declare the global namespace to add socketIoServer
declare global {
  var socketIoServer: SocketIOServer | null;
}

// Export to use with Next.js Response
export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: {
      io: SocketIOServer;
    };
  };
};