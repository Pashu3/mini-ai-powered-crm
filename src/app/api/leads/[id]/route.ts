export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { 
  getLeadById, 
  updateLead, 
  deleteLead, 
  updateLeadStage,
  archiveLead,
  restoreLead,
  softDeleteLead,
  assignLead,
  updateLeadConfidence,
  updateLeadSource
} from '@/services/lead-service';
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  notFoundResponse 
} from '@/lib/api-utils';
import { LeadSource } from '@/generated/prisma';

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
    
    // Process assignedToId if present
    if (data.assignedToId) {
      if (!data.assignedTo) {
        data.assignedTo = {};
      }
      data.assignedTo.connect = { id: data.assignedToId };
      delete data.assignedToId;
    }
    
    // Ensure confidence is in valid range
    if (data.confidence !== undefined) {
      data.confidence = Math.min(Math.max(0, data.confidence), 100); // Ensure 0-100 range
    }
    
    // Ensure priority is in valid range
    if (data.priority !== undefined) {
      data.priority = Math.min(Math.max(1, data.priority), 5); // Ensure 1-5 range
    }
    
    // Handle tags - ensure it's an array
    if (data.tags && !Array.isArray(data.tags)) {
      data.tags = String(data.tags).split(',').map(tag => tag.trim());
    }
    
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
    
    // Check if this is a soft delete request
    const url = new URL(req.url);
    const isSoftDelete = url.searchParams.get('soft') === 'true';
    
    let result;
    if (isSoftDelete) {
      result = await softDeleteLead(leadId, userId);
    } else {
      result = await deleteLead(leadId, userId);
    }
    
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
    else if ('isArchived' in data) {
      if (data.isArchived === true) {
        updatedLead = await archiveLead(leadId, userId);
      } else {
        updatedLead = await restoreLead(leadId, userId);
      }
    }
    else if ('isDeleted' in data) {
      if (data.isDeleted === true) {
        updatedLead = await softDeleteLead(leadId, userId);
      } else {
        updatedLead = await restoreLead(leadId, userId);
      }
    }
    else if ('assignedToId' in data) {
      updatedLead = await assignLead(leadId, userId, data.assignedToId);
    }
    else if ('confidence' in data) {
      const confidenceScore = Math.min(Math.max(0, data.confidence), 100);
      updatedLead = await updateLeadConfidence(leadId, userId, confidenceScore);
    }
    else if ('source' in data) {
      if (Object.values(LeadSource).includes(data.source)) {
        updatedLead = await updateLeadSource(leadId, userId, data.source);
      } else {
        return errorResponse('Invalid lead source');
      }
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