"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  User,
  Building,
  Search,
  Loader2,
  Clock,
  AlertCircle,
  Linkedin,
  MessageSquare,
  Sparkles
} from "lucide-react";
import AISuggestions from "@/components/ai/AiSuggestions";
import AIEmailGenerator from "@/components/ai/AiEmailGenerator";
import { Lead, ConversationType } from "@/types/lead";

// Loading component for the page
function NewConversationLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full">
            <ArrowLeft size={20} />
          </div>
          <div className="h-8 w-48 bg-muted/30 animate-pulse rounded-md"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div className="h-10 bg-muted/30 animate-pulse rounded-md"></div>
            <div className="h-14 bg-muted/30 animate-pulse rounded-md"></div>
            <div className="h-32 bg-muted/30 animate-pulse rounded-md"></div>
            <div className="h-14 bg-muted/30 animate-pulse rounded-md"></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-36 bg-muted/30 animate-pulse rounded-lg"></div>
          <div className="h-64 bg-muted/30 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

// Conversation form component that uses searchParams
function NewConversationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialLeadId = searchParams.get('leadId');

  // Form state
  const [type, setType] = useState<ConversationType>('NOTE');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(initialLeadId);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [followUp, setFollowUp] = useState<boolean>(false);
  const [followUpDate, setFollowUpDate] = useState<string>('');

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [leadSearchTerm, setLeadSearchTerm] = useState('');
  const [showLeadSearch, setShowLeadSearch] = useState(!initialLeadId);
  const [searchResults, setSearchResults] = useState<Lead[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailGenerator, setShowEmailGenerator] = useState<boolean>(false);

  // Fetch lead if ID is provided in URL
  useEffect(() => {
    if (initialLeadId) {
      fetchLead(initialLeadId);
    }
  }, [initialLeadId]);

  // Search leads
  useEffect(() => {
    const searchLeads = async () => {
      if (!leadSearchTerm || leadSearchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        setSearching(true);
        const response = await fetch(`/api/leads?search=${encodeURIComponent(leadSearchTerm)}`);

        if (!response.ok) {
          throw new Error('Failed to search leads');
        }

        const data = await response.json();
        const leads = data.success && data.data ? data.data.leads : data.leads || [];

        setSearchResults(leads);
      } catch (err) {
        console.error('Error searching leads:', err);
      } finally {
        setSearching(false);
      }
    };

    if (leadSearchTerm && leadSearchTerm.length >= 2) {
      const timer = setTimeout(searchLeads, 300);
      return () => clearTimeout(timer);
    }
  }, [leadSearchTerm]);

  const fetchLead = async (id: string) => {
    try {
      const response = await fetch(`/api/leads/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch lead');
      }

      const responseData = await response.json();
      const lead = responseData.success && responseData.data ? responseData.data : responseData;

      setSelectedLead(lead);
      setSelectedLeadId(lead.id);
      setShowLeadSearch(false);
    } catch (err) {
      console.error('Error fetching lead:', err);
      setError('Failed to load lead information');
    }
  };

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setSelectedLeadId(lead.id);
    setLeadSearchTerm('');
    setShowLeadSearch(false);
  };

  const handleGeneratedEmail = (emailContent: string) => {
    setType('EMAIL');
    setContent(emailContent);
    setShowEmailGenerator(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLeadId) {
      setError('Please select a lead');
      return;
    }

    if (!content.trim()) {
      setError('Please add content to your conversation');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        type,
        content,
        subject: subject.trim() || undefined,
        followUp: followUp ? (followUpDate ? new Date(followUpDate).toISOString() : undefined) : undefined,
        hasFollowUp: followUp,
        sentiment: "neutral" // Add default sentiment if your schema requires it
      };

      const response = await fetch(`/api/leads/${selectedLeadId}/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Failed to create conversation');
      }

      const responseData = await response.json();
      const conversationId = responseData.data?.id || responseData.id;

      if (conversationId) {
        router.push(`/dashboard/conversations/${conversationId}`);
      } else {
        router.push(`/dashboard/leads/${selectedLeadId}`);
      }
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError(err instanceof Error ? err.message : 'Failed to create conversation');
      setLoading(false);
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
        <div className="flex items-center gap-4">
          <Link href="/dashboard/conversations" className="p-2 rounded-full hover:bg-accent">
            <ArrowLeft size={20} />
            <span className="sr-only">Back to conversations</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">New Conversation</h1>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 text-destructive p-4 rounded-md flex items-start gap-3"
        >
          <AlertCircle className="h-5 w-5 mt-0.5" />
          <div>
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form area - takes up 2 columns on large screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lead Selection */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Lead
              </label>

              {selectedLead ? (
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-muted-foreground" />
                    <span className="font-medium">{selectedLead.name}</span>
                    {selectedLead.company && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="flex items-center gap-1">
                          <Building size={14} className="text-muted-foreground" />
                          {selectedLead.company}
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLead(null);
                      setSelectedLeadId(null);
                      setShowLeadSearch(true);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="search"
                      placeholder="Search for a lead..."
                      className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
                      value={leadSearchTerm}
                      onChange={(e) => setLeadSearchTerm(e.target.value)}
                    />
                  </div>

                  {searching && (
                    <div className="py-2 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
                    </div>
                  )}

                  {!searching && searchResults.length > 0 && (
                    <div className="mt-1 border border-border rounded-md overflow-hidden">
                      {searchResults.map((lead) => (
                        <button
                          key={lead.id}
                          type="button"
                          onClick={() => handleLeadSelect(lead)}
                          className="w-full text-left px-4 py-2 hover:bg-muted flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-muted-foreground">{lead.company}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {!searching && leadSearchTerm.length >= 2 && searchResults.length === 0 && (
                    <div className="py-2 text-sm text-muted-foreground">
                      No leads found. Try a different search term.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Conversation Type */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Conversation Type
              </label>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setType('NOTE')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${type === 'NOTE'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                    }`}
                >
                  <MessageCircle size={16} />
                  Note
                </button>
                <button
                  type="button"
                  onClick={() => setType('CALL')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${type === 'CALL'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                    }`}
                >
                  <Phone size={16} />
                  Call
                </button>
                <button
                  type="button"
                  onClick={() => setType('EMAIL')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${type === 'EMAIL'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                    }`}
                >
                  <Mail size={16} />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setType('MEETING')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${type === 'MEETING'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                    }`}
                >
                  <Calendar size={16} />
                  Meeting
                </button>
                <button
                  type="button"
                  onClick={() => setType('LINKEDIN')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${type === 'LINKEDIN'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                    }`}
                >
                  <Linkedin size={16} />
                  LinkedIn
                </button>
                <button
                  type="button"
                  onClick={() => setType('OTHER')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md ${type === 'OTHER'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                    }`}
                >
                  <MessageSquare size={16} />
                  Other
                </button>
              </div>
            </div>

            {/* Subject (for emails) */}
            {type === 'EMAIL' && (
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md"
                  placeholder="Enter email subject..."
                />
              </div>
            )}

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-muted-foreground mb-1">
                {type === 'NOTE' ? 'Note' : type === 'EMAIL' ? 'Email Body' : 'Details'}
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
                rows={6}
                placeholder={`Enter ${type.toLowerCase()} details...`}
                required
              />
            </div>

            {/* Follow-up */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id="followUp"
                  checked={followUp}
                  onChange={(e) => setFollowUp(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                <label htmlFor="followUp" className="text-sm font-medium">
                  Add follow-up reminder
                </label>
              </div>

              {followUp && (
                <div className="ml-6">
                  <label htmlFor="followUpDate" className="block text-sm text-muted-foreground mb-1">
                    Follow-up Date
                  </label>
                  <div className="flex gap-2 items-center">
                    <Clock size={16} className="text-muted-foreground" />
                    <input
                      type="date"
                      id="followUpDate"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="px-3 py-2 border border-input rounded-md"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Link
                href="/dashboard/conversations"
                className="px-4 py-2 border border-input rounded-md"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
                disabled={loading || !selectedLeadId || !content.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>Save Conversation</>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Sidebar with helper components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6"
        >
          {/* AI Email Generator Button */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Sparkles size={18} />
              AI Helpers
            </h3>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setShowEmailGenerator(true)}
                disabled={!selectedLeadId}
                className="w-full px-3 py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground rounded-md hover:from-primary hover:to-primary/90 disabled:opacity-50"
              >
                <Sparkles size={14} className="text-primary-foreground" />
                <Mail size={16} />
                Generate Email Draft
              </button>
              <p className="text-xs text-muted-foreground">
                Use AI to quickly generate a professional email based on the lead's information and your needs.
              </p>
            </div>
          </div>

          {/* AI Suggestions if a lead is selected */}
          {selectedLeadId && (
            <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
              <AISuggestions
                leadId={selectedLeadId}
                initialSuggestions={[]}
              />
            </div>
          )}

          {/* Quick Tips */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-3">Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                <span>Select the right conversation type to keep your records organized</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                <span>Set follow-ups to make sure you never miss important interactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
                <span>Use AI to generate professional emails and get helpful suggestions</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {showEmailGenerator && selectedLeadId && selectedLead && (
        <AIEmailGenerator
          leadId={selectedLeadId}
          leadName={selectedLead.name}
          leadEmail={selectedLead.email}
          onClose={() => setShowEmailGenerator(false)}
          onGenerate={(content: string) => handleGeneratedEmail(content)}
        />
      )}
    </div>
  );
}

export default function NewConversationPage() {
  return (
    <Suspense fallback={<NewConversationLoading />}>
      <NewConversationForm />
    </Suspense>
  );
}