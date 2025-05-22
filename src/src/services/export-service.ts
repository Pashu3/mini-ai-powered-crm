import prisma from '@/lib/prisma';
import { ExportType, JobStatus } from '@/generated/prisma';
import { Parser } from 'json2csv';

export async function createExportJob(
  userId: string,
  type: ExportType,
  filters?: any
) {
  // Create export job
  const job = await prisma.exportJob.create({
    data: {
      userId,
      type,
      filters: filters || {},
      status: JobStatus.PENDING,
    },
  });
  
  // Process the export asynchronously
  processExport(job.id, userId, type, filters).catch(error => {
    console.error(`Export job ${job.id} failed:`, error);
    // Update job status to failed
    prisma.exportJob.update({
      where: { id: job.id },
      data: { status: JobStatus.FAILED },
    }).catch(console.error);
  });
  
  return job;
}

export async function getExportJobs(userId: string) {
  return prisma.exportJob.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getExportJobById(id: string, userId: string) {
  return prisma.exportJob.findFirst({
    where: {
      id,
      userId,
    },
  });
}

// Helper to process export
async function processExport(
  jobId: string,
  userId: string,
  type: ExportType,
  filters?: any
) {
  try {
    // Update job status to processing
    await prisma.exportJob.update({
      where: { id: jobId },
      data: { status: JobStatus.PROCESSING },
    });
    
    let data: any[] = [];
    let fields: string[] = [];
    
    // Get data based on export type
    switch (type) {
      case ExportType.LEADS:
        data = await exportLeads(userId, filters);
        fields = ['id', 'name', 'email', 'phone', 'company', 'position', 'stage', 'tags', 'createdAt'];
        break;
      case ExportType.CONVERSATIONS:
        data = await exportConversations(userId, filters);
        fields = ['id', 'leadId', 'leadName', 'type', 'content', 'date', 'hasFollowUp'];
        break;
      case ExportType.CAMPAIGN_DATA:
        data = await exportCampaignData(userId, filters);
        fields = ['campaignId', 'campaignName', 'leadId', 'leadName', 'stage', 'step'];
        break;
      case ExportType.ALL_DATA:
        data = await exportAllData(userId);
        fields = ['type', 'id', 'name', 'email', 'company', 'stage', 'createdAt'];
        break;
      default:
        throw new Error('Unsupported export type');
    }
    
    // Convert to CSV
    const parser = new Parser({ fields });
    const csv = parser.parse(data);
    
    // In a real application, you'd upload this to S3/Cloud Storage
    // and generate a download URL
    // For now, we'll mock a URL
    const url = `https://example.com/exports/${jobId}.csv`;
    
    // Update job with completed status and URL
    await prisma.exportJob.update({
      where: { id: jobId },
      data: {
        status: JobStatus.COMPLETED,
        url,
        completedAt: new Date(),
      },
    });
    
    return { success: true };
  } catch (error) {
    console.error('Export processing error:', error);
    
    // Update job with failed status
    await prisma.exportJob.update({
      where: { id: jobId },
      data: {
        status: JobStatus.FAILED,
      },
    });
    
    throw error;
  }
}

// Helper functions for different export types
async function exportLeads(userId: string, filters?: any) {
  const where: any = { userId };
  
  // Apply filters
  if (filters?.stage) {
    where.stage = filters.stage;
  }
  
  if (filters?.tags && Array.isArray(filters.tags) && filters.tags.length > 0) {
    where.tags = { hasSome: filters.tags };
  }
  
  const leads = await prisma.lead.findMany({ where });
  
  return leads.map(lead => ({
    id: lead.id,
    name: lead.name,
    email: lead.email || '',
    phone: lead.phone || '',
    company: lead.company || '',
    position: lead.position || '',
    stage: lead.stage,
    tags: lead.tags.join(', '),
    createdAt: lead.createdAt.toISOString(),
  }));
}

async function exportConversations(userId: string, filters?: any) {
  // Get user's leads
  const leads = await prisma.lead.findMany({
    where: { userId },
    select: { id: true, name: true },
  });
  
  const leadIds = leads.map(l => l.id);
  const leadNames = leads.reduce((acc, lead) => {
    acc[lead.id] = lead.name;
    return acc;
  }, {} as Record<string, string>);
  
  // Get conversations for these leads
  const where: any = { leadId: { in: leadIds } };
  
  // Apply filters
  if (filters?.type) {
    where.type = filters.type;
  }
  
  if (filters?.hasFollowUp !== undefined) {
    where.hasFollowUp = filters.hasFollowUp;
  }
  
  const conversations = await prisma.conversation.findMany({
    where,
    orderBy: { date: 'desc' },
  });
  
  return conversations.map(conv => ({
    id: conv.id,
    leadId: conv.leadId,
    leadName: leadNames[conv.leadId] || 'Unknown',
    type: conv.type,
    content: conv.content,
    date: conv.date.toISOString(),
    hasFollowUp: conv.hasFollowUp,
    followUpDone: conv.followUpDone,
  }));
}

async function exportCampaignData(userId: string, filters?: any) {
  // Get campaigns
  const where: any = { userId };
  
  if (filters?.campaignId) {
    where.id = filters.campaignId;
  }
  
  const campaigns = await prisma.campaign.findMany({
    where,
    include: {
      leads: true,
      steps: { orderBy: { order: 'asc' } },
    },
  });
  
  // Flatten campaign data
  return campaigns.flatMap(campaign => {
    return campaign.leads.map(lead => {
      return {
        campaignId: campaign.id,
        campaignName: campaign.name,
        leadId: lead.id,
        leadName: lead.name,
        stage: lead.stage,
        company: lead.company || '',
        step: campaign.steps[0]?.order || 0, // Current step (simplified)
      };
    });
  });
}

async function exportAllData(userId: string) {
  // Get all leads
  const leads = await prisma.lead.findMany({
    where: { userId },
  });
  
  // Get all campaigns
  const campaigns = await prisma.campaign.findMany({
    where: { userId },
  });
  
  // Combine data
  return [
    ...leads.map(lead => ({
      type: 'lead',
      id: lead.id,
      name: lead.name,
      email: lead.email || '',
      company: lead.company || '',
      stage: lead.stage,
      createdAt: lead.createdAt.toISOString(),
    })),
    ...campaigns.map(campaign => ({
      type: 'campaign',
      id: campaign.id,
      name: campaign.name,
      email: '',
      company: '',
      stage: campaign.isActive ? 'ACTIVE' : 'INACTIVE',
      createdAt: campaign.createdAt.toISOString(),
    })),
  ];
}