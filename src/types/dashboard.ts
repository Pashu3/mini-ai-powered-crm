export interface QuickStats {
  totalLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  lostLeads: number;
  newLeadsThisWeek: number;
  conversionRate: number;
}

export interface OverviewStats extends QuickStats {
  totalConversations: number;
  conversationsThisMonth: number;
  pendingTasks: number;
  todayTasks: number;
  overdueTasks: number;
}

export interface CampaignStat {
  id: string;
  name: string;
  status: string;
  totalLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  conversionRate: number;
}

export interface RecentLead {
  id: string;
  name: string;
  company: string;
  createdAt: string;
}

export interface RecentlyUpdatedLead {
  id: string;
  name: string;
  company: string;
  updatedAt: string;
}

export interface DashboardMetrics {
  quickStats: QuickStats;
  overview: OverviewStats;
  leadsByStage: Record<string, number>;
  leadsBySource: Record<string, number>;
  campaigns: CampaignStat[];
  recentActivity: {
    recentlyAddedLeads: RecentLead[];
    recentlyUpdatedLeads: RecentlyUpdatedLead[];
  };
  reminders: any[];
  periodStart: string;
  periodEnd: string;
}

export interface TimelinePoint {
  date?: string;
  weekStart?: string;
  weekEnd?: string;
  month?: string;
  year?: number;
  new: number;
  contacted: number;
  converted: number;
  lost: number;
}

export interface Recommendation {
  leadId: string;
  leadName: string;
  company: string;
  priority: number;
  stage: string;
  action: string;
  reason: string;
  suggestionId?: string;
}

export interface PriorityTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  status: 'overdue' | 'today' | 'upcoming';
  lead: {
    id: string;
    name: string;
    company: string;
  };
}

export interface DashboardData {
  metrics: DashboardMetrics;
  timeline: TimelinePoint[];
  recommendations: Recommendation[];
  priorityTasks: PriorityTask[];
}