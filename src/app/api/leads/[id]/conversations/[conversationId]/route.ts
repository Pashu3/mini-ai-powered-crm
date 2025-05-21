import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateConversation, deleteConversation, getConversation } from '@/services/conversation-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; conversationId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const leadId = params.id;
    const conversationId = params.conversationId;
    
    const conversation = await getConversation(conversationId, leadId, userId);
    return successResponse(conversation);
  } catch (error: any) {
    console.error('Error fetching conversation:', error);
    return errorResponse(error.message);
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string; conversationId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const leadId = params.id;
    const conversationId = params.conversationId;
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
  { params }: { params: { id: string; conversationId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const leadId = params.id;
    const conversationId = params.conversationId;
    
    const result = await deleteConversation(conversationId, leadId, userId);
    return successResponse(result);
  } catch (error: any) {
    console.error('Error deleting conversation:', error);
    return errorResponse(error.message);
  }
}