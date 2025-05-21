import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createExportJob, getExportJobs } from '@/services/export-service';
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
    const jobs = await getExportJobs(userId);
    
    return successResponse(jobs);
  } catch (error: any) {
    console.error('Error fetching export jobs:', error);
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
    if (!data.type) {
      return errorResponse('Export type is required');
    }
    
    const job = await createExportJob(userId, data.type, data.filters);
    return createdResponse(job);
  } catch (error: any) {
    console.error('Error creating export job:', error);
    return errorResponse(error.message);
  }
}