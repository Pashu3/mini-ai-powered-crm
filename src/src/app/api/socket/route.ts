import { NextResponse } from 'next/server';
import { Server as SocketServer } from 'socket.io';
import { initSocketConnection } from '@/lib/socket-server';
import type { NextApiResponseServerIO } from '@/types/global';

// No need to check if the property exists since it's declared in global.d.ts
// TypeScript now knows that global.socketIoServer can exist

// This keeps track of whether the socket has been initialized
let isSocketInitialized = false;

export async function GET(req: Request) {
  // In App Router, we need to handle sockets differently than in Pages Router
  if (!global.socketIoServer) {
    // Create a global object to store the Socket.io server instance
    global.socketIoServer = new SocketServer({
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || '*',
        methods: ['GET', 'POST'],
        credentials: true,
      }
    });

    // Initialize the socket connection handlers
    if (!isSocketInitialized) {
      initSocketConnection(global.socketIoServer);
      isSocketInitialized = true;
      console.log('Socket.io server initialized');
    }
  }

  return NextResponse.json({ success: true, message: 'Socket server running' });
}