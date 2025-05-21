import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getExportJobById } from '@/services/export-service';
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/lib/api-utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const jobId = params.id;
    
    const job = await getExportJobById(jobId, userId);
    
    if (!job) {
      return notFoundResponse('Export job not found');
    }
    
    return successResponse(job);
  } catch (error: any) {
    console.error('Error fetching export job:', error);
    return errorResponse(error.message);
  }
}