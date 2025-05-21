import prisma from '@/lib/prisma';
import { cacheDelete, cacheDeletePattern } from '@/lib/redis';
import { ConversationType, Prisma } from '@/generated/prisma';

export async function getConversations(leadId: string, userId: string) {
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
  
  return prisma.conversation.findMany({
    where: { leadId },
    orderBy: { date: 'desc' },
  });
}

export async function createConversation(
  leadId: string,
  userId: string,
  data: {
    type: ConversationType;
    content: string;
    subject?: string;
    attachment?: string;
    followUp?: Date;
    hasFollowUp?: boolean;
  }
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
  
  // Create the conversation
  const conversation = await prisma.conversation.create({
    data: {
      leadId,
      type: data.type,
      content: data.content,
      subject: data.subject,
      attachment: data.attachment,
      followUp: data.followUp,
      hasFollowUp: !!data.followUp || data.hasFollowUp || false,
      sentiment: await analyzeSentiment(data.content),
    },
  });
  
  // Update lead last activity and contact date
  await prisma.lead.update({
    where: { id: leadId },
    data: {
      lastActivity: new Date(),
      lastContactedDate: new Date(),
      nextContactDate: data.followUp,
    },
  });
  
  // If has follow-up, create notification
  if (data.followUp) {
    await prisma.notification.create({
      data: {
        userId,
        title: 'Follow-up reminder',
        message: `Follow up with ${lead.name} from ${lead.company || 'unknown company'}`,
        type: 'FOLLOW_UP',
        relatedId: leadId,
        relatedType: 'LEAD',
      },
    });
  }
  
  // Clear lead cache
  await cacheDelete(`lead:${leadId}`);
  await cacheDeletePattern(`leads:${userId}:*`);
  
  return conversation;
}

export async function updateConversation(
  id: string,
  leadId: string,
  userId: string,
  data: {
    content?: string;
    subject?: string;
    attachment?: string;
    followUp?: Date;
    hasFollowUp?: boolean;
    followUpDone?: boolean;
  }
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
  
  // Verify conversation exists
  const conversation = await prisma.conversation.findFirst({
    where: { id, leadId },
  });
  
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  
  // Update conversation
  const updatedConversation = await prisma.conversation.update({
    where: { id },
    data,
  });
  
  // Clear lead cache
  await cacheDelete(`lead:${leadId}`);
  
  return updatedConversation;
}

export async function deleteConversation(id: string, leadId: string, userId: string) {
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
  
  // Verify conversation exists
  const conversation = await prisma.conversation.findFirst({
    where: { id, leadId },
  });
  
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  
  // Delete conversation
  await prisma.conversation.delete({
    where: { id },
  });
  
  // Clear lead cache
  await cacheDelete(`lead:${leadId}`);
  
  return { success: true };
}

// Helper function to analyze sentiment (mock or real)
async function analyzeSentiment(text: string): Promise<string> {
  if (process.env.MOCK_AI === 'true') {
    const sentiments = ['positive', 'neutral', 'negative'];
    return sentiments[Math.floor(Math.random() * sentiments.length)];
  }
  
  try {
    // In a real implementation, you would call an AI service here
    // For now we're just returning neutral
    return 'neutral';
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return 'neutral';
  }
}

// Add this function to your existing file
export async function getConversation(id: string, leadId: string, userId: string) {
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
  
  // Get conversation
  const conversation = await prisma.conversation.findFirst({
    where: { 
      id,
      leadId
    },
  });
  
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  
  return conversation;
}