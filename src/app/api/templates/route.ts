import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
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
    const type = searchParams.get('type') || undefined;

    // Import your TemplateType enum if not already imported
    // import { TemplateType } from '@prisma/client';

    const where = {
      userId,
      ...(type ? { type: type as any } : {}),
    };
    
    const templates = await prisma.messageTemplate.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    return successResponse(templates);
  } catch (error: any) {
    console.error('Error fetching message templates:', error);
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
    if (!data.name || !data.content || !data.type) {
      return errorResponse('Name, content, and type are required');
    }
    
    const template = await prisma.messageTemplate.create({
      data: {
        name: data.name,
        content: data.content,
        subject: data.subject || null,
        type: data.type,
        tags: data.tags || [],
        userId,
        aiGenerated: data.aiGenerated || false,
      },
    });
    
    return createdResponse(template);
  } catch (error: any) {
    console.error('Error creating message template:', error);
    return errorResponse(error.message);
  }
}