export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { 
  getLeadById, 
  updateLead, 
  deleteLead, 
  updateLeadStage 
} from '@/services/lead-service';
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
    const leadId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const lead = await getLeadById(leadId, userId);
    
    if (!lead) {
      return notFoundResponse('Lead not found');
    }
    
    return successResponse(lead);
  } catch (error: any) {
    console.error('Error fetching lead:', error);
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
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    const lead = await updateLead(leadId, userId, data);
    
    return successResponse(lead);
  } catch (error: any) {
    console.error('Error updating lead:', error);
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
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const result = await deleteLead(leadId, userId);
    
    return successResponse(result);
  } catch (error: any) {
    console.error('Error deleting lead:', error);
    return errorResponse(error.message);
  }
}

export async function PATCH(
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
    const data = await req.json();
    
    let updatedLead;
    
    if (data.stage && 'campaignId' in data) {
      const updatedWithStage = await updateLeadStage(leadId, userId, data.stage);
      
      updatedLead = await updateLead(leadId, userId, {
        campaign: data.campaignId 
          ? { connect: { id: data.campaignId } } 
          : { disconnect: true } 
      });
    }
    else if (data.stage) {
      updatedLead = await updateLeadStage(leadId, userId, data.stage);
    } 
    else if ('campaignId' in data) {
      updatedLead = await updateLead(leadId, userId, {
        campaign: data.campaignId 
          ? { connect: { id: data.campaignId } } 
          : { disconnect: true }
      });
    }
    else {
      updatedLead = await updateLead(leadId, userId, data);
    }
    
    return successResponse(updatedLead);
  } catch (error: any) {
    console.error('Error updating lead:', error);
    return errorResponse(error.message);
  }
}