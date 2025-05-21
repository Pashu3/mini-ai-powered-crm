import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // This route handles socket.io polling requests
  if (!global.socketIoServer) {
    return new Response('Socket.io server not initialized', { status: 500 });
  }

  // Let the global socket.io server handle the request
  // This is a hack since Next.js App Router doesn't support raw socket handling directly
  // The actual socket handling must happen elsewhere (in socket-server.ts)
  return new Response('Socket.IO handler active', { status: 200 });
}