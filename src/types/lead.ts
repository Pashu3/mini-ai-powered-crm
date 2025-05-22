export type LeadStage = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'CONVERTED' | 'LOST';
export type LeadSource = 'LINKEDIN' | 'COLD_EMAIL' | 'WEBSITE' | 'REFERRAL' | 'CONFERENCE' | 
                         'WEBINAR' | 'INBOUND_CALL' | 'OUTBOUND_CALL' | 'SOCIAL_MEDIA' | 
                         'PARTNER' | 'OTHER';
export type SuggestionType = 'NEXT_STEP' | 'EMAIL_TEMPLATE' | 'QUESTION' | 'RESEARCH';
export type SuggestionStatus = 'NEW' | 'ACCEPTED' | 'REJECTED';
export type ConversationType = 'NOTE' | 'CALL' | 'EMAIL' | 'MEETING' | 'LINKEDIN' | 'OTHER';

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'DRAFT';
  totalLeads?: number;
  conversionRate?: number;
  startDate?: string;
  endDate?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  leadId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Suggestion {
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
  context?: string | null; // Added for storing generation context
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  stage: LeadStage;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  position?: string;
  linkedinUrl?: string;
  notes?: string;
  score?: number;
  userId?: string;
  campaignId?: string | null;
  lastActivity?: string;
  lastContactedDate?: string | null;
  nextContactDate?: string | null;
  suggestions?: Suggestion[];
  conversations?: any[];
  tasks?: Task[];
  campaign?: Campaign;
  value?: number;
  source?: LeadSource;
  
  // New fields
  confidence?: number; // 0-100 score representing likelihood to convert
  priority?: number; // 1-5 priority level
  region?: string; // Geographic region
  timezone?: string; // Lead's timezone
  assignedToId?: string; // ID of the user this lead is assigned to
  assignedTo?: { id: string; name: string; email: string; }; // User this lead is assigned to
  isArchived?: boolean; // Whether the lead is archived
  isDeleted?: boolean; // Whether the lead is soft-deleted
  website?: string; // Lead's company website
  industry?: string; // Lead's industry
  address?: string; // Lead's address
  city?: string; // Lead's city
  state?: string; // Lead's state/province
  postalCode?: string; // Lead's postal code
  country?: string; // Lead's country
  totalValue?: number; // Potential monetary value of the lead
  conversionProbability?: number; // Probability of conversion as a percentage
  firstContactDate?: string | null; // Date of first contact
}

export interface Conversation {
  id: string;
  type: ConversationType;
  content: string;
  subject?: string;
  createdAt: string;
  updatedAt: string;
  hasFollowUp: boolean;
  followUp?: string;
  followUpDone?: boolean;
  summary?: string; // Added field for AI-generated summary
}