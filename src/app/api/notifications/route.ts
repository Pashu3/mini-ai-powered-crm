import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { 
  getNotifications, 
  markAllNotificationsAsRead, 
  getUnreadNotificationsCount 
} from '@/services/notification-service';
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
    const { searchParams } = new URL(req.url);
    
    // Check if only requesting count
    const countOnly = searchParams.get('countOnly') === 'true';
    
    if (countOnly) {
      const count = await getUnreadNotificationsCount(userId);
      return successResponse({ count });
    }
    
    // Otherwise get notifications
    const limit = Number(searchParams.get('limit')) || 20;
    const notifications = await getNotifications(userId, limit);
    
    return successResponse(notifications);
  } catch (error: any) {
    console.error('Error fetching notifications:', error);
    return errorResponse(error.message);
  }
}

// Mark all as read
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const result = await markAllNotificationsAsRead(userId);
    
    return successResponse({ success: true, updated: result.count });
  } catch (error: any) {
    console.error('Error marking notifications as read:', error);
    return errorResponse(error.message);
  }
}