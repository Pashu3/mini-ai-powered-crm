import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Users, Plus, X } from "lucide-react";
import Link from "next/link";

// Update the Campaign interface to match the actual API response
interface Campaign {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  status?: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'DRAFT';
  _count?: {
    leads: number;
    steps: number;
  };
}

interface CampaignSelectorProps {
  leadName: string;
  campaigns: Campaign[];
  loading: boolean;
  onAssignCampaign: (campaignId: string) => Promise<void>;
  onClose: () => void;
  isAssigning: boolean;
  getCampaignStatusColor: (status: string) => string;
  currentCampaignId?: string | null; // Add this prop
}

export default function CampaignSelector({
  leadName,
  campaigns,
  loading,
  onAssignCampaign,
  onClose,
  isAssigning,
  getCampaignStatusColor,
currentCampaignId // Use this prop

}: CampaignSelectorProps) {
  // Helper function to determine campaign status text
  const getCampaignStatusText = (campaign: Campaign) => {
    if (campaign.status) {
      return campaign.status.charAt(0) + campaign.status.slice(1).toLowerCase();
    }
    
    return campaign.isActive ? "Active" : "Inactive";
  };
  
  // Helper function to determine status for color
  const getStatusForColor = (campaign: Campaign) => {
    if (campaign.status) {
      return campaign.status;
    }
    
    return campaign.isActive ? "ACTIVE" : "PAUSED";
  };
  
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Add to Campaign</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>
        
        {loading ? (
          <div className="py-8 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-6">
            <Users className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h4 className="font-medium mb-1">No campaigns found</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Create a new campaign first to add this lead.
            </p>
            <Link
              href="/dashboard/campaigns/new"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} />
              Create Campaign
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              Select a campaign to add <strong>{leadName}</strong> to:
            </p>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pb-4">
              {campaigns.map(campaign => (
                <button
                  key={campaign.id}
                  onClick={() => onAssignCampaign(campaign.id)}
                  disabled={isAssigning}
                  className="w-full text-left px-4 py-3 rounded-md border border-border hover:bg-muted/50 transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{campaign.name}</div>
                    {campaign.description && (
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {campaign.description}
                      </div>
                    )}
                    {campaign._count && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {campaign._count.leads} leads · {campaign._count.steps} steps
                      </div>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getCampaignStatusColor(getStatusForColor(campaign))}`}>
                    {getCampaignStatusText(campaign)}
                  </span>
                </button>
              ))}
            </div>
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
      <button 
        onClick={onClose} 
        className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
        disabled={isAssigning}
      >
        Cancel
      </button>
      
      {/* Only show remove button if lead has a campaign */}
      {currentCampaignId && (
        <button 
          onClick={() => onAssignCampaign('')}
          className="px-4 py-2 bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-colors"
          disabled={isAssigning}
        >
          {isAssigning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2 inline" />
              Removing...
            </>
          ) : (
            'Remove from Campaign'
          )}
        </button>
      )}
    </div>
          </>
        )}
      </motion.div>
    </div>
  );
}