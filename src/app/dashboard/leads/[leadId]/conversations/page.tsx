"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  MessageCircle,
  ArrowLeft,
  Search,
  Phone,
  Mail,
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  ChevronRight,
  Plus,
  User,
  Building,
  Linkedin,
  MessageSquare
} from "lucide-react";
import LeadSidebar from '@/components/leads/LeadSidebar';
import { useToast } from "@/components/ui/toast/ToastContext";
import { formatDate, getStageColor, getCampaignStatusColor, getTypeIcon, getTypeBadgeClass } from "@/utils/styleHelpers";
import { Lead, LeadStage, Conversation, ConversationType } from "@/types/lead";

export default function LeadConversationsPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.leadId as string;
  const { toast } = useToast();

  const [lead, setLead] = useState<Lead | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ConversationType | undefined>(undefined);
  const [stageChanging, setStageChanging] = useState<boolean>(false);

  // Fetch lead details and conversations
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch lead details
        const leadResponse = await fetch(`/api/leads/${leadId}`);

        if (!leadResponse.ok) {
          throw new Error(`Error fetching lead: ${leadResponse.status}`);
        }

        const leadData = await leadResponse.json();
        const leadDetails = leadData.success && leadData.data ? leadData.data : leadData;

        setLead(leadDetails);

        // Fetch all conversations for this lead
        const params = new URLSearchParams();
        if (selectedType) {
          params.set('type', selectedType);
        }

        const conversationsResponse = await fetch(`/api/leads/${leadId}/conversations?${params.toString()}`);

        if (!conversationsResponse.ok) {
          throw new Error(`Error fetching conversations: ${conversationsResponse.status}`);
        }

        const conversationsData = await conversationsResponse.json();

        const conversationsResult = conversationsData.success && conversationsData.data
          ? conversationsData.data
          : (conversationsData.conversations || []);

        setConversations(conversationsResult);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [leadId, selectedType]);

  // Handler for lead stage change
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

  // Handler for lead updates from sidebar
  const handleLeadUpdate = (updatedLead: Lead) => {
    setLead(updatedLead);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
        <AlertCircle className="h-6 w-6 mb-2" />
        <h3 className="font-medium text-lg">Error loading data</h3>
        <p>{error || "Could not load lead data"}</p>
        <div className="flex gap-3 mt-4">
          <Link
            href={`/dashboard/leads/${leadId}`}
            className="px-4 py-2 bg-background border border-input rounded-md"
          >
            Back to Lead
          </Link>
          <button
            onClick={() => router.refresh()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Define conversation types as a constant array
  const conversationTypes: ConversationType[] = ['EMAIL', 'CALL', 'MEETING', 'NOTE', 'LINKEDIN', 'OTHER'];

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
            href={`/dashboard/leads/${leadId}`}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back to lead</span>
          </Link>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={14} />
              <span>{lead.name}</span>
              <span>•</span>
              <Building size={14} />
              <span>{lead.company}</span>
            </div>
          </div>
        </div>

        <Link
          href={`/dashboard/conversations/new?leadId=${leadId}`}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          New Conversation
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2 bg-card border border-border rounded-md p-4">
            <button
              onClick={() => setSelectedType(undefined)}
              className={`px-3 py-1.5 rounded-md text-sm ${!selectedType
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
                }`}
            >
              All Types
            </button>

            {conversationTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${selectedType === type
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                  }`}
              >
                {getTypeIcon(type)}
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Conversations list */}
          <div className="bg-card border border-border rounded-md shadow-sm overflow-hidden">
            {conversations.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">No conversations found</h3>
                <p className="text-muted-foreground mb-4">
                  {selectedType
                    ? `No ${selectedType.toLowerCase()} conversations found`
                    : "There are no conversations with this lead yet"}
                </p>
                <Link
                  href={`/dashboard/conversations/new?leadId=${leadId}`}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-2"
                >
                  <Plus size={16} />
                  Start Conversation
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {conversations.map((conversation) => (
                  <Link
                    key={conversation.id}
                    href={`/dashboard/leads/${leadId}/conversations/${conversation.id}`}
                    className="block p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${getTypeBadgeClass(conversation.type)}`}>
                          {getTypeIcon(conversation.type)}
                          <span className="ml-1">{conversation.type}</span>
                        </span>

                        <span className="text-muted-foreground text-sm">
                          {formatDate(conversation.createdAt)}
                        </span>

                        {conversation.hasFollowUp && (
                          <span className="inline-flex items-center text-xs text-amber-600 font-medium">
                            <Clock className="h-3 w-3 mr-1" />
                            Follow-up
                          </span>
                        )}
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <h3 className="font-medium">
                      {conversation.subject || `${conversation.type.charAt(0) + conversation.type.slice(1).toLowerCase()}`}
                    </h3>

                    <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {conversation.content}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar with actions */}
        <div>
          {lead && (
            <LeadSidebar
              lead={lead}
              isEditing={false}
              getCampaignStatusColor={getCampaignStatusColor}
              onLeadUpdate={handleLeadUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}