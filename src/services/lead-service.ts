import prisma from '@/lib/prisma';
import { cacheDelete, cacheDeletePattern, cacheGet, cacheSet } from '@/lib/redis';
import { getNextStepSuggestion } from '@/lib/ai-service';
import { Lead, LeadStage, Prisma } from '@/generated/prisma';

const CACHE_TTL = 300; // 5 minutes

export async function getLeads(
  userId: string,
  filters: {
    search?: string;
    stage?: LeadStage;
    tags?: string[];
    limit?: number;
    offset?: number;
  }
) {
  const { search, stage, tags, limit = 10, offset = 0 } = filters;
  
  // Generate cache key based on query params
  const cacheKey = `leads:${userId}:${JSON.stringify(filters)}`;
  
  // Check cache first
  const cachedLeads = await cacheGet<{leads: Lead[], total: number}>(cacheKey);
  if (cachedLeads) return cachedLeads;
  
  // Build query filters
  const where: Prisma.LeadWhereInput = { userId };
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { company: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }
  
  if (stage) {
    where.stage = stage;
  }
  
  if (tags && tags.length > 0) {
    where.tags = { hasSome: tags };
  }
  
  // Get leads with total count
  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: {
        conversations: {
          orderBy: { date: 'desc' },
          take: 1,
        },
        tasks: {
          where: { status: 'PENDING' },
          take: 1,
        },
      },
      orderBy: { lastActivity: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.lead.count({ where }),
  ]);
  
  const result = { leads, total };
  
  // Cache results
  await cacheSet(cacheKey, result, CACHE_TTL);
  
  return result;
}

export async function getLeadById(id: string, userId: string) {
  const cacheKey = `lead:${id}`;
  
  // Check cache first
  const cachedLead = await cacheGet<Lead>(cacheKey);
  if (cachedLead) return cachedLead;
  
  const lead = await prisma.lead.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      conversations: {
        orderBy: { date: 'desc' },
      },
      tasks: {
        orderBy: { dueDate: 'asc' },
      },
      suggestions: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });
  
  if (lead) {
    // Cache lead data
    await cacheSet(cacheKey, lead, CACHE_TTL);
  }
  
  return lead;
}

export async function createLead(data: Prisma.LeadCreateInput) {
  const lead = await prisma.lead.create({
    data: {
      ...data,
      lastActivity: new Date(),
    },
  });
  
  // Generate AI suggestion for new lead
  try {
    const suggestion = await getNextStepSuggestion(lead) as { text?: string; suggestion?: string };
    
    await prisma.aiSuggestion.create({
      data: {
        leadId: lead.id,
        suggestion: suggestion?.text || suggestion?.suggestion || '',
        type: 'NEXT_STEP',
        priority: 1,
      },
    });
  } catch (error) {
    console.error('Failed to generate AI suggestion for new lead:', error);
  }
  
  // Clear cache for lead list
  await cacheDeletePattern(`leads:${data.user?.connect?.id}:*`);
  
  return lead;
}

export async function updateLead(id: string, userId: string, data: Prisma.LeadUpdateInput) {
  const lead = await prisma.lead.findFirst({
    where: {
      id,
      userId,
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      ...data,
      lastActivity: new Date(),
    },
  });
  
  // Clear caches
  await cacheDelete(`lead:${id}`);
  await cacheDeletePattern(`leads:${userId}:*`);
  
  return updatedLead;
}

export async function deleteLead(id: string, userId: string) {
  const lead = await prisma.lead.findFirst({
    where: {
      id,
      userId,
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  await prisma.lead.delete({
    where: { id },
  });
  
  // Clear caches
  await cacheDelete(`lead:${id}`);
  await cacheDeletePattern(`leads:${userId}:*`);
  
  return { success: true };
}

export async function updateLeadStage(id: string, userId: string, stage: LeadStage) {
  const lead = await prisma.lead.findFirst({
    where: {
      id,
      userId,
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      stage,
      lastActivity: new Date(),
    },
  });
  
  // Clear caches
  await cacheDelete(`lead:${id}`);
  await cacheDeletePattern(`leads:${userId}:*`);
  
  // Generate new AI suggestion based on stage change
  try {
    const suggestion = await getNextStepSuggestion({
      ...updatedLead,
      stage: stage
    }) as { text?: string; suggestion?: string };
    
    await prisma.aiSuggestion.create({
      data: {
        leadId: id,
        suggestion: suggestion?.text || suggestion?.suggestion || '',
        type: 'STAGE_CHANGE',
        priority: 2,
      },
    });
  } catch (error) {
    console.error('Failed to generate AI suggestion for stage change:', error);
  }
  
  return updatedLead;
}