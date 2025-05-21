import prisma from '@/lib/prisma';
import { getNextStepSuggestion, generateEmailDraft } from '@/lib/ai-service';
import { SuggestionStatus } from '@/generated/prisma';

export async function getSuggestions(leadId: string, userId: string) {
  // Verify lead belongs to user
  const lead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      userId,
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  return prisma.aiSuggestion.findMany({
    where: { leadId },
    orderBy: [
      { status: 'asc' }, // NEW suggestions first
      { priority: 'desc' }, // Higher priority first
      { createdAt: 'desc' }, // Newest first
    ],
  });
}

export async function generateSuggestion(leadId: string, userId: string) {
  // Verify lead belongs to user and get data
  const lead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      userId,
    },
    include: {
      conversations: {
        orderBy: { createdAt: 'desc' },
        take: 3,
      },
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  // Get AI suggestion
  type NextStepSuggestionResponse = { text?: string; suggestion?: string };
  const aiResponse = await getNextStepSuggestion(lead) as NextStepSuggestionResponse;
  
  // Create suggestion record
  const suggestion = await prisma.aiSuggestion.create({
    data: {
      leadId,
      suggestion: aiResponse.text || aiResponse.suggestion || '',
      type: 'NEXT_STEP',
      priority: 2,
    },
  });
  
  // Create notification for user
  await prisma.notification.create({
    data: {
      userId,
      title: 'New AI Suggestion',
      message: `New suggestion available for ${lead.name}`,
      type: 'AI_SUGGESTION',
      relatedId: leadId,
      relatedType: 'LEAD',
    },
  });
  
  return suggestion;
}

export async function generateEmailTemplate(
  leadId: string,
  userId: string,
  purpose: string
) {
  // Verify lead belongs to user and get data
  const lead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      userId,
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  // Generate email draft
  const emailDraft = await generateEmailDraft(lead, purpose);
  
  // If it's a structured response
  if (emailDraft.subject && emailDraft.body) {
    // Create a message template
    const template = await prisma.messageTemplate.create({
      data: {
        name: `${purpose} for ${lead.name}`,
        content: emailDraft.body,
        subject: emailDraft.subject,
        type: purpose.toUpperCase().includes('FOLLOW') ? 'FOLLOW_UP' : 'COLD_OUTREACH',
        tags: [lead.name, lead.company || '', purpose],
        userId,
        aiGenerated: true,
      },
    });
    
    return {
      subject: emailDraft.subject,
      body: emailDraft.body,
      templateId: template.id,
    };
  }
  
  // If it's a text response
  return {
    subject: `${purpose} for ${lead.name}`,
    body: emailDraft.text,
  };
}

export async function updateSuggestionStatus(
  id: string,
  leadId: string,
  userId: string,
  status: SuggestionStatus
) {
  // Verify lead belongs to user
  const lead = await prisma.lead.findFirst({
    where: {
      id: leadId,
      userId,
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  // Verify suggestion exists
  const suggestion = await prisma.aiSuggestion.findFirst({
    where: { id, leadId },
  });
  
  if (!suggestion) {
    throw new Error('Suggestion not found');
  }
  
  // Update suggestion
  return prisma.aiSuggestion.update({
    where: { id },
    data: {
      status,
      isViewed: true,
      updatedAt: new Date(),
    },
  });
}