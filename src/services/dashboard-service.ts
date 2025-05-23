import prisma from '@/lib/prisma';
import { cacheGet, cacheSet } from '@/lib/redis';

const CACHE_TTL = 3600; // 1 hour

export async function getDashboardMetrics(userId: string) {
  const cacheKey = `dashboard:metrics:${userId}`;
  
  // Check cache first
  const cachedMetrics = await cacheGet(cacheKey);
  if (cachedMetrics) return cachedMetrics;
  
  // Current date for calculations
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Start of current week (Sunday)
  
  // Get counts for the new quick stats
  const [
    totalLeads,
    contactedLeads,
    convertedLeads,
    lostLeads,
    newLeadsThisWeek,
    totalConversations,
    conversationsThisMonth,
    pendingTasks,
    campaignStats,
    recentlyAddedLeads,
    recentlyUpdatedLeads,
    upcomingReminders
  ] = await Promise.all([
    // Total leads
    prisma.lead.count({ where: { userId } }),
    
    // Contacted leads (leads with at least one conversation)
    prisma.lead.count({ 
      where: { 
        userId,
        conversations: { some: {} }
      } 
    }),
    
    // Converted leads
    prisma.lead.count({
      where: {
        userId,
        stage: 'CONVERTED',
      },
    }),
    
    // Lost leads
    prisma.lead.count({
      where: {
        userId,
        stage: 'LOST',
      },
    }),
    
    // New leads this week
    prisma.lead.count({
      where: {
        userId,
        createdAt: { gte: startOfWeek },
      },
    }),
    
    // Total conversations
    prisma.conversation.count({
      where: {
        lead: { userId },
      },
    }),
    
    // Conversations this month
    prisma.conversation.count({
      where: {
        lead: { userId },
        createdAt: { gte: startOfMonth },
      },
    }),
    
    // Pending tasks
    prisma.task.count({
      where: {
        lead: { userId },
        status: 'PENDING',
      },
    }),
    
    // Campaign stats (enhanced) - Update the select to match the schema
    prisma.campaign.findMany({
      where: { userId },
      include: {
        leads: {
          select: {
            stage: true,
            conversations: { select: { id: true } }
          }
        },
        _count: {
          select: {
            leads: true
          }
        }
      }
    }),
    
    // Recently added leads (last 7 days)
    prisma.lead.findMany({
      where: {
        userId,
        createdAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) }
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        company: true,
        createdAt: true
      }
    }),
    
    // Recently updated leads (last 7 days)
    prisma.lead.findMany({
      where: {
        userId,
        updatedAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
        createdAt: { lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) } // Exclude newly created leads
      },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        company: true,
        updatedAt: true
      }
    }),
    
    // Upcoming reminders and tasks
    prisma.task.findMany({
      where: {
        userId,
        status: 'PENDING',
        dueDate: {
          gte: new Date(),
          lte: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000) // Next 2 days
        }
      },
      orderBy: { dueDate: 'asc' },
      take: 5,
      select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        priority: true,
        lead: {
          select: {
            id: true,
            name: true,
            company: true
          }
        }
      }
    })
  ]);
  
  // Calculate conversion rate: (Converted / Contacted) × 100%
  const conversionRate = contactedLeads > 0
    ? (convertedLeads / contactedLeads) * 100
    : 0;
  
  // Get lead distribution by stage
  const leadsByStage = await prisma.lead.groupBy({
    by: ['stage'],
    where: { userId },
    _count: {
      _all: true,
    },
  });
  
  // Format lead stage distribution
  const stageDistribution = leadsByStage.reduce((acc, item) => {
    acc[item.stage] = item._count._all;
    return acc;
  }, {} as Record<string, number>);
  
  // Get lead distribution by source
  const leadsBySource = await prisma.lead.groupBy({
    by: ['source'],
    where: { userId },
    _count: {
      _all: true,
    },
  });
  
  // Format lead source distribution
  const sourceDistribution = leadsBySource.reduce((acc, item) => {
    acc[item.source || 'UNKNOWN'] = item._count._all;
    return acc;
  }, {} as Record<string, number>);
  
  // Get today's and overdue tasks
  const todayTasks = await prisma.task.count({
    where: {
      userId,
      status: 'PENDING',
      dueDate: {
        gte: new Date(now.setHours(0, 0, 0, 0)),
        lt: new Date(now.setHours(23, 59, 59, 999))
      }
    }
  });
  
  const overdueTasks = await prisma.task.count({
    where: {
      userId,
      status: 'PENDING',
      dueDate: { lt: new Date(now.setHours(0, 0, 0, 0)) }
    }
  });
  
  // Process campaign stats to add contacted and converted counts
  const enhancedCampaignStats = campaignStats.map(campaign => {
    // Fix the type for leads and ensure we're using type safety
    const contactedCount = campaign.leads?.filter(lead => 
      lead.conversations && lead.conversations.length > 0
    ).length || 0;
    
    const convertedCount = campaign.leads?.filter(lead => 
      lead.stage === 'CONVERTED'
    ).length || 0;
    
    return {
      id: campaign.id,
      name: campaign.name,
      status: campaign.isActive ? 'ACTIVE' : 'INACTIVE', // Use isActive instead of status
      totalLeads: campaign._count.leads,
      contactedLeads: contactedCount,
      convertedLeads: convertedCount,
      conversionRate: contactedCount > 0 ? (convertedCount / contactedCount) * 100 : 0
    };
  });
  
  // Build enhanced metrics object
  const metrics = {
    quickStats: {
      totalLeads,
      contactedLeads,
      convertedLeads,
      lostLeads,
      newLeadsThisWeek,
      conversionRate
    },
    overview: {
      totalLeads,
      contactedLeads,
      convertedLeads,
      lostLeads,
      newLeadsThisWeek,
      conversionRate,
      totalConversations,
      conversationsThisMonth,
      pendingTasks,
      todayTasks,
      overdueTasks
    },
    leadsByStage: stageDistribution,
    leadsBySource: sourceDistribution,
    campaigns: enhancedCampaignStats,
    recentActivity: {
      recentlyAddedLeads,
      recentlyUpdatedLeads
    },
    reminders: upcomingReminders,
    periodStart: startOfMonth.toISOString(),
    periodEnd: now.toISOString(),
  };
  
  // Cache results
  await cacheSet(cacheKey, metrics, CACHE_TTL);
  
  return metrics;
}

export async function getLeadConversionTimeline(userId: string, timeframe: 'daily' | 'weekly' | 'monthly' = 'weekly', days: number = 30) {
  const cacheKey = `dashboard:conversion:${userId}:${timeframe}:${days}`;
  
  // Check cache first
  const cachedData = await cacheGet(cacheKey);
  if (cachedData) return cachedData;
  
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - days);
  
  // Get leads created and converted within the timeframe
  const leads = await prisma.lead.findMany({
    where: {
      userId,
      createdAt: { gte: startDate }
    },
    select: {
      id: true,
      createdAt: true,
      stage: true,
      updatedAt: true
    }
  });
  
  // Format the timeline data based on timeframe
  let timeline: any = [];
  
  if (timeframe === 'daily') {
    // Create a map for days in the range
    const dayMap = new Map();
    for (let i = 0; i <= days; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dayKey = date.toISOString().split('T')[0];
      dayMap.set(dayKey, {
        date: dayKey,
        new: 0,
        contacted: 0,
        converted: 0,
        lost: 0
      });
    }
    
    // Count leads by day and status
    for (const lead of leads) {
      const dayKey = lead.createdAt.toISOString().split('T')[0];
      if (dayMap.has(dayKey)) {
        const dayData = dayMap.get(dayKey);
        dayData.new++;
        
        if (lead.stage === 'CONVERTED') dayData.converted++;
        if (lead.stage === 'LOST') dayData.lost++;
        if (['CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION'].includes(lead.stage)) dayData.contacted++;
      }
    }
    
    // Convert map to array and sort by date
    timeline = Array.from(dayMap.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } else if (timeframe === 'weekly') {
    // Create weekly buckets
    const weekMap = new Map();
    for (let i = 0; i < Math.ceil(days / 7); i++) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7) - now.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const weekKey = `${weekStart.toISOString().split('T')[0]} to ${weekEnd.toISOString().split('T')[0]}`;
      weekMap.set(weekKey, {
        weekStart: weekStart.toISOString().split('T')[0],
        weekEnd: weekEnd.toISOString().split('T')[0],
        new: 0,
        contacted: 0,
        converted: 0,
        lost: 0
      });
    }
    
    // Process leads into weekly buckets
    for (const lead of leads) {
      for (const [weekKey, weekData] of weekMap.entries()) {
        const weekStart = new Date(weekData.weekStart);
        const weekEnd = new Date(weekData.weekEnd);
        weekEnd.setHours(23, 59, 59, 999);
        
        if (lead.createdAt >= weekStart && lead.createdAt <= weekEnd) {
          weekData.new++;
          
          if (lead.stage === 'CONVERTED') weekData.converted++;
          if (lead.stage === 'LOST') weekData.lost++;
          if (['CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION'].includes(lead.stage)) weekData.contacted++;
          break;
        }
      }
    }
    
    // Convert map to array and sort by start date
    timeline = Array.from(weekMap.values()).sort((a, b) => 
      new Date(a.weekStart).getTime() - new Date(b.weekStart).getTime()
    );
  } else if (timeframe === 'monthly') {
    const monthMap = new Map();
    for (let i = 0; i < Math.ceil(days / 30); i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      monthMap.set(monthKey, {
        month: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear(),
        new: 0,
        contacted: 0,
        converted: 0,
        lost: 0
      });
    }
    
    // Process leads into monthly buckets
    for (const lead of leads) {
      const monthKey = `${lead.createdAt.toLocaleString('default', { month: 'short' })} ${lead.createdAt.getFullYear()}`;
      if (monthMap.has(monthKey)) {
        const monthData = monthMap.get(monthKey);
        monthData.new++;
        
        if (lead.stage === 'CONVERTED') monthData.converted++;
        if (lead.stage === 'LOST') monthData.lost++;
        if (['CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION'].includes(lead.stage)) monthData.contacted++;
      }
    }
    
    // Convert to array
    const monthArray = Array.from(monthMap.values());
    
    // Sort chronologically
    timeline = monthArray.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return new Date(`${a.month} 1, 2000`).getTime() - new Date(`${b.month} 1, 2000`).getTime();
    });
  }
  
  // Cache results
  await cacheSet(cacheKey, timeline, CACHE_TTL);
  
  return timeline;
}

export async function getAiRecommendations(userId: string, limit: number = 5) {
  // Get recommendations for leads that need attention
  const leads = await prisma.lead.findMany({
    where: {
      userId,
      stage: { notIn: ['CONVERTED', 'LOST'] },
      isArchived: false,
      isDeleted: false
    },
    orderBy: [
      { priority: 'desc' },
      { confidence: 'desc' },
      { lastActivity: 'asc' }
    ],
    take: limit,
    include: {
      conversations: {
        orderBy: { date: 'desc' },
        take: 1
      },
      suggestions: {
        orderBy: { createdAt: 'desc' },
        take: 1
      },
      tasks: {
        where: { status: 'PENDING' },
        orderBy: { dueDate: 'asc' },
        take: 1
      }
    }
  });
  
  // Transform into recommendations
  const recommendations = leads.map(lead => {
    const lastConversation = lead.conversations?.[0];
    const lastSuggestion = lead.suggestions?.[0];
    const nextTask = lead.tasks?.[0];
    
    let recommendation = {
      leadId: lead.id,
      leadName: lead.name,
      company: lead.company || '',
      priority: lead.priority || 2,
      stage: lead.stage,
      action: '',
      reason: '',
      suggestionId: lastSuggestion?.id
    };
    
    // Logic to determine recommendation
    if (nextTask) {
      recommendation.action = `Complete task: ${nextTask.title}`;
      recommendation.reason = 'Scheduled follow-up';
    } else if (lastSuggestion) {
      recommendation.action = lastSuggestion.suggestion;
      recommendation.reason = 'AI suggestion';
    } else if (lastConversation && new Date(lastConversation.date) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      recommendation.action = `Follow up with ${lead.name}`;
      recommendation.reason = 'No recent contact';
    } else if (!lastConversation) {
      recommendation.action = `Make initial contact with ${lead.name}`;
      recommendation.reason = 'New lead';
    } else {
      recommendation.action = `Review ${lead.name}'s profile`;
      recommendation.reason = 'High priority lead';
    }
    
    return recommendation;
  });
  
  return recommendations;
}

export async function saveDashboardMetric(userId: string, name: string, value: any) {
  // Store periodic metrics for historical data
  const now = new Date();
  const startOfPeriod = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfPeriod = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return prisma.dashboardMetric.create({
    data: {
      name,
      value,
      // Remove the user property as it doesn't exist on the schema
      // userId is not a field in DashboardMetric according to your schema
      periodStart: startOfPeriod,
      periodEnd: endOfPeriod,
    },
  });
}

export async function getHistoricalMetrics(userId: string, metric: string, months: number = 6) {
  const cacheKey = `dashboard:historical:${userId}:${metric}:${months}`;
  
  // Check cache first
  const cachedMetrics = await cacheGet(cacheKey);
  if (cachedMetrics) return cachedMetrics;
  
  // Current date
  const now = new Date();
  
  // Get data for the last N months
  const monthlyData = [];
  
  for (let i = 0; i < months; i++) {
    const month = now.getMonth() - i;
    const year = now.getFullYear() + Math.floor(month / 12);
    const normalizedMonth = ((month % 12) + 12) % 12; // Ensure positive month
    
    const startOfMonth = new Date(year, normalizedMonth, 1);
    const endOfMonth = new Date(year, normalizedMonth + 1, 0);
    
    let value: number = 0;
    
    // Get data based on requested metric
    switch (metric) {
      case 'leads':
        value = await prisma.lead.count({
          where: {
            userId,
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });
        break;
      case 'conversations':
        value = await prisma.conversation.count({
          where: {
            lead: { userId },
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });
        break;
      case 'conversions':
        value = await prisma.lead.count({
          where: {
            userId,
            stage: 'CONVERTED',
            updatedAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });
        break;
      default:
        break;
    }
    
    monthlyData.push({
      month: startOfMonth.toLocaleString('default', { month: 'short' }),
      year: year,
      value,
    });
  }
  
  // Reverse to get chronological order
  const result = monthlyData.reverse();
  
  // Cache results
  await cacheSet(cacheKey, result, CACHE_TTL);
  
  return result;
}

export async function getPriorityTasks(userId: string, limit: number = 5) {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(23, 59, 59, 999);
  
  // Get tasks due soon or overdue
  const tasks = await prisma.task.findMany({
    where: {
      userId,
      status: 'PENDING',
      dueDate: { lte: tomorrow }
    },
    orderBy: [
      { dueDate: 'asc' },
      { priority: 'desc' }
    ],
    take: limit,
    include: {
      lead: {
        select: {
          id: true,
          name: true,
          company: true
        }
      }
    }
  });
  
  // Categorize tasks
  const priorityTasks = tasks.map(task => {
    const now = new Date();
    const taskDate = task.dueDate ? new Date(task.dueDate) : null;
    const isOverdue = taskDate ? taskDate < now : false;
    const isToday = taskDate
      ? taskDate.getDate() === now.getDate() && 
        taskDate.getMonth() === now.getMonth() && 
        taskDate.getFullYear() === now.getFullYear()
      : false;
    
    let status: 'overdue' | 'today' | 'upcoming' = 'upcoming';
    if (isOverdue) status = 'overdue';
    if (isToday) status = 'today';
    
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status,
      lead: task.lead
    };
  });
  
  return priorityTasks;
}