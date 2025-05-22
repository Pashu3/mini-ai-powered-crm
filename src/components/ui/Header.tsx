"use client";

import { Bell, Menu, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NotificationPanel from "@/components/notifications/NotificationPanel";
import { useSocketContext } from "@/providers/SocketProvider";
import { useToast } from "@/components/ui/toast/ToastContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import GlobalSearch from "@/components/ui/GlobalSearch";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  
  // Notification state
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const { lastNotification } = useSocketContext();
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  const firstName = session?.user?.name?.split(' ')[0] || 'User';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef]);

  useEffect(() => {
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
    
    const interval = setInterval(fetchUnreadCount, 60000); // every minute
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lastNotification && !lastNotification.isRead) {
      setUnreadCount(prev => prev + 1);
    }
  }, [lastNotification]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/auth/login');
      toast({
        type: 'success',
        title: 'Logged out successfully',
        description: 'You have been logged out of your account',
        duration: 3000
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        type: 'error',
        title: 'Logout failed',
        description: 'An error occurred while logging out',
        duration: 3000
      });
    }
  };

  return (
    <header className="h-16 border-b border-border flex items-center px-4 gap-4 sticky top-0 bg-background z-10 backdrop-blur-sm bg-background/95">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2.5 rounded-md hover:bg-primary/10 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="max-w-md w-full hidden md:block">
        <GlobalSearch />
      </div>
      
      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle />
        
  <motion.button 
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="relative p-2.5 rounded-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
  onClick={() => {
    console.log('Notification button clicked, current state:', showNotifications);
    setShowNotifications(!showNotifications);
    console.log('Notification state after toggle:', !showNotifications);
    if (showUserMenu) setShowUserMenu(false);
        console.log('Hi  Notification state after toggle:', !showNotifications);

  }}
  aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
>
  <Bell className="h-6 w-6" />
  <AnimatePresence>
    {unreadCount > 0 && (
      <motion.span 
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs font-semibold text-primary-foreground flex items-center justify-center shadow-sm"
      >
        {unreadCount > 9 ? '9+' : unreadCount}
      </motion.span>
    )}
  </AnimatePresence>
</motion.button>
        
        <div className="relative" ref={userMenuRef}>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              if (showNotifications) setShowNotifications(false);
            }}
            aria-expanded={showUserMenu}
            aria-haspopup="true"
          >
            <div className="relative h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center overflow-hidden shadow-sm">
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt={session.user.name || "User"} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-medium">{session?.user?.name?.charAt(0) || 'U'}</span>
              )}
            </div>
            
            <div className="hidden sm:block">
              <div className="flex items-center">
                <span className="text-sm font-medium truncate max-w-[100px]">
                  {firstName}
                </span>
                <ChevronDown className={`h-4 w-4 ml-1.5 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </motion.button>
          
          {/* User Menu Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-60 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden backdrop-blur-sm bg-card/95"
              >
                <div className="p-4 border-b border-border">
                  <div className="font-semibold">{session?.user?.name}</div>
                  <div className="text-sm text-muted-foreground truncate mt-0.5">{session?.user?.email}</div>
                </div>
                
                <nav className="py-2">
                  <Link 
                    href="/dashboard/my-profile"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/10 text-sm transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span>My Profile</span>
                  </Link>
                  
                  <Link 
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/10 text-sm transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <Settings className="h-4 w-4 text-primary" />
                    </div>
                    <span>Settings</span>
                  </Link>
                  
                  <div className="h-px bg-border mx-4 my-2"></div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-destructive/10 text-sm text-destructive transition-colors"
                    onClick={handleLogout}
                  >
                    <div className="w-8 h-8 rounded-md bg-destructive/10 flex items-center justify-center">
                      <LogOut className="h-4 w-4 text-destructive" />
                    </div>
                    <span>Sign Out</span>
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </header>
  );
}