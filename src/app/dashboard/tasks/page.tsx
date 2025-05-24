"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Loader2,
  ClipboardList,
  Filter,
  Search,
  Flag,
  Calendar,
  User,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Pencil,
  Trash2,
  ChevronDown
} from "lucide-react";
import DeleteConfirmModal from "@/components/tasks/DeleteConfirmModal";
import { useToast } from "@/components/ui/toast/ToastContext";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  leadId?: string;
  createdAt: string;
  updatedAt: string;
  lead?: {
    id: string;
    name: string;
    company?: string;
  };
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Delete confirmation states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  
  // Filtering and sorting states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  // Toggle for mobile card view
  const [showCardView, setShowCardView] = useState<boolean>(false);

  useEffect(() => {
    // Add overflow-x-hidden to body to prevent horizontal scroll
    document.body.classList.add("overflow-x-hidden");
    
    // Check screen size for initial view type
    const checkScreenSize = () => {
      setShowCardView(window.innerWidth < 768);
    };
    
    // Set initial value
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      document.body.classList.remove("overflow-x-hidden");
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/tasks");
        
        if (!response.ok) {
          throw new Error(`Error fetching tasks: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats with correct nesting
        let tasksData;
        if (data.success && data.data && data.data.tasks) {
          tasksData = data.data.tasks; // Access the nested tasks array
        } else if (data.success && data.data) {
          tasksData = data.data;
        } else if (Array.isArray(data)) {
          tasksData = data;
        } else {
          tasksData = [];
        }
        
        setTasks(Array.isArray(tasksData) ? tasksData : []);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
        setError('Failed to load tasks. Please try again.');
        toast({
          type: "error",
          title: "Failed to load tasks",
          description: "Please try refreshing the page",
          duration: 5000
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchTasks();
  }, [toast]);

  // Function to handle task deletion
  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/tasks/${taskToDelete}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error deleting task: ${response.status}`);
      }
      
      // Remove task from state
      setTasks(tasks.filter(task => task.id !== taskToDelete));
      
      // Show success toast
      toast({
        type: "success",
        title: "Task deleted",
        description: "Task has been successfully removed",
        duration: 3000
      });
      
      // Close modal
      setDeleteModalOpen(false);
      setTaskToDelete(null);
      
    } catch (err) {
      console.error('Failed to delete task:', err);
      
      toast({
        type: "error",
        title: "Failed to delete task",
        description: "Please try again",
        duration: 5000
      });
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Format date to readable string
  const formatDate = (dateString?: string) => {
    if (!dateString) return "No date set";
    return new Date(dateString).toLocaleDateString();
  };
  
  // Get color for priority badge
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return "text-blue-600 bg-blue-50 border-blue-200";
      case 2: return "text-amber-600 bg-amber-50 border-amber-200";
      case 3: return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };
  
  // Get label for priority
  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return "Low";
      case 2: return "Medium";
      case 3: return "High";
      default: return "Unknown";
    }
  };
  
  // Get color for status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "text-amber-600 bg-amber-50 border-amber-200";
      case "IN_PROGRESS": return "text-blue-600 bg-blue-50 border-blue-200";
      case "COMPLETED": return "text-green-600 bg-green-50 border-green-200";
      case "CANCELLED": return "text-gray-600 bg-gray-50 border-gray-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };
  
  // Get label for status
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING": return "Pending";
      case "IN_PROGRESS": return "In Progress";
      case "COMPLETED": return "Completed";
      case "CANCELLED": return "Cancelled";
      default: return status;
    }
  };
  
  // Get icon for status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="h-4 w-4" />;
      case "IN_PROGRESS": return <Clock className="h-4 w-4" />;
      case "COMPLETED": return <CheckCircle2 className="h-4 w-4" />;
      case "CANCELLED": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };
  
  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      // Apply search filter
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply status filter
      if (statusFilter !== "all" && task.status !== statusFilter) {
        return false;
      }
      
      // Apply priority filter
      if (priorityFilter !== "all" && task.priority !== Number(priorityFilter)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Handle sorting
      let comparison = 0;
      
      switch (sortField) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "priority":
          comparison = a.priority - b.priority;
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "dueDate":
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
  
  // Get total count for each status
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your tasks and follow-ups
          </p>
        </div>
        
        <Link
          href="/dashboard/tasks/new"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New Task</span>
          <span className="sm:hidden">New</span>
        </Link>
      </motion.div>
      
      {/* Status filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div 
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors
            ${statusFilter === "all" ? "border-primary bg-primary/5" : "border-border"}`}
        >
          <div className="font-medium">All Tasks</div>
          <div className="text-2xl font-bold mt-1">{tasks.length}</div>
        </div>
        
        <div 
          onClick={() => setStatusFilter("PENDING")}
          className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors
            ${statusFilter === "PENDING" ? "border-primary bg-primary/5" : "border-border"}`}
        >
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-amber-500" />
            <span className="font-medium">Pending</span>
          </div>
          <div className="text-2xl font-bold mt-1">{statusCounts["PENDING"] || 0}</div>
        </div>
        
        <div 
          onClick={() => setStatusFilter("IN_PROGRESS")}
          className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors
            ${statusFilter === "IN_PROGRESS" ? "border-primary bg-primary/5" : "border-border"}`}
        >
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-blue-500" />
            <span className="font-medium">In Progress</span>
          </div>
          <div className="text-2xl font-bold mt-1">{statusCounts["IN_PROGRESS"] || 0}</div>
        </div>
        
        <div 
          onClick={() => setStatusFilter("COMPLETED")}
          className={`p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors
            ${statusFilter === "COMPLETED" ? "border-primary bg-primary/5" : "border-border"}`}
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="font-medium">Completed</span>
          </div>
          <div className="text-2xl font-bold mt-1">{statusCounts["COMPLETED"] || 0}</div>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-input rounded-md"
          />
        </div>
        
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm text-muted-foreground">Priority:</span>
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="pl-3 pr-8 py-1.5 border border-input rounded-md text-sm text-foreground bg-background appearance-none"
            >
              <option value="all">All Priorities</option>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          
          {/* Toggle between table and card view on smaller screens */}
          <button 
            className="md:hidden px-3 py-1.5 text-sm border border-input rounded-md"
            onClick={() => setShowCardView(!showCardView)}
          >
            {showCardView ? "Table View" : "Card View"}
          </button>
        </div>
      </div>
      
      {/* Tasks Table/Cards Container */}
      {loading ? (
        <div className="flex items-center justify-center py-12 border border-border rounded-lg">
          <Loader2 size={24} className="animate-spin text-primary mr-2" />
          <span>Loading tasks...</span>
        </div>
      ) : filteredAndSortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-border rounded-lg">
          <ClipboardList size={48} className="text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium mb-1">No tasks found</h3>
          <p className="text-muted-foreground max-w-md mb-4">
            {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
              ? "No tasks match your current search or filters. Try adjusting your criteria."
              : "You don't have any tasks yet. Create your first task to get started."}
          </p>
          <div className="flex gap-3">
            {(searchQuery || statusFilter !== "all" || priorityFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setPriorityFilter("all");
                }}
                className="px-4 py-2 border border-input rounded-md text-sm"
              >
                Clear Filters
              </button>
            )}
            
            <Link
              href="/dashboard/tasks/new"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm flex items-center gap-1"
            >
              <Plus size={14} />
              Create Task
            </Link>
          </div>
        </div>
      ) : showCardView ? (
        // Mobile Card View
        <div className="grid grid-cols-1 gap-4">
          {filteredAndSortedTasks.map((task) => (
            <div 
              key={task.id}
              className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <Link 
                  href={`/dashboard/tasks/${task.id}`}
                  className="font-medium hover:text-primary truncate block"
                >
                  {task.title}
                </Link>
                
                <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                  {getPriorityLabel(task.priority)}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-3">
                <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${getStatusColor(task.status)}`}>
                  {getStatusIcon(task.status)}
                  {getStatusLabel(task.status)}
                </span>
                
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{formatDate(task.dueDate)}</span>
                </div>
              </div>
              
              {task.lead && (
                <div className="flex items-center gap-1.5 mb-3">
                  <User size={14} className="text-primary flex-shrink-0" />
                  <Link href={`/dashboard/leads/${task.leadId}`} className="text-sm hover:text-primary">
                    {task.lead.name}
                  </Link>
                </div>
              )}
              
              <div className="flex justify-end gap-2 pt-2 border-t border-border/50 mt-2">
                <Link
                  href={`/dashboard/tasks/${task.id}?edit=true`}
                  className="p-2 rounded-md hover:bg-muted transition-colors"
                  title="Edit task"
                >
                  <Pencil size={16} />
                  <span className="sr-only">Edit</span>
                </Link>
                <button
                  onClick={() => {
                    setTaskToDelete(task.id);
                    setDeleteModalOpen(true);
                  }}
                  className="p-2 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                  title="Delete task"
                >
                  <Trash2 size={16} />
                  <span className="sr-only">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-full">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-muted/50 text-sm font-medium">
                <tr>
                  <th 
                    onClick={() => handleSort("title")} 
                    className="px-4 py-3 text-left cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span>Title</span>
                      {sortField === "title" && (
                        <ArrowUpDown size={14} className={`ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("priority")} 
                    className="px-4 py-3 text-left cursor-pointer w-[120px]"
                  >
                    <div className="flex items-center">
                      <span>Priority</span>
                      {sortField === "priority" && (
                        <ArrowUpDown size={14} className={`ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("status")} 
                    className="px-4 py-3 text-left cursor-pointer w-[160px]"
                  >
                    <div className="flex items-center">
                      <span>Status</span>
                      {sortField === "status" && (
                        <ArrowUpDown size={14} className={`ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("dueDate")} 
                    className="px-4 py-3 text-left cursor-pointer w-[160px]"
                  >
                    <div className="flex items-center">
                      <span>Due Date</span>
                      {sortField === "dueDate" && (
                        <ArrowUpDown size={14} className={`ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left w-[160px]">Associated Lead</th>
                  <th className="px-4 py-3 text-right w-[80px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTasks.map((task) => (
                  <tr 
                    key={task.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <Link href={`/dashboard/tasks/${task.id}`} className="font-medium hover:text-primary truncate block">
                        {task.title}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                        {getPriorityLabel(task.priority)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border inline-flex ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        {getStatusLabel(task.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
                        <span className="text-sm truncate">{formatDate(task.dueDate)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {task.lead ? (
                        <div className="flex items-center gap-1.5">
                          <User size={14} className="text-primary flex-shrink-0" />
                          <Link href={`/dashboard/leads/${task.leadId}`} className="text-sm truncate max-w-[120px] hover:text-primary">
                            {task.lead.name}
                          </Link>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">No lead</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/tasks/${task.id}?edit=true`}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors"
                          title="Edit task"
                        >
                          <Pencil size={14} />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <button
                          onClick={() => {
                            setTaskToDelete(task.id);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                          title="Delete task"
                        >
                          <Trash2 size={14} />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteTask}
        isDeleting={isDeleting}
      />
    </div>
  );
}