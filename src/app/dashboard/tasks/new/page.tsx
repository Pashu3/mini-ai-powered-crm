"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Save,
    Loader2,
    AlertCircle,
    User,
    Calendar,
    Flag,
    ClipboardList,
    Search
} from "lucide-react";
import { useToast } from "@/components/ui/toast/ToastContext";

interface Lead {
    id: string;
    name: string;
    company: string;
}

interface TaskFormData {
    title: string;
    description: string;
    dueDate: string;
    priority: number; // Changed from 1 | 2 | 3 to number
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    leadId?: string;
}

export default function NewTaskPage() {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();

    const leadIdFromQuery = searchParams.get('leadId');

    const [formData, setFormData] = useState<TaskFormData>({
        title: "",
        description: "",
        dueDate: "",
        priority: 2,
        status: "PENDING",
        leadId: leadIdFromQuery || undefined,
    });

    const [leads, setLeads] = useState<Lead[]>([]);
    const [loadingLeads, setLoadingLeads] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [leadSearchQuery, setLeadSearchQuery] = useState("");
    const [showLeadSelector, setShowLeadSelector] = useState(false);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                setLoadingLeads(true);
                const response = await fetch('/api/leads?fields=id,name,company');

                if (!response.ok) {
                    throw new Error("Failed to fetch leads");
                }

                const data = await response.json();

                let leadsData = [];
                if (data.success && data.data && data.data.leads) {
                    leadsData = data.data.leads;
                } else if (Array.isArray(data)) {
                    leadsData = data;
                } else if (data.leads) {
                    leadsData = data.leads;
                }

                setLeads(leadsData);

                if (leadIdFromQuery && leadsData.length > 0) {
                    const matchingLead = leadsData.find((lead: Lead) => lead.id === leadIdFromQuery);
                    if (matchingLead) {
                        setSelectedLead(matchingLead);
                        setFormData(prev => ({ ...prev, leadId: matchingLead.id }));
                        toast({
                            type: "info",
                            title: "Lead selected",
                            description: `Task will be associated with ${matchingLead.name}`,
                            duration: 3000
                        });
                    }
                }
            } catch (err) {
                console.error("Error fetching leads:", err);
                toast({
                    type: "error",
                    title: "Failed to fetch leads",
                    description: "Could not load the lead data. Please try again.",
                    duration: 5000
                });
            } finally {
                setLoadingLeads(false);
            }
        };

        fetchLeads();
    }, [leadIdFromQuery, toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLeadSelect = (lead: Lead) => {
        setSelectedLead(lead);
        setFormData(prev => ({ ...prev, leadId: lead.id }));
        setShowLeadSelector(false);
    };

    const handleRemoveLead = () => {
        const previousLead = selectedLead?.name;
        setSelectedLead(null);
        setFormData(prev => ({ ...prev, leadId: undefined }));
        
        toast({
            type: "info",
            title: "Lead removed",
            description: previousLead ? `Task is no longer associated with ${previousLead}` : "Lead association removed",
            duration: 3000
        });
    };

    const filteredLeads = leadSearchQuery
        ? leads.filter(
            lead =>
                lead.name.toLowerCase().includes(leadSearchQuery.toLowerCase()) ||
                (lead.company && lead.company.toLowerCase().includes(leadSearchQuery.toLowerCase()))
        )
        : leads;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            setError(null);

            // Validate required fields
            if (!formData.title.trim()) {
                setError("Task title is required");
                toast({
                    type: "error",
                    title: "Validation error",
                    description: "Task title is required",
                    duration: 3000
                });
                return;
            }

            const taskData = {
                ...formData,
                priority: Number(formData.priority) 
            };

            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create task");
            }

            const data = await response.json();

            toast({
                type: "success",
                title: "Task created",
                description: "Your new task has been created successfully",
                duration: 3000
            });

            router.push('/dashboard/tasks');
        } catch (err) {
            console.error("Error creating task:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to create task";
            setError(errorMessage);
            
            toast({
                type: "error",
                title: "Failed to create task",
                description: errorMessage,
                duration: 3000
            });
        } finally {
            setSaving(false);
        }
    };

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

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create New Task</h1>
                        <p className="text-muted-foreground">
                            Add a new task or follow-up activity
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Error message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-2"
                >
                    <AlertCircle size={18} />
                    <p>{error}</p>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <ClipboardList size={18} />
                            Task Details
                        </h2>

                        {/* Task Title */}
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">
                                Task Title <span className="text-destructive">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                                placeholder="Enter task title"
                                required
                            />
                        </div>

                        {/* Task Description */}
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-input bg-background rounded-md min-h-[100px]"
                                placeholder="Enter task description"
                                rows={4}
                            />
                        </div>

                        {/* Due Date, Priority, Status */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Due Date */}
                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium text-muted-foreground mb-1">
                                    Due Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Priority */}
                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-muted-foreground mb-1">
                                    Priority
                                </label>
                                <div className="relative">
                                    <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md appearance-none"
                                    >
                                        <option value={1}>Low</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>High</option>
                                    </select>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-muted-foreground mb-1">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1">
                                Associated Lead (Optional)
                            </label>

                            {/* Show selected lead or add lead button */}
                            {selectedLead ? (
                                <div className="flex items-center justify-between border border-input bg-muted/20 rounded-md p-3">
                                    <div className="flex items-center gap-2">
                                        <User size={18} className="text-primary" />
                                        <div>
                                            <div className="font-medium">{selectedLead.name}</div>
                                            {selectedLead.company && (
                                                <div className="text-sm text-muted-foreground">{selectedLead.company}</div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleRemoveLead}
                                        className="text-sm text-destructive hover:text-destructive/80"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setShowLeadSelector(true)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-input bg-muted/20 rounded-md hover:bg-muted"
                                >
                                    <User size={16} />
                                    Associate with a Lead
                                </button>
                            )}

                            {/* Lead selector dialog */}
                            {showLeadSelector && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
                                    <div className="bg-background border border-border shadow-lg rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-auto">
                                        <h3 className="text-lg font-semibold mb-4">Select a Lead</h3>

                                        <div className="relative mb-4">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                placeholder="Search leads..."
                                                value={leadSearchQuery}
                                                onChange={(e) => setLeadSearchQuery(e.target.value)}
                                                className="w-full pl-9 pr-4 py-2 border border-input rounded-md"
                                            />
                                        </div>

                                        <div className="max-h-[300px] overflow-y-auto">
                                            {loadingLeads ? (
                                                <div className="flex justify-center py-4">
                                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                                </div>
                                            ) : filteredLeads.length === 0 ? (
                                                <div className="text-center py-4 text-muted-foreground">
                                                    No leads found
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    {filteredLeads.map((lead) => (
                                                        <div
                                                            key={lead.id}
                                                            onClick={() => handleLeadSelect(lead)}
                                                            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted cursor-pointer"
                                                        >
                                                            <User size={16} className="text-muted-foreground" />
                                                            <div>
                                                                <div className="font-medium">{lead.name}</div>
                                                                {lead.company && (
                                                                    <div className="text-sm text-muted-foreground">{lead.company}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-6 flex justify-end gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowLeadSelector(false);
                                                    // Only show toast if the user was actively searching
                                                    if (leadSearchQuery) {
                                                        toast({
                                                            type: "info",
                                                            title: "Selection cancelled",
                                                            description: "No lead was associated with this task",
                                                            duration: 3000
                                                        });
                                                    }
                                                }}
                                                className="px-4 py-2 border border-input rounded-md text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form actions */}
                    <div className="flex justify-end gap-3">
                        <Link
                            href="/dashboard/tasks"
                            className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Create Task
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}