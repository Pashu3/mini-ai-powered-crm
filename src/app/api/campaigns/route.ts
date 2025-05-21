import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { createCampaign, getCampaigns } from '@/services/campaign-service';
import { 
  successResponse, 
  createdResponse, 
  errorResponse, 
  unauthorizedResponse 
} from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const campaigns = await getCampaigns(userId);
    
    return successResponse(campaigns);
  } catch (error: any) {
    console.error('Error fetching campaigns:', error);
    return errorResponse(error.message);
  }
}

export async function POST(req: NextRequest) {
  try {
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
    
    const campaign = await createCampaign(userId, data);
    return createdResponse(campaign);
  } catch (error: any) {
    console.error('Error creating campaign:', error);
    return errorResponse(error.message);
  }
}