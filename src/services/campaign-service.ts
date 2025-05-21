import prisma from '@/lib/prisma';
import { cacheDelete, cacheDeletePattern, cacheGet, cacheSet } from '@/lib/redis';

const CACHE_TTL = 300; // 5 minutes
const CAMPAIGN_DETAIL_CACHE_TTL = 600; // 10 minutes

export async function getCampaigns(userId: string) {
  const cacheKey = `campaigns:${userId}`;
  
  // Check cache first
  const cachedCampaigns = await cacheGet(cacheKey);
  if (cachedCampaigns) return cachedCampaigns;
  
  const campaigns = await prisma.campaign.findMany({
    where: { userId },
    include: {
      _count: {
        select: { leads: true, steps: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  
  // Cache results
  await cacheSet(cacheKey, campaigns, CACHE_TTL);
  
  return campaigns;
}

export async function getCampaignById(id: string, userId: string) {
  const cacheKey = `campaign:${id}`;
  
  // Check cache first
  const cachedCampaign = await cacheGet(cacheKey);
  if (cachedCampaign) return cachedCampaign;
  
  const campaign = await prisma.campaign.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      steps: {
        orderBy: { order: 'asc' },
        include: {
          template: true,
        },
      },
      leads: {
        select: {
          id: true,
          name: true,
          company: true,
          email: true,
          position: true,
          stage: true,
          lastContactedDate: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
  
  if (campaign) {
    // Cache campaign data
    await cacheSet(cacheKey, campaign, CAMPAIGN_DETAIL_CACHE_TTL);
  }
  
  return campaign;
}

export async function createCampaign(userId: string, data: any) {
  try {
    // Use transaction to ensure consistency
    const result = await prisma.$transaction(async (tx) => {
      // Create the campaign
      const campaign = await tx.campaign.create({
        data: {
          name: data.name,
          description: data.description,
          userId,
          isActive: data.isActive ?? true,
        },
      });
      
      // Create steps if provided
      if (data.steps && Array.isArray(data.steps)) {
        await Promise.all(
          data.steps.map(async (step: any, index: number) => {
            return tx.campaignStep.create({
              data: {
                campaignId: campaign.id,
                type: step.type,
                content: step.content,
                templateId: step.templateId,
                waitDays: step.waitDays ?? 0,
                order: index,
                conditions: step.conditions,
              },
            });
          })
        );
      }
      
      // Return the created campaign with steps
      return tx.campaign.findUnique({
        where: { id: campaign.id },
        include: {
          steps: {
            orderBy: { order: 'asc' },
            include: { template: true },
          },
        },
      });
    });
    
    // Clear cache
    await cacheDeletePattern(`campaigns:${userId}*`);
    
    return result;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
}

export async function updateCampaign(id: string, userId: string, data: any) {
  try {
    // Verify campaign belongs to user
    const campaign = await prisma.campaign.findFirst({
      where: {
        id,
        userId,
      },
    });
    
    if (!campaign) {
      throw new Error('Campaign not found or access denied');
    }
    
    // Use transaction to ensure consistency
    const result = await prisma.$transaction(async (tx) => {
      // Update campaign
      const updatedCampaign = await tx.campaign.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          isActive: data.isActive !== undefined ? data.isActive : campaign.isActive,
        },
      });
      
      // Update steps if provided
      if (data.steps && Array.isArray(data.steps)) {
        // Delete existing steps
        await tx.campaignStep.deleteMany({
          where: { campaignId: id },
        });
        
        // Create new steps
        await Promise.all(
          data.steps.map(async (step: any, index: number) => {
            return tx.campaignStep.create({
              data: {
                campaignId: id,
                type: step.type,
                content: step.content,
                templateId: step.templateId,
                waitDays: step.waitDays ?? 0,
                order: index,
                conditions: step.conditions,
              },
            });
          })
        );
      }
      
      // Return the updated campaign with steps
      return tx.campaign.findUnique({
        where: { id },
        include: {
          steps: {
            orderBy: { order: 'asc' },
            include: { template: true },
          },
        },
      });
    });
    
    // Clear caches
    await cacheDelete(`campaign:${id}`);
    await cacheDeletePattern(`campaigns:${userId}*`);
    
    return result;
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }
}

export async function deleteCampaign(id: string, userId: string) {
  try {
    // Verify campaign belongs to user
    const campaign = await prisma.campaign.findFirst({
      where: {
        id,
        userId,
      },
    });
    
    if (!campaign) {
      throw new Error('Campaign not found or access denied');
    }
    
    // Before deleting, remove campaign references from leads
    await prisma.lead.updateMany({
      where: { campaignId: id },
      data: { campaignId: null }
    });
    
    // Delete campaign (steps will be cascade deleted)
    await prisma.campaign.delete({
      where: { id },
    });
    
    // Clear caches
    await cacheDelete(`campaign:${id}`);
    await cacheDeletePattern(`campaigns:${userId}*`);
    await cacheDeletePattern(`leads:${userId}*`);
    
    return { success: true, message: 'Campaign deleted successfully' };
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw error;
  }
}

export async function addLeadsToCampaign(
  id: string,
  userId: string,
  leadIds: string[]
) {
  try {
    // Verify campaign belongs to user
    const campaign = await prisma.campaign.findFirst({
      where: {
        id,
        userId,
      },
    });
    
    if (!campaign) {
      throw new Error('Campaign not found or access denied');
    }
    
    // Verify leads belong to user
    const leadsCount = await prisma.lead.count({
      where: {
        id: { in: leadIds },
        userId,
      },
    });
    
    if (leadsCount !== leadIds.length) {
      throw new Error('One or more leads not found or not accessible');
    }
    
    // Update leads
    const result = await prisma.lead.updateMany({
      where: {
        id: { in: leadIds },
      },
      data: {
        campaignId: id,
      },
    });
    
    // Clear caches
    await cacheDelete(`campaign:${id}`);
    await cacheDeletePattern(`campaigns:${userId}*`);
    await cacheDeletePattern(`leads:${userId}*`);
    
    return { 
      success: true,
      count: result.count,
      message: `${result.count} leads added to campaign`
    };
  } catch (error) {
    console.error('Error adding leads to campaign:', error);
    throw error;
  }
}

export async function removeLeadFromCampaign(
  campaignId: string,
  leadId: string,
  userId: string
) {
  try {
    // Verify campaign and lead belong to user
    const campaignLead = await prisma.lead.findFirst({
      where: {
        id: leadId,
        userId,
        campaignId,
      },
    });
    
    if (!campaignLead) {
      throw new Error('Lead not found in this campaign or access denied');
    }
    
    // Update lead
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        campaignId: null,
      },
    });
    
    // Clear caches
    await cacheDelete(`campaign:${campaignId}`);
    await cacheDelete(`lead:${leadId}`);
    await cacheDeletePattern(`campaigns:${userId}*`);
    await cacheDeletePattern(`leads:${userId}*`);
    
    return { 
      success: true,
      leadId,
      message: 'Lead successfully removed from campaign'
    };
  } catch (error) {
    console.error('Error removing lead from campaign:', error);
    throw error;
  }
}