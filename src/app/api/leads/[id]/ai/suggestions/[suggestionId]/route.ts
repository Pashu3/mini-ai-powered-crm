import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateSuggestionStatus } from '@/services/ai-suggestion-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; suggestionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const leadId = params.id;
    const suggestionId = params.suggestionId;
    
    const data = await req.json();
    
    if (!data.status) {
      return errorResponse('Status is required');
    }
    
    const suggestion = await updateSuggestionStatus(suggestionId, leadId, userId, data.status);
    return successResponse(suggestion);
  } catch (error: any) {
    console.error('Error updating suggestion status:', error);
    return errorResponse(error.message);
  }
}