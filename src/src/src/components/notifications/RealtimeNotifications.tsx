"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, X, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { useSocketContext } from "@/providers/SocketProvider";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

interface RealtimeNotificationsProps {
  entityId?: string;  // Can be lead ID, deal ID, etc.
  entityType?: string;  // "lead", "deal", "campaign", etc.
  limit?: number;
}

const RealtimeNotifications = ({ 
  entityId, 
  entityType = "lead",
  limit = 5
}: RealtimeNotificationsProps) => {
  const { isConnected, lastNotification } = useSocketContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch initial notifications for this entity
  useEffect(() => {
    if (entityId) {
      // Only fetch notifications if we have an entity ID
      const fetchNotifications = async () => {
        try {
          const response = await fetch(`/api/notifications?entityId=${entityId}&entityType=${entityType}&limit=${limit}`);
          
          if (response.ok) {
            const data = await response.json();
            const formattedNotifications = data.success && data.data
              ? data.data
              : data;
            
            setNotifications(formattedNotifications.map((n: any) => ({
              ...n, 
              timestamp: new Date(n.timestamp || n.createdAt),
              read: n.read || false
            })));
            
            setUnreadCount(formattedNotifications.filter((n: any) => !n.read).length);
          }
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      };
      
      fetchNotifications();
    }
  }, [entityId, entityType, limit]);

  // Handle new notifications via websocket
  useEffect(() => {
    if (lastNotification) {
      // If the notification is related to our entity, add it
      if (
        !entityId || // If no entityId specified, show all notifications
        (lastNotification.entityId === entityId && 
         lastNotification.entityType === entityType)
      ) {
        const newNotification = {
          id: lastNotification.id || `notification-${Date.now()}`,
          title: lastNotification.title,
          message: lastNotification.message,
          type: lastNotification.type || "info",
          timestamp: new Date(),
          read: false
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, limit - 1)]);
        setUnreadCount(prev => prev + 1);
        
        // If the panel is collapsed, show a brief animation or indicator
        if (!expanded) {
          // Could add a visual indicator here
        }
      }
    }
  }, [lastNotification, entityId, entityType, limit, expanded]);

  // Mark notifications as read when expanding panel
  const handleExpandClick = () => {
    if (!expanded && unreadCount > 0) {
      // Mark all as read in UI
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      
      // Also update on server
      if (entityId) {
        fetch('/api/notifications/read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entityId, entityType })
        }).catch(err => console.error("Failed to mark notifications as read:", err));
      }
    }
    
    setExpanded(!expanded);
  };

  // Mark a single notification as read
  const markAsRead = async (notificationId: string) => {
    // Update locally
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    
    // Update unread count
    setUnreadCount(prev => Math.max(0, prev - 1));
    
    // Update on server
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST'
      });
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  // Get the icon for a notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  // Format the timestamp
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      {/* Header with status and count */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer" 
        onClick={handleExpandClick}
      >
        <div className="flex items-center gap-2">
          <Bell size={18} />
          <h3 className="font-medium">Real-time Updates</h3>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs">
            <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-muted-foreground">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <button className="p-1">
            {expanded ? (
              <X size={16} className="text-muted-foreground" />
            ) : (
              <span className="text-xs text-muted-foreground">{expanded ? 'Hide' : 'Show'}</span>
            )}
          </button>
        </div>
      </div>
      
      {/* Notification list */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border"
          >
            {notifications.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-center text-muted-foreground text-sm">
                <Bell size={20} className="mb-2 opacity-40" />
                <p>No new notifications</p>
                <p className="text-xs mt-1">Updates will appear here in real-time</p>
              </div>
            ) : (
              <ul className="divide-y divide-border max-h-72 overflow-y-auto">
                {notifications.map((notification) => (
                  <motion.li 
                    key={notification.id}
                    initial={{ backgroundColor: notification.read ? 'transparent' : 'rgba(var(--primary), 0.05)' }}
                    animate={{ backgroundColor: 'transparent' }}
                    transition={{ duration: 2 }}
                    className={`p-3 flex gap-3 hover:bg-muted/50 ${
                      !notification.read ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 text-sm">
                      <div className="font-medium">{notification.title}</div>
                      <p className="text-muted-foreground text-xs mt-0.5">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(notification.timestamp)}
                        </span>
                        
                        {!notification.read && (
                          <button 
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-primary hover:underline"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
            
            {notifications.length > 0 && (
              <div className="p-2 text-center border-t border-border">
                <button 
                  className="text-xs text-primary hover:underline"
                  onClick={() => {
                    // Navigate to all notifications
                    window.location.href = `/dashboard/notifications${
                      entityId ? `?entityId=${entityId}&entityType=${entityType}` : ''
                    }`;
                  }}
                >
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealtimeNotifications;