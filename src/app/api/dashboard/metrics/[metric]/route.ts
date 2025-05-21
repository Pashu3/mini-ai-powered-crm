import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getHistoricalMetrics } from '@/services/dashboard-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { metric: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const metric = params.metric;
    const { searchParams } = new URL(req.url);
    const months = Number(searchParams.get('months')) || 6;
    
    // Validate metric
    const validMetrics = ['leads', 'conversations', 'conversions'];
    if (!validMetrics.includes(metric)) {
      return errorResponse('Invalid metric requested');
    }
    
    const data = await getHistoricalMetrics(userId, metric, months);
    return successResponse(data);
  } catch (error: any) {
    console.error('Error fetching metric data:', error);
    return errorResponse(error.message);
  }
}