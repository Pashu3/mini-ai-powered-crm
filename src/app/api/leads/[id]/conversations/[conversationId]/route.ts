export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { updateConversation, deleteConversation, getConversation } from '@/services/conversation-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

type Params = Promise<{ id: string; conversationId: string }>;

export async function GET(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const leadId = params.id;
    const conversationId = params.conversationId;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const conversation = await getConversation(conversationId, leadId, userId);
    return successResponse(conversation);
  } catch (error: any) {
    console.error('Error fetching conversation:', error);
    return errorResponse(error.message);
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const leadId = params.id;
    const conversationId = params.conversationId;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    const conversation = await updateConversation(conversationId, leadId, userId, data);
    return successResponse(conversation);
  } catch (error: any) {
    console.error('Error updating conversation:', error);
    return errorResponse(error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const leadId = params.id;
    const conversationId = params.conversationId;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const result = await deleteConversation(conversationId, leadId, userId);
    return successResponse(result);
  } catch (error: any) {
    console.error('Error deleting conversation:', error);
    return errorResponse(error.message);
  }
}