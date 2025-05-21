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
  ChevronLeft,
} from "lucide-react";

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
      <div className="h-16 flex items-center px-4 border-b border-border">
        <div className="flex items-center">
          <svg
            width="24"
            height="24"
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
          {!isCollapsed && (
            <span className="text-lg font-bold ml-2">CRM</span>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto lg:hidden p-1 rounded-md hover:bg-accent"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="ml-auto hidden lg:flex p-1 rounded-md hover:bg-accent"
          >
            <ChevronLeft
              className={`h-4 w-4 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
            <span className="sr-only">
              {isCollapsed ? "Expand" : "Collapse"}
            </span>
          </button>
        )}
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={onClose}
            >
              <span
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                }`}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {!isCollapsed && <span>{item.title}</span>}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div
          className={`rounded-md bg-muted p-3 ${
            isCollapsed ? "text-center" : ""
          }`}
        >
          {!isCollapsed ? (
            <>
              <h4 className="text-sm font-semibold">Need help?</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Check our documentation or contact support.
              </p>
            </>
          ) : (
            <span className="text-muted-foreground">?</span>
          )}
        </div>
      </div>
    </div>
  );
}