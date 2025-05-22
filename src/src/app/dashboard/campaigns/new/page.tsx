"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  Loader2,
  AlertCircle,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Megaphone
} from "lucide-react";

type StepType = 'EMAIL' | 'CALL' | 'LINKEDIN_MESSAGE' | 'WAIT' | 'TASK';

interface Template {
  id: string;
  name: string;
  subject?: string;
}

interface CampaignStep {
  type: StepType;
  content?: string;
  templateId?: string;
  template?: Template;
  waitDays: number;
  order: number;
}

export default function NewCampaignPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<CampaignStep[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  
  // Load templates when needed
  const loadTemplates = async () => {
    if (templates.length > 0) return;
    
    try {
      setIsLoadingTemplates(true);
      
      const response = await fetch('/api/templates');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch templates: ${response.status}`);
      }
      
      const data = await response.json();
      const templatesData = data.success && data.data 
        ? data.data 
        : (Array.isArray(data) ? data : []);
      
      setTemplates(templatesData);
    } catch (err) {
      console.error("Error loading templates:", err);
      // Don't set error state here to avoid disrupting the form
    } finally {
      setIsLoadingTemplates(false);
    }
  };
  
  const handleAddStep = (type: StepType) => {
    // Load templates if adding an email step
    if (type === 'EMAIL') {
      loadTemplates();
    }
    
    setSteps([
      ...steps,
      {
        type,
        content: '',
        waitDays: type === 'WAIT' ? 1 : 0,
        order: steps.length,
      },
    ]);
  };
  
  const handleRemoveStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    
    // Update order for remaining steps
    newSteps.forEach((step, idx) => {
      step.order = idx;
    });
    
    setSteps(newSteps);
  };
  
  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === steps.length - 1)
    ) {
      return;
    }
    
    const newSteps = [...steps];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap steps
    [newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]];
    
    // Update order
    newSteps.forEach((step, idx) => {
      step.order = idx;
    });
    
    setSteps(newSteps);
  };
  
  const handleStepChange = (index: number, field: string, value: any) => {
    const newSteps = [...steps];
    
    switch (field) {
      case 'templateId':
        // Find template details if selecting a template
        if (value) {
          const selectedTemplate = templates.find(t => t.id === value);
          newSteps[index] = {
            ...newSteps[index],
            templateId: value,
            template: selectedTemplate,
          };
        } else {
          newSteps[index] = {
            ...newSteps[index],
            templateId: undefined,
            template: undefined,
          };
        }
        break;
      default:
        newSteps[index] = {
          ...newSteps[index],
          [field]: field === 'waitDays' ? parseInt(value, 10) : value,
        };
    }
    
    setSteps(newSteps);
  };
  
  const handleSave = async () => {
    // Validate inputs
    if (!name.trim()) {
      setError("Campaign name is required");
      return;
    }
    
    if (steps.length === 0) {
      setError("At least one step is required");
      return;
    }
    
    // Validate each step
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      
      if (step.type === 'EMAIL' && !step.templateId) {
        setError(`Email step ${i + 1} requires a template`);
        return;
      }
      
      if (['CALL', 'TASK', 'LINKEDIN_MESSAGE'].includes(step.type) && !step.content) {
        setError(`Step ${i + 1} requires content/instructions`);
        return;
      }
      
      if (step.type === 'WAIT' && (step.waitDays < 1 || step.waitDays > 365)) {
        setError(`Wait days in step ${i + 1} should be between 1 and 365`);
        return;
      }
    }
    
    try {
      setIsSaving(true);
      setError(null);
      
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          steps,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create campaign');
      }
      
      const data = await response.json();
      
      router.push(`/dashboard/campaigns/${data.data.id}`);
    } catch (err) {
      console.error("Error creating campaign:", err);
      setError(err instanceof Error ? err.message : 'Failed to create campaign');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/campaigns"
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back to campaigns</span>
          </Link>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
            <p className="text-muted-foreground">
              Set up a new automated outreach sequence
            </p>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Create Campaign
            </>
          )}
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Details */}
        <div className="lg:col-span-3 bg-card border border-border rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Campaign Information</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                Campaign Name*
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
                placeholder="End of Quarter Special Offer"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
                rows={3}
                placeholder="Describe the purpose and goals of this campaign"
              />
            </div>
          </div>
        </div>
        
        {/* Campaign Steps */}
        <div className="lg:col-span-3 bg-card border border-border rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Campaign Steps</h2>
            <div className="relative group">
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
              >
                <Plus size={16} />
                Add Step
                <ChevronDown size={16} />
              </button>
              
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card border border-border hidden group-hover:block hover:block z-10">
                <div className="py-1 divide-y divide-border">
                  <button
                    onClick={() => handleAddStep('EMAIL')}
                    className="px-4 py-2 text-left w-full hover:bg-muted flex items-center gap-2"
                  >
                    <Mail size={16} className="text-blue-500" />
                    Send Email
                  </button>
                  <button
                    onClick={() => handleAddStep('CALL')}
                    className="px-4 py-2 text-left w-full hover:bg-muted flex items-center gap-2"
                  >
                    <Phone size={16} className="text-purple-500" />
                    Make Call
                  </button>
                  <button
                    onClick={() => handleAddStep('LINKEDIN_MESSAGE')}
                    className="px-4 py-2 text-left w-full hover:bg-muted flex items-center gap-2"
                  >
                    <MessageSquare size={16} className="text-cyan-500" />
                    LinkedIn Message
                  </button>
                  <button
                    onClick={() => handleAddStep('WAIT')}
                    className="px-4 py-2 text-left w-full hover:bg-muted flex items-center gap-2"
                  >
                    <Clock size={16} className="text-amber-500" />
                    Wait Period
                  </button>
                  <button
                    onClick={() => handleAddStep('TASK')}
                    className="px-4 py-2 text-left w-full hover:bg-muted flex items-center gap-2"
                  >
                    <CheckCircle size={16} className="text-green-500" />
                    Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {steps.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-muted-foreground/25 rounded-md">
              <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No steps added yet</h3>
              <p className="text-muted-foreground">
                Add steps to create your campaign sequence
              </p>
            </div>
          ) : (
            <div className="space-y-4 relative">
              {/* Vertical timeline line */}
              <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-border" />
              
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 bg-card border border-border rounded-md p-4 relative z-10"
                >
                  <div className="rounded-full h-10 w-10 flex items-center justify-center bg-card border border-border shadow-sm">
                    {step.type === 'EMAIL' ? (
                      <Mail size={16} className="text-blue-500" />
                    ) : step.type === 'CALL' ? (
                      <Phone size={16} className="text-purple-500" />
                    ) : step.type === 'LINKEDIN_MESSAGE' ? (
                      <MessageSquare size={16} className="text-cyan-500" />
                    ) : step.type === 'WAIT' ? (
                      <Clock size={16} className="text-amber-500" />
                    ) : (
                      <CheckCircle size={16} className="text-green-500" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between">
                      <div className="font-medium">
                        {step.type === 'EMAIL' ? 'Send Email' : 
                         step.type === 'CALL' ? 'Make Call' : 
                         step.type === 'LINKEDIN_MESSAGE' ? 'LinkedIn Message' : 
                         step.type === 'WAIT' ? 'Wait Period' : 'Task'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Step {index + 1}
                      </div>
                    </div>
                    
                    {/* Fields based on step type */}
                    {step.type === 'EMAIL' && (
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Email Template
                        </label>
                        <select
                          value={step.templateId || ''}
                          onChange={(e) => handleStepChange(index, 'templateId', e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                          required
                        >
                          <option value="">Select a template</option>
                          {isLoadingTemplates ? (
                            <option disabled>Loading templates...</option>
                          ) : (
                            templates.map((template) => (
                              <option key={template.id} value={template.id}>
                                {template.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    )}
                    
                    {step.type === 'WAIT' && (
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Wait Days
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="365"
                          value={step.waitDays}
                          onChange={(e) => handleStepChange(index, 'waitDays', e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded-md"
                        />
                      </div>
                    )}
                    
                    {(step.type === 'CALL' || step.type === 'TASK' || step.type === 'LINKEDIN_MESSAGE') && (
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                          Instructions
                        </label>
                        <textarea
                          value={step.content || ''}
                          onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded-md"
                          rows={3}
                          placeholder={
                            step.type === 'CALL' 
                              ? 'What to say in the call...' 
                              : step.type === 'LINKEDIN_MESSAGE'
                                ? 'Message to send on LinkedIn...'
                                : 'Task description...'
                          }
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMoveStep(index, 'up')}
                      disabled={index === 0}
                      className={`p-1 rounded-md ${index === 0 ? 'text-muted-foreground' : 'hover:bg-accent'}`}
                    >
                      <ArrowUp size={16} />
                      <span className="sr-only">Move Up</span>
                    </button>
                    <button
                      onClick={() => handleMoveStep(index, 'down')}
                      disabled={index === steps.length - 1}
                      className={`p-1 rounded-md ${index === steps.length - 1 ? 'text-muted-foreground' : 'hover:bg-accent'}`}
                    >
                      <ArrowDown size={16} />
                      <span className="sr-only">Move Down</span>
                    </button>
                    <button
                      onClick={() => handleRemoveStep(index)}
                      className="p-1 text-destructive hover:bg-destructive/10 rounded-md"
                    >
                      <Trash2 size={16} />
                      <span className="sr-only">Remove Step</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}