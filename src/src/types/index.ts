export type LeadStage = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'ENGAGED' 
  | 'QUALIFIED' 
  | 'PROPOSAL' 
  | 'NEGOTIATION'
  | 'CONVERTED'
  | 'LOST';

export type ConversationType = 
  | 'EMAIL' 
  | 'CALL' 
  | 'MEETING' 
  | 'LINKEDIN' 
  | 'OTHER';

export interface Lead {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  linkedinUrl?: string | null;
  company?: string | null;
  position?: string | null;
  notes?: string | null;
  stage: LeadStage;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  conversations?: Conversation[];
}

export interface Conversation {
  id: string;
  leadId: string;
  lead?: {
    id: string;
    name: string;
    company?: string | null;
  };
  type: ConversationType;
  content: string;
  date: Date;
  followUp?: Date | null;
  hasFollowUp: boolean;
  followUpDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AiSuggestion {
  type: string;
  suggestion: string;
}

