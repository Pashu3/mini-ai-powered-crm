"use client";

import { useState, useEffect, useCallback } from "react";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { Header } from "@/components/dashboard/Header";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);
  
  const toggleSidebarCollapse = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    
    const checkIfMobile = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isMobileView = window.innerWidth < 1024;
        
        if (isMobileView !== isMobile) {
          setIsMobile(isMobileView);
          
          if (isMobileView) {
            setIsSidebarOpen(false);
            setIsSidebarCollapsed(false);
          } else {
            setIsSidebarOpen(true);
            setIsSidebarCollapsed(false);
          }
        }
      }, 100); 
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      clearTimeout(resizeTimer);
    };
  }, [isMobile]); 

  const sidebarWidth = isSidebarCollapsed ? 72 : 240;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - fixed, non-scrollable */}
      <div
        className={`${isMobile ? "fixed" : "sticky top-0"} h-screen z-30 transition-all duration-200 overflow-hidden`}
        style={{ 
          width: !isMobile ? (isSidebarCollapsed ? '72px' : '240px') : '0px',
          transform: (isMobile && isSidebarOpen) ? 'translateX(0)' : (isMobile ? `translateX(-${sidebarWidth}px)` : 'none'),
          height: '100vh'
        }}
      >
        <SidebarNav 
          onClose={isMobile ? () => setIsSidebarOpen(false) : undefined}
          isCollapsed={!isMobile && isSidebarCollapsed}
          onToggleCollapse={!isMobile ? toggleSidebarCollapse : undefined}
        />
      </div>
      
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Main content area - scrollable */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        <main className="p-6 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}