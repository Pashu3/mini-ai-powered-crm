/**
 * API Route: GET /api/dashboard/metrics
 * 
 * Returns the main dashboard metrics including:
 * - Quick stats (totals and percentages)
 * - Lead distributions by stage and source
 * - Campaign performance
 * - Recent activity
 * - Upcoming reminders
 */
export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getDashboardMetrics } from '@/services/dashboard-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const metrics = await getDashboardMetrics(userId);
    return successResponse(metrics);
  } catch (error: any) {
    console.error('Error fetching dashboard metrics:', error);
    return errorResponse(error.message);
  }
}