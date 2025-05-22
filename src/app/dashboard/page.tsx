"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Users, 
  Clock, 
  MessageSquare, 
  FilePlus,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  User,
  Activity,
  BarChart2,
  Calendar,
  MailIcon,
  FileText,
  Phone,
  PieChart,
  UserPlus
} from "lucide-react";
import Link from "next/link";
import { getStageColor } from "@/utils/styleHelpers";

// Types based on your dashboard service response
interface DashboardMetrics {
  overview: {
    totalLeads: number;
    activeLeads: number;
    newLeadsThisMonth: number;
    convertedLeadsThisMonth: number;
    conversionRate: number;
    totalConversations: number;
    conversationsThisMonth: number;
    pendingTasks: number;
  };
  leadsByStage: Record<string, number>;
  campaigns: Array<{
    id: string;
    name: string;
    leadCount: number;
  }>;
  periodStart: string;
  periodEnd: string;
}

interface HistoricalMetric {
  month: string;
  year: number;
  value: number;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<any[]>([]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch dashboard overview metrics
        const metricsRes = await fetch('/api/dashboard');
        if (!metricsRes.ok) throw new Error('Failed to fetch dashboard data');
        const metricsData = await metricsRes.json();
        
        // Fetch recent leads
        const recentLeadsRes = await fetch('/api/leads?limit=5');
        if (!recentLeadsRes.ok) throw new Error('Failed to fetch recent leads');
        const recentLeadsData = await recentLeadsRes.json();
        
        // Fetch upcoming tasks
        const tasksRes = await fetch('/api/tasks?status=PENDING&limit=5');
        if (!tasksRes.ok) throw new Error('Failed to fetch tasks');
        const tasksData = await tasksRes.json();
        
        setMetrics(metricsData.data);
        setRecentLeads(recentLeadsData.data?.leads || []);
        setUpcomingTasks(tasksData.data?.tasks || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        
        // Set mock data for development testing
        setMetrics({
          overview: {
            totalLeads: 128,
            activeLeads: 85,
            newLeadsThisMonth: 23,
            convertedLeadsThisMonth: 12,
            conversionRate: 18.5,
            totalConversations: 312,
            conversationsThisMonth: 47,
            pendingTasks: 7,
          },
          leadsByStage: {
            NEW: 32,
            CONTACTED: 28,
            QUALIFIED: 15,
            PROPOSAL: 10,
            NEGOTIATION: 8,
            CONVERTED: 25,
            LOST: 10,
          },
          campaigns: [
            { id: "1", name: "Q2 Email Outreach", leadCount: 45 },
            { id: "2", name: "Product Launch", leadCount: 32 },
            { id: "3", name: "Referral Program", leadCount: 28 },
          ],
          periodStart: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
          periodEnd: new Date().toISOString(),
        });
        
        // Mock recent leads
        setRecentLeads([
          { id: '1', name: 'John Smith', company: 'Acme Corp', stage: 'QUALIFIED', email: 'john@acme.com', createdAt: new Date().toISOString() },
          { id: '2', name: 'Sarah Wilson', company: 'Globex', stage: 'NEW', email: 'sarah@globex.com', createdAt: new Date().toISOString() },
          { id: '3', name: 'Michael Brown', company: 'Tech Solutions', stage: 'PROPOSAL', email: 'michael@techsol.com', createdAt: new Date().toISOString() },
        ]);
        
        // Mock upcoming tasks
        setUpcomingTasks([
          { id: '1', title: 'Follow-up call', dueDate: new Date(Date.now() + 86400000).toISOString(), priority: 3, status: 'PENDING', leadId: '1', leadName: 'John Smith' },
          { id: '2', title: 'Send proposal', dueDate: new Date(Date.now() + 172800000).toISOString(), priority: 2, status: 'PENDING', leadId: '3', leadName: 'Michael Brown' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Calculate lead stage percentages for display
  const getTotalLeads = () => {
    if (!metrics) return 0;
    return Object.values(metrics.leadsByStage).reduce((acc, val) => acc + val, 0);
  };
  
  const getStagePercentage = (stage: string) => {
    if (!metrics) return 0;
    const total = getTotalLeads();
    return total > 0 ? ((metrics.leadsByStage[stage] || 0) / total) * 100 : 0;
  };

  // Format priority for display
  const formatPriority = (priority: number) => {
    switch(priority) {
      case 3: return <span className="text-red-500 font-medium">High</span>;
      case 2: return <span className="text-amber-500 font-medium">Medium</span>;
      default: return <span className="text-green-500 font-medium">Low</span>;
    }
  };

  // Format relative time
  const getRelativeTime = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffTime = Math.abs(now.getTime() - past.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else if (diffDays < 7) {
      return `In ${diffDays} days`;
    } else {
      return formatDate(date);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with welcome message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-border/50"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to your CRM</h1>
        <p className="text-muted-foreground">
          Your business overview for {metrics ? formatDate(metrics.periodStart) : ''} to {metrics ? formatDate(metrics.periodEnd) : ''}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Link href="/dashboard/leads/new" className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm transition-colors">
            <UserPlus size={14} />
            <span>Add Lead</span>
          </Link>
          <Link href="/dashboard/tasks" className="inline-flex items-center gap-1 px-3 py-1 bg-card hover:bg-muted/50 border border-border rounded-md text-sm transition-colors">
            <Clock size={14} />
            <span>Manage Tasks</span>
          </Link>
          <Link href="/dashboard/analytics" className="inline-flex items-center gap-1 px-3 py-1 bg-card hover:bg-muted/50 border border-border rounded-md text-sm transition-colors">
            <BarChart2 size={14} />
            <span>View Analytics</span>
          </Link>
        </div>
      </motion.div>
      
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-6 bg-card rounded-lg border border-border shadow-sm">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-24 mb-3"></div>
                <div className="h-7 bg-muted rounded w-16 mb-2"></div>
                <div className="h-3 bg-muted rounded w-32 mb-4"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
          <AlertCircle className="h-6 w-6 mb-2" />
          <h3 className="font-medium text-lg">Error loading dashboard</h3>
          <p>{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded-md text-sm"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : metrics ? (
        <>
          {/* Key metrics */}
          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Total Leads */}
            <motion.div 
              className="p-6 bg-card rounded-lg border border-border shadow-sm hover:bg-card/95 hover:shadow-md transition-all group"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-muted-foreground">Total Leads</h3>
                <div className="bg-primary/10 text-primary p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">{metrics.overview.totalLeads}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-sm font-medium">
                  +{metrics.overview.newLeadsThisMonth}
                </span>
                <span className="text-xs text-muted-foreground">new this month</span>
              </div>
              <Link href="/dashboard/leads" className="text-xs text-primary hover:underline flex items-center gap-1 mt-3 group-hover:text-primary/80">
                View details <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>

            {/* Active Leads */}
            <motion.div 
              className="p-6 bg-card rounded-lg border border-border shadow-sm hover:bg-card/95 hover:shadow-md transition-all group"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-muted-foreground">Active Leads</h3>
                <div className="bg-amber-500/10 text-amber-500 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Activity className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">{metrics.overview.activeLeads}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs text-muted-foreground">
                  {Math.round((metrics.overview.activeLeads / metrics.overview.totalLeads) * 100)}% of total
                </span>
              </div>
              <Link href="/dashboard/leads?stage=CONTACTED" className="text-xs text-primary hover:underline flex items-center gap-1 mt-3 group-hover:text-primary/80">
                View active <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>

            {/* Conversion Rate */}
            <motion.div 
              className="p-6 bg-card rounded-lg border border-border shadow-sm hover:bg-card/95 hover:shadow-md transition-all group"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
                <div className="bg-green-500/10 text-green-500 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">{metrics.overview.conversionRate.toFixed(1)}%</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-sm font-medium">
                  {metrics.overview.convertedLeadsThisMonth}
                </span>
                <span className="text-xs text-muted-foreground">conversions this month</span>
              </div>
              <Link href="/dashboard/analytics" className="text-xs text-primary hover:underline flex items-center gap-1 mt-3 group-hover:text-primary/80">
                View analytics <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>

            {/* Pending Tasks */}
            <motion.div 
              className="p-6 bg-card rounded-lg border border-border shadow-sm hover:bg-card/95 hover:shadow-md transition-all group"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-muted-foreground">Pending Tasks</h3>
                <div className="bg-blue-500/10 text-blue-500 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">{metrics.overview.pendingTasks}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs text-muted-foreground">
                  Require your attention
                </span>
              </div>
              <Link href="/dashboard/tasks" className="text-xs text-primary hover:underline flex items-center gap-1 mt-3 group-hover:text-primary/80">
                View tasks <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Lead Stage Distribution & Recent Leads */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Lead Stages */}
            <motion.div
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-muted/30 px-5 py-3.5 border-b border-border flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <PieChart size={16} className="text-primary" />
                  <span>Lead Stage Distribution</span>
                </h3>
                <span className="text-xs text-muted-foreground">{getTotalLeads()} total leads</span>
              </div>
              
              <div className="p-5">
                <div className="space-y-3">
                  {['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST'].map((stage) => (
                    metrics.leadsByStage[stage] > 0 && (
                      <div key={stage} className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${getStageColor(stage).replace('bg-', '')}`}></span>
                            <span>{stage.charAt(0) + stage.slice(1).toLowerCase()}</span>
                          </div>
                          <span className="font-medium">{metrics.leadsByStage[stage] || 0}</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
                          <motion.div 
                            className={`${getStageColor(stage).replace('bg-', 'bg-')}/90 h-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${getStagePercentage(stage)}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    )
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">See detailed breakdown for more insights</span>
                  <Link href="/dashboard/analytics" className="text-xs text-primary hover:underline flex items-center gap-1">
                    Analytics <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Recent Leads */}
            <motion.div
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-muted/30 px-5 py-3.5 border-b border-border flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <User size={16} className="text-primary" />
                  <span>Recent Leads</span>
                </h3>
                <Link href="/dashboard/leads/new" className="text-xs text-primary hover:underline flex items-center gap-1">
                  <FilePlus className="h-3.5 w-3.5" />
                  <span>New Lead</span>
                </Link>
              </div>
              
              <div className="divide-y divide-border">
                {recentLeads.length > 0 ? (
                  recentLeads.map((lead) => (
                    <Link 
                      key={lead.id} 
                      href={`/dashboard/leads/${lead.id}`}
                      className="flex items-center p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{lead.name}</span>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getStageColor(lead.stage)}`}>
                            {lead.stage.charAt(0) + lead.stage.slice(1).toLowerCase()}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 truncate">{lead.company} • {lead.email}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <User className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                    <p className="text-muted-foreground">No recent leads</p>
                  </div>
                )}
              </div>
              
              <div className="py-3 px-4 border-t border-border text-center">
                <Link href="/dashboard/leads" className="text-sm text-primary hover:underline">
                  View all leads
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Tasks & Campaigns */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Upcoming Tasks */}
            <motion.div
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-muted/30 px-5 py-3.5 border-b border-border flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span>Upcoming Tasks</span>
                </h3>
                <span className="text-xs text-muted-foreground">{metrics.overview.pendingTasks} pending tasks</span>
              </div>
              
              <div className="divide-y divide-border">
                {upcomingTasks.length > 0 ? (
                  upcomingTasks.map((task) => (
                    <div key={task.id} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{task.title}</span>
                        <span className="text-xs">{formatPriority(task.priority)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link href={`/dashboard/leads/${task.leadId}`} className="text-xs text-primary hover:underline">
                          {task.leadName}
                        </Link>
                        <div className="text-xs font-medium">
                          <Clock className="inline h-3 w-3 mr-1 text-muted-foreground" />
                          {getRelativeTime(task.dueDate)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                    <p className="text-muted-foreground">No pending tasks</p>
                  </div>
                )}
              </div>
              
              <div className="py-3 px-4 border-t border-border text-center">
                <Link href="/dashboard/tasks" className="text-sm text-primary hover:underline">
                  Manage all tasks
                </Link>
              </div>
            </motion.div>
            
            {/* Active Campaigns */}
            <motion.div
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="bg-muted/30 px-5 py-3.5 border-b border-border flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <MailIcon size={16} className="text-primary" />
                  <span>Active Campaigns</span>
                </h3>
                <Link href="/dashboard/campaigns/new" className="text-xs text-primary hover:underline flex items-center gap-1">
                  <FilePlus className="h-3.5 w-3.5" />
                  <span>New Campaign</span>
                </Link>
              </div>
              
              <div className="divide-y divide-border">
                {metrics.campaigns.length > 0 ? (
                  metrics.campaigns.map((campaign) => (
                    <div key={campaign.id} className="px-4 py-3 hover:bg-muted/30 transition-colors">
                      <div className="flex justify-between items-center">
                        <Link href={`/dashboard/campaigns/${campaign.id}`} className="font-medium text-sm hover:underline">
                          {campaign.name}
                        </Link>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {campaign.leadCount} leads
                        </span>
                      </div>
                      <div className="flex gap-3 mt-2">
                        <Link 
                          href={`/dashboard/campaigns/${campaign.id}/edit`}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <FileText className="inline h-3 w-3 mr-1" />
                          Edit
                        </Link>
                        <Link 
                          href={`/dashboard/campaigns/${campaign.id}/emails`}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <MailIcon className="inline h-3 w-3 mr-1" />
                          Emails
                        </Link>
                        <Link 
                          href={`/dashboard/campaigns/${campaign.id}/leads`}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Users className="inline h-3 w-3 mr-1" />
                          Leads
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <MailIcon className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                    <p className="text-muted-foreground">No active campaigns</p>
                    <Link 
                      href="/dashboard/campaigns/new" 
                      className="mt-2 inline-block text-primary hover:underline text-sm"
                    >
                      Create your first campaign
                    </Link>
                  </div>
                )}
              </div>
              
              <div className="py-3 px-4 border-t border-border text-center">
                <Link href="/dashboard/campaigns" className="text-sm text-primary hover:underline">
                  View all campaigns
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Quick Actions */}
          <motion.div
            className="p-5 bg-muted/20 border border-border rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/dashboard/leads/new" className="p-4 bg-card border border-border rounded-lg hover:bg-primary/5 hover:border-primary/20 transition-colors flex flex-col items-center text-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <span className="text-sm">Add New Lead</span>
              </Link>
              
              <Link href="/dashboard/tasks/new" className="p-4 bg-card border border-border rounded-lg hover:bg-primary/5 hover:border-primary/20 transition-colors flex flex-col items-center text-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm">Create Task</span>
              </Link>
              
              <Link href="/dashboard/conversations/new" className="p-4 bg-card border border-border rounded-lg hover:bg-primary/5 hover:border-primary/20 transition-colors flex flex-col items-center text-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="text-sm">Log Conversation</span>
              </Link>
              
              <Link href="/dashboard/analytics" className="p-4 bg-card border border-border rounded-lg hover:bg-primary/5 hover:border-primary/20 transition-colors flex flex-col items-center text-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary" />
                <span className="text-sm">View Analytics</span>
              </Link>
            </div>
          </motion.div>
        </>
      ) : null}
    </div>
  );
}