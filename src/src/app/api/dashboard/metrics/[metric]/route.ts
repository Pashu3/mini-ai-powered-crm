export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getHistoricalMetrics } from '@/services/dashboard-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

type Params = Promise<{ metric: string }>;

export async function GET(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const metric = params.metric;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
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