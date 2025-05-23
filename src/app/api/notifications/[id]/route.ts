export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { 
  markNotificationAsRead, 
  deleteNotification,
  getNotificationById // Add this import
} from '@/services/notification-service';
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  notFoundResponse 
} from '@/lib/api-utils';

type Params = Promise<{ id: string }>;

// Add GET method to retrieve a specific notification
export async function GET(
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
    
    const notification = await getNotificationById(notificationId, userId);
    
    if (!notification) {
      return notFoundResponse('Notification not found');
    }
    
    return successResponse(notification);
  } catch (error: any) {
    console.error('Error fetching notification:', error);
    return errorResponse(error.message);
  }
}

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

// Remove the POST method since it duplicates PUT functionality

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