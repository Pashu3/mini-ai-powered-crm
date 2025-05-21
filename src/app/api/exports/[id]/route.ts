import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getExportJobById } from '@/services/export-service';
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/lib/api-utils';

type Params = Promise<{ id: string }>;

export async function GET(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const jobId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
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