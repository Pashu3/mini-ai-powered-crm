"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import { 
  Bell, 
  Check, 
  CheckCheck, 
  X, 
  Trash2, 
  MoreHorizontal,
  Info,
  AlertTriangle,
  AlertCircle,
  MessageSquare,
  Calendar,
  User,
  Users,
  Mail,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useSocketContext } from "@/providers/SocketProvider";

interface Notification {
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

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const { isConnected, lastNotification } = useSocketContext();
  const panelRef = useRef<HTMLDivElement>(null);

  // Fetch notifications when panel opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen, activeTab]);

  // Listen for real-time notifications
  useEffect(() => {
    if (lastNotification && isOpen) {
      // Add new notification to the list if it doesn't already exist
      setNotifications(prev => {
        const exists = prev.some(n => n.id === lastNotification.id);
        if (exists) return prev;
        return [lastNotification as Notification, ...prev];
      });
    }
  }, [lastNotification, isOpen]);

  // Handle clicks outside the panel to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/notifications${activeTab === 'unread' ? '?unreadOnly=true' : ''}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      
      const data = await response.json();
      const notificationsData = data.success && data.data ? data.data : data;
      
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark a single notification as read
  const markAsRead = async (id: string) => {
    try {
      // Update UI optimistically
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
      
      // Send request to API
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Revert UI change on error
      fetchNotifications();
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      setMarkingAllRead(true);
      
      // Update UI optimistically
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      
      // Send request to API
      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      // Revert UI change on error
      fetchNotifications();
    } finally {
      setMarkingAllRead(false);
    }
  };

  // Delete a notification
  const deleteNotification = async (id: string) => {
    try {
      // Update UI optimistically
      setNotifications(prev => prev.filter(n => n.id !== id));
      
      // Send request to API
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      // Revert UI change on error
      fetchNotifications();
    }
  };

  // Navigate to related entity
  const navigateToRelated = (notification: Notification) => {
    if (!notification.relatedId || !notification.relatedType) return;
    
    let url = '/dashboard';
    
    switch (notification.relatedType.toLowerCase()) {
      case 'lead':
        url = `/dashboard/leads/${notification.relatedId}`;
        break;
      case 'deal':
        url = `/dashboard/deals/${notification.relatedId}`;
        break;
      case 'conversation':
        url = `/dashboard/conversations/${notification.relatedId}`;
        break;
      case 'campaign':
        url = `/dashboard/campaigns/${notification.relatedId}`;
        break;
      case 'task':
        url = `/dashboard/tasks/${notification.relatedId}`;
        break;
    }
    
    markAsRead(notification.id);
    window.location.href = url;
    onClose();
  };

  // Get appropriate icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'conversation':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'follow_up':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'lead':
        return <User className="h-5 w-5 text-cyan-500" />;
      case 'campaign':
        return <Users className="h-5 w-5 text-indigo-500" />;
      case 'email':
        return <Mail className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  // Format the date/time for display
  const formatNotificationTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  // Filter notifications based on active tab
  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.isRead) 
    : notifications;

  // Get unread count for badge
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Panel */}
          <div className="absolute top-16 right-0 md:right-4 mt-2">
            <motion.div 
              ref={panelRef}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border shadow-lg rounded-lg w-[min(calc(100vw-2rem),450px)] max-h-[calc(100vh-5rem)] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Bell size={18} />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </h2>
                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead} 
                      disabled={markingAllRead} 
                      className="text-xs flex items-center gap-1 text-primary hover:underline disabled:opacity-50"
                    >
                      {markingAllRead ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <CheckCheck size={12} />
                      )}
                      Mark all read
                    </button>
                  )}
                  <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-border">
                <button 
                  onClick={() => setActiveTab('all')} 
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'all' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setActiveTab('unread')} 
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'unread' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Unread
                  {unreadCount > 0 && (
                    <span className="ml-1.5 bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Notification List */}
              <div className="overflow-y-auto flex-1">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <Bell size={40} className="text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground font-medium">
                      {activeTab === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[250px]">
                      {activeTab === 'unread' 
                        ? 'You\'re all caught up!' 
                        : 'Notifications about leads, conversations, and tasks will appear here'}
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-border">
                    {filteredNotifications.map((notification) => (
                      <li 
                        key={notification.id} 
                        className={`p-4 hover:bg-muted/50 ${!notification.isRead ? 'bg-primary/5' : ''}`}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between gap-2">
                              <p className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </p>
                              <div className="flex-shrink-0 flex items-center text-xs text-muted-foreground">
                                {formatNotificationTime(notification.createdAt)}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            
                            <div className="mt-2 flex items-center justify-between">
                              {notification.relatedId && notification.relatedType && (
                                <button 
                                  onClick={() => navigateToRelated(notification)}
                                  className="text-xs text-primary flex items-center gap-1 hover:underline"
                                >
                                  View details
                                  <ArrowRight size={12} />
                                </button>
                              )}
                              
                              <div className="ml-auto flex items-center gap-3">
                                {!notification.isRead && (
                                  <button 
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-xs text-primary hover:underline"
                                  >
                                    Mark as read
                                  </button>
                                )}
                                <button 
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-xs text-destructive hover:underline"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* Footer */}
              <div className="border-t border-border p-3 flex justify-center">
                <button
                  onClick={() => {
                    window.location.href = '/dashboard/notifications';
                    onClose();
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  View all notifications
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}