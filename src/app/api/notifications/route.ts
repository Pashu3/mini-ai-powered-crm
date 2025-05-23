export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
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
    
    // Check if requesting unread only
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    
    // Get limit parameter
    const limit = Number(searchParams.get('limit')) || 20;
    
    // Get notifications with proper filtering
    const notifications = await getNotifications(userId, limit, unreadOnly);
    
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