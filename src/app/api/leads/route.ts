export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { createLead, getLeads } from '@/services/lead-service';
import { successResponse, createdResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';
import { LeadSource, LeadStage } from '@/generated/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    
    const search = searchParams.get('search') || undefined;
    const stage = searchParams.get('stage') || undefined;
    const source = searchParams.get('source') || undefined;
    const tags = searchParams.get('tags')?.split(',') || undefined;
    const priority = searchParams.get('priority') ? Number(searchParams.get('priority')) : undefined;
    const confidence = searchParams.get('confidence') ? Number(searchParams.get('confidence')) : undefined;
    const assignedToId = searchParams.get('assignedToId') || undefined;
    const region = searchParams.get('region') || undefined;
    const includeArchived = searchParams.get('includeArchived') === 'true';
    const includeDeleted = searchParams.get('includeDeleted') === 'true';
    const limit = Number(searchParams.get('limit')) || 10;
    const offset = Number(searchParams.get('offset')) || 0;
    
    const result = await getLeads(userId, {
      search,
      stage: stage as LeadStage,
      source: source as LeadSource,
      tags,
      priority,
      confidence,
      assignedToId,
      region,
      includeArchived,
      includeDeleted,
      limit,
      offset,
    });
    
    return successResponse(result);
  } catch (error: any) {
    console.error('Error fetching leads:', error);
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
      return errorResponse('Name is required');
    }
    
    // Add user relationship
    data.user = { connect: { id: userId } };
    
    // Handle assignment if present in request
    if (data.assignedToId) {
      if (!data.assignedTo) {
        data.assignedTo = {};
      }
      data.assignedTo.connect = { id: data.assignedToId };
      delete data.assignedToId; // Remove raw ID as we're using the connect syntax
    }
    
    // Process source field if provided
    if (data.source && !Object.values(LeadSource).includes(data.source)) {
      // If source is not a valid enum value, default to OTHER
      data.source = 'OTHER';
    }
    
    // Validate confidence and priority ranges if provided
    if (data.confidence !== undefined) {
      data.confidence = Math.min(Math.max(0, data.confidence), 100); // Ensure 0-100 range
    }
    
    if (data.priority !== undefined) {
      data.priority = Math.min(Math.max(1, data.priority), 5); // Ensure 1-5 range
    }
    
    // Enforce proper boolean types for isArchived and isDeleted
    if (data.isArchived !== undefined) {
      data.isArchived = Boolean(data.isArchived);
    }
    
    if (data.isDeleted !== undefined) {
      data.isDeleted = Boolean(data.isDeleted);
    }
    
    // Handle tags - ensure it's an array
    if (data.tags && !Array.isArray(data.tags)) {
      data.tags = String(data.tags).split(',').map(tag => tag.trim());
    }
    
    // Create lead with enhanced data
    const lead = await createLead(data);
    return createdResponse(lead);
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return errorResponse(error.message);
  }
}

// Add a bulk import endpoint for leads
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const { leads } = await req.json();
    
    if (!Array.isArray(leads) || leads.length === 0) {
      return errorResponse('No leads provided for import');
    }
    
    const results = [];
    const errors = [];
    
    // Process each lead in the array
    for (const leadData of leads) {
      try {
        // Validate required fields
        if (!leadData.name) {
          errors.push({ lead: leadData, error: 'Name is required' });
          continue;
        }
        
        // Add user relationship
        leadData.user = { connect: { id: userId } };
        
        // Process assignment if provided
        if (leadData.assignedToId) {
          if (!leadData.assignedTo) {
            leadData.assignedTo = {};
          }
          leadData.assignedTo.connect = { id: leadData.assignedToId };
          delete leadData.assignedToId;
        }
        
        const lead = await createLead(leadData);
        results.push(lead);
      } catch (error: any) {
        errors.push({ lead: leadData, error: error.message });
      }
    }
    
    return successResponse({
      success: results.length > 0,
      imported: results.length,
      failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Error importing leads:', error);
    return errorResponse(error.message);
  }
}