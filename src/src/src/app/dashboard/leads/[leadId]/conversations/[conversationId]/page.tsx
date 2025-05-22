"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { 
  MessageCircle, 
  ArrowLeft,
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Loader2, 
  AlertCircle,
  User,
  Building,
  Edit,
  Trash2,
  Linkedin,
  MessageSquare,
  CheckCircle2
} from "lucide-react";
import LeadSidebar from '@/components/leads/LeadSidebar';
import { useToast } from "@/components/ui/toast/ToastContext";
import { formatDate, getStageColor, getCampaignStatusColor } from "@/utils/styleHelpers";
import { Lead as LeadType, LeadStage } from "@/types/lead";

type ConversationType = 'EMAIL' | 'CALL' | 'MEETING' | 'NOTE' | 'LINKEDIN' | 'OTHER';

interface Conversation {
  id: string;
  leadId: string;
  type: ConversationType;
  content: string;
  subject?: string;
  sentiment?: string;
  hasFollowUp: boolean;
  followUp?: string;
  followUpDone?: boolean;
  attachment?: string;
  createdAt: string;
  updatedAt: string;
}

interface Lead extends LeadType {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
}

export default function LeadConversationPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.leadId as string;
  const conversationId = params.conversationId as string;
  const { toast } = useToast();
  
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [stageChanging, setStageChanging] = useState<boolean>(false);
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch conversation details
        const conversationResponse = await fetch(`/api/leads/${leadId}/conversations/${conversationId}`);
        
        if (!conversationResponse.ok) {
          throw new Error(`Error fetching conversation: ${conversationResponse.status}`);
        }
        
        const conversationData = await conversationResponse.json();
        const conversation = conversationData.success && conversationData.data 
          ? conversationData.data 
          : conversationData;
        
        setConversation(conversation);
        
        // Fetch lead details
        const leadResponse = await fetch(`/api/leads/${leadId}`);
        
        if (!leadResponse.ok) {
          throw new Error(`Error fetching lead: ${leadResponse.status}`);
        }
        
        const leadData = await leadResponse.json();
        const lead = leadData.success && leadData.data ? leadData.data : leadData;
        
        setLead(lead);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [leadId, conversationId]);
  
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

      setLead(updatedLead as Lead);
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
  const handleLeadUpdate = (updatedLead: LeadType) => {
    setLead(updatedLead as Lead);
  };

  const handleMarkFollowUpComplete = async () => {
    if (!conversation) return;
    
    try {
      const response = await fetch(`/api/leads/${leadId}/conversations/${conversationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followUpDone: true,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update follow-up status');
      }
      
      setConversation({
        ...conversation,
        followUpDone: true,
      });
    } catch (err) {
      console.error('Error updating follow-up status:', err);
      // Show error notification
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/leads/${leadId}/conversations/${conversationId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete conversation');
      }
      
      // Redirect back to conversations list
      router.push(`/dashboard/leads/${leadId}/conversations`);
    } catch (err) {
      console.error('Error deleting conversation:', err);
      // Show error notification
    }
  };
  
  const getTypeIcon = (type: ConversationType) => {
    switch (type) {
      case 'EMAIL':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'CALL':
        return <Phone className="h-5 w-5 text-purple-500" />;
      case 'MEETING':
        return <Calendar className="h-5 w-5 text-amber-500" />;
      case 'NOTE':
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      case 'LINKEDIN':
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      case 'OTHER':
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !conversation || !lead) {
    return (
      <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
        <AlertCircle className="h-6 w-6 mb-2" />
        <h3 className="font-medium text-lg">Error loading data</h3>
        <p>{error || "Could not load conversation or lead data"}</p>
        <div className="flex gap-3 mt-4">
          <Link 
            href={`/dashboard/leads/${leadId}/conversations`}
            className="px-4 py-2 bg-background border border-input rounded-md"
          >
            Back to Conversations
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
            href={`/dashboard/leads/${leadId}/conversations`}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back to conversations</span>
          </Link>
          
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {getTypeIcon(conversation.type)}
              {conversation.subject || `${conversation.type.charAt(0) + conversation.type.slice(1).toLowerCase()}`}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={14} />
              <span>{lead.name}</span>
              <span>•</span>
              <Building size={14} />
              <span>{lead.company}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link
            href={`/dashboard/leads/${leadId}/conversations/${conversationId}/edit`}
            className="px-3 py-1.5 border border-input rounded-md flex items-center gap-1.5 hover:bg-accent"
          >
            <Edit size={14} />
            Edit
          </Link>
          
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-1.5  text-destructive rounded-md flex items-center gap-1.5 hover:bg-destructive/10"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Main conversation content - Now in 1/3 of the grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-muted-foreground">
                  {formatDate(conversation.createdAt)}
                </span>
              </div>
              
              {conversation.sentiment && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  conversation.sentiment === 'positive' ? 'bg-green-50 text-green-600' :
                  conversation.sentiment === 'negative' ? 'bg-red-50 text-red-600' :
                  'bg-gray-50 text-gray-600'
                }`}>
                  {conversation.sentiment.charAt(0).toUpperCase() + conversation.sentiment.slice(1)}
                </span>
              )}
            </div>
            
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap">{conversation.content}</div>
            </div>
          </div>
          
          {/* Follow-up info */}
          {conversation.hasFollowUp && (
            <div className="bg-card border border-amber-200 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-amber-500" />
                  Follow-up Required
                </h3>
                
                {conversation.followUpDone ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle2 size={14} />
                    Completed
                  </span>
                ) : (
                  <button 
                    onClick={handleMarkFollowUpComplete}
                    className="text-primary text-sm hover:underline"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
              
              {conversation.followUp && (
                <p className="text-sm">
                  Due by: {formatDate(conversation.followUp)}
                </p>
              )}
            </div>
          )}
        </div>
        
        {/* Right sidebar - LeadSidebar component */}
        <div className="space-y-6">
          {/* Lead Sidebar */}
          {lead && (
           <LeadSidebar
    lead={lead}
    isEditing={false}
    getCampaignStatusColor={getCampaignStatusColor}
    onLeadUpdate={handleLeadUpdate}
  />
          )}
          
          {/* Lead information - Keep this as a quick reference */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4">Quick Contact</h3>
            
            <div className="space-y-3">
              {lead.email && (
                <div>
                  <span className="text-sm text-muted-foreground block">Email:</span>
                  <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                    {lead.email}
                  </a>
                </div>
              )}
              
              {lead.phone && (
                <div>
                  <span className="text-sm text-muted-foreground block">Phone:</span>
                  <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                    {lead.phone}
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href={`/dashboard/leads/${leadId}`}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View Lead Profile
                <ArrowLeft className="h-3 w-3 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Delete Conversation</h3>
            <p className="mb-6">
              Are you sure you want to delete this conversation? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)} 
                className="px-4 py-2 border border-input rounded-md"
              >
                Cancel
              </button>
              
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}