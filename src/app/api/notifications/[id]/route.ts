export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { 
  markNotificationAsRead, 
  deleteNotification 
} from '@/services/notification-service';
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse 
} from '@/lib/api-utils';

type Params = Promise<{ id: string }>;

export async function PUT(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const notificationId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const notification = await markNotificationAsRead(notificationId, userId);
    
    return successResponse(notification);
  } catch (error: any) {
    console.error('Error marking notification as read:', error);
    return errorResponse(error.message);
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const notificationId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const notification = await markNotificationAsRead(notificationId, userId);
    
    return successResponse(notification);
  } catch (error: any) {
    console.error('Error marking notification as read:', error);
    return errorResponse(error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const notificationId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const result = await deleteNotification(notificationId, userId);
    
    return successResponse(result);
  } catch (error: any) {
    console.error('Error deleting notification:', error);
    return errorResponse(error.message);
  }
}