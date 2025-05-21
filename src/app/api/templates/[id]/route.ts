import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { 
  successResponse, 
  errorResponse, 
  unauthorizedResponse,
  notFoundResponse 
} from '@/lib/api-utils';

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
    const templateId = params.id;
    
    const template = await prisma.messageTemplate.findFirst({
      where: {
        id: templateId,
        userId,
      },
    });
    
    if (!template) {
      return notFoundResponse('Template not found');
    }
    
    return successResponse(template);
  } catch (error: any) {
    console.error('Error fetching template:', error);
    return errorResponse(error.message);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const templateId = params.id;
    const data = await req.json();
    
    // Check if template exists and belongs to user
    const template = await prisma.messageTemplate.findFirst({
      where: {
        id: templateId,
        userId,
      },
    });
    
    if (!template) {
      return notFoundResponse('Template not found');
    }
    
    // Update template
    const updatedTemplate = await prisma.messageTemplate.update({
      where: { id: templateId },
      data: {
        name: data.name,
        content: data.content,
        subject: data.subject,
        type: data.type,
        tags: data.tags || template.tags,
      },
    });
    
    return successResponse(updatedTemplate);
  } catch (error: any) {
    console.error('Error updating template:', error);
    return errorResponse(error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }
    
    const userId = session.user.id;
    const templateId = params.id;
    
    // Check if template exists and belongs to user
    const template = await prisma.messageTemplate.findFirst({
      where: {
        id: templateId,
        userId,
      },
    });
    
    if (!template) {
      return notFoundResponse('Template not found');
    }
    
    // Delete template
    await prisma.messageTemplate.delete({
      where: { id: templateId },
    });
    
    return successResponse({ success: true });
  } catch (error: any) {
    console.error('Error deleting template:', error);
    return errorResponse(error.message);
  }
}