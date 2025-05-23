import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * Search suggestions API for autocomplete
 * GET /api/search/suggest?q=query&limit=5
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

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim();
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    if (!query || query.length < 2) {
      return NextResponse.json({ success: true, suggestions: [] });
    }

    // Get suggestions from various sources
    const [leadNames, companies, tags, templateNames] = await Promise.all([
      // Lead names
      prisma.lead.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
          isDeleted: false,
          OR: [
            { userId: session.user.id },
            { assignedToId: session.user.id }
          ]
        },
        select: { name: true },
        distinct: ['name'],
        take: limit
      }),
      
      // Companies
      prisma.lead.findMany({
        where: {
          company: { contains: query, mode: 'insensitive' },
          isDeleted: false,
          OR: [
            { userId: session.user.id },
            { assignedToId: session.user.id }
          ]
        },
        select: { company: true },
        distinct: ['company'],
        take: limit
      }),
      
      // Tags
      prisma.lead.findMany({
        where: {
          tags: { hasSome: [query] },
          isDeleted: false,
          OR: [
            { userId: session.user.id },
            { assignedToId: session.user.id }
          ]
        },
        select: { tags: true },
        take: limit
      }),
      
      // Templates
      prisma.messageTemplate.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
          userId: session.user.id
        },
        select: { name: true },
        distinct: ['name'],
        take: limit
      })
    ]);

    // Format suggestions
    const suggestions = [
      ...leadNames.map(lead => ({ type: 'lead', text: lead.name })),
      ...companies.filter(c => c.company).map(c => ({ type: 'company', text: c.company })),
      ...tags.flatMap(t => 
        t.tags.filter(tag => 
          tag.toLowerCase().includes(query.toLowerCase())
        ).map(tag => ({ type: 'tag', text: tag }))
      ),
      ...templateNames.map(t => ({ type: 'template', text: t.name }))
    ];

    // Remove duplicates and limit results
    const uniqueSuggestions = Array.from(
      new Map(suggestions.map(s => [`${s.type}-${s.text}`, s])).values()
    ).slice(0, limit);

    return NextResponse.json({
      success: true,
      suggestions: uniqueSuggestions
    });
  } catch (error) {
    console.error('Search suggestions error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while getting suggestions' },
      { status: 500 }
    );
  }
}