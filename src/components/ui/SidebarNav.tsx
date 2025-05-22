"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  CheckSquare,
  HelpCircle,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarNavProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onClose?: () => void;
}


export function SidebarNav({
  isCollapsed = false,
  onToggleCollapse,
  onClose,
}: SidebarNavProps) {
  const pathname = usePathname();

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Leads",
      href: "/dashboard/leads",
      icon: Users,
    },
    {
      title: "Tasks",
      href: "/dashboard/tasks",
      icon: CheckSquare,
    },
    {
      title: "Conversations",
      href: "/dashboard/conversations",
      icon: MessageSquare,
    },
    {
      title: "Campaigns",
      href: "/dashboard/campaigns",
      icon: FileText,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/dashboard" && pathname?.startsWith(href));

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header section with logo */}
      <div className="h-16 flex items-center px-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold ml-2.5">CRM</span>
          </div>
        )}

        {onClose && (
          <button
            onClick={onClose}
            className={`${isCollapsed ? '' : 'ml-auto'} lg:hidden p-2 rounded-md hover:bg-primary/10`}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Collapse/Expand button on desktop - Now using Panel icons instead of ChevronLeft */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className={`${isCollapsed ? '' : 'ml-auto'} hidden lg:flex p-2 rounded-md hover:bg-primary/10`}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {/* Navigation menu */}
      <div className="flex-1 overflow-auto py-3">
        <nav className="grid gap-1.5 px-3">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={onClose}
            >
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex items-center rounded-md px-3 py-2.5 text-md font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/10 hover:text-foreground"
                }`}
              >
                <item.icon className={`${isCollapsed ? 'mx-auto' : 'mr-3'} h-5 w-5`} />
                {!isCollapsed && <span>{item.title}</span>}
              </motion.span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Help section */}
      <div className="mt-auto p-4">
        <Link href="/documentation">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-md bg-primary/5 border border-primary/10 p-3 ${
              isCollapsed ? "flex justify-center items-center" : ""
            } hover:bg-primary/10 transition-colors cursor-pointer`}
          >
            {isCollapsed ? (
              <HelpCircle className="h-5 w-5 text-primary" />
            ) : (
              <>
                <div className="flex items-center mb-2">
                  <HelpCircle className="h-5 w-5 text-primary mr-2" />
                  <h4 className="text-sm font-semibold">Need help?</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Check our documentation or contact support.
                </p>
              </>
            )}
          </motion.div>
        </Link>
      </div>
    </div>
  );
}