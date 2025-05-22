"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  Mail,
  Clock,
  Users,
  LinkIcon,
  LightbulbIcon,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { useToast } from "@/components/ui/toast/ToastContext";
import AISuggestions from "@/components/ai/AiSuggestions";
import AIEmailGenerator from "@/components/ai/AiEmailGenerator";
import CampaignSelector from "@/components/campaigns/CampaignSelector";
import FollowupScheduler from "@/components/leads/FollowupScheduler";
import RealtimeNotifications from "@/components/notifications/RealtimeNotifications";
import { Campaign, Lead, Suggestion } from "@/types/lead";

interface LeadSidebarProps {
  lead: Lead;
  isEditing: boolean;
  getCampaignStatusColor: (status: string) => string;
  onLeadUpdate: (updatedLead: Lead) => void;
}

const LeadSidebar = ({
  lead,
  isEditing,
  getCampaignStatusColor,
  onLeadUpdate,
}: LeadSidebarProps) => {
  const { toast } = useToast();
  const leadId = lead.id;
  
  // Track the current lead state locally to ensure UI updates
  const [currentLead, setCurrentLead] = useState<Lead>(lead);

  // Update local state when lead prop changes
  useEffect(() => {
    setCurrentLead(lead);
  }, [lead]);

  // States for quick actions
  const [showEmailGenerator, setShowEmailGenerator] = useState(false);
  const [showCampaignSelector, setShowCampaignSelector] = useState(false);
  const [showFollowupScheduler, setShowFollowupScheduler] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingAllCampaigns, setLoadingAllCampaigns] = useState(false);
  const [followupDate, setFollowupDate] = useState<string>('');
  const [followupNote, setFollowupNote] = useState<string>('');
  const [savingFollowup, setSavingFollowup] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllCampaigns = async () => {
    try {
      setLoadingAllCampaigns(true);
      const response = await fetch(`/api/campaigns`);

      if (!response.ok) {
        throw new Error(`Error fetching campaigns: ${response.status}`);
      }

      const data = await response.json();

      const campaignsData = data.success && data.data
        ? data.data
        : data;

      setCampaigns(campaignsData);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
      setError('Failed to load campaigns. Please try again.');
    } finally {
      setLoadingAllCampaigns(false);
    }
  };

  const handleAssignCampaign = async (campaignId: string | null) => {
    try {
      setIsSaving(true);
      
      const requestBody = {
        campaignId: campaignId || null 
      };

      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead campaign');
      }

      const responseData = await response.json();

      const updatedLead = responseData.success && responseData.data
        ? responseData.data
        : responseData;

      setShowCampaignSelector(false);
      
      toast({
        type: 'success',
        title: 'Campaign updated',
        description: campaignId 
          ? 'Lead successfully added to campaign' 
          : 'Lead removed from campaign',
        duration: 3000
      });

      setCurrentLead(updatedLead);
      
      onLeadUpdate(updatedLead);
    } catch (err) {
      console.error('Failed to update lead campaign:', err);
      setError(err instanceof Error ? err.message : 'Failed to update lead campaign. Please try again.');
      toast({
        type: 'error',
        title: 'Update failed',
        description: err instanceof Error ? err.message : 'Failed to update lead campaign',
        duration: 5000
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleScheduleFollowup = async () => {
    try {
      setSavingFollowup(true);
      setError(null);

      const formattedDate = new Date(followupDate).toISOString();

      const followupData = {
        leadId,
        followUpDate: formattedDate, 
        note: followupNote,
        type: 'FOLLOWUP',
        title: `Follow up with ${currentLead?.name}`,
        status: 'PENDING',
        priority: 2,
        dueDate: formattedDate, // Use properly formatted ISO date
        description: followupNote || `Follow up with ${currentLead?.name}`
      };

      const response = await fetch(`/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followupData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to schedule follow-up');
      }

      // Get the created task from the response
      const taskData = await response.json();
      const newTask = taskData.success && taskData.data 
        ? taskData.data 
        : taskData;

      const leadResponse = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nextContactDate: formattedDate 
        }),
      });

      if (!leadResponse.ok) {
        throw new Error('Failed to update lead contact date');
      }

      const leadData = await leadResponse.json();
      const updatedLead = leadData.success && leadData.data
        ? leadData.data
        : leadData;

      setFollowupDate('');
      setFollowupNote('');
      setShowFollowupScheduler(false);
      
      toast({
        type: 'success',
        title: 'Follow-up scheduled',
        description: `Follow-up scheduled for ${new Date(formattedDate).toLocaleDateString()}`,
        duration: 3000
      });

      const leadWithNewTask = {
        ...updatedLead,
        tasks: currentLead.tasks 
          ? [...currentLead.tasks, newTask] 
          : [newTask]
      };

      setCurrentLead(leadWithNewTask);
      
      onLeadUpdate(leadWithNewTask);
    } catch (err) {
      console.error('Failed to schedule follow-up:', err);
      setError(err instanceof Error ? err.message : 'Failed to schedule follow-up. Please try again.');
      toast({
        type: 'error',
        title: 'Scheduling failed',
        description: err instanceof Error ? err.message : 'Failed to schedule follow-up',
        duration: 5000
      });
    } finally {
      setSavingFollowup(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-6"
      >
        {/* AI Suggestions component */}
        <AISuggestions
          leadId={leadId}
          initialSuggestions={currentLead.suggestions || []}
        />

        {/* Realtime Notifications */}
        <RealtimeNotifications 
          entityId={leadId} 
          entityType="lead" 
          limit={5}
        />

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Sparkles size={18} />
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link
              href={`/dashboard/conversations/new?leadId=${leadId}`}
              className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <MessageCircle size={16} />
              Start Conversation
            </Link>

            <button
              onClick={() => setShowEmailGenerator(true)}
              className="w-full px-3 py-2 border border-input bg-background rounded-md flex items-center justify-center gap-2 hover:bg-muted transition-colors"
            >
              <Sparkles size={14} className="text-amber-500" />
              <Mail size={16} />
              AI Email Draft
            </button>

            <button
              onClick={() => {
                setShowFollowupScheduler(true);
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setFollowupDate(tomorrow.toISOString().split('T')[0]);
              }}
              className="w-full px-3 py-2 border border-input bg-background rounded-md flex items-center justify-center gap-2 hover:bg-muted transition-colors"
            >
              <Clock size={16} />
              Schedule Follow-up
            </button>

            {currentLead.campaignId ? (
              <Link
                href={`/dashboard/campaigns/${currentLead.campaignId}`}
                className="w-full px-3 py-2 border border-input bg-background rounded-md flex items-center justify-center gap-2 hover:bg-muted transition-colors"
              >
                <Users size={16} />
                View Campaign
              </Link>
            ) : (
              <button
                onClick={() => {
                  fetchAllCampaigns();
                  setShowCampaignSelector(true);
                }}
                className="w-full px-3 py-2 border border-input bg-background rounded-md flex items-center justify-center gap-2 hover:bg-muted transition-colors"
              >
                <Users size={16} />
                Add to Campaign
              </button>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <LinkIcon size={18} />
            Related Actions
          </h3>
          <div className="space-y-4">
            <Link
              href={`/dashboard/leads/${leadId}/ai/suggestions`}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <LightbulbIcon className="h-4 w-4" />
              View all AI suggestions
            </Link>
            <Link
              href={`/dashboard/leads/${leadId}/ai/email`}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              Generate AI emails
            </Link>
            <Link
              href={`/dashboard/leads/${leadId}/tasks`}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <CheckCircle2 className="h-4 w-4" />
              View tasks
            </Link>
            <Link
              href={`/dashboard/leads/${leadId}/conversations`}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              All conversations
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Modal components */}
      {showEmailGenerator && (
        <AIEmailGenerator
          leadId={leadId}
          leadName={currentLead.name}
          leadEmail={currentLead.email}
          onClose={() => setShowEmailGenerator(false)}
          onGenerate={(content: string) => {
            // Handle generated email content if needed
            setShowEmailGenerator(false);
          }}
        />
      )}
      
      {showCampaignSelector && (
        <CampaignSelector
          leadName={currentLead.name}
          campaigns={campaigns}
          loading={loadingAllCampaigns}
          onAssignCampaign={handleAssignCampaign}
          onClose={() => setShowCampaignSelector(false)}
          isAssigning={isSaving}
          getCampaignStatusColor={getCampaignStatusColor}
          currentCampaignId={currentLead.campaignId}
        />
      )}

      {showFollowupScheduler && (
        <FollowupScheduler
          followupDate={followupDate}
          followupNote={followupNote}
          onDateChange={setFollowupDate}
          onNoteChange={setFollowupNote}
          onSchedule={handleScheduleFollowup}
          onClose={() => setShowFollowupScheduler(false)}
          isSaving={savingFollowup}
          error={error}
        />
      )}
    </>
  );
};

export default LeadSidebar;