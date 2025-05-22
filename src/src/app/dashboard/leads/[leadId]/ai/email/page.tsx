"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Send,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Sparkles,
  User,
  Building,
  RefreshCcw
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  stage: string;
  position?: string;
}

interface EmailTemplate {
  subject: string;
  body: string;
  templateId?: string;
}

export default function LeadEmailGeneratorPage() {
  const params = useParams();
  const leadId = params.leadId as string;
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [emailPurpose, setEmailPurpose] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate | null>(null);
  const [copied, setCopied] = useState<"subject" | "body" | null>(null);
  
  const subjectRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  
  // Fetch lead data
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
          
        setLead(leadData);
      } catch (err) {
        console.error('Failed to fetch lead:', err);
        setError('Failed to load lead details. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchLead();
  }, [leadId]);

  const handleGenerateEmail = async () => {
    if (!emailPurpose.trim()) {
      setError("Please specify the email purpose");
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      
      const response = await fetch(`/api/leads/${leadId}/ai/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ purpose: emailPurpose })
      });
      
      if (!response.ok) {
        throw new Error(`Error generating email: ${response.status}`);
      }
      
      const data = await response.json();
      setEmailTemplate(data.success && data.data ? data.data : data);
    } catch (err) {
      console.error('Failed to generate email:', err);
      setError('Failed to generate email template');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (type: "subject" | "body") => {
    if (!emailTemplate) return;
    
    const textToCopy = type === "subject" ? emailTemplate.subject : emailTemplate.body;
    navigator.clipboard.writeText(textToCopy);
    setCopied(type);
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  const handleSendEmail = () => {
    if (!lead?.email || !emailTemplate) return;
    
    // Get the current values from the editable textareas
    const currentSubject = subjectRef.current?.value || emailTemplate.subject;
    const currentBody = bodyRef.current?.value || emailTemplate.body;
    
    const mailtoUrl = `mailto:${lead.email}?subject=${encodeURIComponent(currentSubject)}&body=${encodeURIComponent(currentBody)}`;
    window.open(mailtoUrl, '_blank');
  };

  const handleRegenerateEmail = () => {
    if (emailPurpose) {
      handleGenerateEmail();
    }
  };

  const commonEmailPurposes = [
    "Introduction",
    "Follow-up",
    "Meeting request",
    "Proposal",
    "Check-in",
    "Thank you",
    "Product demo"
  ];
  
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
            href={`/dashboard/leads/${leadId}`}
            className="px-4 py-2 bg-background border border-input rounded-md"
          >
            Back to Lead
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
              <Sparkles size={24} className="text-amber-500" />
              AI Email Generator
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
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md">
              {error}
            </div>
          )}
          
          {/* Email purpose */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <label htmlFor="emailPurpose" className="block text-lg font-medium mb-2">
              What's the purpose of your email?
            </label>
            <textarea
              id="emailPurpose"
              value={emailPurpose}
              onChange={(e) => setEmailPurpose(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md mb-4"
              rows={3}
              placeholder="e.g., Follow up after our meeting last week, Introduce our new product features, Schedule a demo call..."
            />
            
            <div className="flex flex-wrap gap-2 mb-4">
              {commonEmailPurposes.map((purpose) => (
                <button
                  key={purpose}
                  onClick={() => setEmailPurpose(purpose)}
                  className="px-2 py-1 text-sm bg-muted hover:bg-muted/80 rounded-md"
                >
                  {purpose}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleGenerateEmail}
              disabled={isGenerating || !emailPurpose.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Email
                </>
              )}
            </button>
          </div>
          
          {/* Generated email */}
          {emailTemplate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-4 bg-muted/30 border-b border-border flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-primary" />
                  <span className="font-medium">Generated Email</span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleRegenerateEmail}
                    className="px-3 py-1 text-sm border border-input rounded-md flex items-center gap-1.5 hover:bg-muted"
                  >
                    <RefreshCcw size={14} />
                    Regenerate
                  </button>
                  
                  {lead.email && (
                    <button
                      onClick={handleSendEmail}
                      className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md flex items-center gap-1.5"
                    >
                      <Send size={14} />
                      Open in Email Client
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Subject line */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="subject" className="text-sm font-medium text-muted-foreground">
                      Subject:
                    </label>
                    <button
                      onClick={() => handleCopy("subject")}
                      className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      {copied === "subject" ? (
                        <>
                          <Check size={12} className="text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    ref={subjectRef}
                    id="subject"
                    defaultValue={emailTemplate.subject}
                    className="w-full px-3 py-2 border border-input rounded-md font-medium"
                    rows={1}
                  />
                </div>
                
                {/* Email body */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="body" className="text-sm font-medium text-muted-foreground">
                      Body:
                    </label>
                    <button
                      onClick={() => handleCopy("body")}
                      className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      {copied === "body" ? (
                        <>
                          <Check size={12} className="text-green-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    ref={bodyRef}
                    id="body"
                    defaultValue={emailTemplate.body}
                    className="w-full px-3 py-2 border border-input rounded-md"
                    rows={12}
                  />
                </div>
                
                <div className="pt-2 text-xs text-muted-foreground">
                  <p>
                    <strong>Note:</strong> You can edit this email before sending or copying. 
                    The text will be sent as plain text without formatting.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
        
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Lead information */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4">Recipient Information</h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground block">Name:</span>
                <span className="font-medium">{lead.name}</span>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground block">Company:</span>
                <span>{lead.company}</span>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground block">Email:</span>
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                  {lead.email}
                </a>
              </div>
              
              {lead.position && (
                <div>
                  <span className="text-sm text-muted-foreground block">Position:</span>
                  <span>{lead.position}</span>
                </div>
              )}
              
              <div>
                <span className="text-sm text-muted-foreground block">Stage:</span>
                <span>{lead.stage.charAt(0) + lead.stage.slice(1).toLowerCase()}</span>
              </div>
            </div>
          </div>
          
          {/* Tips */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4">Email Writing Tips</h3>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="mt-1 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <span>Keep your email concise and focused on a single topic</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <span>Personalize the email for the recipient's specific needs</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <span>Include a clear call-to-action</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <span>Proofread your email before sending</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <span>Use a professional signature with your contact information</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}