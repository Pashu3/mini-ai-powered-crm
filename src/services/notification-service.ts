import prisma from '@/lib/prisma';
import { NotificationType } from '@/generated/prisma';
import { emitToUser } from '@/lib/socket-server';
import { sendEmail } from '@/lib/email';

export async function getNotifications(userId: string, limit: number = 20, unreadOnly: boolean = false) {
  return prisma.notification.findMany({
    where: {
      userId,
      ...(unreadOnly ? { isRead: false } : {})
    },
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

  const updated = await prisma.notification.update({
    where: { id },
    data: {
      isRead: true
    },
  });

  try {
    const unreadCount = await getUnreadNotificationsCount(userId);
    emitToUser(userId, 'notification_count_update', { count: unreadCount });
  } catch (error) {
    console.error('Failed to emit notification count update:', error);
  }

  return updated;
}

export async function markAllNotificationsAsRead(userId: string) {
  const result = await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: {
      isRead: true
    },
  });

  try {
    emitToUser(userId, 'notification_count_update', { count: 0 });
  } catch (error) {
    console.error('Failed to emit notification count update:', error);
  }

  return result;
}

export async function createNotification(
  userId: string,
  data: {
    title: string;
    message: string;
    type: NotificationType;
    relatedId?: string;
    relatedType?: string;
    sendEmail?: boolean;
    emailData?: any;
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

  try {
    emitToUser(userId, 'notification', notification);

    // Also emit updated count
    const unreadCount = await getUnreadNotificationsCount(userId);
    emitToUser(userId, 'notification_count_update', { count: unreadCount });
  } catch (error) {
    console.error('Failed to emit notification:', error);
  }

  // Send email if requested
  if (data.sendEmail && data.emailData) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true }
      });

      if (user?.email) {
        // Simplified email sending without specific export templates
        await sendEmail({
          to: user.email,
          subject: data.emailData.subject || data.title,
          text: data.emailData.text || data.message,
          html: data.emailData.html || `<p>${data.message}</p>`
        });
      }
    } catch (error) {
      console.error('Failed to send notification email:', error);
    }
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

  // If the deleted notification was unread, update the counter
  if (!notification.isRead) {
    try {
      const unreadCount = await getUnreadNotificationsCount(userId);
      emitToUser(userId, 'notification_count_update', { count: unreadCount });
    } catch (error) {
      console.error('Failed to emit notification count update:', error);
    }
  }

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

      return createNotification(followup.lead.userId, {
        title: 'Follow-up Reminder',
        message: `Follow up with ${followup.lead.name} from ${followup.lead.company || 'unknown company'}`,
        type: NotificationType.FOLLOW_UP,
        relatedId: followup.leadId,
        relatedType: 'LEAD',
      });
    })
  );

  return notifications.filter(Boolean);
}

// Add this to your notification-service.ts file
export async function getNotificationById(id: string, userId: string) {
  // First verify the notification belongs to this user
  const notification = await prisma.notification.findFirst({
    where: {
      id,
      userId,
    },
  });

  return notification;
}