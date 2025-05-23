"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Search,
  UserPlus,
  Loader2,
  AlertCircle,
  Check,
  Users,
  Mail,
  Building,
  Tag
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  stage: string;
  campaignId?: string | null;
  tags?: string[];
}

interface Campaign {
  id: string;
  name: string;
  description?: string;
}

export default function AddLeadsToCampaignPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [campaignLoading, setCampaignLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [showExistingInCampaign, setShowExistingInCampaign] = useState<boolean>(false);


  // Fetch campaign details
  useEffect(() => {
    async function fetchCampaign() {
      try {
        setCampaignLoading(true);

        const response = await fetch(`/api/campaigns/${campaignId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch campaign: ${response.status}`);
        }

        const data = await response.json();
        const campaignData = data.success && data.data
          ? data.data
          : data;

        setCampaign(campaignData);
      } catch (err) {
        console.error("Error fetching campaign:", err);
        setError("Failed to load campaign details. Please try again.");
      } finally {
        setCampaignLoading(false);
      }
    }

    fetchCampaign();
  }, [campaignId]);

  // Fetch available leads
  // Update the fetchLeads function:

  useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true);

        const response = await fetch('/api/leads?fields=id,name,company,email,stage,campaignId,tags');

        if (!response.ok) {
          throw new Error(`Failed to fetch leads: ${response.status}`);
        }

        const data = await response.json();

        // Correctly access the leads array from the nested structure
        let leadsData;
        if (data.success && data.data && data.data.leads) {
          leadsData = data.data.leads; // Properly access leads inside data.data.leads
        } else if (Array.isArray(data)) {
          leadsData = data;
        } else if (Array.isArray(data.data)) {
          leadsData = data.data;
        } else {
          leadsData = [];
        }

        // Filter out leads that are already in a campaign
        const availableLeads = leadsData.filter((lead: Lead) => !lead.campaignId);
        setLeads(availableLeads);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError("Failed to load leads. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  const handleToggleSelectAll = () => {
    if (selectedLeadIds.length === filteredLeads.length) {
      // Deselect all
      setSelectedLeadIds([]);
    } else {
      // Select all filtered leads
      setSelectedLeadIds(filteredLeads.map(lead => lead.id));
    }
  };

  const handleToggleLead = (leadId: string) => {
    if (selectedLeadIds.includes(leadId)) {
      // Remove lead from selection
      setSelectedLeadIds(selectedLeadIds.filter(id => id !== leadId));
    } else {
      // Add lead to selection
      setSelectedLeadIds([...selectedLeadIds, leadId]);
    }
  };

  const handleAddLeads = async () => {
    if (selectedLeadIds.length === 0) {
      setError("Please select at least one lead");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const response = await fetch(`/api/campaigns/${campaignId}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadIds: selectedLeadIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add leads to campaign');
      }

      router.push(`/dashboard/campaigns/${campaignId}`);
    } catch (err) {
      console.error("Error adding leads to campaign:", err);
      setError(err instanceof Error ? err.message : 'Failed to add leads to campaign');
    } finally {
      setIsSaving(false);
    }
  };

  // Get the stage color based on stage name
  const getStageColor = (stage: string) => {
    switch (stage.toUpperCase()) {
      case 'NEW':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'CONTACTED':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'QUALIFIED':
        return 'text-cyan-600 bg-cyan-50 border-cyan-200';
      case 'PROPOSAL':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'NEGOTIATION':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'CONVERTED':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'LOST':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Filter leads based on search query and filters
  const getFilteredLeads = () => {
    let filtered = leads;

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply stage filter
    if (filter !== 'all') {
      filtered = filtered.filter(lead => lead.stage.toUpperCase() === filter);
    }

    return filtered;
  };

  const filteredLeads = getFilteredLeads();

  // Group leads by stages for organization
  const stages = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST'];

  if (campaignLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
        <AlertCircle className="h-6 w-6 mb-2" />
        <h3 className="font-medium text-lg">Error loading campaign</h3>
        <p>{error || "Campaign not found"}</p>
        <div className="flex gap-3 mt-4">
          <Link
            href="/dashboard/campaigns"
            className="px-4 py-2 bg-background border border-input rounded-md"
          >
            Back to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/campaigns/${campaignId}`}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back to campaign</span>
          </Link>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add Leads to Campaign</h1>
            <p className="text-muted-foreground">
              Select leads to add to "{campaign.name}"
            </p>
          </div>
        </div>

        <button
          onClick={handleAddLeads}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
          disabled={isSaving || selectedLeadIds.length === 0}
        >
          {isSaving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <UserPlus size={16} />
              Add {selectedLeadIds.length} {selectedLeadIds.length === 1 ? 'Lead' : 'Leads'}
            </>
          )}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search leads by name, company or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-input rounded-md"
          />
        </div>

        <div className="relative inline-block">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none w-full px-3 py-2 bg-background border border-input rounded-md text-sm pr-8 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Stages</option>
            {stages.map((stage) => (
              <option key={stage} value={stage}>{stage.charAt(0) + stage.slice(1).toLowerCase()}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={24} className="animate-spin text-primary mr-2" />
            <span>Loading leads...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Users size={48} className="text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium mb-1">No leads found</h3>
            {searchQuery || filter !== 'all' ? (
              <p className="text-muted-foreground max-w-md mb-4">
                No leads match your current search or filter. Try adjusting your criteria.
              </p>
            ) : (
              <p className="text-muted-foreground max-w-md mb-4">
                You don't have any leads available to add to this campaign.
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilter('all');
                }}
                className="px-4 py-2 border border-input rounded-md text-sm"
              >
                Clear Filters
              </button>
              <Link
                href="/dashboard/leads/new"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm flex items-center gap-1"
              >
                <UserPlus size={14} />
                Add New Lead
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="border-b border-border">
              <div className="grid grid-cols-2 md:grid-cols-[auto,1fr,1fr,1fr,auto] gap-4 p-4 bg-muted/50 text-sm font-medium">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLeadIds.length === filteredLeads.length}
                    onChange={handleToggleSelectAll}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </div>
                <div>Name</div>
                <div>Company</div>
                <div>Email</div>
                <div>Stage</div>
              </div>
            </div>

            <div>
              {filteredLeads.map((lead) => (
                <div className={`grid grid-cols-2 md:grid-cols-[auto,1fr,1fr,1fr,auto] gap-4 p-4 border-b border-border hover:bg-muted/30 transition-colors ${selectedLeadIds.includes(lead.id) ? 'bg-primary/5' : ''
                  }`}>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLeadIds.includes(lead.id)}
                      onChange={() => handleToggleLead(lead.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">{lead.name || 'No name'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Building size={14} className="text-muted-foreground" />
                    {lead.company || 'No company'}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail size={14} className="text-muted-foreground" />
                    <span className="text-sm truncate">{lead.email || 'No email'}</span>
                  </div>
                  <div>
                    {lead.stage ? (
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStageColor(lead.stage)}`}>
                        {lead.stage.charAt(0) + lead.stage.slice(1).toLowerCase()}
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full border text-gray-600 bg-gray-50 border-gray-200">
                        No stage
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedLeadIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 inset-x-0 mx-auto w-full max-w-3xl px-4"
        >
          <div className="bg-card border border-border rounded-lg shadow-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center">
                <Check size={16} />
              </div>
              <span className="font-medium">
                {selectedLeadIds.length} {selectedLeadIds.length === 1 ? 'lead' : 'leads'} selected
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedLeadIds([])}
                className="px-3 py-1.5 border border-input rounded-md text-sm"
              >
                Clear
              </button>
              <button
                onClick={handleAddLeads}
                className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm flex items-center gap-1"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <UserPlus size={14} />
                    Add to Campaign
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}