export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { 
  getNotifications, 
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
    
    const countOnly = searchParams.get('countOnly') === 'true';
    
    if (countOnly) {
      const count = await getUnreadNotificationsCount(userId);
      return successResponse({ count });
    }
    
    // Get limit parameter
    const limit = Number(searchParams.get('limit')) || 20;
    
    // Get unread notifications
    const notifications = await getNotifications(userId, limit, true);
    
    return successResponse(notifications);
  } catch (error: any) {
    console.error('Error fetching unread notifications:', error);
    return errorResponse(error.message);
  }
}