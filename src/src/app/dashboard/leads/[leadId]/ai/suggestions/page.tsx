"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  LightbulbIcon,
  CheckCircle2,
  X,
  Clock,
  Mail,
  MessageCircle,
  AlertCircle,
  Loader2,
  RefreshCcw,
  Filter,
  CheckCheck,
  History,
  PlusCircle
} from "lucide-react";

type SuggestionType = 'NEXT_STEP' | 'EMAIL_TEMPLATE' | 'QUESTION' | 'RESEARCH';
type SuggestionStatus = 'NEW' | 'ACCEPTED' | 'REJECTED';

interface Suggestion {
  id: string;
  leadId: string;
  suggestion: string;
  type: SuggestionType;
  status: SuggestionStatus;
  priority: number;
  done: boolean;
  isViewed: boolean;
  reasoning?: string | null;
  templateId?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  id: string;
  name: string;
  company: string;
}

export default function LeadSuggestionsPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.leadId as string;
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingSuggestion, setGeneratingSuggestion] = useState(false);
  const [statusFilter, setStatusFilter] = useState<SuggestionStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<SuggestionType | 'ALL'>('ALL');
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch lead basic details
        const leadResponse = await fetch(`/api/leads/${leadId}`);
        
        if (!leadResponse.ok) {
          throw new Error(`Error fetching lead: ${leadResponse.status}`);
        }
        
        const leadData = await leadResponse.json();
        const lead = leadData.success && leadData.data ? leadData.data : leadData;
        
        setLead({
          id: lead.id,
          name: lead.name,
          company: lead.company,
        });
        
        // Fetch all suggestions for this lead
        const suggestionsResponse = await fetch(`/api/leads/${leadId}/ai/suggestions`);
        
        if (!suggestionsResponse.ok) {
          throw new Error(`Error fetching suggestions: ${suggestionsResponse.status}`);
        }
        
        const suggestionsData = await suggestionsResponse.json();
        const suggestions = suggestionsData.success && suggestionsData.data 
          ? suggestionsData.data 
          : (suggestionsData || []);
          
        setSuggestions(suggestions);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [leadId]);
  
  // Generate a new suggestion
  const handleGenerateSuggestion = async () => {
    try {
      setGeneratingSuggestion(true);
      setError(null);
      
      const response = await fetch(`/api/leads/${leadId}/ai/suggestions`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error(`Error generating suggestion: ${response.status}`);
      }
      
      const data = await response.json();
      const newSuggestion = data.success && data.data ? data.data : data;
      
      // Add new suggestion to the list
      setSuggestions([newSuggestion, ...suggestions]);
    } catch (err) {
      console.error('Failed to generate suggestion:', err);
      setError('Failed to generate new suggestion');
    } finally {
      setGeneratingSuggestion(false);
    }
  };

  // Update suggestion status
  const handleUpdateStatus = async (suggestionId: string, status: SuggestionStatus) => {
    try {
      const response = await fetch(`/api/leads/${leadId}/ai/suggestions/${suggestionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error(`Error updating suggestion: ${response.status}`);
      }
      
      // Update the suggestion in the list
      setSuggestions(suggestions.map(s => 
        s.id === suggestionId ? { ...s, status } : s
      ));
    } catch (err) {
      console.error('Failed to update suggestion:', err);
      setError('Failed to update suggestion status');
    }
  };

  // Get filtered suggestions
  const getFilteredSuggestions = () => {
    return suggestions.filter(s => {
      const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
      const matchesType = typeFilter === 'ALL' || s.type === typeFilter;
      return matchesStatus && matchesType;
    });
  };

  // Get suggestion type icon
  const getSuggestionIcon = (type: SuggestionType) => {
    switch (type) {
      case 'NEXT_STEP':
        return <Clock size={16} className="text-blue-500" />;
      case 'EMAIL_TEMPLATE':
        return <Mail size={16} className="text-green-500" />;
      case 'QUESTION':
        return <MessageCircle size={16} className="text-amber-500" />;
      case 'RESEARCH':
        return <AlertCircle size={16} className="text-purple-500" />;
      default:
        return <LightbulbIcon size={16} className="text-amber-500" />;
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
  
  const filteredSuggestions = getFilteredSuggestions();
  
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
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <LightbulbIcon className="h-8 w-8 text-amber-500" />
              AI Suggestions
            </h1>
            <p className="text-muted-foreground">
              Smart recommendations for {lead.name} from {lead.company}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleGenerateSuggestion}
          disabled={generatingSuggestion}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          {generatingSuggestion ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <PlusCircle size={16} />
              New Suggestion
            </>
          )}
        </button>
      </motion.div>
      
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-4 bg-card border border-border rounded-md p-4"
      >
        <div>
          <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
            <Filter size={14} />
            Status
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-md text-sm ${
                statusFilter === 'ALL' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setStatusFilter('NEW')}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${
                statusFilter === 'NEW' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <Clock size={14} />
              New
            </button>
            <button 
              onClick={() => setStatusFilter('ACCEPTED')}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${
                statusFilter === 'ACCEPTED' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <CheckCheck size={14} />
              Accepted
            </button>
            <button 
              onClick={() => setStatusFilter('REJECTED')}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${
                statusFilter === 'REJECTED' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <X size={14} />
              Rejected
            </button>
          </div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
            <Filter size={14} />
            Type
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setTypeFilter('ALL')}
              className={`px-3 py-1.5 rounded-md text-sm ${
                typeFilter === 'ALL' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              All Types
            </button>
            <button 
              onClick={() => setTypeFilter('NEXT_STEP')}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${
                typeFilter === 'NEXT_STEP' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <Clock size={14} />
              Next Step
            </button>
            <button 
              onClick={() => setTypeFilter('EMAIL_TEMPLATE')}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${
                typeFilter === 'EMAIL_TEMPLATE' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <Mail size={14} />
              Email
            </button>
            <button 
              onClick={() => setTypeFilter('QUESTION')}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${
                typeFilter === 'QUESTION' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <MessageCircle size={14} />
              Question
            </button>
            <button 
              onClick={() => setTypeFilter('RESEARCH')}
              className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${
                typeFilter === 'RESEARCH' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <AlertCircle size={14} />
              Research
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Suggestions list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card border border-border rounded-md shadow-sm overflow-hidden"
      >
        {filteredSuggestions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <LightbulbIcon className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-lg font-medium mb-1">No suggestions found</h3>
            <p className="text-muted-foreground mb-4">
              {statusFilter !== 'ALL' || typeFilter !== 'ALL'
                ? `No ${typeFilter !== 'ALL' ? typeFilter.toLowerCase().replace('_', ' ') : ''} suggestions with status ${statusFilter.toLowerCase()}`
                : "There are no AI suggestions for this lead yet"}
            </p>
            <button 
              onClick={handleGenerateSuggestion}
              disabled={generatingSuggestion}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-2"
            >
              {generatingSuggestion ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <PlusCircle size={16} />
                  Generate Suggestion
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredSuggestions.map((suggestion) => (
              <div 
                key={suggestion.id}
                className="p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                      suggestion.type === 'NEXT_STEP' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                      suggestion.type === 'EMAIL_TEMPLATE' ? 'bg-green-50 text-green-600 border border-green-200' :
                      suggestion.type === 'QUESTION' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                      'bg-purple-50 text-purple-600 border border-purple-200'
                    }`}>
                      {getSuggestionIcon(suggestion.type)}
                      <span className="ml-1">
                        {suggestion.type.split('_').map(word => 
                          word.charAt(0) + word.slice(1).toLowerCase()
                        ).join(' ')}
                      </span>
                    </span>
                    
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                      suggestion.status === 'NEW' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                      suggestion.status === 'ACCEPTED' ? 'bg-green-50 text-green-600 border border-green-200' :
                      'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}>
                      {suggestion.status === 'NEW' && <Clock size={12} className="mr-1" />}
                      {suggestion.status === 'ACCEPTED' && <CheckCircle2 size={12} className="mr-1" />}
                      {suggestion.status === 'REJECTED' && <X size={12} className="mr-1" />}
                      {suggestion.status.charAt(0) + suggestion.status.slice(1).toLowerCase()}
                    </span>
                    
                    <span className="inline-flex items-center text-xs text-muted-foreground">
                      <History size={12} className="mr-1" />
                      {formatDate(suggestion.createdAt)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    {suggestion.status === 'NEW' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(suggestion.id, 'REJECTED')}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-destructive"
                        >
                          <X size={16} />
                          <span className="sr-only">Reject</span>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(suggestion.id, 'ACCEPTED')}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-primary"
                        >
                          <CheckCircle2 size={16} />
                          <span className="sr-only">Accept</span>
                        </button>
                      </>
                    )}
                    
                    {suggestion.status === 'REJECTED' && (
                      <button
                        onClick={() => handleUpdateStatus(suggestion.id, 'NEW')}
                        className="text-xs px-2 py-0.5 text-muted-foreground hover:text-foreground"
                      >
                        Restore
                      </button>
                    )}
                  </div>
                </div>
                
                <p className="text-base">
                  {suggestion.suggestion}
                </p>
                
                {suggestion.reasoning && (
                  <div className="mt-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                    <strong>Reasoning:</strong> {suggestion.reasoning}
                  </div>
                )}
                
                {/* Show priority indicator */}
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-muted-foreground">Priority:</span>
                  <div className="ml-2 flex">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i} 
                        className={`w-4 h-1 rounded ${
                          i <= suggestion.priority ? 'bg-primary' : 'bg-muted'
                        } ${i < 3 ? 'mr-0.5' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}