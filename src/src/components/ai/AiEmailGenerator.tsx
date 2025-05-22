"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  Loader2,
  AlignLeft,
  Send,
  Sparkles
} from "lucide-react";

interface EmailTemplate {
  subject: string;
  body: string;
  templateId?: string;
}

interface AIEmailGeneratorProps {
  leadId: string;
  leadName: string;
  leadEmail?: string;
  onClose?: () => void;
  onGenerate?: (content: string) => void;  // Add this callback prop
}

export default function AIEmailGenerator({ 
  leadId, 
  leadName, 
  leadEmail, 
  onClose,
  onGenerate
}: AIEmailGeneratorProps) {
  const [emailPurpose, setEmailPurpose] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"subject" | "body" | null>(null);
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    if (onClose) onClose();
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
    if (!leadEmail || !emailTemplate) return;
    
    const mailtoUrl = `mailto:${leadEmail}?subject=${encodeURIComponent(emailTemplate.subject)}&body=${encodeURIComponent(emailTemplate.body)}`;
    window.open(mailtoUrl, '_blank');
  };

  // Add handler for using the template
  const handleUseTemplate = () => {
    if (!emailTemplate || !onGenerate) return;
    onGenerate(emailTemplate.body);
    handleCloseModal();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles size={20} className="text-amber-500" />
              AI Email Generator
            </h2>
            <button 
              onClick={handleCloseModal}
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 text-sm bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="emailPurpose" className="block text-sm font-medium mb-1">
                What's the purpose of this email to {leadName}?
              </label>
              <div className="grid grid-cols-1 gap-2">
                <textarea
                  id="emailPurpose"
                  value={emailPurpose}
                  onChange={(e) => setEmailPurpose(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md"
                  rows={2}
                  placeholder="e.g., Follow up on our last conversation, Introduce our new product..."
                />
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {commonEmailPurposes.map((purpose) => (
                    <button
                      key={purpose}
                      onClick={() => setEmailPurpose(purpose)}
                      className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full"
                    >
                      {purpose}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGenerateEmail}
                disabled={isGenerating || !emailPurpose.trim()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating Email...
                  </>
                ) : (
                  <>
                    <Mail size={16} />
                    Generate Email
                  </>
                )}
              </button>
            </div>

            {emailTemplate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border rounded-md overflow-hidden"
              >
                <div className="p-4 bg-muted/30 border-b border-border flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <AlignLeft size={16} className="text-muted-foreground" />
                    <span className="font-medium">Generated Email</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Add Use Template button if onGenerate callback exists */}
                    {onGenerate && (
                      <button
                        onClick={handleUseTemplate}
                        className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md flex items-center gap-1.5"
                      >
                        <Check size={14} />
                        Use Template
                      </button>
                    )}

                    {leadEmail && (
                      <button
                        onClick={handleSendEmail}
                        className="px-3 py-1 text-sm bg-primary/80 text-primary-foreground rounded-md flex items-center gap-1.5"
                      >
                        <Send size={14} />
                        Open in Email Client
                      </button>
                    )}
                  </div>
                </div>

                {/* Subject line */}
                <div className="p-4 border-b border-border">
                  <div className="flex justify-between items-start mb-1">
                    <label className="text-sm text-muted-foreground">Subject:</label>
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
                  <div className="font-medium">{emailTemplate.subject}</div>
                </div>

                {/* Email body */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <label className="text-sm text-muted-foreground">Body:</label>
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
                  <div className="whitespace-pre-wrap text-sm">
                    {emailTemplate.body}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}