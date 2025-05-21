import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createLead, getLeads } from '@/services/lead-service';
import { successResponse, createdResponse, errorResponse, unauthorizedResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    
    // Parse query parameters
    const search = searchParams.get('search') || undefined;
    const stage = searchParams.get('stage') || undefined;
    const tags = searchParams.get('tags')?.split(',') || undefined;
    const limit = Number(searchParams.get('limit')) || 10;
    const offset = Number(searchParams.get('offset')) || 0;
    
    const result = await getLeads(userId, {
      search,
      stage: stage as any,
      tags,
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
    
    const lead = await createLead(data);
    return createdResponse(lead);
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return errorResponse(error.message);
  }
}