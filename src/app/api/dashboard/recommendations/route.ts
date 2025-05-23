/**
 * API Route: GET /api/dashboard/recommendations
 * 
 * Returns AI-generated recommendations for lead follow-ups
 * 
 * Query parameters:
 * - limit: number (optional) - Number of recommendations to return (default: 5)
 */
export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getAiRecommendations } from '@/services/dashboard-service';
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
    
    const recommendations = await getAiRecommendations(userId, limit);
    return successResponse(recommendations);
  } catch (error: any) {
    console.error('Error fetching AI recommendations:', error);
    return errorResponse(error.message);
  }
}