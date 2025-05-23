import prisma from '@/lib/prisma';

type SearchOptions = {
  query: string;
  userId: string;
  types?: string[];
  limit?: number;
  page?: number;
};

/**
 * Global search across multiple entities
 * Returns formatted results for display in the UI
 */
export async function globalSearch({ query, userId, types = ['leads', 'tasks', 'conversations', 'templates', 'campaigns'], limit = 5, page = 1 }: SearchOptions) {
  // Calculate offset for pagination
  const offset = (page - 1) * limit;
  
  // Prepare search results
  const results: Record<string, any[]> = {};
  const searchPromises: Promise<any>[] = [];

  // Search for leads
  if (types.includes('leads')) {
    searchPromises.push(
      prisma.lead.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
            { company: { contains: query, mode: 'insensitive' } },
            { position: { contains: query, mode: 'insensitive' } },
            { notes: { contains: query, mode: 'insensitive' } },
            { tags: { has: query } } // Search in tags array
          ],
          AND: [
            { isDeleted: false },
            { isArchived: false },
            {
              OR: [
                { userId: userId },
                { assignedToId: userId }
              ]
            }
          ]
        },
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          position: true,
          stage: true,
          priority: true,
          createdAt: true,
          lastContactedDate: true
        },
        skip: offset,
        take: limit,
        orderBy: { updatedAt: 'desc' }
      }).then(data => {
        results.leads = data.map(lead => ({
          ...lead,
          type: 'lead',
          url: `/dashboard/leads/${lead.id}`
        }));
      })
    );
  }

  // Search for tasks
  if (types.includes('tasks')) {
    searchPromises.push(
      prisma.task.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
          userId: userId
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          dueDate: true,
          priority: true,
          lead: {
            select: {
              id: true,
              name: true,
            }
          }
        },
        skip: offset,
        take: limit,
        orderBy: { dueDate: 'asc' }
      }).then(data => {
        results.tasks = data.map(task => ({
          ...task,
          type: 'task',
          url: `/dashboard/tasks/${task.id}`
        }));
      })
    );
  }

  // Search for conversations
  if (types.includes('conversations')) {
    searchPromises.push(
      prisma.conversation.findMany({
        where: {
          OR: [
            { content: { contains: query, mode: 'insensitive' } },
            { subject: { contains: query, mode: 'insensitive' } },
          ],
          lead: {
            OR: [
              { userId: userId },
              { assignedToId: userId }
            ]
          }
        },
        select: {
          id: true,
          type: true,
          subject: true,
          content: true,
          date: true,
          lead: {
            select: {
              id: true,
              name: true,
            }
          }
        },
        skip: offset,
        take: limit,
        orderBy: { date: 'desc' }
      }).then(data => {
        results.conversations = data.map(conversation => ({
          ...conversation,
          type: 'conversation',
          url: `/dashboard/leads/${conversation.lead.id}?tab=conversations&conversation=${conversation.id}`
        }));
      })
    );
  }

  // Search for message templates
  if (types.includes('templates')) {
    searchPromises.push(
      prisma.messageTemplate.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            { subject: { contains: query, mode: 'insensitive' } },
            { tags: { has: query } }
          ],
          userId: userId
        },
        select: {
          id: true,
          name: true,
          subject: true,
          type: true,
          tags: true,
          createdAt: true
        },
        skip: offset,
        take: limit,
        orderBy: { updatedAt: 'desc' }
      }).then(data => {
        results.templates = data.map(template => ({
          ...template,
          type: 'template',
          url: `/dashboard/templates/${template.id}`
        }));
      })
    );
  }

  // Search for campaigns
  if (types.includes('campaigns')) {
    searchPromises.push(
      prisma.campaign.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
          userId: userId
        },
        select: {
          id: true,
          name: true,
          description: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: { leads: true, steps: true }
          }
        },
        skip: offset,
        take: limit,
        orderBy: { updatedAt: 'desc' }
      }).then(data => {
        results.campaigns = data.map(campaign => ({
          ...campaign,
          type: 'campaign',
          url: `/dashboard/campaigns/${campaign.id}`
        }));
      })
    );
  }

  // Wait for all search queries to complete
  await Promise.all(searchPromises);

  // Calculate total counts for each type
  const counts: Record<string, number> = {};
  
  if (page === 1) {
    const countPromises = [];
    
    if (types.includes('leads')) {
      countPromises.push(
        prisma.lead.count({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { company: { contains: query, mode: 'insensitive' } },
              { position: { contains: query, mode: 'insensitive' } },
              { notes: { contains: query, mode: 'insensitive' } },
              { tags: { has: query } },
              {
                AND: [
                  { isDeleted: false },
                  { isArchived: false },
                  {
                    OR: [
                      { userId: userId },
                      { assignedToId: userId }
                    ]
                  }
                ]
              }
            ]
          }
        }).then(count => counts['leads'] = count)
      );
    }
    
    if (types.includes('tasks')) {
      countPromises.push(
        prisma.task.count({
          where: {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
            userId: userId
          }
        }).then(count => counts['tasks'] = count)
      );
    }
    
    if (types.includes('conversations')) {
      countPromises.push(
        prisma.conversation.count({
          where: {
            OR: [
              { content: { contains: query, mode: 'insensitive' } },
              { subject: { contains: query, mode: 'insensitive' } },
            ],
            lead: {
              OR: [
                { userId: userId },
                { assignedToId: userId }
              ]
            }
          }
        }).then(count => counts['conversations'] = count)
      );
    }
    
    if (types.includes('templates')) {
      countPromises.push(
        prisma.messageTemplate.count({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
              { subject: { contains: query, mode: 'insensitive' } },
              { tags: { has: query } }
            ],
            userId: userId
          }
        }).then(count => counts['templates'] = count)
      );
    }
    
    if (types.includes('campaigns')) {
      countPromises.push(
        prisma.campaign.count({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
            userId: userId
          }
        }).then(count => counts['campaigns'] = count)
      );
    }

    await Promise.all(countPromises);
  }

  // Calculate total results across all types
  let totalResults = 0;
  Object.values(results).forEach(array => {
    totalResults += array.length;
  });

  return { results, totalResults, counts };
}