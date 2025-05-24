"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Edit,
  Trash2,
  UserPlus,
  Loader2,
  AlertCircle,
  Users,
  ListChecks,
  Mail,
  Play,
  MessageSquare,
  Clock,
  Timer,
  Building,
  Info,
  MoreHorizontal,
  ToggleLeft,
  ToggleRight,
  PlusCircle
} from "lucide-react";

// Types for our data
interface CampaignStep {
  id: string;
  type: 'EMAIL' | 'CALL' | 'LINKEDIN_MESSAGE' | 'WAIT' | 'TASK';
  content?: string;
  templateId?: string | null;
  waitDays: number;
  order: number;
  conditions?: any;
  createdAt: string;
  updatedAt: string;
  template?: any | null;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  position?: string;
  stage: string;
  createdAt: string;
}

interface Campaign {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  stats?: any | null;
  createdAt: string;
  updatedAt: string;
  steps: CampaignStep[];
  leads: Lead[];
}

export default function CampaignDetailPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'leads'>('overview');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch campaign details
  useEffect(() => {
    async function fetchCampaign() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/campaigns/${campaignId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch campaign: ${response.status}`);
        }

        const data = await response.json();
        const campaignData = data.success && data.data
          ? data.data
          : data;

        setCampaign(campaignData);
      } catch (err) {
        console.error("Error fetching campaign:", err);
        setError("Failed to load campaign details. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCampaign();
  }, [campaignId]);

  // Toggle campaign active status
  const handleToggleActive = async () => {
    if (!campaign) return;

    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !campaign.isActive }),
      });

      if (!response.ok) {
        throw new Error('Failed to update campaign status');
      }

      const data = await response.json();
      const updatedCampaign = data.success && data.data
        ? data.data
        : data;

      setCampaign(updatedCampaign);
    } catch (err) {
      console.error("Error updating campaign status:", err);
      setError("Failed to update campaign status. Please try again.");
    }
  };

  // Delete the campaign
  const handleDeleteCampaign = async () => {
    try {
      setIsDeleting(true);

      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete campaign');
      }

      router.push('/dashboard/campaigns');
    } catch (err) {
      console.error("Error deleting campaign:", err);
      setError("Failed to delete campaign. Please try again.");
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper function to get step type icon
  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'EMAIL':
        return <Mail size={16} className="text-blue-500" />;
      case 'CALL':
        return <MessageSquare size={16} className="text-purple-500" />;
      case 'LINKEDIN_MESSAGE':
        return <MessageSquare size={16} className="text-cyan-500" />;
      case 'WAIT':
        return <Clock size={16} className="text-amber-500" />;
      case 'TASK':
        return <ListChecks size={16} className="text-green-500" />;
      default:
        return <Info size={16} className="text-gray-500" />;
    }
  };

  // Helper function for readable step type
  const getReadableStepType = (type: string) => {
    switch (type) {
      case 'EMAIL':
        return 'Email';
      case 'CALL':
        return 'Call';
      case 'LINKEDIN_MESSAGE':
        return 'LinkedIn Message';
      case 'WAIT':
        return 'Wait';
      case 'TASK':
        return 'Task';
      default:
        return type;
    }
  };

  // Get the stage color based on stage name
  const getStageColor = (stage: string) => {
    switch (stage.toUpperCase()) {
      case 'NEW':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'CONTACTED':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'QUALIFIED':
        return 'text-cyan-600 bg-cyan-50 border-cyan-200';
      case 'PROPOSAL':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'NEGOTIATION':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'CONVERTED':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'LOST':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !campaign) {
    return (
      <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
        <AlertCircle className="h-6 w-6 mb-2" />
        <h3 className="font-medium text-lg">Error loading campaign</h3>
        <p>{error}</p>
        <div className="flex gap-3 mt-4">
          <Link
            href="/dashboard/campaigns"
            className="px-4 py-2 bg-background border border-input rounded-md"
          >
            Back to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  if (!campaign) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/campaigns"
            className="p-2 rounded-full hover:bg-accent shrink-0"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back to campaigns</span>
          </Link>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {campaign.name}
              </h1>
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${campaign.isActive
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                  }`}
              >
                {campaign.isActive ? 'Active' : 'Paused'}
              </span>
            </div>
            <p className="text-muted-foreground mt-1">
              {campaign.description || 'No description provided'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <button
            onClick={handleToggleActive}
            className={`px-3 py-2 rounded-md flex items-center gap-1.5 text-sm ${campaign.isActive
                ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              } flex-grow sm:flex-grow-0`}
          >
            {campaign.isActive ? (
              <>
                <ToggleLeft size={18} />
                <span className="whitespace-nowrap">Pause Campaign</span>
              </>
            ) : (
              <>
                <ToggleRight size={18} />
                <span className="whitespace-nowrap">Activate Campaign</span>
              </>
            )}
          </button>

          <div className="flex gap-2 ml-auto sm:ml-0">
            <Link
              href={`/dashboard/campaigns/${campaignId}/edit`}
              className="p-2 rounded-md hover:bg-accent"
            >
              <Edit size={18} />
              <span className="sr-only">Edit Campaign</span>
            </Link>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-destructive hover:bg-destructive/10 rounded-md"
            >
              <Trash2 size={18} />
              <span className="sr-only">Delete Campaign</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-1 py-3 font-medium text-sm border-b-2 ${activeTab === 'overview'
                ? 'border-primary text-primary'
                : 'border-transparent hover:border-muted hover:text-foreground/80'
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-1 py-3 font-medium text-sm border-b-2 flex items-center gap-1 ${activeTab === 'steps'
                ? 'border-primary text-primary'
                : 'border-transparent hover:border-muted hover:text-foreground/80'
              }`}
          >
            Steps
            <span className="bg-muted rounded-full px-1.5 py-0.5 text-xs">
              {campaign.steps.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-1 py-3 font-medium text-sm border-b-2 flex items-center gap-1 ${activeTab === 'leads'
                ? 'border-primary text-primary'
                : 'border-transparent hover:border-muted hover:text-foreground/80'
              }`}
          >
            Leads
            <span className="bg-muted rounded-full px-1.5 py-0.5 text-xs">
              {campaign.leads.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campaign stats */}
            <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Campaign Summary</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">Created</p>
                  <p className="font-medium">{formatDate(campaign.createdAt)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Last Updated</p>
                  <p className="font-medium">{formatDate(campaign.updatedAt)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Status</p>
                  <p className="font-medium">
                    {campaign.isActive ? 'Active' : 'Paused'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Steps</p>
                  <p className="font-medium">{campaign.steps.length}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-muted-foreground text-sm mb-2">Leads in Campaign</p>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{campaign.leads.length}</div>

                  <Link
                    href={`/dashboard/campaigns/${campaignId}/leads/add`}
                    className="ml-auto text-sm text-primary flex items-center gap-1 hover:underline"
                  >
                    <UserPlus size={14} />
                    Add Leads
                  </Link>
                </div>
              </div>

              {/* If you have campaign stats */}
              {campaign.stats && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-medium mb-4">Performance</h4>
                  {/* Display stats accordingly */}
                </div>
              )}
            </div>

            {/* Recent activity */}
            <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Campaign Steps</h3>

              {campaign.steps.length === 0 ? (
                <div className="text-center py-6">
                  <ListChecks size={32} className="mx-auto text-muted-foreground/30 mb-2" />
                  <p className="text-muted-foreground mb-4">No steps in this campaign yet</p>
                  <Link
                    href={`/dashboard/campaigns/${campaignId}/edit`}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-1.5"
                  >
                    <PlusCircle size={15} />
                    Add Steps
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {campaign.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-start gap-3 p-3 border border-border rounded-md"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-xs font-medium">
                        {index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getStepTypeIcon(step.type)}
                          <span className="font-medium">
                            {getReadableStepType(step.type)}
                          </span>

                          {step.type === 'WAIT' && (
                            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                              {step.waitDays} {step.waitDays === 1 ? 'day' : 'days'} wait
                            </span>
                          )}
                        </div>

                        {step.content && (
                          <p className="text-sm text-muted-foreground truncate">
                            {step.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Steps Tab */}
        {activeTab === 'steps' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Campaign Steps</h2>
              <Link
                href={`/dashboard/campaigns/${campaignId}/edit`}
                className="px-3 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-1.5 text-sm"
              >
                <PlusCircle size={16} />
                Edit Steps
              </Link>
            </div>

            {campaign.steps.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-md bg-muted/30">
                <ListChecks size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="font-medium mb-1">No steps in this campaign</h3>
                <p className="text-muted-foreground mb-6">
                  Add steps to define the sequence of actions for your campaign
                </p>
                <Link
                  href={`/dashboard/campaigns/${campaignId}/edit`}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-1.5"
                >
                  <PlusCircle size={16} />
                  Add Steps
                </Link>
              </div>
            ) : (
              <div className="relative pl-8 border-l border-border">
                {campaign.steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="mb-8 relative"
                  >
                    {/* Step number indicator */}
                    <div className="absolute -left-14 bg-card border border-border rounded-full w-7 h-7 flex items-center justify-center text-xs">
                      {index + 1}
                    </div>

                    {/* Step details */}
                    <div className="bg-card border border-border p-5 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          {getStepTypeIcon(step.type)}
                          <h3 className="font-medium">
                            {getReadableStepType(step.type)}
                            {step.type === 'WAIT' && (
                              <span className="ml-2 text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                                {step.waitDays} {step.waitDays === 1 ? 'day' : 'days'} wait
                              </span>
                            )}
                          </h3>
                        </div>

                        <button className="p-1.5 hover:bg-accent rounded-md">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      {step.content && (
                        <div className="p-3 bg-muted/30 rounded-md mb-3">
                          <p className="text-sm whitespace-pre-wrap">
                            {step.content}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Added: {formatDate(step.createdAt)}</span>

                        {step.templateId && (
                          <span className="bg-primary/5 text-primary px-1.5 py-0.5 rounded text-xs">
                            Using template
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Campaign Leads</h2>
              <Link
                href={`/dashboard/campaigns/${campaignId}/leads/add`}
                className="px-3 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-1.5 text-sm"
              >
                <UserPlus size={16} />
                Add Leads
              </Link>
            </div>

            {campaign.leads.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-md bg-muted/30">
                <Users size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="font-medium mb-1">No leads in this campaign</h3>
                <p className="text-muted-foreground mb-6">
                  Add leads to start engaging with them through this campaign
                </p>
                <Link
                  href={`/dashboard/campaigns/${campaignId}/leads/add`}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-1.5"
                >
                  <UserPlus size={16} />
                  Add Leads
                </Link>
              </div>
            ) : (
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="grid grid-cols-[1fr,1fr,auto,auto] gap-4 p-4 bg-muted/50 text-sm font-medium border-b border-border">
                  <div>Name</div>
                  <div>Company</div>
                  <div>Stage</div>
                  <div className="text-right">Actions</div>
                </div>

                {campaign.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="grid grid-cols-[1fr,1fr,auto,auto] gap-4 p-4 border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="font-medium hover:text-primary hover:underline"
                      >
                        {lead.name}
                      </Link>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building size={14} className="text-muted-foreground" />
                      {lead.company}
                    </div>
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStageColor(lead.stage)}`}>
                        {lead.stage.charAt(0) + lead.stage.slice(1).toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="p-1.5 hover:bg-accent rounded-md"
                      >
                        <Info size={16} />
                        <span className="sr-only">View Lead</span>
                      </Link>
                      <button
                        className="p-1.5 hover:bg-destructive/10 text-destructive rounded-md"
                        title="Remove from campaign"
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Remove from campaign</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <h3 className="text-lg font-medium mb-2">Delete Campaign</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to delete "{campaign.name}"? This action cannot be undone and will remove all associated campaign data.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-input rounded-md"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCampaign}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Campaign
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}