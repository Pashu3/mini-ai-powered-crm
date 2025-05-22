"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Loader2, 
  PlusCircle, 
  Search, 
  Settings, 
  Megaphone, 
  BarChart3, 
  Calendar,
  Users,
  Mail,
  AlertCircle,
  CheckCircle,
  PauseCircle,
  PlayCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Campaign {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    leads: number;
    steps: number;
  };
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/campaigns');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch campaigns: ${response.status}`);
        }
        
        const data = await response.json();
        const campaignsData = data.success && data.data 
          ? data.data 
          : (Array.isArray(data) ? data : []);
        
        setCampaigns(campaignsData);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchCampaigns();
  }, []);
  
  
  // Filter campaigns based on search query
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (campaign.description && campaign.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your outreach campaigns
          </p>
        </div>
        
        <Link 
          href="/dashboard/campaigns/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md inline-flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <PlusCircle size={16} />
          New Campaign
        </Link>
      </div>
      
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md border border-destructive/20 flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search campaigns..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-input rounded-md bg-background"
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/dashboard/campaigns/${campaign.id}`}>
                <div className="border border-border rounded-lg shadow-sm hover:shadow-md transition-all bg-card overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-xl truncate">{campaign.name}</h3>
                      <div className={`rounded-full px-2 py-0.5 text-xs inline-flex items-center gap-1 ${
                        campaign.isActive 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {campaign.isActive ? (
                          <><CheckCircle size={12} /> Active</>
                        ) : (
                          <><PauseCircle size={12} /> Paused</>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {campaign.description || "No description provided"}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users size={14} />
                        <span>{campaign._count?.leads || 0} leads</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar size={14} />
                        <span>{campaign._count?.steps || 0} steps</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground col-span-2">
                        <Calendar size={14} />
                        <span>Created {formatDistanceToNow(new Date(campaign.createdAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border bg-muted/40 p-3 flex justify-end">
                    <div className="text-primary text-sm font-medium">View Details →</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-muted-foreground/25 rounded-md">
          <Megaphone className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium mb-1">No campaigns yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first campaign to start reaching out to leads
          </p>
          <Link
            href="/dashboard/campaigns/new"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md inline-flex items-center gap-2"
          >
            <PlusCircle size={16} />
            Create Campaign
          </Link>
        </div>
      )}
    </div>
  );
}