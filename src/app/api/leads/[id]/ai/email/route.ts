import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { generateEmailTemplate } from '@/services/ai-suggestion-service';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const leadId = params.id;
    const data = await req.json();
    
    if (!data.purpose) {
      return errorResponse('Email purpose is required');
    }
    
    const emailTemplate = await generateEmailTemplate(leadId, userId, data.purpose);
    return successResponse(emailTemplate);
  } catch (error: any) {
    console.error('Error generating email template:', error);
    return errorResponse(error.message);
  }
}