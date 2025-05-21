import prisma from '@/lib/prisma';
import { NotificationType } from '@/generated/prisma';
import { emitToUser } from '@/lib/socket-server';

export async function getNotifications(userId: string, limit: number = 20) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function getUnreadNotificationsCount(userId: string) {
  return prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });
}

export async function markNotificationAsRead(id: string, userId: string) {
  // Verify notification belongs to user
  const notification = await prisma.notification.findFirst({
    where: {
      id,
      userId,
    },
  });
  
  if (!notification) {
    throw new Error('Notification not found');
  }
  
  return prisma.notification.update({
    where: { id },
    data: { 
      isRead: true
    },
  });
}

export async function markAllNotificationsAsRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { 
      isRead: true
    },
  });
}

export async function createNotification(
  userId: string,
  data: {
    title: string;
    message: string;
    type: NotificationType;
    relatedId?: string;
    relatedType?: string;
  }
) {
  const notification = await prisma.notification.create({
    data: {
      userId,
      title: data.title,
      message: data.message,
      type: data.type,
      relatedId: data.relatedId,
      relatedType: data.relatedType,
    },
  });
  
  // Emit real-time notification via WebSocket
  try {
    emitToUser(userId, 'notification', notification);
  } catch (error) {
    console.error('Failed to emit notification:', error);
  }
  
  return notification;
}

export async function deleteNotification(id: string, userId: string) {
  // Verify notification belongs to user
  const notification = await prisma.notification.findFirst({
    where: {
      id,
      userId,
    },
  });
  
  if (!notification) {
    throw new Error('Notification not found');
  }
  
  await prisma.notification.delete({
    where: { id },
  });
  
  return { success: true };
}

export async function processFollowUpNotifications() {
  // This function should be run as a scheduled task
  const now = new Date();
  
  // Find conversations with follow-ups due today
  const dueFollowups = await prisma.conversation.findMany({
    where: {
      hasFollowUp: true,
      followUpDone: false,
      followUp: {
        lte: now,
      },
    },
    include: {
      lead: true,
    },
  });
  
  // Create notifications for each with WebSocket support
  const notifications = await Promise.all(
    dueFollowups.map(async followup => {
      if (!followup.lead.userId) return null;
      
      const notification = await prisma.notification.create({
        data: {
          userId: followup.lead.userId,
          title: 'Follow-up Reminder',
          message: `Follow up with ${followup.lead.name} from ${followup.lead.company || 'unknown company'}`,
          type: NotificationType.FOLLOW_UP,
          relatedId: followup.leadId,
          relatedType: 'LEAD',
        },
      });
      
      // Emit real-time notification via WebSocket
      try {
        emitToUser(followup.lead.userId, 'notification', notification);
      } catch (error) {
        console.error('Failed to emit notification:', error);
      }
      
      return notification;
    })
  );
  
  return notifications.filter(Boolean);
}