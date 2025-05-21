export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const searchParams = req.nextUrl.searchParams;
    
    const searchTerm = searchParams.get('search') || undefined;
    const type = searchParams.get('type') || undefined;
    
    // Build the query
    const query: any = {
      where: {
        lead: {
          userId: userId
        }
      },
      include: {
        lead: {
          select: {
            id: true,
            name: true,
            company: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    };
    
    // Add filters if provided
    if (searchTerm) {
      query.where.OR = [
        { content: { contains: searchTerm, mode: 'insensitive' } },
        { subject: { contains: searchTerm, mode: 'insensitive' } },
        { lead: { 
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { company: { contains: searchTerm, mode: 'insensitive' } },
          ]
        }},
      ];
    }
    
    if (type) {
      query.where.type = type;
    }
    
    const conversations = await prisma.conversation.findMany(query);
    
    return successResponse(conversations);
  } catch (error: any) {
    console.error('Error fetching conversations:', error);
    return errorResponse(error.message);
  }
}