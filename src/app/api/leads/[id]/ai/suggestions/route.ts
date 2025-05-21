export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { 
  generateSuggestion, 
  getSuggestions
} from '@/services/ai-suggestion-service';
import { 
  successResponse, 
  createdResponse, 
  errorResponse, 
  unauthorizedResponse 
} from '@/lib/api-utils';

type Params = Promise<{ id: string }>;

export async function GET(
  req: NextRequest, 
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const leadId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const suggestions = await getSuggestions(leadId, userId);
    return successResponse(suggestions);
  } catch (error: any) {
    console.error('Error fetching suggestions:', error);
    return errorResponse(error.message);
  }
}

export async function POST(
  req: NextRequest, 
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const leadId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const suggestion = await generateSuggestion(leadId, userId);
    return createdResponse(suggestion);
  } catch (error: any) {
    console.error('Error generating suggestion:', error);
    return errorResponse(error.message);
  }
}