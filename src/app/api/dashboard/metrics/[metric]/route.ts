/**
 * API Route: GET /api/dashboard/metrics/[metric]
 * 
 * Dynamic route that returns historical metrics data for a specific metric
 * Valid metrics: leads, conversations, conversions
 * 
 * Query parameters:
 * - months: number (optional) - Number of months to retrieve (default: 6)
 */
export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getHistoricalMetrics } from '@/services/dashboard-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

// Fix the parameter type to match Next.js expectation
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ metric: string }> }
) {
  const { metric } = await context.params;

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return unauthorizedResponse();
    }

    const userId = session.user.id;
    const { searchParams } = new URL(req.url);

    if (!['leads', 'conversations', 'conversions'].includes(metric)) {
      return errorResponse(
        `Invalid metric: ${metric}. Valid options are: leads, conversations, conversions`
      );
    }

    const months = Number(searchParams.get('months')) || 6;
    if (months < 1 || months > 24) {
      return errorResponse('Invalid months parameter. Must be between 1 and 24');
    }

    const metricData = await getHistoricalMetrics(userId, metric, months);
    return successResponse(metricData);
  } catch (error: any) {
    console.error(`Error fetching ${metric} metrics:`, error);
    return errorResponse(error.message);
  }
}