import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { 
  markNotificationAsRead, 
  deleteNotification 
} from '@/services/notification-service';
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse 
} from '@/lib/api-utils';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const notificationId = params.id;
    
    const notification = await markNotificationAsRead(notificationId, userId);
    
    return successResponse(notification);
  } catch (error: any) {
    console.error('Error marking notification as read:', error);
    return errorResponse(error.message);
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const notificationId = params.id;
    
    const notification = await markNotificationAsRead(notificationId, userId);
    
    return successResponse(notification);
  } catch (error: any) {
    console.error('Error marking notification as read:', error);
    return errorResponse(error.message);
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const notificationId = params.id;
    
    const result = await deleteNotification(notificationId, userId);
    
    return successResponse(result);
  } catch (error: any) {
    console.error('Error deleting notification:', error);
    return errorResponse(error.message);
  }
}

