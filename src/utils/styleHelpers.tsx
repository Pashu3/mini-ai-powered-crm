import { LeadStage, ConversationType, LeadSource } from "@/types/lead";
import { Mail, Phone, Calendar, MessageCircle, Linkedin, MessageSquare, Check, AlertTriangle, AlertCircle, User, Users, Info } from "lucide-react";

export const getNotificationIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'success':
      return <Check className="h-5 w-5 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    case 'conversation':
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    case 'follow_up':
      return <Calendar className="h-5 w-5 text-purple-500" />;
    case 'lead':
      return <User className="h-5 w-5 text-cyan-500" />;
    case 'campaign':
      return <Users className="h-5 w-5 text-indigo-500" />;
    case 'email':
      return <Mail className="h-5 w-5 text-yellow-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

export function getStageColor(stage: LeadStage): string {
  switch (stage) {
    case 'NEW':
      return '#3B82F6'; // blue-500
    case 'CONTACTED':
      return '#8B5CF6'; // purple-500
    case 'QUALIFIED':
      return '#06B6D4'; // cyan-500
    case 'PROPOSAL':
      return '#F59E0B'; // amber-500
    case 'NEGOTIATION':
      return '#F97316'; // orange-500
    case 'CONVERTED':
      return '#10B981'; // green-500
    case 'LOST':
      return '#EF4444'; // red-500
    default:
      return '#6B7280'; // gray-500
  }
}

export function getSourceColor(source?: LeadSource): string {
  if (!source) return '#6B7280'; // gray-500 as default
  
  switch (source) {
    case 'LINKEDIN':
      return '#0077B5'; // LinkedIn blue
    case 'COLD_EMAIL':
      return '#4F46E5'; // indigo-600
    case 'WEBSITE':
      return '#06B6D4'; // cyan-500
    case 'REFERRAL':
      return '#10B981'; // green-500
    case 'CONFERENCE':
      return '#F59E0B'; // amber-500
    case 'WEBINAR':
      return '#8B5CF6'; // purple-500
    case 'INBOUND_CALL':
      return '#EC4899'; // pink-500 
    case 'OUTBOUND_CALL':
      return '#9333EA'; // purple-600
    case 'SOCIAL_MEDIA':
      return '#3B82F6'; // blue-500
    case 'PARTNER':
      return '#F97316'; // orange-500
    case 'OTHER':
      return '#6B7280'; // gray-500
    default:
      return '#6B7280'; // gray-500
  }
}

export function getPriorityColor(priority?: number): string {
  if (!priority) return '#6B7280'; // gray-500 as default
  
  switch (priority) {
    case 1:
      return '#9CA3AF'; // gray-400 (lowest)
    case 2:
      return '#60A5FA'; // blue-400 (low)
    case 3:
      return '#FBBF24'; // amber-400 (medium)
    case 4:
      return '#F97316'; // orange-500 (high)
    case 5:
      return '#EF4444'; // red-500 (highest)
    default:
      return '#6B7280'; // gray-500
  }
}

export function getConfidenceColor(confidence?: number): string {
  if (confidence === undefined || confidence === null) return '#6B7280'; // gray-500 as default
  
  if (confidence >= 80) return '#10B981'; // green-500 (very high)
  if (confidence >= 60) return '#22C55E'; // green-600 (high)
  if (confidence >= 40) return '#FBBF24'; // amber-400 (medium)
  if (confidence >= 20) return '#F97316'; // orange-500 (low)
  return '#EF4444'; // red-500 (very low)
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

export function formatDateTime(dateString?: string): string {
  if (!dateString) return 'N/A';

  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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

export function formatPercentage(value?: number): string {
  if (value === undefined || value === null) return 'N/A';
  return `${Math.round(value)}%`;
}

export function getConfidenceLabel(confidence?: number): string {
  if (confidence === undefined || confidence === null) return 'Unknown';
  
  if (confidence >= 80) return 'Very High';
  if (confidence >= 60) return 'High';
  if (confidence >= 40) return 'Medium';
  if (confidence >= 20) return 'Low';
  return 'Very Low';
}

export function getPriorityLabel(priority?: number): string {
  if (!priority) return 'Not set';
  
  switch (priority) {
    case 1: return 'Very Low';
    case 2: return 'Low';
    case 3: return 'Medium';
    case 4: return 'High';
    case 5: return 'Very High';
    default: return 'Unknown';
  }
}

