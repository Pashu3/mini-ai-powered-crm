"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  User, 
  Building, 
  Mail, 
  Phone, 
  Tag,
  Briefcase,
  BarChart,
  LinkedinIcon,
  FileText,
  Loader2,
  AlertCircle,
  Save,
  X,
  Info,
  PlusCircle,
  Calendar,
  Flag,
  ListTodo,
  Clock,
  Globe
} from "lucide-react";
import { useToast } from "@/components/ui/toast/ToastContext";
import { LeadStage, LeadSource } from "@/types/lead";
import { getStageColor, getSourceColor } from "@/utils/styleHelpers";

export default function NewLeadPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    stage: 'NEW' as LeadStage,
    source: 'OTHER' as LeadSource,
    tags: [] as string[],
    position: '',
    linkedinUrl: '',
    region: '',
    score: '',
    priority: 2,
    confidence: 50,
    notes: '',
  });
  
  const [includeTask, setIncludeTask] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 2, 
  });
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.style.overflow = 'hidden';
      
      return () => {
        bodyElement.style.overflow = '';
      };
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const payload = {
        ...formData,
        score: formData.score ? parseInt(formData.score) : undefined,
        priority: Number(formData.priority),
        confidence: Number(formData.confidence),
      };
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create lead');
      }
      
      const data = await response.json();
      
      const leadId = data.success && data.data ? data.data.id : data.id;
      
      if (includeTask && taskData.title && leadId) {
        const taskPayload = {
          ...taskData,
          priority: Number(taskData.priority),
          leadId: leadId,
          status: "PENDING"
        };
        
        try {
          const taskResponse = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskPayload),
          });
          
          if (!taskResponse.ok) {
            console.error('Failed to create task, but lead was created successfully');
            toast({
              type: 'warning',
              title: 'Lead created',
              description: 'But follow-up task could not be created.',
              duration: 5000
            });
          }
        } catch (taskErr) {
          console.error('Error creating task:', taskErr);
          toast({
            type: 'warning',
            title: 'Lead created',
            description: 'But follow-up task could not be created.',
            duration: 5000
          });
        }
      }
      
      toast({
        type: 'success',
        title: 'Success!',
        description: 'Lead created successfully',
        duration: 3000
      });
      
      setTimeout(() => {
        if (leadId) {
          router.push(`/dashboard/leads/${leadId}`);
        } else {
          router.push('/dashboard/leads');
        }
      }, 1000);
      
    } catch (err) {
      console.error('Error creating lead:', err);
      setError(err instanceof Error ? err.message : 'Failed to create lead');
      toast({
        type: 'error',
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to create lead',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-8 pb-12 overflow-visible" 
    >
      {/* Top navigation bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border py-4 mb-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard/leads" 
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="sr-only">Back to leads</span>
            </Link>
            
            <h1 className="text-2xl font-bold tracking-tight">Create New Lead</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/leads"
              className="px-4 py-2 text-sm border border-input rounded-md hover:bg-muted transition-colors"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              form="lead-form"
              disabled={loading}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Create Lead
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="px-4 sm:px-0">
        <div className="flex items-center gap-2 mb-2 text-muted-foreground">
          <User size={16} />
          <p>Adding a new prospect to your CRM system</p>
        </div>
      </div>
      
      {/* Status messages */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-3 mx-4 sm:mx-0"
          >
            <AlertCircle size={20} />
            <p>{error}</p>
            <button 
              onClick={() => setError(null)}
              className="ml-auto p-1 rounded-full hover:bg-destructive/20 transition-colors"
            >
              <X size={16} />
              <span className="sr-only">Dismiss</span>
            </button>
          </motion.div>
        )}
        
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-md flex items-center gap-3 mx-4 sm:mx-0"
          >
            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-4 w-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p>{successMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6 mx-4 sm:mx-0">
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <h2 className="font-medium text-lg flex items-center gap-2">
                <User size={18} />
                Contact Information
              </h2>
            </div>
            
            <form id="lead-form" onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium flex justify-between">
                    <span>Full Name <span className="text-destructive">*</span></span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-muted-foreground" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium">
                    Company
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building size={16} className="text-muted-foreground" />
                    </div>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
              
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-muted-foreground" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={16} className="text-muted-foreground" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="position" className="block text-sm font-medium">
                    Job Title
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase size={16} className="text-muted-foreground" />
                    </div>
                    <input
                      id="position"
                      name="position"
                      type="text"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Marketing Director"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="linkedinUrl" className="block text-sm font-medium">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkedinIcon size={16} className="text-muted-foreground" />
                    </div>
                    <input
                      id="linkedinUrl"
                      name="linkedinUrl"
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="region" className="block text-sm font-medium">
                    Region/Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe size={16} className="text-muted-foreground" />
                    </div>
                    <input
                      id="region"
                      name="region"
                      type="text"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="North America, Europe, APAC, etc."
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <label htmlFor="notes" className="block text-sm font-medium mb-2">
                  Notes
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <FileText size={16} className="text-muted-foreground" />
                  </div>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md min-h-[120px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Add any relevant information about this lead"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Follow-up Task Card */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-medium text-lg flex items-center gap-2">
                <ListTodo size={18} />
                Follow-up Task
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Add a follow-up task</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={includeTask} 
                    onChange={() => setIncludeTask(!includeTask)} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            
            {includeTask && (
              <div className="p-6 space-y-6">
                {/* Task Title */}
                <div className="space-y-2">
                  <label htmlFor="taskTitle" className="block text-sm font-medium">
                    Task Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="taskTitle"
                    name="title"
                    type="text"
                    value={taskData.title}
                    onChange={handleTaskChange}
                    className="w-full px-3 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Follow up with lead"
                    required={includeTask}
                  />
                </div>
                
                {/* Task Description */}
                <div className="space-y-2">
                  <label htmlFor="taskDescription" className="block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="taskDescription"
                    name="description"
                    value={taskData.description}
                    onChange={handleTaskChange}
                    className="w-full px-3 py-2.5 border border-input bg-background rounded-md min-h-[80px] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Details about the follow-up"
                    rows={3}
                  />
                </div>
                
                {/* Due Date & Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Due Date */}
                  <div className="space-y-2">
                    <label htmlFor="taskDueDate" className="block text-sm font-medium">
                      Due Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="taskDueDate"
                        name="dueDate"
                        type="date"
                        value={taskData.dueDate}
                        onChange={handleTaskChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  
                  {/* Priority */}
                  <div className="space-y-2">
                    <label htmlFor="taskPriority" className="block text-sm font-medium">
                      Priority
                    </label>
                    <div className="relative">
                      <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <select
                        id="taskPriority"
                        name="priority"
                        value={taskData.priority}
                        onChange={handleTaskChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                      >
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-md flex items-start gap-3">
                  <Clock size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">Schedule a follow-up</p>
                    <p>This task will be created automatically once the lead is added to the system.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <h2 className="font-medium text-lg flex items-center gap-2">
                <BarChart size={18} />
                Lead Status
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Source */}
              <div className="space-y-2">
                <label htmlFor="source" className="block text-sm font-medium">
                  Lead Source
                </label>
                <select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  {(['LINKEDIN', 'COLD_EMAIL', 'WEBSITE', 'REFERRAL', 'CONFERENCE', 'WEBINAR', 'INBOUND_CALL', 'OUTBOUND_CALL', 'SOCIAL_MEDIA', 'PARTNER', 'OTHER'] as LeadSource[]).map(source => (
                    <option key={source} value={source}>
                      {source.replace('_', ' ').charAt(0) + source.replace('_', ' ').slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                
                <div className="mt-3 flex items-center justify-center">
                  <span className={`inline-block px-4 py-1.5 text-sm font-medium rounded-full border ${getSourceColor(formData.source)}`}>
                    {formData.source.replace('_', ' ').charAt(0) + formData.source.replace('_', ' ').slice(1).toLowerCase()}
                  </span>
                </div>
              </div>

              {/* Stage */}
              <div className="space-y-2 pt-4">
                <label htmlFor="stage" className="block text-sm font-medium">
                  Current Stage
                </label>
                <select
                  id="stage"
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  {(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST'] as LeadStage[]).map(stage => (
                    <option key={stage} value={stage}>
                      {stage.charAt(0) + stage.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                
                <div className="mt-3 flex items-center justify-center">
                  <span className={`inline-block px-4 py-1.5 text-sm font-medium rounded-full border ${getStageColor(formData.stage)}`}>
                    {formData.stage.charAt(0) + formData.stage.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
              
              {/* Confidence score */}
              <div className="space-y-2 pt-4">
                <label htmlFor="confidence" className="block text-sm font-medium flex items-center justify-between">
                  <span>Confidence Score</span>
                  <span className="text-xs text-muted-foreground">(1-100)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BarChart size={16} className="text-muted-foreground" />
                  </div>
                  <input
                    id="confidence"
                    name="confidence"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.confidence}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      parseInt(String(formData.confidence)) >= 70 ? 'bg-green-500' : 
                      parseInt(String(formData.confidence)) >= 40 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(parseInt(String(formData.confidence)) || 0, 100)}%` }}
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2 pt-4">
                <label htmlFor="priority" className="block text-sm font-medium">
                  Priority (1-5)
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="1">1 - Very Low</option>
                  <option value="2">2 - Low</option>
                  <option value="3">3 - Medium</option>
                  <option value="4">4 - High</option>
                  <option value="5">5 - Very High</option>
                </select>

             

                {formData.priority >= 3 && (
                  <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                    Note: High-priority leads will automatically create follow-up tasks
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Tags Card */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <h2 className="font-medium text-lg flex items-center gap-2">
                <Tag size={18} />
                Tags
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="min-h-[40px] flex flex-wrap gap-2 mb-2">
                {formData.tags.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground py-3">
                    <span className="italic">No tags added yet</span>
                  </div>
                ) : (
                  formData.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1 group"
                    >
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag)}
                        className="rounded-full hover:bg-primary/20 p-0.5 opacity-70 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="sr-only">Remove</span>
                        <X size={14} />
                      </button>
                    </span>
                  ))
                )}
              </div>
              
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag size={16} className="text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Type a tag..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!currentTag}
                  className="px-3 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors disabled:opacity-50"
                >
                  <PlusCircle size={20} />
                </button>
              </div>
              
              <div className="pt-2 flex items-start gap-3 text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
                <Info size={14} className="mt-0.5 flex-shrink-0" />
                <p>Tags help categorize and filter leads. Press Enter or click the plus button to add a tag.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}