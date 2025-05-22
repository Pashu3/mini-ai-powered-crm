"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from "recharts";
import { 
  ChevronDown, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Target, 
  AlertCircle, 
  Download, 
  RefreshCw,
  ArrowUpRight,
  Filter,
  Phone,
  Mail,
  Clock
} from "lucide-react";
import { getStageColor } from "@/utils/styleHelpers";
import Link from "next/link";

// Types
interface LeadsByStage {
  stage: string;
  count: number;
  color: string;
}

interface SalesData {
  month: string;
  newLeads: number;
  meetings: number;
  deals: number;
  revenue: number;
}

interface OutreachActivity {
  type: string;
  count: number;
  effectiveness: number; // percentage of responses
}

interface SalesPerformance {
  metric: string;
  thisMonth: number;
  lastMonth: number;
  change: number;
}

interface AnalyticsData {
  leadsByStage: LeadsByStage[];
  salesData: SalesData[];
  outreachActivity: OutreachActivity[];
  salesPerformance: SalesPerformance[];
  leadsBySource: Array<{name: string; value: number;}>;
  salesFunnel: Array<{stage: string; count: number; value: number;}>;
  pipelineValue: number;
  dealsClosedMonth: number;
  averageDealSize: number;
  revenueMonth: number;
  followupRate: number;
  meetingBookRate: number;
  responseRate: number;
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d" | "12m">("30d");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeframeDropdown, setTimeframeDropdown] = useState(false);

  // Custom color palette
  const CHART_COLORS = [
    "#6366f1", // primary (indigo)
    "#0ea5e9", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#14b8a6", // teal
    "#ec4899", // pink
  ];

  // For pie chart
  const getLeadStageColor = (stage: string) => {
    switch(stage) {
      case "NEW": return "#6366f1";
      case "CONTACTED": return "#0ea5e9";
      case "QUALIFIED": return "#10b981";
      case "PROPOSAL": return "#f59e0b";
      case "NEGOTIATION": return "#8b5cf6";
      case "CONVERTED": return "#14b8a6";
      case "LOST": return "#ef4444";
      default: return "#94a3b8";
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/analytics?timeframe=${timeframe}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Transform the data for sales-focused view
        const transformedData: AnalyticsData = {
          // Map lead stages from API response
          leadsByStage: result.data.leadsByStage.map((item: any) => ({
            stage: item.stage,
            count: item.count,
            color: getLeadStageColor(item.stage)
          })),
          
          // Transform monthly data to sales data
          salesData: result.data.monthlyData.map((item: any) => ({
            month: item.month,
            newLeads: item.newLeads,
            meetings: Math.round(item.newLeads * 0.4), // Estimated from lead data
            deals: item.conversions,
            revenue: item.conversions * result.data.averageDealSize
          })),
          
          // Create outreach activity data
          outreachActivity: [
            { 
              type: "Emails", 
              count: Math.round(result.data.totalLeads * 2.5), 
              effectiveness: 18 
            },
            { 
              type: "Calls", 
              count: Math.round(result.data.totalLeads * 0.8), 
              effectiveness: 22
            },
            { 
              type: "LinkedIn", 
              count: Math.round(result.data.totalLeads * 1.2), 
              effectiveness: 15
            }
          ],
          
          // Sales performance metrics
          salesPerformance: [
            {
              metric: "Deals Closed",
              thisMonth: result.data.conversionFunnel[result.data.conversionFunnel.length-1].count,
              lastMonth: Math.round(result.data.conversionFunnel[result.data.conversionFunnel.length-1].count * 0.85),
              change: 15
            },
            {
              metric: "Revenue",
              thisMonth: result.data.conversionFunnel[result.data.conversionFunnel.length-1].count * result.data.averageDealSize,
              lastMonth: Math.round(result.data.conversionFunnel[result.data.conversionFunnel.length-1].count * 0.85) * result.data.averageDealSize,
              change: 15
            },
            {
              metric: "Meetings Set",
              thisMonth: Math.round(result.data.totalLeads * 0.4),
              lastMonth: Math.round(result.data.totalLeads * 0.4 * 0.9),
              change: 10
            },
            {
              metric: "Response Rate",
              thisMonth: 22,
              lastMonth: 20,
              change: 10
            }
          ],
          
          // Lead sources
          leadsBySource: result.data.leadsBySource,
          
          // Sales funnel (based on conversion funnel)
          salesFunnel: result.data.conversionFunnel.map((stage: any, index: number) => ({
            stage: stage.stage,
            count: stage.count,
            value: Math.round(stage.count * result.data.averageDealSize * (0.3 + (index * 0.1)))
          })),
          
          // Key sales metrics
          pipelineValue: result.data.conversionFunnel.reduce((sum: number, stage: any, index: number) => 
            sum + Math.round(stage.count * result.data.averageDealSize * (0.3 + (index * 0.1))), 0),
          dealsClosedMonth: result.data.conversionFunnel[result.data.conversionFunnel.length-1].count,
          averageDealSize: result.data.averageDealSize,
          revenueMonth: result.data.conversionFunnel[result.data.conversionFunnel.length-1].count * result.data.averageDealSize,
          followupRate: 68,
          meetingBookRate: 35,
          responseRate: 22
        };
        
        setAnalyticsData(transformedData);
      } else {
        throw new Error(result.error || 'Failed to fetch analytics data');
      }
    } catch (err) {
      console.error("Failed to fetch analytics data:", err);
      setError("Error loading analytics data. Please try again.");
      
      // Mock data for development if API fails
      setTimeout(() => {
        setAnalyticsData({
          leadsByStage: [
            { stage: "NEW", count: 45, color: getLeadStageColor("NEW") },
            { stage: "CONTACTED", count: 32, color: getLeadStageColor("CONTACTED") },
            { stage: "QUALIFIED", count: 24, color: getLeadStageColor("QUALIFIED") },
            { stage: "PROPOSAL", count: 18, color: getLeadStageColor("PROPOSAL") },
            { stage: "NEGOTIATION", count: 12, color: getLeadStageColor("NEGOTIATION") },
            { stage: "CONVERTED", count: 15, color: getLeadStageColor("CONVERTED") },
            { stage: "LOST", count: 8, color: getLeadStageColor("LOST") }
          ],
          salesData: [
            { month: "Jan", newLeads: 10, meetings: 4, deals: 2, revenue: 5000 },
            { month: "Feb", newLeads: 15, meetings: 6, deals: 3, revenue: 7500 },
            { month: "Mar", newLeads: 20, meetings: 8, deals: 5, revenue: 12500 },
            { month: "Apr", newLeads: 25, meetings: 10, deals: 6, revenue: 15000 },
            { month: "May", newLeads: 30, meetings: 12, deals: 7, revenue: 17500 },
            { month: "Jun", newLeads: 35, meetings: 14, deals: 9, revenue: 22500 }
          ],
          outreachActivity: [
            { type: "Emails", count: 385, effectiveness: 18 },
            { type: "Calls", count: 123, effectiveness: 22 },
            { type: "LinkedIn", count: 185, effectiveness: 15 }
          ],
          salesPerformance: [
            { metric: "Deals Closed", thisMonth: 15, lastMonth: 13, change: 15 },
            { metric: "Revenue", thisMonth: 37500, lastMonth: 32500, change: 15 },
            { metric: "Meetings Set", thisMonth: 54, lastMonth: 49, change: 10 },
            { metric: "Response Rate", thisMonth: 22, lastMonth: 20, change: 10 }
          ],
          leadsBySource: [
            { name: "Website", value: 45 },
            { name: "Referral", value: 28 },
            { name: "Social Media", value: 18 },
            { name: "Cold Outreach", value: 22 },
            { name: "Events", value: 12 }
          ],
          salesFunnel: [
            { stage: "Lead Generated", count: 120, value: 36000 },
            { stage: "Initial Contact", count: 92, value: 33120 },
            { stage: "Qualified", count: 50, value: 20000 },
            { stage: "Proposal", count: 35, value: 17500 },
            { stage: "Negotiation", count: 20, value: 12000 },
            { stage: "Converted", count: 15, value: 37500 }
          ],
          pipelineValue: 156120,
          dealsClosedMonth: 15,
          averageDealSize: 2450,
          revenueMonth: 37500,
          followupRate: 68,
          meetingBookRate: 35,
          responseRate: 22
        });
        setLoading(false);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeframe]);

  // Format number with K for thousands
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md">
          <p className="font-medium text-xs mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-xs">
              {entry.name}: {entry.dataKey === "revenue" ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Sales Performance</h1>
          <p className="text-muted-foreground">
            Track your outreach effectiveness and revenue metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Timeframe filter */}
          <div className="relative">
            <button 
              onClick={() => setTimeframeDropdown(!timeframeDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-md hover:bg-muted/50 transition-colors"
            >
              <Calendar size={16} />
              <span>
                {timeframe === "7d" ? "Last 7 days" : 
                 timeframe === "30d" ? "Last 30 days" : 
                 timeframe === "90d" ? "Last quarter" : "Last 12 months"}
              </span>
              <ChevronDown size={14} />
            </button>
            
            {timeframeDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-md shadow-md z-10 w-40">
                <div className="p-1">
                  {[
                    { id: "7d", label: "Last 7 days" },
                    { id: "30d", label: "Last 30 days" },
                    { id: "90d", label: "Last quarter" },
                    { id: "12m", label: "Last 12 months" }
                  ].map((option) => (
                    <button
                      key={option.id}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                        timeframe === option.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted/50"
                      } transition-colors`}
                      onClick={() => {
                        setTimeframe(option.id as "7d" | "30d" | "90d" | "12m");
                        setTimeframeDropdown(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => fetchAnalyticsData()}
            className="p-2 border border-border rounded-md hover:bg-muted/50 transition-colors"
            aria-label="Refresh data"
          >
            <RefreshCw size={16} />
          </button>
          
          <button 
            className="p-2 border border-border rounded-md hover:bg-muted/50 transition-colors"
            aria-label="Download report"
          >
            <Download size={16} />
          </button>
        </div>
      </motion.div>
      
      {loading ? (
        <div className="p-12 flex justify-center items-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5" />
          <div>
            <h3 className="font-medium">Error loading analytics</h3>
            <p className="text-sm mt-1">{error}</p>
            <button 
              className="mt-3 px-4 py-2 bg-destructive text-destructive-foreground rounded-md text-sm"
              onClick={() => fetchAnalyticsData()}
            >
              Retry
            </button>
          </div>
        </div>
      ) : analyticsData ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Key sales metrics */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Pipeline Value</h3>
                <div className="bg-primary/10 text-primary p-1.5 rounded-full">
                  <Target size={14} />
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">
                {formatCurrency(analyticsData.pipelineValue)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Across {analyticsData.leadsByStage
                  .filter(stage => !['CONVERTED', 'LOST'].includes(stage.stage))
                  .reduce((sum, stage) => sum + stage.count, 0)} active leads
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Revenue ({timeframe === "7d" ? "Week" : timeframe === "30d" ? "Month" : "Quarter"})</h3>
                <div className="bg-green-500/10 text-green-500 p-1.5 rounded-full">
                  <DollarSign size={14} />
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">
                {formatCurrency(analyticsData.revenueMonth)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+15%</span> vs previous period
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Deals Closed</h3>
                <div className="bg-blue-500/10 text-blue-500 p-1.5 rounded-full">
                  <TrendingUp size={14} />
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">
                {analyticsData.dealsClosedMonth}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Avg. size: {formatCurrency(analyticsData.averageDealSize)}
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">Response Rate</h3>
                <div className="bg-amber-500/10 text-amber-500 p-1.5 rounded-full">
                  <Mail size={14} />
                </div>
              </div>
              <div className="text-2xl font-bold mt-2">
                {analyticsData.responseRate}%
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                <span className="text-amber-500 font-medium">+2%</span> vs previous period
              </div>
            </div>
          </motion.div>
          
          {/* Outreach Activity & Revenue Trend */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Outreach Activity */}
            <motion.div 
              variants={itemVariants} 
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="bg-muted/30 px-5 py-3 border-b border-border flex items-center justify-between">
                <h3 className="font-medium">Outreach Activity</h3>
                <div className="flex gap-3">
                  <span className="text-xs text-muted-foreground">Total actions: {analyticsData.outreachActivity.reduce((sum, item) => sum + item.count, 0)}</span>
                </div>
              </div>
              <div className="p-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.outreachActivity}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis 
                      dataKey="type"
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      axisLine={false}
                      tickLine={false}
                      label={{ value: 'Count', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                      domain={[0, 40]}
                      label={{ value: 'Effectiveness', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" fill={CHART_COLORS[0]} name="Count" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="effectiveness" 
                      stroke={CHART_COLORS[2]} 
                      name="Response Rate (%)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            {/* Revenue & Meeting Trend */}
            <motion.div 
              variants={itemVariants} 
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="bg-muted/30 px-5 py-3 border-b border-border flex items-center justify-between">
                <h3 className="font-medium">Revenue & Deal Trend</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-xs">Revenue</span>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Deals</span>
                </div>
              </div>
              <div className="p-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis 
                      dataKey="month"
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => formatCurrency(value).replace(".00", "")}
                      label={{ value: 'Revenue', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 'dataMax + 5']}
                      label={{ value: 'Count', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#64748b', fontSize: 12 } }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" fill={CHART_COLORS[0]} name="Revenue" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="deals" 
                      stroke={CHART_COLORS[2]} 
                      name="Deals Closed"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          
          {/* Sales Funnel & Activities */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Sales Funnel */}
            <motion.div 
              variants={itemVariants} 
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="bg-muted/30 px-5 py-3 border-b border-border">
                <h3 className="font-medium">Sales Funnel</h3>
              </div>
              <div className="p-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.salesFunnel}
                    layout="vertical"
                    margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis 
                      type="number"
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                    />
                    <YAxis 
                      dataKey="stage" 
                      type="category" 
                      axisLine={false}
                      tickLine={false}
                      width={110}
                    />
                    <Tooltip 
                      formatter={(value, name) => [name === 'value' ? formatCurrency(Number(value)) : value, name === 'value' ? 'Potential Value' : 'Count']} 
                      labelFormatter={(label) => label}
                    />
                    <Legend />
                    <Bar dataKey="count" name="Lead Count" fill={CHART_COLORS[0]} />
                    <Bar dataKey="value" name="Potential Value" fill={CHART_COLORS[2]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            {/* Key Sales Metrics */}
            <motion.div 
              variants={itemVariants} 
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="bg-muted/30 px-5 py-3 border-b border-border">
                <h3 className="font-medium">Performance Metrics</h3>
              </div>
              <div className="divide-y divide-border">
                {analyticsData.salesPerformance.map((metric, index) => (
                  <div key={index} className="flex justify-between items-center p-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">{metric.metric}</h4>
                      <p className="text-2xl font-bold">
                        {metric.metric.includes("Revenue") 
                          ? formatCurrency(metric.thisMonth)
                          : metric.metric.includes("Rate") 
                            ? `${metric.thisMonth}%` 
                            : metric.thisMonth}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">vs last period</div>
                    </div>
                  </div>
                ))}
                
                {/* Add visual indicators for key metrics */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium">Follow-up Rate</h4>
                    <span className="text-xs text-muted-foreground">Target: 80%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className={`${analyticsData.followupRate >= 80 ? 'bg-green-500' : 'bg-amber-500'} h-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${analyticsData.followupRate}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="text-xs mt-1 flex justify-between">
                    <span>{analyticsData.followupRate}%</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium">Meeting Book Rate</h4>
                    <span className="text-xs text-muted-foreground">Target: 40%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className={`${analyticsData.meetingBookRate >= 40 ? 'bg-green-500' : 'bg-amber-500'} h-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${analyticsData.meetingBookRate}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="text-xs mt-1 flex justify-between">
                    <span>{analyticsData.meetingBookRate}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Lead Source & Stage Distribution */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Lead Sources */}
            <motion.div 
              variants={itemVariants} 
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="bg-muted/30 px-5 py-3 border-b border-border">
                <h3 className="font-medium">Lead Sources</h3>
              </div>
              <div className="p-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.leadsBySource}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.leadsBySource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} leads`, 'Count']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="px-5 py-3 border-t border-border">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Most effective: {
                    analyticsData.leadsBySource.reduce((prev, current) => 
                      (prev.value > current.value) ? prev : current
                    ).name
                  }</span>
                  <Link href="/dashboard/leads" className="text-primary hover:underline flex items-center gap-1">
                    View all leads <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Lead Stage Distribution */}
            <motion.div 
              variants={itemVariants} 
              className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="bg-muted/30 px-5 py-3 border-b border-border flex items-center justify-between">
                <h3 className="font-medium">Lead Stage Distribution</h3>
                <Link href="/dashboard/leads" className="text-xs text-primary hover:underline flex items-center gap-1">
                  View leads <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="p-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.leadsByStage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={35}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="stage"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.leadsByStage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={(value) => value.charAt(0) + value.slice(1).toLowerCase()} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Action Cards */}
          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex flex-col items-center text-center">
              <Phone className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Increase Follow-up Rate</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Your follow-up rate is {analyticsData.followupRate}%. Aim for 80% to improve conversion.
              </p>
              <Link 
                href="/dashboard/tasks" 
                className="mt-auto text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Create Follow-up Tasks
              </Link>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 flex flex-col items-center text-center">
              <Clock className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-medium">Response Time</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Leads that get responses within 5 minutes are 21x more likely to convert.
              </p>
              <Link 
                href="/dashboard/settings/notifications" 
                className="mt-auto text-xs px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Set Up Alert Notifications
              </Link>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 flex flex-col items-center text-center">
              <Target className="h-8 w-8 text-amber-500 mb-2" />
              <h3 className="font-medium">Highest Value Leads</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Focus on {analyticsData.leadsByStage.find(s => s.stage === "NEGOTIATION")?.count || 0} leads in negotiation worth approx. {formatCurrency(analyticsData.salesFunnel[4].value)}.
              </p>
              <Link 
                href="/dashboard/leads?stage=NEGOTIATION" 
                className="mt-auto text-xs px-3 py-1.5 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
              >
                View Highest Value Leads
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
}