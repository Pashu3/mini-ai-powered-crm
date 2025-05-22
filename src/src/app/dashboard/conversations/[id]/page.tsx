"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  MessageCircle, 
  Calendar, 
  Mail, 
  Phone, 
  Clock,
  CheckCircle2,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
  User,
  Building,
  Linkedin,
  MessageSquare
} from "lucide-react";

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
  lead: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone?: string;
  };
}

export default function ConversationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const conversationId = params.id as string;
  
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchConversation() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/conversations/${conversationId}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching conversation: ${response.status}`);
        }
        
        const data = await response.json();
        
        setConversation(data.success && data.data ? data.data : data);
      } catch (err) {
        console.error('Failed to fetch conversation:', err);
        setError('Failed to load conversation details. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchConversation();
  }, [conversationId]);
  
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
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !conversation) {
    return (
      <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
        <AlertCircle className="h-6 w-6 mb-2" />
        <h3 className="font-medium text-lg">Error loading conversation</h3>
        <p>{error || "Conversation not found"}</p>
        <div className="flex gap-3 mt-4">
          <Link 
            href="/dashboard/conversations"
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
            href="/dashboard/conversations"
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back to conversations</span>
          </Link>
          
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {getTypeIcon(conversation.type)}
              {conversation.subject || `${conversation.type.charAt(0) + conversation.type.slice(1).toLowerCase()} with ${conversation.lead.name}`}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={14} />
              <span>{conversation.lead.name}</span>
              {conversation.lead.company && (
                <>
                  <span>•</span>
                  <Building size={14} />
                  <span>{conversation.lead.company}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
         <Link
  href={`/dashboard/leads/${conversation.leadId}/conversations/${conversationId}/edit`}
  className="px-3 py-1.5 border border-input rounded-md flex items-center gap-1.5 hover:bg-accent"
>
  <Edit size={14} />
  Edit
</Link>
          
          <button
            className="px-3 py-1.5 border border-destructive text-destructive rounded-md flex items-center gap-1.5 hover:bg-destructive/10"
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
        {/* Main conversation content */}
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
          
          {/* Related content could go here */}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4">Lead Information</h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground block">Name:</span>
                <Link href={`/dashboard/leads/${conversation.leadId}`} className="text-primary hover:underline">
                  {conversation.lead.name}
                </Link>
              </div>
              
              {conversation.lead.company && (
                <div>
                  <span className="text-sm text-muted-foreground block">Company:</span>
                  <span>{conversation.lead.company}</span>
                </div>
              )}
              
              {conversation.lead.email && (
                <div>
                  <span className="text-sm text-muted-foreground block">Email:</span>
                  <a href={`mailto:${conversation.lead.email}`} className="text-primary hover:underline">
                    {conversation.lead.email}
                  </a>
                </div>
              )}
              
              {conversation.lead.phone && (
                <div>
                  <span className="text-sm text-muted-foreground block">Phone:</span>
                  <a href={`tel:${conversation.lead.phone}`} className="text-primary hover:underline">
                    {conversation.lead.phone}
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href={`/dashboard/leads/${conversation.leadId}`}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View Lead Profile
                <ArrowLeft className="h-3 w-3 rotate-180" />
              </Link>
            </div>
          </div>
          
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
                  <button className="text-primary text-sm hover:underline">
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
      </motion.div>
    </div>
  );
}