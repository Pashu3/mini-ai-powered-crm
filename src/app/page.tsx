'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, DollarSign, Clock, 
  ArrowUpRight, CalendarClock, LineChart 
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LeadStage, type Lead } from '@/types';

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch('/api/leads?limit=5');
        if (response.ok) {
          const data = await response.json();
          setLeads(data);
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeads();
  }, []);

  // Calculate stats
  const stats = [
    { 
      label: 'Total Leads', 
      value: isLoading ? '-' : leads.length, 
      icon: Users, 
      color: 'bg-blue-100 text-primary dark:bg-blue-900 dark:text-blue-300' 
    },
    { 
      label: 'Follow Ups', 
      value: isLoading ? '-' : leads.filter(lead => 
        lead.conversations?.some(conv => conv.hasFollowUp && !conv.followUpDone)
      ).length, 
      icon: Clock, 
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300' 
    },
    { 
      label: 'Conversion Rate', 
      value: isLoading ? '-' : `${Math.round((leads.filter(lead => lead.stage === 'CONVERTED').length / (leads.length || 1)) * 100)}%`, 
      icon: LineChart, 
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
    },
    { 
      label: 'Pipeline Value', 
      value: '$48.5K', // This would be calculated from actual lead values in a real app
      icon: DollarSign, 
      color: 'bg-purple-100 text-secondary dark:bg-purple-900 dark:text-purple-300' 
    },
  ];

  const stageColors: Record<LeadStage, string> = {
    NEW: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
    CONTACTED: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300',
    ENGAGED: 'bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-300',
    QUALIFIED: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
    PROPOSAL: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300',
    NEGOTIATION: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300',
    CONVERTED: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
    LOST: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link 
          href="/leads/new"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors"
        >
          Add Lead <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-lg p-5 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={cn("p-3 rounded-full", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg shadow-sm lg:col-span-2"
        >
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <h2 className="font-semibold">Recent Leads</h2>
            <Link href="/leads" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="p-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground text-xs">
                      <th className="px-4 py-2 font-medium">Name</th>
                      <th className="px-4 py-2 font-medium">Company</th>
                      <th className="px-4 py-2 font-medium">Stage</th>
                      <th className="px-4 py-2 font-medium">Last Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-4 py-3">
                          <Link href={`/leads/${lead.id}`} className="hover:underline">
                            <div>
                              <p className="font-medium">{lead.name}</p>
                              <p className="text-xs text-muted-foreground">{lead.email}</p>
                            </div>
                          </Link>
                        </td>
                        <td className="px-4 py-3">{lead.company || '-'}</td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            stageColors[lead.stage]
                          )}>
                            {lead.stage}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {lead.conversations && lead.conversations.length > 0 
                            ? new Date(lead.conversations[0].date).toLocaleDateString()
                            : 'No contact'}
                        </td>
                      </motion.tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                          No leads found. <Link href="/leads/new" className="text-primary hover:underline">Add your first lead</Link>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Follow-ups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg shadow-sm"
        >
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold">Upcoming Follow-ups</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              {!isLoading && leads
                .flatMap(lead => 
                  (lead.conversations || [])
                    .filter(conv => conv.hasFollowUp && !conv.followUpDone && conv.followUp)
                    .map(conv => ({ 
                      id: conv.id, 
                      leadId: lead.id, 
                      leadName: lead.name, 
                      company: lead.company, 
                      followUp: conv.followUp 
                    }))
                )
                .sort((a, b) => new Date(a.followUp!).getTime() - new Date(b.followUp!).getTime())
                .slice(0, 5)
                .map((followUp, i) => (
                  <motion.li
                    key={followUp.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 border border-border rounded-md"
                  >
                    <div className="bg-accent/20 p-2 rounded-full">
                      <CalendarClock className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/leads/${followUp.leadId}`} className="font-medium text-sm hover:underline">
                        {followUp.leadName}
                      </Link>
                      <p className="text-xs text-muted-foreground truncate">{followUp.company || 'No company'}</p>
                    </div>
                    <div className="text-xs text-right">
                      <p className="font-medium">
                        {new Date(followUp.followUp!).toLocaleDateString()}
                      </p>
                      <p className="text-muted-foreground">
                        {new Date(followUp.followUp!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.li>
                ))}
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                </div>
              ) : (leads.flatMap(lead => lead.conversations || []).filter(conv => conv.hasFollowUp && !conv.followUpDone).length === 0) && (
                <div className="py-8 text-center text-muted-foreground">
                  No upcoming follow-ups
                </div>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}