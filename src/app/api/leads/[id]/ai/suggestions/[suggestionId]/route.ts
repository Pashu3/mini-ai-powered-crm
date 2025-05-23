export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

type Params = Promise<{
  id: string;
  suggestionId: string;
}>;

export async function PATCH(
  req: NextRequest,
  context: { params: Params }) {
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
    
    if (data.done === undefined && data.isViewed === undefined) {
      return errorResponse('At least one field (done or isViewed) must be provided');
    }
    
    const existingSuggestion = await prisma.aiSuggestion.findUnique({
      where: { id: suggestionId },
      include: { lead: true }
    });

    if (!existingSuggestion) {
      return errorResponse('Suggestion not found', 404);
    }

    // Verify that the user has access to this suggestion's lead
    if (existingSuggestion.lead.userId !== userId) {
      return unauthorizedResponse('You do not have permission to update this suggestion');
    }
    
    // Determine the new status based on done or isViewed flags
    let newStatus = existingSuggestion.status;
    
    // If either done or isViewed is true, set status to ACCEPTED
    if ((data.done !== undefined && data.done) || 
        (data.isViewed !== undefined && data.isViewed)) {
      newStatus = 'ACCEPTED';
    }
    
    // Update the suggestion
    const updatedSuggestion = await prisma.aiSuggestion.update({
      where: { id: suggestionId },
      data: {
        done: data.done !== undefined ? data.done : existingSuggestion.done,
        isViewed: data.isViewed !== undefined ? data.isViewed : existingSuggestion.isViewed,
        status: newStatus,
        updatedAt: new Date()
      }
    });
    
    return successResponse(updatedSuggestion);
  } catch (error: any) {
    console.error('Error updating suggestion:', error);
    return errorResponse(error.message);
  }
}