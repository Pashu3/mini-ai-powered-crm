"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Bell,
    MailWarning,
    Check,
    CheckCheck,
    Trash2,
    Filter,
    Calendar,
    MessageSquare,
    User,
    AlertCircle,
    Info,
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Loader2,
    ArrowRight,
} from "lucide-react";
import { useSocketContext } from "@/providers/SocketProvider";
import { getNotificationIcon } from "@/utils/styleHelpers";
import { formatNotificationTime, formatDate } from "@/lib/utils";
import { Notification } from "@/types/notifications";
import { useToast } from "@/components/ui/toast/ToastContext";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const { updateNotificationCount } = useSocketContext();
    const { toast } = useToast();
    const router = useRouter();
    const pageSize = 20;

    useEffect(() => {
        fetchNotifications();
    }, [page, filter]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const filterParam = filter ? `&type=${filter}` : "";
            const res = await fetch(`/api/notifications?page=${page}&limit=${pageSize}${filterParam}`);

            if (!res.ok) throw new Error("Failed to load notifications");

            const data = await res.json();

            if (data.success) {
                setNotifications(data.data || []);
                setTotalPages(Math.ceil((data.total || 0) / pageSize));

                // Update the unread count
                const unreadCount = (data.data || []).filter((n: Notification) => !n.isRead).length;
                updateNotificationCount(unreadCount);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
            toast({
                type: "error",
                title: "Error",
                description: "Failed to load notifications",
            });
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            setProcessing(id);

            // Optimistic update
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, isRead: true } : n)
            );

            const response = await fetch(`/api/notifications/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) throw new Error("Failed to mark notification as read");

            // Update notification count
            updateNotificationCount(prevCount => Math.max(0, prevCount - 1));

            toast({
                type: "success",
                title: "Notification marked as read",
            });
        } catch (error) {
            console.error("Error marking notification as read:", error);
            fetchNotifications(); // Revert on error
            toast({
                type: "error",
                title: "Error",
                description: "Failed to mark notification as read",
            });
        } finally {
            setProcessing(null);
        }
    };

    const markAllAsRead = async () => {
        try {
            setProcessing("all");

            // Optimistic update
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));

            const response = await fetch("/api/notifications", {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) throw new Error("Failed to mark all notifications as read");

            // Update notification count to zero
            updateNotificationCount(0);

            toast({
                type: "success",
                title: "All notifications marked as read",
            });
        } catch (error) {
            console.error("Error marking all as read:", error);
            fetchNotifications(); // Revert on error
            toast({
                type: "error",
                title: "Error",
                description: "Failed to mark all notifications as read",
            });
        } finally {
            setProcessing(null);
        }
    };

    const deleteNotification = async (id: string) => {
        try {
            setProcessing(id);

            // Check if notification was unread
            const wasUnread = notifications.find(n => n.id === id)?.isRead === false;

            // Optimistic update
            setNotifications(prev => prev.filter(n => n.id !== id));

            const response = await fetch(`/api/notifications/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) throw new Error("Failed to delete notification");

            // Update count if needed
            if (wasUnread) {
                updateNotificationCount(prevCount => Math.max(0, prevCount - 1));
            }

            toast({
                type: "success",
                title: "Notification deleted",
            });
        } catch (error) {
            console.error("Error deleting notification:", error);
            fetchNotifications(); // Revert on error
            toast({
                type: "error",
                title: "Error",
                description: "Failed to delete notification",
            });
        } finally {
            setProcessing(null);
        }
    };

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

        // Mark as read before navigating
        if (!notification.isRead) {
            markAsRead(notification.id);
        }

        router.push(url);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchNotifications();
    };

    const filteredNotifications = search.trim()
        ? notifications.filter(n =>
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.message.toLowerCase().includes(search.toLowerCase()))
        : notifications;

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const setFilterType = (type: string | null) => {
        setFilter(type);
        setShowFilterDropdown(false);
    };

    return (
        <div className="container max-w-6xl mx-auto px-4 py-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center gap-2 mb-6">
                    <Bell className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-semibold">Notifications</h1>
                </div>
                <p className="text-muted-foreground mb-6">Manage all your system notifications</p>

                <div className="bg-card border border-border shadow-sm rounded-lg mt-6">
                    {/* Filters and search */}
                    <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between">
                        <div className="flex flex-1 gap-3">
                            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="search"
                                    placeholder="Search notifications..."
                                    className="w-full pl-9 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </form>

                            <div className="relative">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 px-3 py-2 border border-input bg-background rounded-md hover:bg-muted transition-colors"
                                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                >
                                    <Filter className="h-4 w-4" />
                                    {filter ? filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase() : 'All Types'}
                                    <ChevronDown className="h-4 w-4" />
                                </button>

                                {showFilterDropdown && (
                                    <div className="absolute left-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg z-10">
                                        <ul className="py-1">
                                            <li
                                                className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                                                onClick={() => setFilterType(null)}
                                            >
                                                <Bell className="h-4 w-4" />
                                                <span>All Types</span>
                                            </li>
                                            <li
                                                className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                                                onClick={() => setFilterType('INFO')}
                                            >
                                                <Info className="h-4 w-4 text-blue-500" />
                                                <span>Info</span>
                                            </li>
                                            <li
                                                className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                                                onClick={() => setFilterType('SUCCESS')}
                                            >
                                                <Check className="h-4 w-4 text-green-500" />
                                                <span>Success</span>
                                            </li>
                                            <li
                                                className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                                                onClick={() => setFilterType('WARNING')}
                                            >
                                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                                <span>Warning</span>
                                            </li>
                                            <li
                                                className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                                                onClick={() => setFilterType('ERROR')}
                                            >
                                                <MailWarning className="h-4 w-4 text-red-500" />
                                                <span>Error</span>
                                            </li>
                                            <li
                                                className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                                                onClick={() => setFilterType('TASK')}
                                            >
                                                <Calendar className="h-4 w-4 text-purple-500" />
                                                <span>Task</span>
                                            </li>
                                            <li
                                                className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                                                onClick={() => setFilterType('MESSAGE')}
                                            >
                                                <MessageSquare className="h-4 w-4 text-indigo-500" />
                                                <span>Message</span>
                                            </li>
                                            <li
                                                className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                                                onClick={() => setFilterType('LEAD')}
                                            >
                                                <User className="h-4 w-4 text-cyan-500" />
                                                <span>Lead</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={markAllAsRead}
                                disabled={processing === "all"}
                                className="inline-flex items-center gap-2 px-3 py-2 border border-input bg-background rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing === "all" ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <CheckCheck className="h-4 w-4" />
                                )}
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* Notifications list */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : filteredNotifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Bell className="h-12 w-12 text-muted-foreground/30 mb-4" />
                            <h3 className="text-lg font-medium">No notifications found</h3>
                            <p className="text-muted-foreground mt-1 mb-6">You don't have any notifications at the moment</p>

                            {(filter || search) && (
                                <button
                                    onClick={() => {
                                        setFilter(null);
                                        setSearch("");
                                    }}
                                    className="text-primary hover:underline"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <ul className="divide-y divide-border">
                                {filteredNotifications.map((notification) => (
                                    <li key={notification.id} className={`p-5 transition-colors ${!notification.isRead ? 'bg-primary/5' : 'hover:bg-muted/40'}`}>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 mt-1">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                    <h3 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                        {notification.title}
                                                        {!notification.isRead && (
                                                            <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                                                New
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                                                        {formatDate(new Date(notification.createdAt))}
                                                    </div>
                                                </div>

                                                <p className="text-sm text-muted-foreground my-2">
                                                    {notification.message}
                                                </p>

                                                <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between mt-3">
                                                    {notification.relatedId && notification.relatedType && (
                                                        <button
                                                            type="button"
                                                            className="text-xs text-primary hover:underline flex items-center gap-1 justify-start"
                                                            onClick={() => navigateToRelated(notification)}
                                                        >
                                                            View details
                                                            <ArrowRight className="ml-1 h-3 w-3" />
                                                        </button>
                                                    )}

                                                    <div className="flex gap-3 sm:ml-auto">
                                                        {!notification.isRead && (
                                                            <button
                                                                type="button"
                                                                className="text-xs px-3 py-1 bg-transparent hover:bg-muted rounded transition-colors"
                                                                onClick={() => markAsRead(notification.id)}
                                                                disabled={processing === notification.id}
                                                            >
                                                                {processing === notification.id ? (
                                                                    <Loader2 className="h-3 w-3 animate-spin mr-1 inline" />
                                                                ) : (
                                                                    <Check className="h-3 w-3 mr-1 inline" />
                                                                )}
                                                                Mark as read
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            className="text-xs px-3 py-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                                                            onClick={() => deleteNotification(notification.id)}
                                                            disabled={processing === notification.id}
                                                        >
                                                            {processing === notification.id ? (
                                                                <Loader2 className="h-3 w-3 animate-spin mr-1 inline" />
                                                            ) : (
                                                                <Trash2 className="h-3 w-3 mr-1 inline" />
                                                            )}
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between px-4 py-4 border-t border-border">
                                    <div className="text-sm text-muted-foreground">
                                        Page {page} of {totalPages}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1 px-3 py-1 text-sm border border-input rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Previous
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-1 px-3 py-1 text-sm border border-input rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}