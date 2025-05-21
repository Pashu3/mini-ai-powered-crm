"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  BarChart2, 
  Clock, 
  Mail, 
  MessageSquare, 
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FilePlus
} from "lucide-react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

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
  const [historicalLeads, setHistoricalLeads] = useState<HistoricalMetric[]>([]);
  const [historicalConversions, setHistoricalConversions] = useState<HistoricalMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        
        // Fetch historical leads data
        const leadsHistoryRes = await fetch('/api/dashboard?metric=leads&months=6');
        if (!leadsHistoryRes.ok) throw new Error('Failed to fetch leads history');
        const leadsHistoryData = await leadsHistoryRes.json();
        
        // Fetch historical conversions data
        const conversionsHistoryRes = await fetch('/api/dashboard?metric=conversions&months=6');
        if (!conversionsHistoryRes.ok) throw new Error('Failed to fetch conversions history');
        const conversionsHistoryData = await conversionsHistoryRes.json();
        
        setMetrics(metricsData.data);
        setHistoricalLeads(leadsHistoryData.data);
        setHistoricalConversions(conversionsHistoryData.data);
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
        
        setHistoricalLeads([
          { month: 'Jan', year: 2023, value: 48 },
          { month: 'Feb', year: 2023, value: 62 },
          { month: 'Mar', year: 2023, value: 57 },
          { month: 'Apr', year: 2023, value: 73 },
          { month: 'May', year: 2023, value: 82 },
          { month: 'Jun', year: 2023, value: 95 },
        ]);
        
        setHistoricalConversions([
          { month: 'Jan', year: 2023, value: 8 },
          { month: 'Feb', year: 2023, value: 12 },
          { month: 'Mar', year: 2023, value: 10 },
          { month: 'Apr', year: 2023, value: 15 },
          { month: 'May', year: 2023, value: 18 },
          { month: 'Jun', year: 2023, value: 22 },
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

  // Prepare chart data
  const chartData = {
    labels: historicalLeads.map(item => `${item.month} ${item.year}`),
    datasets: [
      {
        label: 'New Leads',
        data: historicalLeads.map(item => item.value),
        borderColor: '#054E98',
        backgroundColor: 'rgba(5, 78, 152, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Conversions',
        data: historicalConversions.map(item => item.value),
        borderColor: '#0CAF60',
        backgroundColor: 'rgba(12, 175, 96, 0.1)',
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
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

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Your CRM overview for {metrics ? formatDate(metrics.periodStart) : ''} to {metrics ? formatDate(metrics.periodEnd) : ''}
        </p>
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
              className="p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium">Total Leads</h3>
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold mt-2">{metrics.overview.totalLeads}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.overview.newLeadsThisMonth} new this month
              </p>
              <Link href="/dashboard/leads" className="text-xs text-primary flex items-center gap-1 mt-4">
                View leads <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>

            {/* Conversion Rate */}
            <motion.div 
              className="p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium">Conversion Rate</h3>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold mt-2">{metrics.overview.conversionRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.overview.convertedLeadsThisMonth} conversions this month
              </p>
              <Link href="/dashboard/analytics" className="text-xs text-primary flex items-center gap-1 mt-4">
                View analytics <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>

            {/* Active Conversations */}
            <motion.div 
              className="p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium">Conversations</h3>
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold mt-2">{metrics.overview.totalConversations}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.overview.conversationsThisMonth} new this month
              </p>
              <Link href="/dashboard/conversations" className="text-xs text-primary flex items-center gap-1 mt-4">
                View conversations <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>

            {/* Pending Tasks */}
            <motion.div 
              className="p-6 bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium">Pending Tasks</h3>
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="text-2xl font-bold mt-2">{metrics.overview.pendingTasks}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Need your attention
              </p>
              <Link href="/dashboard/tasks" className="text-xs text-primary flex items-center gap-1 mt-4">
                View tasks <ArrowUpRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Charts row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-medium mb-4">Performance Trends</h3>
            <div className="h-72">
              <Line data={chartData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Sales funnel & Campaigns */}
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              className="bg-card border border-border rounded-lg shadow-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-medium mb-4">Sales Funnel</h3>
              <div className="space-y-4">
                {['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED'].map((stage) => (
                  metrics.leadsByStage[stage] > 0 && (
                    <div key={stage} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{stage.charAt(0) + stage.slice(1).toLowerCase()}</span>
                        <span className="font-medium">{metrics.leadsByStage[stage] || 0}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="bg-primary h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${getStagePercentage(stage)}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  )
                ))}
                <Link href="/dashboard/leads" className="text-sm text-primary flex items-center gap-1 mt-2">
                  View all leads <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-card border border-border rounded-lg shadow-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Active Campaigns</h3>
                <Link href="/dashboard/campaigns" className="text-sm text-primary flex items-center gap-1">
                  <FilePlus className="h-4 w-4" />
                  <span>New</span>
                </Link>
              </div>
              <div className="space-y-3">
                {metrics.campaigns.length > 0 ? (
                  metrics.campaigns.map((campaign) => (
                    <motion.div 
                      key={campaign.id}
                      className="flex items-center justify-between p-3 bg-background rounded-md hover:bg-accent/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div>
                        <Link href={`/dashboard/campaigns/${campaign.id}`} className="font-medium text-sm hover:underline">
                          {campaign.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {campaign.leadCount} leads
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Link 
                          href={`/dashboard/campaigns/${campaign.id}/edit`}
                          className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          <Mail className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Mail className="mx-auto h-8 w-8 opacity-20 mb-2" />
                    <p>No active campaigns</p>
                    <Link 
                      href="/dashboard/campaigns/new" 
                      className="mt-2 inline-block text-primary hover:underline"
                    >
                      Create your first campaign
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      ) : null}
    </div>
  );
}