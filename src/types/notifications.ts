export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  relatedId?: string;
  relatedType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}