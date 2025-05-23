import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { globalSearch } from '@/services/search-service';

export const dynamic = 'force-dynamic';

/**
 * Global search API endpoint
 * GET /api/search?q=query&types=leads,tasks&limit=5&page=1
 */
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim();
    const types = searchParams.get('types')?.split(',') || [
      'leads',
      'tasks',
      'conversations',
      'templates',
      'campaigns'
    ];
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);

    if (!query || query.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Search query must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Perform global search
    const { results, totalResults, counts } = await globalSearch({
      query,
      userId: session.user.id,
      types,
      limit,
      page
    });

    // Return search results
    return NextResponse.json({
      success: true,
      query,
      totalResults,
      counts,
      results
    });
  } catch (error) {
    console.error('Global search error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during search' },
      { status: 500 }
    );
  }
}