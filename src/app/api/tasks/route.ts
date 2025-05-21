import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
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
    const { searchParams } = new URL(req.url);
    
    // Parse query parameters
    const status = searchParams.get('status') || undefined;
    const leadId = searchParams.get('leadId') || undefined;
    const limit = Number(searchParams.get('limit')) || 50;
    const offset = Number(searchParams.get('offset')) || 0;
    
    // Build where clause
    const where: any = {
      lead: {
        userId
      }
    };
    
    if (status) {
      where.status = status;
    }
    
    if (leadId) {
      where.leadId = leadId;
    }
    
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        include: {
          lead: {
            select: {
              id: true,
              name: true,
              company: true,
            },
          },
        },
        orderBy: [
          { dueDate: 'asc' },
          { priority: 'desc' },
        ],
        take: limit,
        skip: offset,
      }),
      prisma.task.count({ where }),
    ]);
    
    return successResponse({ tasks, total });
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
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
    if (!data.title) {
      return errorResponse('Task title is required');
    }
    
    // If associated with a lead, verify lead belongs to user
    if (data.leadId) {
      const lead = await prisma.lead.findFirst({
        where: {
          id: data.leadId,
          userId,
        },
      });
      
      if (!lead) {
        return errorResponse('Lead not found or not accessible');
      }
    }
    
    // Create task
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        priority: data.priority || 2,
        status: data.status || 'PENDING',
        leadId: data.leadId,
      },
      include: {
        lead: {
          select: {
            id: true,
            name: true,
            company: true,
          },
        },
      },
    });
    
    return createdResponse(task);
  } catch (error: any) {
    console.error('Error creating task:', error);
    return errorResponse(error.message);
  }
}