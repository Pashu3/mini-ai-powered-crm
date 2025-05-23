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
  UserPlus,
  Target,
  ChevronDown,
  ChevronUp,
  Filter
} from "lucide-react";
import Link from "next/link";
import { getStageColor } from "@/utils/styleHelpers";
import { DashboardSkeleton } from "@/components/ui/DashboardSkeleton";
import { DashboardData } from "@/types/dashboard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

type LeadStage = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'CONVERTED' | 'LOST';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');

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

        const response = await fetch('/api/dashboard/overview');

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();

        if (data.success) {
          setDashboardData(data.data);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to load dashboard data');
        }
      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err);
        setError(err.message || "Failed to load dashboard data. Please try again later.");
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

  const getTotalLeads = () => {
    if (!dashboardData?.metrics) return 0;
    return Object.values(dashboardData.metrics.leadsByStage).reduce((acc, val) => acc + val, 0);
  };

  const getStagePercentage = (stage: string) => {
    if (!dashboardData?.metrics) return 0;
    const total = getTotalLeads();
    return total > 0 ? ((dashboardData.metrics.leadsByStage[stage] || 0) / total) * 100 : 0;
  };

  const formatPriority = (priority: number) => {
    switch (priority) {
      case 3: return <span className="text-red-500 font-medium">High</span>;
      case 2: return <span className="text-amber-500 font-medium">Medium</span>;
      default: return <span className="text-green-500 font-medium">Low</span>;
    }
  };

  const getRelativeTime = (date: string) => {
    if (!date) return "No date";

    const now = new Date();
    const past = new Date(date);

    if (isNaN(past.getTime())) return "Invalid date";

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

  const getPieChartData = () => {
    if (!dashboardData?.metrics) return [];

    return Object.entries(dashboardData.metrics.leadsByStage)
      .filter(([_, value]) => value > 0)
      .map(([stage, value]) => ({
        name: stage.charAt(0) + stage.slice(1).toLowerCase(),
        value
      }));
  };

  const getPieChartColors = () => {
    return [
      '#4f46e5', // NEW - primary
      '#f59e0b', // CONTACTED - amber
      '#3b82f6', // QUALIFIED - blue
      '#8b5cf6', // PROPOSAL - purple
      '#ec4899', // NEGOTIATION - pink
      '#10b981', // CONVERTED - green
      '#6b7280'  // LOST - gray
    ];
  };

  // Prepare timeline data for line chart
  const getTimelineData = () => {
    if (!dashboardData?.timeline) return [];

    return dashboardData.timeline.map(point => {
      // Format the date for display
      let name = '';
      if (point.date) {
        name = formatDate(point.date);
      } else if (point.weekStart && point.weekEnd) {
        name = `${formatDate(point.weekStart)}–${formatDate(point.weekEnd)}`;
      } else if (point.month) {
        name = point.month.substring(0, 3);
      } else if (point.year) {
        name = point.year.toString();
      }

      return {
        name,
        new: point.new,
        contacted: point.contacted,
        converted: point.converted,
        lost: point.lost
      };
    });
  };

  // Get lead source data for bar chart
  const getLeadSourceData = () => {
    if (!dashboardData?.metrics?.leadsBySource) return [];

    return Object.entries(dashboardData.metrics.leadsBySource)
      .map(([source, count]) => ({
        name: source.charAt(0).toUpperCase() + source.slice(1).toLowerCase(),
        count
      }))
      .sort((a, b) => b.count - a.count); // Sort by count descending
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to CRM</h1>
        <p className="text-muted-foreground">
          Your business overview for {dashboardData?.metrics ? formatDate(dashboardData.metrics.periodStart) : ''} to {dashboardData?.metrics ? formatDate(dashboardData.metrics.periodEnd) : ''}
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
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="inline-flex items-center gap-1 px-3 py-1 bg-card hover:bg-muted/50 border border-border rounded-md text-sm transition-colors"
          >
            <BarChart2 size={14} />
            <span>{showAnalytics ? 'Hide Analytics' : 'Show Analytics'}</span>
            {showAnalytics ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </motion.div>

      {loading ? (
        <DashboardSkeleton />
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
      ) : dashboardData?.metrics ? (
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
              <div className="text-2xl font-bold mt-2">{dashboardData.metrics.quickStats.totalLeads}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-sm font-medium">
                  +{dashboardData.metrics.quickStats.newLeadsThisWeek}
                </span>
                <span className="text-xs text-muted-foreground">new this week</span>
              </div>
              <Link href="/dashboard/leads" className="text-xs text-primary hover:underline flex items-center gap-1 mt-3 group-hover:text-primary/80">
                View details <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>

            {/* Contacted Leads */}
            <motion.div
              className="p-6 bg-card rounded-lg border border-border shadow-sm hover:bg-card/95 hover:shadow-md transition-all group"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-muted-foreground">Contacted Leads</h3>
                <div className="bg-amber-500/10 text-amber-500 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">{dashboardData.metrics.quickStats.contactedLeads}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs text-muted-foreground">
                  {Math.round((dashboardData.metrics.quickStats.contactedLeads / dashboardData.metrics.quickStats.totalLeads) * 100)}% of total
                </span>
              </div>
              <Link href="/dashboard/leads?stage=CONTACTED" className="text-xs text-primary hover:underline flex items-center gap-1 mt-3 group-hover:text-primary/80">
                View contacted <ArrowUpRight className="h-3 w-3" />
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
              <div className="text-2xl font-bold mt-2">{dashboardData.metrics.quickStats.conversionRate.toFixed(1)}%</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded-sm font-medium">
                  {dashboardData.metrics.quickStats.convertedLeads}
                </span>
                <span className="text-xs text-muted-foreground">converted leads</span>
              </div>
              <button
                onClick={() => setShowAnalytics(true)}
                className="text-xs text-primary hover:underline flex items-center gap-1 mt-3 group-hover:text-primary/80"
              >
                View analytics <ArrowUpRight className="h-3 w-3" />
              </button>
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
              <div className="text-2xl font-bold mt-2">{dashboardData.metrics.overview.pendingTasks}</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-sm font-medium">
                  {dashboardData.metrics.overview.todayTasks}
                </span>
                <span className="text-xs text-muted-foreground">due today</span>
              </div>
              <Link href="/dashboard/tasks" className="text-xs text-primary hover:underline flex items-center gap-1 mt-3 group-hover:text-primary/80">
                View tasks <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Analytics Section */}
          {showAnalytics && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Analytics & Performance</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Timeframe:</span>
                    <div className="flex bg-muted rounded-md overflow-hidden">
                      {(['weekly', 'monthly', 'quarterly'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTimeframe(t)}
                          className={`px-3 py-1 text-xs font-medium ${timeframe === t
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted-foreground/10'}`}
                        >
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lead Performance Chart */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Lead Performance</h4>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={getTimelineData()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickMargin={10} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="new" name="New Leads" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="contacted" name="Contacted" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="converted" name="Converted" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="lost" name="Lost" stroke="#6b7280" strokeWidth={2} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Lead Stage Distribution Pie Chart */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Lead Stage Distribution</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={getPieChartData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {getPieChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={getPieChartColors()[index % getPieChartColors().length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} leads`, 'Count']} />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Lead Sources Bar Chart */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Lead Sources</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={getLeadSourceData()}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis type="number" stroke="#6b7280" fontSize={12} />
                          <YAxis
                            dataKey="name"
                            type="category"
                            stroke="#6b7280"
                            fontSize={12}
                            width={100}
                            tickFormatter={(value) => value.length > 12 ? `${value.substring(0, 12)}...` : value}
                          />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" name="Leads" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Lead Stage Distribution & AI Recommendations */}
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
                    dashboardData.metrics.leadsByStage[stage] > 0 && (
                      <div key={stage} className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${getStageColor(stage as LeadStage)}`}></span>
                            <span>{stage.charAt(0) + stage.slice(1).toLowerCase()}</span>
                          </div>
                          <span className="font-medium">{dashboardData.metrics.leadsByStage[stage] || 0}</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className={`${getStageColor(stage as LeadStage)} h-full`}
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
                  <button
                    onClick={() => setShowAnalytics(true)}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    Analytics <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-muted/30 px-5 py-3.5 border-b border-border flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <Target size={16} className="text-primary" />
                  <span>AI Recommendations</span>
                </h3>
              </div>

              <div className="divide-y divide-border">
                {dashboardData.recommendations && dashboardData.recommendations.length > 0 ? (
                  dashboardData.recommendations.map((rec) => (
                    <div key={rec.leadId} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${rec.priority === 3 ? 'bg-red-500' : rec.priority === 2 ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                        <div>
                          <div className="font-medium text-sm">{rec.action}</div>
                          <div className="flex flex-wrap items-center gap-x-3 mt-1">
                            <Link href={`/dashboard/leads/${rec.leadId}`} className="text-xs text-primary hover:underline">
                              {rec.leadName}
                            </Link>
                            <span className="text-xs text-muted-foreground">{rec.company}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStageColor(rec.stage as LeadStage)}`}>
                              {rec.stage.charAt(0) + rec.stage.slice(1).toLowerCase()}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 italic">Reason: {rec.reason}</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <Target className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                    <p className="text-muted-foreground">No recommendations available</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Priority Tasks & Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Priority Tasks */}
            <motion.div
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-muted/30 px-5 py-3.5 border-b border-border flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  <span>Priority Tasks</span>
                </h3>
              </div>

              <div className="divide-y divide-border">
                {dashboardData.priorityTasks && dashboardData.priorityTasks.length > 0 ? (
                  dashboardData.priorityTasks.map((task) => (
                    <div key={task.id} className="p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{task.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${task.status === 'overdue' ? 'bg-red-100 text-red-700' : task.status === 'today' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                          {task.status === 'overdue' ? 'Overdue' : task.status === 'today' ? 'Today' : 'Upcoming'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link href={`/dashboard/leads/${task.lead.id}`} className="text-xs text-primary hover:underline">
                          {task.lead.name} {task.lead.company ? `• ${task.lead.company}` : ''}
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{formatPriority(task.priority)}</span>
                          <div className="text-xs font-medium">
                            <Clock className="inline h-3 w-3 mr-1 text-muted-foreground" />
                            {getRelativeTime(task.dueDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                    <p className="text-muted-foreground">No priority tasks</p>
                  </div>
                )}
              </div>

              <div className="py-3 px-4 border-t border-border text-center">
                <Link href="/dashboard/tasks" className="text-sm text-primary hover:underline">
                  Manage all tasks
                </Link>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="bg-muted/30 px-5 py-3.5 border-b border-border flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <Activity size={16} className="text-primary" />
                  <span>Recent Activity</span>
                </h3>
              </div>

              <div className="divide-y divide-border">
                {/* Recently Added Leads */}
                {dashboardData.metrics.recentActivity.recentlyAddedLeads.slice(0, 3).map(lead => (
                  <Link
                    key={`added-${lead.id}`}
                    href={`/dashboard/leads/${lead.id}`}
                    className="flex items-center p-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                      <UserPlus size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Added {lead.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {lead.company || 'No company'} • {formatDate(lead.createdAt)}
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Recently Updated Leads */}
                {dashboardData.metrics.recentActivity.recentlyUpdatedLeads.slice(0, 2).map(lead => (
                  <Link
                    key={`updated-${lead.id}`}
                    href={`/dashboard/leads/${lead.id}`}
                    className="flex items-center p-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mr-3">
                      <FileText size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Updated {lead.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {lead.company || 'No company'} • {formatDate(lead.updatedAt)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="py-3 px-4 border-t border-border text-center">
                <Link href="/dashboard/leads" className="text-sm text-primary hover:underline">
                  View all leads
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Campaigns */}
          <motion.div
            className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-muted/30 px-5 py-3.5 border-b border-border flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <MailIcon size={16} className="text-primary" />
                <span>Campaigns</span>
              </h3>
              <Link href="/dashboard/campaigns/new" className="text-xs text-primary hover:underline flex items-center gap-1">
                <FilePlus className="h-3.5 w-3.5" />
                <span>New Campaign</span>
              </Link>
            </div>

            <div className="overflow-x-auto">
              {dashboardData.metrics.campaigns && dashboardData.metrics.campaigns.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-medium text-muted-foreground bg-muted/30">
                      <th className="px-4 py-2 text-left">Campaign</th>
                      <th className="px-4 py-2 text-center">Status</th>
                      <th className="px-4 py-2 text-center">Total Leads</th>
                      <th className="px-4 py-2 text-center">Contacted</th>
                      <th className="px-4 py-2 text-center">Converted</th>
                      <th className="px-4 py-2 text-center">Conv. Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {dashboardData.metrics.campaigns.map((campaign) => (
                      <tr key={campaign.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <Link href={`/dashboard/campaigns/${campaign.id}`} className="font-medium text-sm hover:underline">
                            {campaign.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-sm">{campaign.totalLeads}</td>
                        <td className="px-4 py-3 text-center text-sm">{campaign.contactedLeads}</td>
                        <td className="px-4 py-3 text-center text-sm">{campaign.convertedLeads}</td>
                        <td className="px-4 py-3 text-center text-sm">{campaign.conversionRate.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

          {/* Advanced Analytics Section */}
          {showAnalytics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                <div className="bg-muted/30 px-5 py-3.5 border-b border-border">
                  <h3 className="font-medium flex items-center gap-2">
                    <BarChart2 size={16} className="text-primary" />
                    <span>Advanced Analytics</span>
                  </h3>
                </div>

                <div className="p-5 space-y-5">
                  {/* Performance Metrics */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Performance by Lead Source</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={getLeadSourceData()}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                          <YAxis stroke="#6b7280" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Legend />
                          <Bar dataKey="count" name="Leads" fill="#4f46e5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Conversion Funnel */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Conversion Funnel</h4>
                    <div className="flex items-center justify-center space-x-1 h-64">
                      {['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED'].map((stage, index) => {
                        const value = dashboardData.metrics.leadsByStage[stage] || 0;
                        const maxValue = Math.max(...Object.values(dashboardData.metrics.leadsByStage));
                        const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
                        const width = 100 - index * 10; // Make each stage slightly narrower

                        return (
                          <div key={stage} className="flex flex-col items-center">
                            <div
                              className={`w-20 ${getStageColor(stage as LeadStage)} relative rounded-t-md`}
                              style={{ height: `${height}%`, maxHeight: '90%', minHeight: '5%' }}
                            >
                              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center p-1">
                                <span className="text-xs text-white font-medium">{value}</span>
                              </div>
                            </div>
                            <div className="w-20 bg-muted/30 p-1 rounded-b-md">
                              <span className="text-[10px] block text-center truncate">
                                {stage.charAt(0) + stage.slice(1).toLowerCase()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Conversion Rate Over Time */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Conversion Rate Over Time</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={getTimelineData()}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                          <YAxis
                            stroke="#6b7280"
                            fontSize={12}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip
                            formatter={(value) => [`${value}%`, 'Conversion Rate']}
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="rate"
                            name="Conversion Rate"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="py-3 px-4 border-t border-border flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Data updated {dashboardData.metrics ? formatDate(dashboardData.metrics.periodEnd) : ''}</span>
                  <button
                    onClick={() => window.open('/api/dashboard/export', '_blank')}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Export data</span>
                  </button>
                </div>
              </div>

              {/* Performance Radar Chart */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-muted/30 px-5 py-3.5 border-b border-border">
                    <h3 className="font-medium">Performance Radar</h3>
                  </div>

                  <div className="p-5">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={[
                          { subject: 'New Leads', A: dashboardData.metrics.quickStats.newLeadsThisWeek, fullMark: 100 },
                          { subject: 'Contacted', A: dashboardData.metrics.quickStats.contactedLeads, fullMark: 100 },
                          { subject: 'Conversion', A: dashboardData.metrics.quickStats.conversionRate, fullMark: 100 },
                          { subject: 'Tasks', A: dashboardData.metrics.overview.pendingTasks, fullMark: 100 },
                          { subject: 'Activities', A: dashboardData.metrics.overview.conversationsThisMonth, fullMark: 100 },
                        ]}>
                          <PolarGrid stroke="#e5e7eb" />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis />
                          <Radar name="Performance" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* AI-Generated Insights */}
                <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-muted/30 px-5 py-3.5 border-b border-border flex items-center justify-between">
                    <h3 className="font-medium flex items-center gap-2">
                      <Target size={16} className="text-primary" />
                      <span>AI-Generated Insights</span>
                    </h3>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
                      <h4 className="text-sm font-medium text-primary mb-2">Conversion Rate Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Your conversion rate of {dashboardData.metrics.quickStats.conversionRate.toFixed(1)}% is
                        {dashboardData.metrics.quickStats.conversionRate > 15 ? ' above' : ' below'} industry average.
                        {dashboardData.metrics.quickStats.conversionRate > 15
                          ? ' Great job! Focus on maintaining your successful strategies.'
                          : ' Try implementing more personalized follow-up sequences to improve conversion.'}
                      </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-amber-800 mb-2">Task Management</h4>
                      <p className="text-sm text-amber-700">
                        You have {dashboardData.metrics.overview.overdueTasks} overdue tasks. Consider addressing these
                        soon to improve lead response times and potentially increase conversion rates.
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">Lead Source Performance</h4>
                      <p className="text-sm text-blue-700">
                        Your top-performing lead source is
                        {getLeadSourceData().length > 0 ? ` "${getLeadSourceData()[0].name}"` : ' unavailable'}.
                        Consider allocating more resources to this channel for optimal results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            className="p-5 bg-card border border-border rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link
                href="/dashboard/leads/new"
                className="p-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg flex flex-col items-center text-center gap-2 transition-colors"
              >
                <UserPlus className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Add New Lead</span>
              </Link>

              <Link
                href="/dashboard/tasks/new"
                className="p-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg flex flex-col items-center text-center gap-2 transition-colors"
              >
                <Calendar className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-medium">Create Task</span>
              </Link>

              <Link
                href="/dashboard/conversations/new"
                className="p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg flex flex-col items-center text-center gap-2 transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Log Conversation</span>
              </Link>

              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="p-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-lg flex flex-col items-center text-center gap-2 transition-colors"
              >
                <BarChart2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">{showAnalytics ? 'Hide Analytics' : 'View Analytics'}</span>
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </div>
  );
}