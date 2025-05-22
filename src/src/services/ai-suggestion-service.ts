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
      OR: [
        { userId: userId },
        { assignedToId: userId }
      ],
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
  type NextStepSuggestionResponse = { 
    text?: string; 
    suggestion?: string; 
    reasoning?: string;
    followUpDays?: number;
    priority?: number;
  };
  
  const aiResponse = await getNextStepSuggestion(lead) as NextStepSuggestionResponse;
  
  // Calculate priority if not provided
  const suggestionPriority = aiResponse.priority || 
    calculateSuggestionPriority(lead.priority || 2, lead.confidence || 50);
  
  // Extract follow-up days if available
  const followUpDays = aiResponse.followUpDays || 
    getDefaultFollowUpDays(lead.source as any, lead.priority || 2);
  
  // Calculate follow-up date
  const followUpDate = new Date();
  followUpDate.setDate(followUpDate.getDate() + followUpDays);
  
  // Create suggestion record with enhanced data
  const suggestion = await prisma.aiSuggestion.create({
    data: {
      leadId,
      suggestion: aiResponse.suggestion || aiResponse.text || '',
      reasoning: aiResponse.reasoning || null,
      type: 'NEXT_STEP',
      priority: suggestionPriority,
    },
  });
  
  // Optionally create a task based on the suggestion
  if (suggestionPriority >= 3) {
    await prisma.task.create({
      data: {
        title: `Follow up: ${aiResponse.suggestion?.substring(0, 50) || 'AI suggestion'}...`,
        description: aiResponse.suggestion || aiResponse.text || '',
        status: 'PENDING',
        priority: lead.priority || 2,
        dueDate: followUpDate,
        leadId: lead.id,
        userId: lead.assignedToId || userId,
      }
    });
  }
  
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

// Helper functions from lead-service.ts (import these or define here)
function calculateSuggestionPriority(leadPriority: number, confidence: number): number {
  if (leadPriority >= 3 && confidence >= 70) return 5;
  if (leadPriority >= 3 && confidence >= 40) return 4;
  if (leadPriority >= 2 && confidence >= 60) return 3;
  if ((leadPriority >= 2 && confidence >= 30) || (leadPriority >= 3)) return 2;
  return 1;
}

function getDefaultFollowUpDays(source: string, priority: number): number {
  if (priority >= 3) return 1;
  
  switch (source) {
    case 'INBOUND_CALL': return 1;
    case 'WEBSITE': return 2;
    case 'REFERRAL': return 2;
    case 'LINKEDIN': return 3;
    case 'CONFERENCE': 
    case 'WEBINAR': return 2;
    case 'SOCIAL_MEDIA': return 4;
    case 'COLD_EMAIL': return 5;
    case 'OUTBOUND_CALL': return 4;
    default: return 3;
  }
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