import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { exportLeadsToCsv } from '@/services/lead-service';
import { unauthorizedResponse, errorResponse } from '@/lib/api-utils';
import type { LeadStage, LeadSource } from '@/types/lead';


export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return unauthorizedResponse();
        }

        const userId = session.user.id;
        const { searchParams } = new URL(req.url);

        // Import LeadStage and LeadSource enums

        // Helper functions to cast string to enum
        function parseLeadStage(value: string | null): LeadStage | undefined {
            if (!value) return undefined;
            // @ts-ignore
            return (Object.values(LeadStage) as string[]).includes(value) ? value as LeadStage : undefined;
        }
        function parseLeadSource(value: string | null): LeadSource | undefined {
            if (!value) return undefined;
            // @ts-ignore
            return (Object.values(LeadSource) as string[]).includes(value) ? value as LeadSource : undefined;
        }

        // Parse filters from query parameters
        const filters = {
            search: searchParams.get('search') || undefined,
            stage: parseLeadStage(searchParams.get('stage')),
            source: parseLeadSource(searchParams.get('source')),
            tags: searchParams.get('tags') ? searchParams.get('tags')!.split(',') : undefined,
            priority: searchParams.get('priority') ? parseInt(searchParams.get('priority')!) : undefined,
            confidence: searchParams.get('confidence') ? parseInt(searchParams.get('confidence')!) : undefined,
            assignedToId: searchParams.get('assignedToId') || undefined,
            region: searchParams.get('region') || undefined,
            includeArchived: searchParams.get('includeArchived') === 'true',
            includeDeleted: searchParams.get('includeDeleted') === 'true',
        };

        const { csv, filename } = await exportLeadsToCsv(userId, filters);

        // Set response headers for file download
        const headers = new Headers();
        headers.set('Content-Type', 'text/csv');
        headers.set('Content-Disposition', `attachment; filename="${filename}"`);

        // Return CSV as download
        return new Response(csv, {
            status: 200,
            headers
        });

    } catch (error: any) {
        console.error('Error exporting leads:', error);
        return errorResponse(error.message);
    }
}