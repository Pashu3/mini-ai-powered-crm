export type LeadStage = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'CONVERTED' | 'LOST';
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
  source?: string;
}

export interface Conversation {
  id: string;
  type: ConversationType; // Updated to use the type alias
  content: string;
  subject?: string;
  createdAt: string;
  updatedAt: string;
  hasFollowUp: boolean;
  followUp?: string;
  followUpDone?: boolean;
}