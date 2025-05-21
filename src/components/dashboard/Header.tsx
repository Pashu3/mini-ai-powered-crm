"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import NotificationPanel from "@/components/notifications/NotificationPanel";
import { useSocketContext } from "@/providers/SocketProvider";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Header({
  isSidebarOpen,
  toggleSidebar,
}: HeaderProps) {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const { lastNotification } = useSocketContext();
  
  useEffect(() => {
    // Fetch unread notification count
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch('/api/notifications/unread');
        if (res.ok) {
          const data = await res.json();
          const count = data.success && data.data ? data.data.count : data.count;
          setUnreadCount(count);
        }
      } catch (error) {
        console.error('Failed to fetch notification count:', error);
      }
    };
    
    fetchUnreadCount();
    
    // Set up interval to refresh count
    const interval = setInterval(fetchUnreadCount, 60000); // every minute
    
    return () => clearInterval(interval);
  }, []);

  // Update notification count when receiving a new notification
  useEffect(() => {
    if (lastNotification && !lastNotification.isRead) {
      setUnreadCount(prev => prev + 1);
    }
  }, [lastNotification]);

  return (
    <header className="h-16 border-b border-border flex items-center px-4 gap-4 sticky top-0 bg-background z-10">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-md hover:bg-accent"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </button>

      <div className="max-w-md w-full hidden md:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-8 pr-4 py-2 rounded-md border border-input bg-background"
          />
        </div>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <button 
          className="relative p-2 rounded-md hover:bg-accent"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </button>
        
        <button className="flex items-center gap-2 px-2 rounded-md hover:bg-accent">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center overflow-hidden">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{session?.user?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div className="flex flex-col text-left hidden sm:block">
            <span className="text-sm font-medium leading-none">
              {session?.user?.name || 'User'}
            </span>
            <span className="text-xs text-muted-foreground leading-none mt-1">
              {session?.user?.email || ''}
            </span>
          </div>
        </button>
      </div>

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </header>
  );
}