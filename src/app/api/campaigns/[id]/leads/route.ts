import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { 
  addLeadsToCampaign,
  removeLeadFromCampaign 
} from '@/services/campaign-service';
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse 
} from '@/lib/api-utils';

// Add leads to campaign
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const campaignId = params.id;
    const data = await req.json();
    
    // Validate required fields
    if (!data.leadIds || !Array.isArray(data.leadIds) || data.leadIds.length === 0) {
      return errorResponse('Lead IDs are required');
    }
    
    const result = await addLeadsToCampaign(campaignId, userId, data.leadIds);
    
    return successResponse(result);
  } catch (error: any) {
    console.error('Error adding leads to campaign:', error);
    return errorResponse(error.message);
  }
}

// Remove a lead from campaign
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const campaignId = params.id;
    const { searchParams } = new URL(req.url);
    const leadId = searchParams.get('leadId');
    
    if (!leadId) {
      return errorResponse('Lead ID is required');
    }
    
    const result = await removeLeadFromCampaign(campaignId, leadId, userId);
    
    return successResponse(result);
  } catch (error: any) {
    console.error('Error removing lead from campaign:', error);
    return errorResponse(error.message);
  }
}