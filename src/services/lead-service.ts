import prisma from '@/lib/prisma';
import { cacheDelete, cacheDeletePattern, cacheGet, cacheSet } from '@/lib/redis';
import { getNextStepSuggestion } from '@/lib/ai-service';
import { Lead, LeadStage, LeadSource, Prisma } from '@/generated/prisma';

const CACHE_TTL = 300; 

export async function getLeads(
  userId: string,
  filters: {
    search?: string;
    stage?: LeadStage;
    source?: LeadSource;
    tags?: string[];
    priority?: number;
    confidence?: number;
    assignedToId?: string;
    region?: string;
    includeArchived?: boolean;
    includeDeleted?: boolean;
    limit?: number;
    offset?: number;
  }
) {
  const { 
    search, 
    stage, 
    source,
    tags, 
    priority,
    confidence,
    assignedToId,
    region,
    includeArchived = false,
    includeDeleted = false,
    limit = 10, 
    offset = 0 
  } = filters;
  
  // Generate cache key based on query params
  const cacheKey = `leads:${userId}:${JSON.stringify(filters)}`;
  
  // Check cache first
  const cachedLeads = await cacheGet<{leads: Lead[], total: number}>(cacheKey);
  if (cachedLeads) return cachedLeads;
  
  // Build query filters
  const where: Prisma.LeadWhereInput = { 
    OR: [
      { userId: userId },
      { assignedToId: userId }
    ]
  };
  
  // Handle archived/deleted status
  if (!includeArchived) {
    where.isArchived = false;
  }
  
  if (!includeDeleted) {
    where.isDeleted = false;
  }
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { company: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { region: { contains: search, mode: 'insensitive' } },
    ];
  }
  
  if (stage) {
    where.stage = stage;
  }
  
  if (source) {
    where.source = source;
  }
  
  if (tags && tags.length > 0) {
    where.tags = { hasSome: tags };
  }
  
  if (priority) {
    where.priority = priority;
  }
  
  if (confidence) {
    where.confidence = {
      gte: confidence
    };
  }
  
  if (assignedToId) {
    where.assignedToId = assignedToId;
  }
  
  if (region) {
    where.region = { contains: region, mode: 'insensitive' };
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
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
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
      OR: [
        { userId: userId },
        { assignedToId: userId }
      ],
      isDeleted: false, // Don't return deleted leads
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
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
  });
  
  if (lead) {
    // Cache lead data
    await cacheSet(cacheKey, lead, CACHE_TTL);
  }
  
  return lead;
}
export async function softDeleteLead(id: string, userId: string) {
  const lead = await prisma.lead.findFirst({
    where: {
      id,
      OR: [
        { userId: userId },
        { assignedToId: userId }
      ],
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      isDeleted: true,
      lastActivity: new Date(),
    },
  });
  
  // Clear caches
  await cacheDelete(`lead:${id}`);
  await cacheDeletePattern(`leads:${userId}:*`);
  
  return updatedLead;
}
export async function archiveLead(id: string, userId: string) {
  const lead = await prisma.lead.findFirst({
    where: {
      id,
      OR: [
        { userId: userId },
        { assignedToId: userId }
      ],
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      isArchived: true,
      lastActivity: new Date(),
    },
  });
  
  // Clear caches
  await cacheDelete(`lead:${id}`);
  await cacheDeletePattern(`leads:${userId}:*`);
  
  return updatedLead;
}

export async function restoreLead(id: string, userId: string) {
  const lead = await prisma.lead.findFirst({
    where: {
      id,
      OR: [
        { userId: userId },
        { assignedToId: userId }
      ],
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      isArchived: false,
      isDeleted: false,
      lastActivity: new Date(),
    },
  });
  
  // Clear caches
  await cacheDelete(`lead:${id}`);
  await cacheDeletePattern(`leads:${userId}:*`);
  
  return updatedLead;
}
export async function assignLead(id: string, userId: string, assignToUserId: string) {
  const lead = await prisma.lead.findFirst({
    where: {
      id,
      OR: [
        { userId: userId },
        { assignedToId: userId }
      ],
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      assignedToId: assignToUserId,
      lastActivity: new Date(),
    },
  });
  
  // Clear caches
  await cacheDelete(`lead:${id}`);
  await cacheDeletePattern(`leads:${userId}:*`);
  await cacheDeletePattern(`leads:${assignToUserId}:*`);
  
  return updatedLead;
}

export async function updateLeadConfidence(id: string, userId: string, confidence: number) {
  if (confidence < 0 || confidence > 100) {
    throw new Error('Confidence score must be between 0 and 100');
  }
  
  const lead = await prisma.lead.findFirst({
    where: {
      id,
      OR: [
        { userId: userId },
        { assignedToId: userId }
      ],
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      confidence,
      lastActivity: new Date(),
    },
  });
  
  // Clear caches
  await cacheDelete(`lead:${id}`);
  await cacheDeletePattern(`leads:${userId}:*`);
  
  return updatedLead;
}
export async function updateLeadSource(id: string, userId: string, source: LeadSource) {
  const lead = await prisma.lead.findFirst({
    where: {
      id,
      OR: [
        { userId: userId },
        { assignedToId: userId }
      ],
    },
  });
  
  if (!lead) {
    throw new Error('Lead not found');
  }
  
  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      source,
      lastActivity: new Date(),
    },
  });
  
  // Clear caches
  await cacheDelete(`lead:${id}`);
  await cacheDeletePattern(`leads:${userId}:*`);
  
  return updatedLead;
}

export async function createLead(data: Prisma.LeadCreateInput) {
  // Set default values for new fields if not provided
  if (data.confidence === undefined) {
    data.confidence = 50;
  }
  
  if (data.priority === undefined) {
    data.priority = 2;
  }
  
  if (data.isArchived === undefined) {
    data.isArchived = false;
  }
  
  if (data.isDeleted === undefined) {
    data.isDeleted = false;
  }
  
  // Set default source if not provided
  if (data.source === undefined) {
    data.source = 'OTHER';
  }
  
  // Default assignedTo to the current user if not specified
  const currentUserId = data.user?.connect?.id;
  if (currentUserId && !data.assignedTo?.connect?.id) {
    if (!data.assignedTo) {
      data.assignedTo = {};
    }
    data.assignedTo.connect = { id: currentUserId };
  }
  
  const lead = await prisma.lead.create({
    data: {
      ...data,
      lastActivity: new Date(),
    },
  });
  
  try {
    // Include new fields to improve AI suggestion quality
    const enrichedLead = {
      ...lead,
      sourceName: lead.source?.toLowerCase() || 'other', // For easier AI processing
      confidence: lead.confidence || 50,
      priority: lead.priority || 2,
      timezone: lead.timezone || null,
      region: lead.region || null,
    };
    
    // Get AI suggestion with context based on lead source and other new fields
    const suggestion = await getNextStepSuggestion(enrichedLead) as { 
      text?: string; 
      suggestion?: string;
      priority?: number;
      followUpDays?: number; 
    };
    
    // Calculate suggested follow-up date based on AI recommendation or defaults
    const followUpDays = suggestion.followUpDays || getDefaultFollowUpDays(lead.source, lead.priority);
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + followUpDays);
    
    // Calculate suggestion priority based on lead attributes
    const suggestionPriority = 
      suggestion.priority || 
      calculateSuggestionPriority(lead.priority || 2, lead.confidence || 50);
    
    // Create AI suggestion with enriched context
    await prisma.aiSuggestion.create({
      data: {
        leadId: lead.id,
        suggestion: suggestion?.text || suggestion?.suggestion || getDefaultSuggestionBySource(lead.source),
        type: 'NEXT_STEP',
        priority: suggestionPriority
      },
    });
    

if (lead.priority >= 2 || ['LINKEDIN', 'REFERRAL', 'INBOUND_CALL'].includes(lead.source as string)) {
  await prisma.task.create({
    data: {
      title: getTaskTitleBySource(lead.source),
      description: `Follow up with ${lead.name} from ${lead.company || 'their company'}`,
      status: 'PENDING',
      priority: lead.priority || 2,
      dueDate: followUpDate,
      leadId: lead.id,
      userId: lead.assignedToId || data.user?.connect?.id,
    }
  });
}
  } catch (error) {
    console.error('Failed to generate AI suggestion for new lead:', error);
  }
  
  await cacheDeletePattern(`leads:${data.user?.connect?.id}:*`);
  if (data.assignedTo?.connect?.id && data.assignedTo.connect.id !== data.user?.connect?.id) {
    await cacheDeletePattern(`leads:${data.assignedTo.connect.id}:*`);
  }
  
  return lead;
}


function getDefaultFollowUpDays(source: any, priority: number): number {
  if (priority >= 3) return 1;
  
  switch (source) {
    case 'INBOUND_CALL':
      return 1; 
    case 'WEBSITE':
      return 2; 
    case 'REFERRAL':
      return 2; // Follow up in 2 days
    case 'LINKEDIN':
      return 3; // Follow up in 3 days
    case 'CONFERENCE':
    case 'WEBINAR':
      return 2; // Follow up in 2 days
    case 'SOCIAL_MEDIA':
      return 4; // Follow up in 4 days
    case 'COLD_EMAIL':
      return 5; // Follow up in 5 days
    case 'OUTBOUND_CALL':
      return 4; // Follow up in 4 days
    default:
      return 3; // Default follow up in 3 days
  }
}

// Calculate suggestion priority based on lead attributes
function calculateSuggestionPriority(leadPriority: number, confidence: number): number {
  // Scale: 1 (lowest) to 5 (highest)
  
  // High priority with high confidence = highest priority suggestions
  if (leadPriority >= 3 && confidence >= 70) return 5;
  
  // High priority with medium confidence
  if (leadPriority >= 3 && confidence >= 40) return 4;
  
  // Medium priority with high confidence
  if (leadPriority >= 2 && confidence >= 60) return 3;
  
  // Medium priority with medium confidence or high priority with low confidence
  if ((leadPriority >= 2 && confidence >= 30) || (leadPriority >= 3)) return 2;
  
  // All other cases
  return 1;
}

// Get default suggestion text based on lead source
function getDefaultSuggestionBySource(source: any): string {
  switch (source) {
    case 'LINKEDIN':
      return "Review the prospect's LinkedIn profile for mutual connections and personalize your follow-up message based on their recent posts or career milestones.";
    case 'COLD_EMAIL':
      return "Follow up with a value-add email that addresses a specific pain point, and include a case study or resource relevant to their industry.";
    case 'WEBSITE':
      return "Reference the specific pages they visited on your website and offer a personalized demo focused on those features.";
    case 'REFERRAL':
      return "Mention the mutual connection in your follow-up and ask specific questions about their current challenges related to your solution.";
    case 'CONFERENCE':
      return "Follow up with key takeaways from the conference and how your solution addresses industry challenges discussed there.";
    case 'WEBINAR':
      return "Send the webinar recording along with answers to any questions they may have had, and suggest a brief call to discuss their specific use case.";
    case 'INBOUND_CALL':
      return "Send a summary of your discussion with additional resources addressing the specific questions they had during the call.";
    case 'OUTBOUND_CALL':
      return "Follow up with an email summarizing the key points of your conversation and clearly outline next steps.";
    case 'SOCIAL_MEDIA':
      return "Engage with their recent social posts before reaching out with a personalized message referencing their social content.";
    case 'PARTNER':
      return "Connect with the partner who referred this lead for more context, then craft a personalized outreach that references the partnership.";
    default:
      return "Research the prospect's company and industry challenges, then reach out with a personalized message addressing their specific pain points.";
  }
}

// Get appropriate task title based on lead source
function getTaskTitleBySource(source: any): string {
  switch (source) {
    case 'LINKEDIN':
      return "Connect and follow up on LinkedIn";
    case 'COLD_EMAIL':
      return "Send follow-up email sequence";
    case 'WEBSITE':
      return "Follow up on website inquiry";
    case 'REFERRAL':
      return "Contact referral lead";
    case 'CONFERENCE':
      return "Follow up on conference meeting";
    case 'WEBINAR':
      return "Post-webinar outreach";
    case 'INBOUND_CALL':
      return "Follow up after inbound call";
    case 'OUTBOUND_CALL':
      return "Continue outbound call sequence";
    case 'SOCIAL_MEDIA':
      return "Engage on social media";
    case 'PARTNER':
      return "Follow up on partner referral";
    default:
      return "Initial lead follow-up";
  }
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