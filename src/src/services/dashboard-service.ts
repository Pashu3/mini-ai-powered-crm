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
  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  
  // Get counts
  const [
    totalLeads,
    newLeadsThisMonth,
    convertedLeadsThisMonth,
    activeLeads,
    totalConversations,
    conversationsThisMonth,
    pendingTasks,
    campaignStats,
  ] = await Promise.all([
    // Total leads
    prisma.lead.count({ where: { userId } }),
    
    // New leads this month
    prisma.lead.count({
      where: {
        userId,
        createdAt: { gte: startOfMonth },
      },
    }),
    
    // Converted leads this month
    prisma.lead.count({
      where: {
        userId,
        stage: 'CONVERTED',
        updatedAt: { gte: startOfMonth },
      },
    }),
    
    // Active leads (not lost or converted)
    prisma.lead.count({
      where: {
        userId,
        stage: { notIn: ['LOST', 'CONVERTED'] },
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
    
    // Campaign stats
    prisma.campaign.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        _count: {
          select: { leads: true },
        },
      },
    }),
  ]);
  
  // Calculate conversion rates and activity rates
  const conversionRate = totalLeads > 0
    ? (await prisma.lead.count({
        where: {
          userId,
          stage: 'CONVERTED',
        },
      })) / totalLeads
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
  
  // Build metrics object
  const metrics = {
    overview: {
      totalLeads,
      activeLeads,
      newLeadsThisMonth,
      convertedLeadsThisMonth,
      conversionRate: conversionRate * 100, // as percentage
      totalConversations,
      conversationsThisMonth,
      pendingTasks,
    },
    leadsByStage: stageDistribution,
    campaigns: campaignStats.map(campaign => ({
      id: campaign.id,
      name: campaign.name,
      leadCount: campaign._count.leads,
    })),
    periodStart: startOfMonth.toISOString(),
    periodEnd: now.toISOString(),
  };
  
  // Cache results
  await cacheSet(cacheKey, metrics, CACHE_TTL);
  
  return metrics;
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