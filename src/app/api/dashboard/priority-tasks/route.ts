/**
 * API Route: GET /api/dashboard/priority-tasks
 * 
 * Returns priority tasks that need attention (due today, overdue, upcoming)
 * 
 * Query parameters:
 * - limit: number (optional) - Number of tasks to return (default: 5)
 */
export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getPriorityTasks } from '@/services/dashboard-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    
    // Get limit parameter (default to 5)
    const limit = Number(searchParams.get('limit')) || 5;
    
    const tasks = await getPriorityTasks(userId, limit);
    return successResponse(tasks);
  } catch (error: any) {
    console.error('Error fetching priority tasks:', error);
    return errorResponse(error.message);
  }
}