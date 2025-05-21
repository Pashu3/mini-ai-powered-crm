import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse 
} from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        preferences: true,
      },
    });
    
    if (!user) {
      return errorResponse('User not found');
    }
    
    return successResponse(user.preferences || {});
  } catch (error: any) {
    console.error('Error fetching user preferences:', error);
    return errorResponse(error.message);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const preferences = await req.json();
    
    // Update preferences
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        preferences: preferences,
      },
      select: {
        preferences: true,
      },
    });
    
    return successResponse(user.preferences);
  } catch (error: any) {
    console.error('Error updating user preferences:', error);
    return errorResponse(error.message);
  }
}