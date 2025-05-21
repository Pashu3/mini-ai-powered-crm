export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getDashboardMetrics, getHistoricalMetrics } from '@/services/dashboard-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    const metric = searchParams.get('metric');
    
    // If specific metric is requested, return historical data
    if (metric) {
      const months = Number(searchParams.get('months')) || 6;
      const data = await getHistoricalMetrics(userId, metric, months);
      return successResponse(data);
    }
    
    // Otherwise return dashboard metrics
    const metrics = await getDashboardMetrics(userId);
    return successResponse(metrics);
  } catch (error: any) {
    console.error('Error fetching dashboard data:', error);
    return errorResponse(error.message);
  }
}