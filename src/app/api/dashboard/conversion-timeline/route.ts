/**
 * API Route: GET /api/dashboard/conversion-timeline
 * 
 * Returns timeline data showing lead conversions over time
 * 
 * Query parameters:
 * - timeframe: string (optional) - 'daily', 'weekly', or 'monthly' (default: 'weekly')
 * - days: number (optional) - Number of days to analyze (default: 30)
 */
export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getLeadConversionTimeline } from '@/services/dashboard-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    
    // Get timeframe parameter (default to weekly)
    const timeframe = searchParams.get('timeframe') || 'weekly';
    if (!['daily', 'weekly', 'monthly'].includes(timeframe)) {
      return errorResponse('Invalid timeframe parameter. Must be daily, weekly, or monthly');
    }
    
    // Get days parameter (default to 30)
    const days = Number(searchParams.get('days')) || 30;
    if (days <= 0 || days > 365) {
      return errorResponse('Invalid days parameter. Must be between 1 and 365');
    }
    
    const timeline = await getLeadConversionTimeline(
      userId, 
      timeframe as 'daily' | 'weekly' | 'monthly',
      days
    );
    
    return successResponse(timeline);
  } catch (error: any) {
    console.error('Error fetching conversion timeline:', error);
    return errorResponse(error.message);
  }
}