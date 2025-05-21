import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const conversationId = params.id;
    
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
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
            email: true,
            phone: true,
          },
        },
      },
    });
    
    if (!conversation) {
      return errorResponse('Conversation not found', 404);
    }
    
    return successResponse(conversation);
  } catch (error: any) {
    console.error('Error fetching conversation:', error);
    return errorResponse(error.message);
  }
}