import { LeadStage, ConversationType } from "@/types/lead";
import { Mail, Phone, Calendar, MessageCircle, Linkedin, MessageSquare } from "lucide-react";

export function getStageColor(stage: LeadStage): string {
  switch (stage) {
    case 'NEW':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'CONTACTED':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'QUALIFIED':
      return 'text-cyan-600 bg-cyan-50 border-cyan-200';
    case 'PROPOSAL':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'NEGOTIATION':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'CONVERTED':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'LOST':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

export const getConversationTypeIcon = (type: ConversationType) => {
  switch (type) {
    case 'EMAIL':
      return <Mail size={16} className="text-blue-500" />;
    case 'CALL':
      return <Phone size={16} className="text-purple-500" />;
    case 'MEETING':
      return <Calendar size={16} className="text-amber-500" />;
    case 'NOTE':
      return <MessageCircle size={16} className="text-green-500" />;
    case 'LINKEDIN':
      return <Linkedin size={16} className="text-indigo-500" />;
    case 'OTHER':
      return <MessageSquare size={16} className="text-gray-500" />;
    default:
      return <MessageCircle size={16} className="text-gray-500" />;
  }
};

export function getCampaignStatusColor(status: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'PAUSED':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'COMPLETED':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'DRAFT':
      return 'text-gray-600 bg-gray-50 border-gray-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

export const getTypeIcon = (type: ConversationType) => {
  switch (type) {
    case 'EMAIL':
      return <Mail className="h-4 w-4" />;
    case 'CALL':
      return <Phone className="h-4 w-4" />;
    case 'MEETING':
      return <Calendar className="h-4 w-4" />;
    case 'NOTE':
      return <MessageCircle className="h-4 w-4" />;
    case 'LINKEDIN':
      return <Linkedin className="h-4 w-4" />;
    case 'OTHER':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <MessageCircle className="h-4 w-4" />;
  }
};

export const getTypeBadgeClass = (type: ConversationType) => {
  switch (type) {
    case 'EMAIL':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'CALL':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'MEETING':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'NOTE':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'LINKEDIN':
      return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    case 'OTHER':
      return 'text-gray-600 bg-gray-50 border-gray-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export function formatDate(dateString?: string): string {
  if (!dateString) return 'N/A';

  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatCurrency(value?: number): string {
  if (value === undefined || value === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}