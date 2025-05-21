"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  MessageCircle, 
  Search, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Loader2, 
  AlertCircle, 
  ChevronRight,
  Plus
} from "lucide-react";

type ConversationType = 'EMAIL' | 'CALL' | 'MEETING' | 'NOTE';

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
  };
}

export default function ConversationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedType, setSelectedType] = useState<ConversationType | undefined>(
    searchParams.get('type') as ConversationType || undefined
  );
  
useEffect(() => {
  async function fetchConversations() {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (selectedType) params.set('type', selectedType);
      
      // Updated API endpoint - fetch from all leads' conversations
      const response = await fetch(`/api/conversations${params.toString() ? `?${params.toString()}` : ''}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching conversations: ${response.status}`);
      }
      
      const data = await response.json();
      
      setConversations(data.success && data.data ? data.data : data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
      setError('Failed to load conversations. Please try again.');
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }
  
  fetchConversations();
}, [searchTerm, selectedType]);
  
  // Update URL when filters change
  const updateUrlParams = (search: string, type?: ConversationType) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    router.push(`/dashboard/conversations${queryString}`, { scroll: false });
  };
  
  // Handle type filter change
  const handleTypeChange = (type?: ConversationType) => {
    setSelectedType(type);
    updateUrlParams(searchTerm, type);
  };
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Helper function to get conversation type icon
  const getTypeIcon = (type: ConversationType) => {
    switch (type) {
      case 'EMAIL':
        return <Mail className="h-4 w-4" />;
      case 'CALL':
        return <Phone className="h-4 w-4" />;
      case 'MEETING':
        return <Calendar className="h-4 w-4" />;
      case 'NOTE':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };
  
  // Helper function to get conversation type badge color
  const getTypeBadgeClass = (type: ConversationType) => {
    switch (type) {
      case 'EMAIL':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'CALL':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'MEETING':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'NOTE':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
          <p className="text-muted-foreground">
            Manage and track your communications with leads
          </p>
        </div>
        
        <Link
          href="/dashboard/conversations/new"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          New Conversation
        </Link>
      </motion.div>
      
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-md p-4 flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              updateUrlParams(e.target.value, selectedType);
            }}
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => handleTypeChange(undefined)}
            className={`px-3 py-2 rounded-md text-sm ${
              !selectedType 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            All
          </button>
          
          {(['EMAIL', 'CALL', 'MEETING', 'NOTE'] as ConversationType[]).map(type => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm ${
                selectedType === type
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {getTypeIcon(type)}
              <span className="hidden sm:inline">{type.charAt(0) + type.slice(1).toLowerCase()}</span>
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* Conversations list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card border border-border rounded-md shadow-sm overflow-hidden"
      >
        {loading ? (
          <div className="p-8 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <AlertCircle className="h-8 w-8 mx-auto text-destructive mb-2" />
            <h3 className="font-medium text-lg">Error loading conversations</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={() => router.refresh()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Try Again
            </button>
          </div>
        ) : !conversations.length ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">No conversations found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedType 
                ? "Try adjusting your filters or search term" 
                : "Get started by creating your first conversation"}
            </p>
            <Link 
              href="/dashboard/conversations/new"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              New Conversation
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {conversations.map((conversation) => (
              <Link 
                key={conversation.id}
                href={`/dashboard/conversations/${conversation.id}`}
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
                
                <div>
                  <h3 className="font-medium">
                    {conversation.subject || `Conversation with ${conversation.lead.name}`}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {conversation.lead.name} • {conversation.lead.company}
                  </p>
                </div>
                
                <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {conversation.content}
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}