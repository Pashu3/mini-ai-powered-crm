export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';
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
    const taskId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        lead: { userId },
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
    
    if (!task) {
      return notFoundResponse('Task not found');
    }
    
    return successResponse(task);
  } catch (error: any) {
    console.error('Error fetching task:', error);
    return errorResponse(error.message);
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const taskId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const data = await req.json();
    
    // Verify task belongs to user's lead
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        lead: { userId },
      },
    });
    
    if (!task) {
      return notFoundResponse('Task not found');
    }
    
    // If changing lead, verify new lead belongs to user
    if (data.leadId && data.leadId !== task.leadId) {
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
    
    // Build update data object with only provided fields
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.dueDate !== undefined) updateData.dueDate = data.dueDate ? new Date(data.dueDate) : null;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.leadId !== undefined) updateData.leadId = data.leadId || null;
    
    // Update task with partial data
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
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
    
    return successResponse(updatedTask);
  } catch (error: any) {
    console.error('Error updating task:', error);
    return errorResponse(error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Params }
) {
  try {
    const params = await context.params;
    const taskId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    
    // Verify task belongs to user's lead
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        lead: { userId },
      },
    });
    
    if (!task) {
      return notFoundResponse('Task not found');
    }
    
    // Delete task
    await prisma.task.delete({
      where: { id: taskId },
    });
    
    return successResponse({ success: true });
  } catch (error: any) {
    console.error('Error deleting task:', error);
    return errorResponse(error.message);
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Params }
) {
  return PATCH(req, context);
}