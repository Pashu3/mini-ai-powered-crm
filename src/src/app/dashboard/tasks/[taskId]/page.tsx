"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Edit,
  Save,
  XIcon,
  Trash2,
  Loader2,
  AlertCircle,
  Calendar,
  Flag,
  ClipboardList,
  User,
  Building,
  CheckCircle2,
  Clock,
  XCircle
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

interface Lead {
  id: string;
  name: string;
  company?: string;
}

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const taskId = params.taskId as string;
  const { toast } = useToast();
  
  // Check if we should start in edit mode from URL
  const shouldStartInEditMode = searchParams.get('edit') === 'true';
  
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(shouldStartInEditMode);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  
  // Edit form state
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 1,
    leadId: ''
  });
  
  // Fetch task details
  useEffect(() => {
    async function fetchTask() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/tasks/${taskId}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching task: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle success response format
        const taskData = data.success && data.data
          ? data.data
          : data;
        
        setTask(taskData);
        
        // Initialize edit form with task data
        setEditForm({
          title: taskData.title,
          description: taskData.description || '',
          dueDate: taskData.dueDate ? taskData.dueDate.split('T')[0] : '',
          priority: taskData.priority,
          leadId: taskData.leadId || ''
        });
      } catch (err) {
        console.error('Failed to fetch task:', err);
        setError('Failed to load task details. Please try again.');
        toast({
          type: "error",
          title: "Failed to load task",
          description: "Could not retrieve task details. Please try again.",
          duration: 5000
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchTask();
  }, [taskId, toast]);
  
  // Fetch leads for dropdown
  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch('/api/leads');
        
        if (!response.ok) {
          throw new Error(`Error fetching leads: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats
        let leadsData;
        if (data.success && data.data) {
          leadsData = Array.isArray(data.data) ? data.data : data.data.leads;
        } else if (Array.isArray(data)) {
          leadsData = data;
        } else {
          leadsData = [];
        }
        
        setLeads(leadsData);
      } catch (err) {
        console.error('Failed to fetch leads:', err);
        toast({
          type: "warning",
          title: "Could not load leads",
          description: "The lead selection may be unavailable or incomplete",
          duration: 3000
        });
      }
    }
    
    if (isEditing) {
      fetchLeads();
    }
  }, [isEditing, toast]);
  
  // Format date to readable string
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Get color for priority badge
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return "text-blue-600 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800";
      case 2: return "text-amber-600 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800";
      case 3: return "text-red-600 bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
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
      case "PENDING": return "text-amber-600 bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800";
      case "IN_PROGRESS": return "text-blue-600 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800";
      case "COMPLETED": return "text-green-600 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800";
      case "CANCELLED": return "text-gray-600 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
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
      case "PENDING": return <Clock className="h-5 w-5 text-amber-500" />;
      case "IN_PROGRESS": return <Clock className="h-5 w-5 text-blue-500" />;
      case "COMPLETED": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "CANCELLED": return <XCircle className="h-5 w-5 text-gray-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Handle status change
  const handleStatusChange = async (newStatus: string) => {
    if (!task) return;
    
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
      
      const data = await response.json();
      
      // Handle success response format
      const updatedTask = data.success && data.data
        ? data.data
        : data;
      
      setTask(updatedTask);
      
      // Show success toast based on status
      const toastTypes = {
        "COMPLETED": "success",
        "CANCELLED": "warning",
        "PENDING": "info",
        "IN_PROGRESS": "info"
      } as const;
      
      toast({
        type: toastTypes[newStatus as keyof typeof toastTypes] || "info",
        title: `Status updated`,
        description: `Task marked as ${getStatusLabel(newStatus)}`,
        duration: 3000
      });
      
    } catch (err) {
      console.error('Failed to update task status:', err);
      toast({
        type: "error",
        title: "Failed to update status",
        description: "Please try again",
        duration: 5000
      });
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      // Convert priority to number for the API
      if (name === 'priority') {
        setEditForm({
          ...editForm,
          [name]: parseInt(value, 10)  
        });
      } else {
        setEditForm({
          ...editForm,
          [name]: value
        });
      }
    };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!task) return;
    
    try {
      setIsSaving(true);
      
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH', // Changed from PUT to PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      
      const data = await response.json();
      
      // Handle success response format
      const updatedTask = data.success && data.data
        ? data.data
        : data;
      
      setTask(updatedTask);
      setIsEditing(false);
      
      // Check if we updated a lead association
      const leadChanged = task.leadId !== editForm.leadId;
      
      // Show success toast
      toast({
        type: "success",
        title: "Task updated",
        description: leadChanged 
          ? "Task details and lead association updated" 
          : "Task details updated successfully",
        duration: 3000
      });
      
      // Update URL if we were in edit mode from URL parameter
      if (shouldStartInEditMode) {
        router.push(`/dashboard/tasks/${taskId}`);
      }
      
    } catch (err) {
      console.error('Failed to update task:', err);
      toast({
        type: "error",
        title: "Failed to update task",
        description: "Please check your inputs and try again",
        duration: 5000
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle task delete
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      
      toast({
        type: "success",
        title: "Task deleted",
        description: "Task has been permanently removed",
        duration: 3000
      });
      
      router.push('/dashboard/tasks');
    } catch (err) {
      console.error('Failed to delete task:', err);
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      
      toast({
        type: "error",
        title: "Failed to delete task",
        description: "Please try again",
        duration: 5000
      });
    }
  };
  
  // Handle cancel edit - with check for unsaved changes
  const handleCancelEdit = () => {
    const hasUnsavedChanges = 
      task?.title !== editForm.title ||
      task?.description !== editForm.description ||
      (task?.dueDate?.split('T')[0] || '') !== editForm.dueDate ||
      task?.priority !== editForm.priority ||
      (task?.leadId || '') !== editForm.leadId;
      
    if (hasUnsavedChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        setIsEditing(false);
        
        // Reset form data to current task data
        if (task) {
          setEditForm({
            title: task.title,
            description: task.description || '',
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
            priority: task.priority,
            leadId: task.leadId || ''
          });
        }
        
        // Update URL if we were in edit mode from URL parameter
        if (shouldStartInEditMode) {
          router.push(`/dashboard/tasks/${taskId}`);
        }
      }
    } else {
      setIsEditing(false);
      
      // Update URL if we were in edit mode from URL parameter
      if (shouldStartInEditMode) {
        router.push(`/dashboard/tasks/${taskId}`);
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !task) {
    return (
      <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
        <AlertCircle className="h-6 w-6 mb-2" />
        <h3 className="font-medium text-lg">Error loading task</h3>
        <p>{error || "Task not found"}</p>
        <div className="flex gap-3 mt-4">
          <Link 
            href="/dashboard/tasks"
            className="px-4 py-2 bg-background border border-input rounded-md"
          >
            Back to Tasks
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/tasks"
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back to tasks</span>
          </Link>
          
          {isEditing ? (
            <div>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleInputChange}
                className="text-2xl font-bold tracking-tight mb-1 bg-transparent border-b border-input px-1 focus:outline-none focus:border-primary"
              />
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-2">{task.title}</h1>
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border  ${getStatusColor(task.status)}`}>
                  {getStatusIcon(task.status)}
                  {getStatusLabel(task.status)}
                </span>
                
                <span className={`text-sm px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                  <Flag size={14} className="inline-block mr-1" />
                  {getPriorityLabel(task.priority)} Priority
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1.5 border border-input rounded-md flex items-center gap-1.5 hover:bg-muted"
                disabled={isSaving}
              >
                <XIcon size={14} />
                Cancel
              </button>
              
              <button
                onClick={handleSubmit}
                className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md flex items-center gap-1.5"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 border border-input rounded-md flex items-center gap-1.5 hover:bg-accent"
              >
                <Edit size={14} />
                Edit
              </button>
              
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-3 py-1.5 border border-input text-muted-foreground rounded-md flex items-center gap-1.5 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </>
          )}
        </div>
      </motion.div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - task details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
              <ClipboardList size={18} />
              Description
            </h2>
            
            {isEditing ? (
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Add a description..."
              />
            ) : (
              <div className="prose max-w-none">
                {task.description ? (
                  <div className="whitespace-pre-wrap">{task.description}</div>
                ) : (
                  <p className="text-muted-foreground">No description provided.</p>
                )}
              </div>
            )}
          </motion.div>
          
          {/* Status update */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card border border-border rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-medium mb-4">Update Status</h2>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleStatusChange("PENDING")}
                className={`px-3 py-2 rounded-md border flex items-center gap-1.5 transition-colors
                  ${task.status === "PENDING" 
                    ? "border-amber-300 bg-amber-50 dark:bg-amber-900/30 dark:border-amber-800 text-amber-800 dark:text-amber-300" 
                    : "border-input hover:bg-muted text-foreground"}`}
              >
                <Clock size={16} className="text-amber-500" />
                Pending
              </button>
              
              <button
                onClick={() => handleStatusChange("IN_PROGRESS")}
                className={`px-3 py-2 rounded-md border flex items-center gap-1.5 transition-colors
                  ${task.status === "IN_PROGRESS" 
                    ? "border-blue-300 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-800 text-blue-800 dark:text-blue-300" 
                    : "border-input hover:bg-muted text-foreground"}`}
              >
                <Clock size={16} className="text-blue-500" />
                In Progress
              </button>
              
              <button
                onClick={() => handleStatusChange("COMPLETED")}
                className={`px-3 py-2 rounded-md border flex items-center gap-1.5 transition-colors
                  ${task.status === "COMPLETED" 
                    ? "border-green-300 bg-green-50 dark:bg-green-900/30 dark:border-green-800 text-green-800 dark:text-green-300" 
                    : "border-input hover:bg-muted text-foreground"}`}
              >
                <CheckCircle2 size={16} className="text-green-500" />
                Completed
              </button>
              
              <button
                onClick={() => handleStatusChange("CANCELLED")}
                className={`px-3 py-2 rounded-md border flex items-center gap-1.5 transition-colors
                  ${task.status === "CANCELLED" 
                    ? "border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-gray-800 dark:text-gray-300" 
                    : "border-input hover:bg-muted text-foreground"}`}
              >
                <XCircle size={16} className="text-gray-500" />
                Cancelled
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Right side - metadata */}
        <div className="space-y-6">
          {/* Task details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card border border-border rounded-lg shadow-sm p-6"
          >
            <h3 className="font-medium mb-4">Task Details</h3>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Priority</label>
                  <select
                    name="priority"
                    value={editForm.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value={1}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={3}>High</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={editForm.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground block mb-1">Associate Lead</label>
                  <select
                    name="leadId"
                    value={editForm.leadId || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">No Associated Lead</option>
                    {leads.map(lead => (
                      <option key={lead.id} value={lead.id}>
                        {lead.name} {lead.company ? `(${lead.company})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground block">Due Date</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>{formatDate(task.dueDate)}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block">Created</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>{formatDate(task.createdAt)}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground block">Last Updated</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>{formatDate(task.updatedAt)}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Associated Lead */}
          {!isEditing && task.lead ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-card border border-border rounded-lg shadow-sm p-6"
            >
              <h3 className="font-medium mb-4">Associated Lead</h3>
              
              <div className="flex items-center gap-3">
                <User size={24} className="text-primary" />
                <div>
                  <Link href={`/dashboard/leads/${task.lead.id}`} className="font-medium hover:text-primary hover:underline">
                    {task.lead.name}
                  </Link>
                  {task.lead.company && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Building size={14} />
                      {task.lead.company}
                    </div>
                  )}
                </div>
              </div>
              
              <Link
                href={`/dashboard/leads/${task.lead.id}`}
                className="mt-4 text-sm text-primary hover:underline flex items-center gap-1"
              >
                View Lead Profile
                <ArrowLeft className="h-3 w-3 rotate-180" />
              </Link>
            </motion.div>
          ) : !isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-muted/50 border border-border rounded-lg p-6 text-center"
            >
              <User size={24} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground mb-1">No associated lead</p>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-primary hover:underline"
              >
                Associate with a lead
              </button>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}