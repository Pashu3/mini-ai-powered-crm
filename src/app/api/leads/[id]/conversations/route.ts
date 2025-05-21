import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createConversation, getConversations } from '@/services/conversation-service';
import { successResponse, createdResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const leadId = params.id;
    
    const conversations = await getConversations(leadId, userId);
    return successResponse(conversations);
  } catch (error: any) {
    console.error('Error fetching conversations:', error);
    return errorResponse(error.message);
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const leadId = params.id;
    const data = await req.json();
    
    // Validate required fields
    if (!data.content || !data.type) {
      return errorResponse('Content and type are required');
    }
    
    const conversation = await createConversation(leadId, userId, data);
    return createdResponse(conversation);
  } catch (error: any) {
    console.error('Error creating conversation:', error);
    return errorResponse(error.message);
  }
}