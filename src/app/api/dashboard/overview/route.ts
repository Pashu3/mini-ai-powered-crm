/**
 * API Route: GET /api/dashboard/overview
 * 
 * Returns combined dashboard data in a single request for efficient dashboard loading
 * Includes metrics, timeline data, AI recommendations, and priority tasks
 */
export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { 
  getDashboardMetrics, 
  getLeadConversionTimeline,
  getAiRecommendations,
  getPriorityTasks
} from '@/services/dashboard-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    // Fetch all dashboard data in parallel
    const [metrics, timeline, recommendations, tasks] = await Promise.all([
      getDashboardMetrics(userId),
      getLeadConversionTimeline(userId, 'weekly', 30),
      getAiRecommendations(userId, 5),
      getPriorityTasks(userId, 5)
    ]);
    
    // Return combined data
    return successResponse({
      metrics,
      timeline,
      recommendations,
      priorityTasks: tasks
    });
  } catch (error: any) {
    console.error('Error fetching dashboard overview:', error);
    return errorResponse(error.message);
  }
}