export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { 
  getCampaignById,
  updateCampaign,
  deleteCampaign 
} from '@/services/campaign-service';
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  notFoundResponse 
} from '@/lib/api-utils';

type Params = Promise<{ id: string }>;

export async function GET(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const campaignId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const campaign = await getCampaignById(campaignId, userId);
    
    if (!campaign) {
      return notFoundResponse('Campaign not found');
    }
    
    return successResponse(campaign);
  } catch (error: any) {
    console.error('Error fetching campaign:', error);
    return errorResponse(error.message);
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const campaignId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    // Validate required fields
    if (!data.name) {
      return errorResponse('Campaign name is required');
    }
    
    const campaign = await updateCampaign(campaignId, userId, data);
    
    return successResponse(campaign);
  } catch (error: any) {
    console.error('Error updating campaign:', error);
    return errorResponse(error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const campaignId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const result = await deleteCampaign(campaignId, userId);
    
    return successResponse(result);
  } catch (error: any) {
    console.error('Error deleting campaign:', error);
    return errorResponse(error.message);
  }
}