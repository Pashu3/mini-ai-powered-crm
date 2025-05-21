"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Loader2,
  Clock,
  AlertCircle,
  Linkedin,
  MessageSquare,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { ConversationType, Lead, Conversation } from "@/types/lead";
import AISuggestions from "@/components/ai/AiSuggestions";
import AIEmailGenerator from "@/components/ai/AiEmailGenerator";
import { formatDate } from "@/utils/styleHelpers";

export default function EditConversationPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.leadId as string;
  const conversationId = params.conversationId as string;
  
  // Form state
  const [type, setType] = useState<ConversationType>('NOTE');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [followUp, setFollowUp] = useState<boolean>(false);
  const [followUpDate, setFollowUpDate] = useState<string>('');
  const [followUpDone, setFollowUpDone] = useState<boolean>(false);
  
  // UI state
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lead, setLead] = useState<Lead | null>(null);
  const [showEmailGenerator, setShowEmailGenerator] = useState<boolean>(false);
  
  // Fetch conversation data and lead data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch conversation
        const conversationResponse = await fetch(`/api/leads/${leadId}/conversations/${conversationId}`);
        
        if (!conversationResponse.ok) {
          throw new Error('Failed to fetch conversation');
        }
        
        const conversationData = await conversationResponse.json();
        const conversation = conversationData.success && conversationData.data ? conversationData.data : conversationData;
        
        // Populate form fields
        setType(conversation.type || 'NOTE');
        setContent(conversation.content || '');
        setSubject(conversation.subject || '');
        setFollowUp(conversation.hasFollowUp || false);
        
        if (conversation.followUp) {
          // Format date to YYYY-MM-DD for input[type="date"]
          const date = new Date(conversation.followUp);
          setFollowUpDate(date.toISOString().split('T')[0]);
        }
        
        setFollowUpDone(conversation.followUpDone || false);

        // Fetch lead data
        const leadResponse = await fetch(`/api/leads/${leadId}`);
        
        if (!leadResponse.ok) {
          throw new Error('Failed to fetch lead data');
        }
        
        const leadData = await leadResponse.json();
        setLead(leadData.success && leadData.data ? leadData.data : leadData);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [leadId, conversationId]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Please add content to your conversation');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      const payload = {
        content,
        subject: subject.trim() || undefined,
        followUp: followUp ? (followUpDate ? new Date(followUpDate).toISOString() : undefined) : undefined,
        hasFollowUp: followUp,
        followUpDone
      };
      
      const response = await fetch(`/api/leads/${leadId}/conversations/${conversationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Failed to update conversation');
      }
      
      // Redirect back to conversation detail
      router.push(`/dashboard/leads/${leadId}/conversations/${conversationId}`);
    } catch (err) {
      console.error('Error updating conversation:', err);
      setError(err instanceof Error ? err.message : 'Failed to update conversation');
      setSaving(false);
    }
  };

  const handleGeneratedEmail = (emailContent: string) => {
    setContent(emailContent);
    setShowEmailGenerator(false);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
          <Link href={`/dashboard/leads/${leadId}/conversations/${conversationId}`} className="p-2 rounded-full hover:bg-accent">
            <ArrowLeft size={20} />
            <span className="sr-only">Back to conversation</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Edit Conversation</h1>
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
        {/* Main form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 bg-card border border-border rounded-lg shadow-sm p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Conversation Type (read-only) */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Conversation Type
              </label>
              
              <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-md bg-muted/20">
                {type === 'NOTE' && <MessageCircle size={16} />}
                {type === 'CALL' && <Phone size={16} />}
                {type === 'EMAIL' && <Mail size={16} />}
                {type === 'MEETING' && <Calendar size={16} />}
                {type === 'LINKEDIN' && <Linkedin size={16} />}
                {type === 'OTHER' && <MessageSquare size={16} />}
                <span>{type.charAt(0) + type.slice(1).toLowerCase()}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Conversation type cannot be changed
              </p>
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
                  Follow-up reminder
                </label>
              </div>
              
              {followUp && (
                <div className="ml-6 space-y-4">
                  <div>
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
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="followUpDone"
                      checked={followUpDone}
                      onChange={(e) => setFollowUpDone(e.target.checked)}
                      className="h-4 w-4 rounded border-input"
                    />
                    <label htmlFor="followUpDone" className="text-sm">
                      Mark follow-up as completed
                    </label>
                  </div>
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <Link 
                href={`/dashboard/leads/${leadId}/conversations/${conversationId}`}
                className="px-4 py-2 border border-input rounded-md"
              >
                Cancel
              </Link>
              
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
                disabled={saving}
              >
                {saving && <Loader2 size={16} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>

        {/* Sidebar with AI Tools and Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6"
        >
          {/* AI Email Generator Button */}
          {type === 'EMAIL' && lead && (
            <div className="bg-card border border-border rounded-lg shadow-sm p-6">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Sparkles size={18} />
                AI Helpers
              </h3>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowEmailGenerator(true)}
                  className="w-full px-3 py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground rounded-md hover:from-primary hover:to-primary/90"
                >
                  <Sparkles size={14} className="text-primary-foreground" />
                  <Mail size={16} />
                  Generate Email Content
                </button>
                <p className="text-xs text-muted-foreground">
                  Use AI to improve or rewrite your email content.
                </p>
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          {leadId && (
            <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
              <AISuggestions 
                leadId={leadId}
                initialSuggestions={[]}
              />
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href={`/dashboard/leads/${leadId}`}
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <ExternalLink size={14} />
                  View Lead Profile
                </Link>
              </li>
              <li>
                <Link 
                  href={`/dashboard/leads/${leadId}/conversations`}
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <ExternalLink size={14} />
                  All Conversations
                </Link>
              </li>
              <li>
                <Link 
                  href={`/dashboard/conversations/new?leadId=${leadId}`}
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <ExternalLink size={14} />
                  Add New Conversation
                </Link>
              </li>
            </ul>
          </div>

          {/* Tips */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-3">Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">1</span>
                <span>Set follow-ups to remind yourself of important deadlines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">2</span>
                <span>Use AI tools to generate professional email content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">3</span>
                <span>Keep your conversation history detailed and organized</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Email Generator Modal */}
      {showEmailGenerator && lead && (
        <AIEmailGenerator 
          leadId={leadId}
          leadName={lead.name}
          leadEmail={lead.email}
          onClose={() => setShowEmailGenerator(false)}
          onGenerate={(content: string) => handleGeneratedEmail(content)}
        />
      )}
    </div>
  );
}