"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Trash2,
  Mail,
  Phone,
  Building,
  Tag,
  DollarSign,
  Loader2,
  AlertCircle,
  MessageCircle,
  Calendar,
  Edit,
  Linkedin,
  Briefcase,
  BarChart,
  Plus,
  ArrowUpRight,
  Users,
  Clock10,
  X,
  ListTodo,
  XCircle,
  CheckCircle2,
  Clock,
  Globe,
  LightbulbIcon
} from "lucide-react";
import Link from "next/link";
import DeleteLeadConfirmation from '@/components/leads/DeleteLeadConfirmation';
import LeadSidebar from '@/components/leads/LeadSidebar';
import { useToast } from "@/components/ui/toast/ToastContext";
import { Campaign, Conversation, Lead, LeadStage, Task, Suggestion } from "@/types/lead";
import { getLeadSourceLabel } from "@/lib/utils";
import { formatCurrency, formatDate, getStageColor, getCampaignStatusColor, getConversationTypeIcon,getPriorityColor, getPriorityLabel } from "@/utils/styleHelpers";
import LeadStageComponent from "@/components/leads/LeadStage";

export default function LeadDetailPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.leadId as string;
  const { toast } = useToast();

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedLead, setEditedLead] = useState<Lead | null>(null);
  const [currentTag, setCurrentTag] = useState('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [stageChanging, setStageChanging] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loadingCampaign, setLoadingCampaign] = useState(false);

  useEffect(() => {
    async function fetchLead() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/leads/${leadId}`);

        if (!response.ok) {
          throw new Error(`Error fetching lead: ${response.status}`);
        }

        const responseData = await response.json();

        const leadData = responseData.success && responseData.data
          ? responseData.data
          : responseData;

        leadData.tags = leadData.tags || [];

        setLead(leadData);
        setEditedLead(leadData);

        // If lead has a campaign ID, fetch campaign details
        if (leadData.campaignId) {
          fetchCampaign(leadData.campaignId);
        }
      } catch (err) {
        console.error('Failed to fetch lead:', err);
        setError('Failed to load lead details. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchLead();
  }, [leadId]);

  const fetchCampaign = async (campaignId: string) => {
    try {
      setLoadingCampaign(true);
      const response = await fetch(`/api/campaigns/${campaignId}`);

      if (!response.ok) {
        throw new Error(`Error fetching campaign: ${response.status}`);
      }

      const data = await response.json();

      const campaignData = data.success && data.data
        ? data.data
        : data;

      setCampaign(campaignData);
    } catch (err) {
      console.error('Failed to fetch campaign:', err);
    } finally {
      setLoadingCampaign(false);
    }
  };

  useEffect(() => {
    async function fetchConversations() {
      if (!leadId) return;

      try {
        setLoadingConversations(true);

        const response = await fetch(`/api/leads/${leadId}/conversations`);

        if (!response.ok) {
          throw new Error(`Error fetching conversations: ${response.status}`);
        }

        const data = await response.json();

        const conversationsData = data.success && data.data
          ? data.data
          : (data.conversations || []);

        setConversations(conversationsData);
      } catch (err) {
        console.error('Failed to fetch conversations:', err);
      } finally {
        setLoadingConversations(false);
      }
    }

    if (lead) {
      fetchConversations();
    }
  }, [leadId, lead]);
  
  const handleLeadUpdate = (updatedLead: Lead) => {
    setLead(updatedLead);
    setEditedLead(updatedLead);

    if (updatedLead.campaignId && updatedLead.campaignId !== lead?.campaignId) {
      fetchCampaign(updatedLead.campaignId);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!editedLead) return;

    const { name, value } = e.target;

    setEditedLead({
      ...editedLead,
      [name]: name === 'score' || name === 'value' || name === 'priority' || name === 'confidence'
        ? (value ? parseInt(value) : undefined)
        : value,
    });
  };

  const handleAddTag = () => {
    if (!editedLead || !currentTag) return;

    const currentTags = editedLead.tags || [];

    if (!currentTags.includes(currentTag)) {
      setEditedLead({
        ...editedLead,
        tags: [...currentTags, currentTag]
      });
    }
    setCurrentTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (!editedLead) return;

    const currentTags = editedLead.tags || [];

    setEditedLead({
      ...editedLead,
      tags: currentTags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleCancel = () => {
    setEditedLead(lead);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editedLead) return;

    try {
      setIsSaving(true);

      const updateData = {
        name: editedLead.name,
        company: editedLead.company,
        email: editedLead.email,
        phone: editedLead.phone,
        position: editedLead.position,
        linkedinUrl: editedLead.linkedinUrl,
        notes: editedLead.notes,
        stage: editedLead.stage,
        tags: editedLead.tags,
        score: editedLead.score,
        value: editedLead.value,
        source: editedLead.source,
        confidence: editedLead.confidence,
        priority: editedLead.priority,
        region: editedLead.region,
        campaignId: editedLead.campaignId,
      };

      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update lead');
      }

      const responseData = await response.json();

      const updatedLead = responseData.success && responseData.data
        ? responseData.data
        : responseData;

      setLead(updatedLead);
      setEditedLead(updatedLead);
      setIsEditing(false);
      setError(null);
      toast({
        type: 'success',
        title: 'Lead updated',
        description: 'Lead information saved successfully',
        duration: 3000
      });
      if (updatedLead.campaignId && updatedLead.campaignId !== lead?.campaignId) {
        fetchCampaign(updatedLead.campaignId);
      }
    } catch (err) {
      console.error('Failed to update lead:', err);
      setError(err instanceof Error ? err.message : 'Failed to update lead');
      toast({
        type: 'error',
        title: 'Update failed',
        description: err instanceof Error ? err.message : 'Failed to update lead',
        duration: 5000
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleStageChange = async (newStage: LeadStage) => {
    try {
      setStageChanging(true);

      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stage: newStage }),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead stage');
      }

      const responseData = await response.json();

      const updatedLead = responseData.success && responseData.data
        ? responseData.data
        : responseData;

      setLead(updatedLead);
      setEditedLead(updatedLead);
      setError(null);

      toast({
        type: 'success',
        title: 'Stage updated',
        description: `Lead status changed to ${newStage.charAt(0) + newStage.slice(1).toLowerCase()}`,
        duration: 3000
      });
    } catch (err) {
      console.error('Failed to update lead stage:', err);
      setError('Failed to update lead stage. Please try again.');

      // Show error toast
      toast({
        type: 'error',
        title: 'Update failed',
        description: 'Could not change lead stage',
        duration: 5000
      });
    } finally {
      setStageChanging(false);
    }
  };

const handleSuggestionAction = async (suggestionId: string, markAsDone: boolean) => {
  try {
    const response = await fetch(`/api/leads/${leadId}/ai/suggestions/${suggestionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        done: markAsDone,
        isViewed: true
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update suggestion status');
    }

    if (lead && lead.suggestions) {
      const updatedSuggestions = lead.suggestions.map(suggestion => {
        if (suggestion.id === suggestionId) {
          return { ...suggestion, done: markAsDone, isViewed: true };
        }
        return suggestion;
      });

      setLead({
        ...lead,
        suggestions: updatedSuggestions
      });

      if (editedLead) {
        setEditedLead({
          ...editedLead,
          suggestions: updatedSuggestions
        });
      }
    }

    toast({
      type: 'success',
      title: markAsDone ? 'Suggestion marked as done' : 'Suggestion saved',
      description: markAsDone ? 'The suggestion has been completed' : 'The suggestion has been saved for later',
      duration: 3000
    });
  } catch (err) {
    console.error('Failed to update suggestion:', err);
    toast({
      type: 'error',
      title: 'Update failed',
      description: 'Could not update suggestion status',
      duration: 5000
    });
  }
};



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !lead) {
    return (
      <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
        <AlertCircle className="h-6 w-6 mb-2" />
        <h3 className="font-medium text-lg">Error loading lead</h3>
        <p>{error}</p>
        <div className="flex gap-3 mt-4">
          <Link
            href="/dashboard/leads"
            className="px-4 py-2 bg-background border border-input rounded-md"
          >
            Back to Leads
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

  if (!lead) return null;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/leads"
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back to leads</span>
          </Link>

          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {isEditing ? editedLead?.name : lead.name}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building size={14} />
              <span>{isEditing ? editedLead?.company : lead.company}</span>

              {lead.stage && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getStageColor(lead.stage)}`}>
                    {lead.stage.charAt(0) + lead.stage.slice(1).toLowerCase()}
                  </span>
                </>
              )}
              
              {lead.source && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs">
                    {getLeadSourceLabel(lead.source)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                disabled={isSaving}
              >
                <Trash2 size={18} />
                <span className="sr-only">Delete Lead</span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
                disabled={isSaving}
              >
                <Edit size={16} />
                Edit Lead
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Error message */}
      {error && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-3"
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
        </AnimatePresence>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main lead information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* AI Suggestions */}
          {lead.suggestions && lead.suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-primary">
                <LightbulbIcon size={18} />
                AI Suggested Actions
              </h2>

              <div className="space-y-4">
                {lead.suggestions.map((suggestion: Suggestion) => (
                  <div 
                    key={suggestion.id}
                    className={`p-4 border ${suggestion.done ? 'border-green-200 bg-green-50' : 'border-primary/20 bg-card'} rounded-md`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        {suggestion.done ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <LightbulbIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                        )}
                        <div>
                          <p className={`font-medium ${suggestion.done ? 'text-muted-foreground line-through' : ''}`}>
                            {suggestion.suggestion}
                          </p>
                          {suggestion.reasoning && (
                            <p className="text-sm text-muted-foreground mt-1">{suggestion.reasoning}</p>
                          )}
                        </div>
                      </div>
                      {!suggestion.done && (
                        <button
                          onClick={() => handleSuggestionAction(suggestion.id, true)}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs hover:bg-primary/20 transition-colors"
                        >
                          Mark as done
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Lead details card */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users size={18} />
              Lead Information
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Name
                  </label>
                  {isEditing ? (
                    <input
                      name="name"
                      type="text"
                      value={editedLead?.name || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                  ) : (
                    <div className="text-lg font-medium">{lead.name}</div>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Company
                  </label>
                  {isEditing ? (
                    <input
                      name="company"
                      type="text"
                      value={editedLead?.company || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                  ) : (
                    <div className="text-lg flex items-center gap-2">
                      <Building size={16} className="text-muted-foreground" />
                      {lead.company}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      name="email"
                      type="email"
                      value={editedLead?.email || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-muted-foreground" />
                      <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                        {lead.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      name="phone"
                      type="tel"
                      value={editedLead?.phone || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-muted-foreground" />
                      {lead.phone ? (
                        <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                          {lead.phone}
                        </a>
                      ) : (
                        <span className="text-muted-foreground italic">Not provided</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Position
                  </label>
                  {isEditing ? (
                    <input
                      name="position"
                      type="text"
                      value={editedLead?.position || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-muted-foreground" />
                      {lead.position ? (
                        <span>{lead.position}</span>
                      ) : (
                        <span className="text-muted-foreground italic">Not specified</span>
                      )}
                    </div>
                  )}
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    LinkedIn
                  </label>
                  {isEditing ? (
                    <input
                      name="linkedinUrl"
                      type="text"
                      value={editedLead?.linkedinUrl || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Linkedin size={16} className="text-muted-foreground" />
                      {lead.linkedinUrl ? (
                        <a
                          href={lead.linkedinUrl.startsWith('http') ? lead.linkedinUrl : `https://${lead.linkedinUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          View Profile
                          <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <span className="text-muted-foreground italic">Not provided</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Region
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe size={16} className="text-muted-foreground" />
                      </div>
                      <input
                        name="region"
                        type="text"
                        value={editedLead?.region || ''}
                        onChange={handleChange}
                        className="w-full pl-9 px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="North America, Europe, APAC, etc."
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-muted-foreground" />
                      {lead.region ? (
                        <span>{lead.region}</span>
                      ) : (
                        <span className="text-muted-foreground italic">Not specified</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Score */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Lead Score
                  </label>
                  {isEditing ? (
                    <input
                      name="score"
                      type="number"
                      min="1"
                      max="100"
                      value={editedLead?.score || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <BarChart size={16} className="text-muted-foreground" />
                      {lead.score ? (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{lead.score}/100</span>
                          {lead.score >= 70 ? (
                            <span className="px-2 py-0.5 text-xs bg-green-50 text-green-700 rounded-full">High</span>
                          ) : lead.score >= 40 ? (
                            <span className="px-2 py-0.5 text-xs bg-amber-50 text-amber-700 rounded-full">Medium</span>
                          ) : (
                            <span className="px-2 py-0.5 text-xs bg-red-50 text-red-700 rounded-full">Low</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic">Not rated</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Priority
                  </label>
                  {isEditing ? (
                    <select
                      name="priority"
                      value={editedLead?.priority || 2}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value={1}>1 - Very Low</option>
                      <option value={2}>2 - Low</option>
                      <option value={3}>3 - Medium</option>
                      <option value={4}>4 - High</option>
                      <option value={5}>5 - Very High</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <BarChart size={16} className="text-muted-foreground" />
                      {lead.priority ? (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{lead.priority}</span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(lead.priority)}`}>
                            {getPriorityLabel(lead.priority)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic">Not prioritized</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Lead Value */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Potential Value
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign size={16} className="text-muted-foreground" />
                      </div>
                      <input
                        name="value"
                        type="number"
                        min="0"
                        value={editedLead?.value || ''}
                        onChange={handleChange}
                        className="w-full pl-9 pr-4 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="5000"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-green-600" />
                      {lead.value ? (
                        <span className="font-medium">{formatCurrency(lead.value)}</span>
                      ) : (
                        <span className="text-muted-foreground italic">Not specified</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Source */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Lead Source
                  </label>
                  {isEditing ? (
                    <select
                      name="source"
                      value={editedLead?.source || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="">-- Select Source --</option>
                      <option value="LINKEDIN">LinkedIn</option>
                      <option value="COLD_EMAIL">Cold Email</option>
                      <option value="WEBSITE">Website</option>
                      <option value="REFERRAL">Referral</option>
                      <option value="CONFERENCE">Conference</option>
                      <option value="WEBINAR">Webinar</option>
                      <option value="INBOUND_CALL">Inbound Call</option>
                      <option value="OUTBOUND_CALL">Outbound Call</option>
                      <option value="SOCIAL_MEDIA">Social Media</option>
                      <option value="PARTNER">Partner</option>
                      <option value="OTHER">Other</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-muted-foreground" />
                      {lead.source ? (
                        <span>{getLeadSourceLabel(lead.source)}</span>
                      ) : (
                        <span className="text-muted-foreground italic">Not specified</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Campaign association */}
              {(lead.campaignId || isEditing) && (
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Associated Campaign
                  </label>
                  {isEditing ? (
                    <select
                      name="campaignId"
                      value={editedLead?.campaignId || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="">-- No Campaign --</option>
                      {/* This would need to be populated with actual campaigns */}
                      {campaign && (
                        <option value={campaign.id}>{campaign.name}</option>
                      )}
                    </select>
                  ) : (
                    <div>
                      {loadingCampaign ? (
                        <div className="animate-pulse h-6 w-32 bg-muted rounded"></div>
                      ) : campaign ? (
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-primary" />
                          <span className="font-medium">{campaign?.name || "Unnamed Campaign"}</span>
                          {campaign?.status && (
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getCampaignStatusColor(campaign.status)}`}>
                              {campaign.status.charAt(0) + campaign.status.slice(1).toLowerCase()}
                            </span>
                          )}
                          <Link
                            href={`/dashboard/campaigns/${campaign.id}`}
                            className="ml-auto text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            View Campaign
                            <ArrowUpRight size={12} />
                          </Link>
                        </div>
                      ) : lead.campaignId ? (
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Campaign ID: {lead.campaignId}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground italic">Not associated with any campaign</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Confidence */}
              {(lead.confidence !== undefined || isEditing) && (
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Confidence Score
                  </label>
                  {isEditing ? (
                    <input
                      name="confidence"
                      type="number"
                      min="1"
                      max="100"
                      value={editedLead?.confidence || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{lead.confidence}%</span>
                        <span className="text-xs text-muted-foreground">
                          {(lead.confidence ?? 0) >= 70 ? 'High' : (lead.confidence ?? 0) >= 40 ? 'Medium' : 'Low'} confidence
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            (lead.confidence ?? 0) >= 70 ? 'bg-green-500' : 
                            (lead.confidence ?? 0) >= 40 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(lead.confidence || 0, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Notes
                </label>
                {isEditing ? (
                  <textarea
                    name="notes"
                    value={editedLead?.notes || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    rows={3}
                  />
                ) : (
                  <div className="bg-muted/30 p-3 rounded-md min-h-[80px]">
                    {lead.notes ? lead.notes : <span className="text-muted-foreground italic">No notes</span>}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Tags
                </label>
                {isEditing ? (
                  <div>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {(editedLead?.tags || []).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="rounded-full hover:bg-primary/20 p-0.5"
                          >
                            <span className="sr-only">Remove</span>
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        className="flex-grow px-3 py-2 border border-input bg-background rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Add tags..."
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-3 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 flex-wrap">
                    {lead.tags && lead.tags.length > 0 ? (
                      lead.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-sm flex items-center gap-1"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted-foreground italic">No tags</span>
                    )}
                  </div>
                )}
              </div>

              {/* Additional information */}
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Created:</span>{' '}
                    <span>{formatDate(lead.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock10 size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Last Updated:</span>{' '}
                    <span>{formatDate(lead.updatedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Last Activity:</span>{' '}
                    <span>{formatDate(lead.lastActivity)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Last Contacted:</span>{' '}
                    <span>{formatDate(lead.lastContactedDate ?? undefined)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card border border-border rounded-lg shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MessageCircle size={18} />
                Conversations
              </h2>
              <Link
                href={`/dashboard/conversations/new?leadId=${leadId}`}
                className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md flex items-center gap-1.5 text-sm hover:bg-primary/90 transition-colors"
              >
                <Plus size={14} />
                New Conversation
              </Link>
            </div>

            {loadingConversations ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-border rounded-md bg-muted/30">
                <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium mb-1">No conversations yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Start a conversation to keep track of your communications
                </p>
                <Link
                  href={`/dashboard/conversations/new?leadId=${leadId}`}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <Plus size={16} />
                  Start Conversation
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {conversations.map((conversation) => (
                  <Link
                    key={conversation.id}
                    href={`/dashboard/conversations/${conversation.id}`}
                    className="block p-4 border border-border rounded-md hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {getConversationTypeIcon(conversation.type)}
                        <span className="font-medium">
                          {conversation.subject || conversation.type.charAt(0) + conversation.type.slice(1).toLowerCase()}
                        </span>

                        {conversation.hasFollowUp && (
                          <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                            <Clock size={12} />
                            Follow-up
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-muted-foreground">
                        {new Date(conversation.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {conversation.content}
                    </p>

                    <div className="mt-2 flex justify-end">
                      <div className="text-xs text-primary flex items-center gap-1">
                        View Details
                        <ArrowUpRight size={12} />
                      </div>
                    </div>
                  </Link>
                ))}

                {conversations.length > 0 && (
                  <div className="pt-2 flex justify-center">
                    <Link
                      href={`/dashboard/leads/${leadId}/conversations`}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      View all conversations
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-card border border-border rounded-lg shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <ListTodo size={18} />
                Tasks
              </h2>
              <Link
                href={`/dashboard/tasks/new?leadId=${leadId}`}
                className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md flex items-center gap-1.5 text-sm hover:bg-primary/90 transition-colors"
              >
                <Plus size={14} />
                New Task
              </Link>
            </div>

            {lead.tasks && lead.tasks.length > 0 ? (
              <div className="space-y-4">
                {lead.tasks.map((task: Task) => (
                  <Link
                    key={task.id}
                    href={`/dashboard/tasks/${task.id}`}
                    className="block p-4 border border-border rounded-md hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {task.status === "PENDING" && <Clock className="h-4 w-4 text-amber-500" />}
                        {task.status === "IN_PROGRESS" && <Clock className="h-4 w-4 text-blue-500" />}
                        {task.status === "COMPLETED" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                        {task.status === "CANCELLED" && <XCircle className="h-4 w-4 text-gray-500" />}
                        <span className="font-medium">
                          {task.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full 
                          ${task.priority === 3 ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                            task.priority === 2 ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
                              "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"}`}>
                          {task.priority === 3 ? "High" : task.priority === 2 ? "Medium" : "Low"}
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    {task.description && (
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {task.description}
                      </p>
                    )}
                  </Link>
                ))}

                {lead.tasks.length > 3 && (
                  <div className="pt-2 flex justify-center">
                    <Link
                      href={`/dashboard/leads/${leadId}/tasks`}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      View all tasks
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-border rounded-md bg-muted/30">
                <ListTodo className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <h3 className="font-medium mb-1">No tasks yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Create tasks to keep track of follow-ups and actions
                </p>
                <Link
                  href={`/dashboard/tasks/new?leadId=${leadId}`}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <Plus size={16} />
                  Create Task
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>

        <div className="space-y-6">
          <LeadStageComponent
            lead={lead}
            stageChanging={stageChanging}
            handleStageChange={handleStageChange}
            getStageColor={getStageColor}
          />

          <LeadSidebar
            lead={lead}
            isEditing={isEditing}
            getCampaignStatusColor={getCampaignStatusColor}
            onLeadUpdate={handleLeadUpdate}
          />
        </div>
      </div>

      {showDeleteConfirm && (
        <DeleteLeadConfirmation
          leadId={leadId}
          leadName={lead.name}
          companyName={lead.company}
          onClose={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}