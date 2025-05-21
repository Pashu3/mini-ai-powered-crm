import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { updateSuggestionStatus } from '@/services/ai-suggestion-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

type Params = Promise<{ id: string; suggestionId: string }>;

export async function PATCH(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const leadId = params.id;
    const suggestionId = params.suggestionId;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
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