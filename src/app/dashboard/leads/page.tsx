"use client";

import { useState, useEffect, useCallback, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Trash2,
  Edit,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Table,
  Columns,
  X,
  Archive,
  ArchiveRestore,
  UserPlus,
  Tag,
  BarChart3,
  Inbox
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import { getStageColor, getSourceColor } from "@/utils/styleHelpers";
import { Lead, LeadStage, LeadSource } from "@/types/lead";
import KanbanView from "@/components/leads/KanbanView";
import DeleteLeadConfirmation from "@/components/leads/DeleteLeadConfirmation";
interface LeadResponse {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
}

type ViewMode = 'table' | 'kanban';

function LeadsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-48 bg-muted/30 animate-pulse rounded-md mb-2"></div>
          <div className="h-4 w-64 bg-muted/30 animate-pulse rounded-md"></div>
        </div>
        <div className="h-10 w-32 bg-muted/30 animate-pulse rounded-md"></div>
      </div>
      <div className="h-16 bg-muted/30 animate-pulse rounded-md"></div>
      <div className="bg-card border border-border rounded-md shadow-sm overflow-hidden">
        <div className="p-8 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    </div>
  );
}

function LeadsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [selectedStage, setSelectedStage] = useState<LeadStage | undefined>(
    searchParams.get('stage') as LeadStage || undefined
  );
  const [selectedSource, setSelectedSource] = useState<LeadSource | undefined>(
    searchParams.get('source') as LeadSource || undefined
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',') || []
  );
  const [minConfidence, setMinConfidence] = useState<number | undefined>(
    searchParams.get('confidence') ? Number(searchParams.get('confidence')) : undefined
  );
  const [priority, setPriority] = useState<number | undefined>(
    searchParams.get('priority') ? Number(searchParams.get('priority')) : undefined
  );
  const [region, setRegion] = useState<string | undefined>(
    searchParams.get('region') || undefined
  );
  const [assignedToId, setAssignedToId] = useState<string | undefined>(
    searchParams.get('assignedToId') || undefined
  );
  const [includeArchived, setIncludeArchived] = useState<boolean>(
    searchParams.get('includeArchived') === 'true'
  );
  const [includeDeleted, setIncludeDeleted] = useState<boolean>(
    searchParams.get('includeDeleted') === 'true'
  );
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const [viewMode, setViewMode] = useState<ViewMode>(searchParams.get('view') as ViewMode || 'table');

  const pageSize = 50;

  const [stageDropdownOpen, setStageDropdownOpen] = useState(false);
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [deleteLeadData, setDeleteLeadData] = useState<{
    id: string;
    name: string;
    company: string;
    isArchived: boolean;
    isDeleted: boolean;
  } | null>(null);

  // Available tags for filtering (will be populated from leads)
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  // Create refs for dropdown containers
  const viewDropdownRef = useRef<HTMLDivElement>(null);
  const stageDropdownRef = useRef<HTMLDivElement>(null);
  const sourceDropdownRef = useRef<HTMLDivElement>(null);
  const moreFiltersRef = useRef<HTMLDivElement>(null);

  // Extract all unique tags from leads
  useEffect(() => {
    if (leads.length > 0) {
      const allTags = leads.flatMap(lead => lead.tags || []);
      const uniqueTags = [...new Set(allTags)].filter(tag => tag);
      setAvailableTags(uniqueTags);
    }
  }, [leads]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close view dropdown when clicking outside
      if (viewDropdownRef.current && !viewDropdownRef.current.contains(event.target as Node)) {
        setViewDropdownOpen(false);
      }

      // Close stage dropdown when clicking outside
      if (stageDropdownRef.current && !stageDropdownRef.current.contains(event.target as Node)) {
        setStageDropdownOpen(false);
      }

      // Close source dropdown when clicking outside
      if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(event.target as Node)) {
        setSourceDropdownOpen(false);
      }

      // Close more filters when clicking outside
      if (moreFiltersRef.current && !moreFiltersRef.current.contains(event.target as Node)) {
        setMoreFiltersOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateUrlParams = useCallback(
    (params: {
      search?: string;
      stage?: LeadStage;
      source?: LeadSource;
      tags?: string[];
      confidence?: number;
      priority?: number;
      region?: string;
      assignedToId?: string;
      includeArchived?: boolean;
      includeDeleted?: boolean;
      page?: number;
      view?: ViewMode;
    }) => {
      const urlParams = new URLSearchParams();

      if (params.search) urlParams.set('search', params.search);
      if (params.stage) urlParams.set('stage', params.stage);
      if (params.source) urlParams.set('source', params.source);
      if (params.tags && params.tags.length > 0) urlParams.set('tags', params.tags.join(','));
      if (params.confidence !== undefined) urlParams.set('confidence', params.confidence.toString());
      if (params.priority !== undefined) urlParams.set('priority', params.priority.toString());
      if (params.region) urlParams.set('region', params.region);
      if (params.assignedToId) urlParams.set('assignedToId', params.assignedToId);
      if (params.includeArchived) urlParams.set('includeArchived', 'true');
      if (params.includeDeleted) urlParams.set('includeDeleted', 'true');
      if ((params.page || 0) > 1) urlParams.set('page', (params.page || 1).toString());
      if ((params.view || 'table') !== 'table') urlParams.set('view', params.view || 'table');

      const queryString = urlParams.toString() ? `?${urlParams.toString()}` : '';
      router.push(`/dashboard/leads${queryString}`, { scroll: false });
    },
    [router]
  );

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value, page: 1 });
  }, 500);

  // Function to update filters and URL all at once
  const updateFilters = (newFilters: {
    search?: string;
    stage?: LeadStage | undefined;
    source?: LeadSource | undefined;
    tags?: string[];
    confidence?: number | undefined;
    priority?: number | undefined;
    region?: string | undefined;
    assignedToId?: string | undefined;
    includeArchived?: boolean;
    includeDeleted?: boolean;
    page?: number;
    view?: ViewMode;
  }) => {
    // Update state for any provided filters
    if ('search' in newFilters) setSearchTerm(newFilters.search || '');
    if ('stage' in newFilters) setSelectedStage(newFilters.stage);
    if ('source' in newFilters) setSelectedSource(newFilters.source);
    if ('tags' in newFilters) setSelectedTags(newFilters.tags || []);
    if ('confidence' in newFilters) setMinConfidence(newFilters.confidence);
    if ('priority' in newFilters) setPriority(newFilters.priority);
    if ('region' in newFilters) setRegion(newFilters.region);
    if ('assignedToId' in newFilters) setAssignedToId(newFilters.assignedToId);
    if ('includeArchived' in newFilters) setIncludeArchived(!!newFilters.includeArchived);
    if ('includeDeleted' in newFilters) setIncludeDeleted(!!newFilters.includeDeleted);
    if ('page' in newFilters) setCurrentPage(newFilters.page || 1);
    if ('view' in newFilters) setViewMode(newFilters.view || 'table');

    // Update URL with all current filters plus any new ones
    updateUrlParams({
      search: 'search' in newFilters ? newFilters.search : searchTerm,
      stage: 'stage' in newFilters ? newFilters.stage : selectedStage,
      source: 'source' in newFilters ? newFilters.source : selectedSource,
      tags: 'tags' in newFilters ? newFilters.tags : selectedTags,
      confidence: 'confidence' in newFilters ? newFilters.confidence : minConfidence,
      priority: 'priority' in newFilters ? newFilters.priority : priority,
      region: 'region' in newFilters ? newFilters.region : region,
      assignedToId: 'assignedToId' in newFilters ? newFilters.assignedToId : assignedToId,
      includeArchived: 'includeArchived' in newFilters ? newFilters.includeArchived : includeArchived,
      includeDeleted: 'includeDeleted' in newFilters ? newFilters.includeDeleted : includeDeleted,
      page: 'page' in newFilters ? newFilters.page : currentPage,
      view: 'view' in newFilters ? newFilters.view : viewMode,
    });
  };
  const handleDeleteLeadConfirm = (id: string) => {
    const lead = leads.find(l => l.id === id);
    if (lead) {
      setDeleteLeadData({
        id: lead.id,
        name: lead.name,
        company: lead.company || 'Unknown company',
        isArchived: lead.isArchived || false,
        isDeleted: lead.isDeleted || false
      });
    }
  };
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (searchTerm) params.set('search', searchTerm);
      if (selectedStage) params.set('stage', selectedStage);
      if (selectedSource) params.set('source', selectedSource);
      if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
      if (minConfidence !== undefined) params.set('confidence', minConfidence.toString());
      if (priority !== undefined) params.set('priority', priority.toString());
      if (region) params.set('region', region);
      if (assignedToId) params.set('assignedToId', assignedToId);
      if (includeArchived) params.set('includeArchived', 'true');
      if (includeDeleted) params.set('includeDeleted', 'true');

      // Pagination
      const offset = (currentPage - 1) * pageSize;
      params.set('limit', pageSize.toString());
      params.set('offset', offset.toString());

      // Fetch leads with all filters
      const response = await fetch(`/api/leads?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Error fetching leads: ${response.status}`);
      }

      const responseData = await response.json();

      // Handle the response format
      if (responseData.success && responseData.data) {
        setLeads(responseData.data.leads || []);
        setTotalLeads(responseData.data.total || 0);
      } else {
        setLeads(responseData.leads || []);
        setTotalLeads(responseData.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
      setError('Failed to fetch leads. Please try again.');
      setLeads([]);
      setTotalLeads(0);
    } finally {
      setLoading(false);
    }
  }, [
    searchTerm,
    selectedStage,
    selectedSource,
    selectedTags,
    minConfidence,
    priority,
    region,
    assignedToId,
    includeArchived,
    includeDeleted,
    currentPage,
    pageSize
  ]);

  // Initial fetch and refetch when filters change
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Clear all filters
  const clearAllFilters = () => {
    updateFilters({
      search: '',
      stage: undefined,
      source: undefined,
      tags: [],
      confidence: undefined,
      priority: undefined,
      region: undefined,
      assignedToId: undefined,
      includeArchived: false,
      includeDeleted: false,
      page: 1
    });
  };

  // Handle lead deletion (now with soft delete option)
  const handleDeleteLead = async (id: string, useSoftDelete: boolean = true) => {
    try {
      setActionLoading(true);

      // Use soft delete by default
      const endpoint = useSoftDelete
        ? `/api/leads/${id}?soft=true`
        : `/api/leads/${id}`;

      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete lead: ${response.status}`);
      }

      // Refetch leads after successful deletion
      await fetchLeads();
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting lead:', err);
      setError('Failed to delete the lead. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle lead archive/unarchive
  const handleArchiveLead = async (id: string, archive: boolean = true) => {
    try {
      setActionLoading(true);

      const response = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isArchived: archive }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${archive ? 'archive' : 'unarchive'} lead: ${response.status}`);
      }

      // Refetch leads after successful operation
      await fetchLeads();
    } catch (err) {
      console.error(`Error ${archive ? 'archiving' : 'unarchiving'} lead:`, err);
      setError(`Failed to ${archive ? 'archive' : 'unarchive'} the lead. Please try again.`);
    } finally {
      setActionLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Group leads by stage for Kanban view
  const leadsByStage = {
    NEW: leads.filter(lead => lead.stage === 'NEW'),
    CONTACTED: leads.filter(lead => lead.stage === 'CONTACTED'),
    QUALIFIED: leads.filter(lead => lead.stage === 'QUALIFIED'),
    PROPOSAL: leads.filter(lead => lead.stage === 'PROPOSAL'),
    NEGOTIATION: leads.filter(lead => lead.stage === 'NEGOTIATION'),
    CONVERTED: leads.filter(lead => lead.stage === 'CONVERTED'),
    LOST: leads.filter(lead => lead.stage === 'LOST')
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalLeads / pageSize);

  // Check if any filters are active
  const hasActiveFilters = selectedStage ||
    selectedSource ||
    selectedTags.length > 0 ||
    minConfidence !== undefined ||
    priority !== undefined ||
    region ||
    assignedToId ||
    includeArchived ||
    includeDeleted;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Leads</h1>
          <p className="text-muted-foreground">
            Manage and track your leads ({totalLeads} total)
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative" ref={viewDropdownRef}>
            <button
              onClick={() => setViewDropdownOpen(prev => !prev)}
              className="px-3 py-2 bg-card border border-border rounded-md flex items-center gap-2 hover:bg-primary/5 transition-colors shadow-sm"
              aria-label="Change view"
            >
              {viewMode === 'table' ? (
                <>
                  <Table size={16} />
                  <span className="hidden sm:inline">Table View</span>
                </>
              ) : (
                <>
                  <Columns size={16} />
                  <span className="hidden sm:inline">Kanban View</span>
                </>
              )}
            </button>

            <AnimatePresence>
              {viewDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1 w-36 bg-card border border-border rounded-md shadow-md z-10 overflow-hidden"
                >
                  <button
                    onClick={() => updateFilters({ view: 'table' })}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm ${viewMode === 'table'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-primary/5'
                      } transition-colors`}
                  >
                    <Table size={16} />
                    <span>Table View</span>
                  </button>

                  <button
                    onClick={() => updateFilters({ view: 'kanban' })}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm ${viewMode === 'kanban'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-primary/5'
                      } transition-colors`}
                  >
                    <Columns size={16} />
                    <span>Kanban View</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/dashboard/leads/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus size={16} />
            <span>Add Lead</span>
          </Link>
        </div>
      </motion.div>

      {/* Enhanced Filters bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-md p-4 flex flex-col space-y-3 shadow-sm"
      >
        {/* Search and main filters row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Search leads..."
              className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background focus-visible:ring-1 focus-visible:ring-primary/30 transition-all"
              defaultValue={searchTerm}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* Stage filter */}
            <div className="relative" ref={stageDropdownRef}>
              <button
                onClick={() => setStageDropdownOpen(prev => !prev)}
                className={`px-3 py-2 border rounded-md flex items-center gap-2 hover:bg-primary/5 transition-colors ${selectedStage ? 'border-primary/50 bg-primary/5' : 'border-input bg-background'
                  }`}
                aria-haspopup="true"
                aria-expanded={stageDropdownOpen}
              >
                <Filter size={16} />
                <span>
                  {selectedStage
                    ? selectedStage.charAt(0) + selectedStage.slice(1).toLowerCase()
                    : "Stage"}
                </span>
              </button>

              <AnimatePresence>
                {stageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-md shadow-md z-10"
                  >
                    <div className="p-1">
                      <button
                        onClick={() => updateFilters({ stage: undefined })}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${!selectedStage ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'} transition-colors`}
                      >
                        All Stages
                      </button>

                      {(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST'] as LeadStage[]).map(stage => (
                        <button
                          key={stage}
                          onClick={() => updateFilters({ stage })}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedStage === stage ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'} transition-colors`}
                        >
                          {stage.charAt(0) + stage.slice(1).toLowerCase()}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Source filter */}
            <div className="relative" ref={sourceDropdownRef}>
              <button
                onClick={() => setSourceDropdownOpen(prev => !prev)}
                className={`px-3 py-2 border rounded-md flex items-center gap-2 hover:bg-primary/5 transition-colors ${selectedSource ? 'border-primary/50 bg-primary/5' : 'border-input bg-background'
                  }`}
                aria-haspopup="true"
                aria-expanded={sourceDropdownOpen}
              >
                <Inbox size={16} />
                <span>
                  {selectedSource
                    ? selectedSource.charAt(0) + selectedSource.slice(1).toLowerCase().replace('_', ' ')
                    : "Source"}
                </span>
              </button>

              <AnimatePresence>
                {sourceDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-md shadow-md z-10"
                  >
                    <div className="p-1 max-h-64 overflow-y-auto">
                      <button
                        onClick={() => updateFilters({ source: undefined })}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm ${!selectedSource ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'} transition-colors`}
                      >
                        All Sources
                      </button>

                      {(['LINKEDIN', 'COLD_EMAIL', 'WEBSITE', 'REFERRAL', 'CONFERENCE',
                        'WEBINAR', 'INBOUND_CALL', 'OUTBOUND_CALL', 'SOCIAL_MEDIA',
                        'PARTNER', 'OTHER'] as LeadSource[]).map(source => (
                          <button
                            key={source}
                            onClick={() => updateFilters({ source })}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedSource === source ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'} transition-colors`}
                          >
                            {source.charAt(0) + source.slice(1).toLowerCase().replace('_', ' ')}
                          </button>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More Filters */}
            <div className="relative" ref={moreFiltersRef}>
              <button
                onClick={() => setMoreFiltersOpen(prev => !prev)}
                className={`px-3 py-2 border rounded-md flex items-center gap-2 hover:bg-primary/5 transition-colors ${minConfidence !== undefined || priority !== undefined || region || assignedToId || includeArchived || includeDeleted || selectedTags.length > 0
                    ? 'border-primary/50 bg-primary/5'
                    : 'border-input bg-background'
                  }`}
                aria-haspopup="true"
                aria-expanded={moreFiltersOpen}
              >
                <BarChart3 size={16} />
                <span>More Filters</span>
                {(minConfidence !== undefined || priority !== undefined || region || assignedToId || includeArchived || includeDeleted || selectedTags.length > 0) && (
                  <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                    {(minConfidence !== undefined ? 1 : 0) +
                      (priority !== undefined ? 1 : 0) +
                      (region ? 1 : 0) +
                      (assignedToId ? 1 : 0) +
                      (includeArchived ? 1 : 0) +
                      (includeDeleted ? 1 : 0) +
                      (selectedTags.length > 0 ? 1 : 0)}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {moreFiltersOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-72 bg-card border border-border rounded-md shadow-md z-10"
                  >
                    <div className="p-3 space-y-4">
                      {/* Priority selector */}
                      <div>
                        <label className="text-sm font-medium block mb-1">Priority</label>
                        <select
                          className="w-full p-2 rounded-md border border-input bg-background focus-visible:ring-1 focus-visible:ring-primary/30"
                          value={priority || ''}
                          onChange={(e) => updateFilters({
                            priority: e.target.value ? Number(e.target.value) : undefined
                          })}
                        >
                          <option value="">Any priority</option>
                          <option value="1">1 (Low)</option>
                          <option value="2">2</option>
                          <option value="3">3 (Medium)</option>
                          <option value="4">4</option>
                          <option value="5">5 (High)</option>
                        </select>
                      </div>

                      {/* Confidence score */}
                      <div>
                        <label className="text-sm font-medium block mb-1">Min Confidence Score</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="10"
                            className="flex-grow"
                            value={minConfidence || 0}
                            onChange={(e) => updateFilters({
                              confidence: e.target.value ? Number(e.target.value) : undefined
                            })}
                          />
                          <span className="w-10 text-center">{minConfidence || 0}%</span>
                        </div>
                      </div>

                      {/* Region filter */}
                      <div>
                        <label className="text-sm font-medium block mb-1">Region</label>
                        <input
                          type="text"
                          placeholder="Any region"
                          className="w-full p-2 rounded-md border border-input bg-background focus-visible:ring-1 focus-visible:ring-primary/30"
                          value={region || ''}
                          onChange={(e) => updateFilters({ region: e.target.value || undefined })}
                        />
                      </div>

                      {/* Tags selector */}
                      {availableTags.length > 0 && (
                        <div>
                          <label className="text-sm font-medium block mb-1">Tags</label>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {selectedTags.map(tag => (
                              <span
                                key={tag}
                                className="bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 flex items-center"
                              >
                                {tag}
                                <button
                                  onClick={() => updateFilters({
                                    tags: selectedTags.filter(t => t !== tag)
                                  })}
                                  className="ml-1.5 hover:bg-primary/20 rounded-full"
                                >
                                  <X size={12} />
                                </button>
                              </span>
                            ))}
                          </div>
                          <select
                            className="w-full p-2 rounded-md border border-input bg-background focus-visible:ring-1 focus-visible:ring-primary/30"
                            value=""
                            onChange={(e) => {
                              if (e.target.value && !selectedTags.includes(e.target.value)) {
                                updateFilters({ tags: [...selectedTags, e.target.value] });
                              }
                            }}
                          >
                            <option value="">Select tag(s)</option>
                            {availableTags
                              .filter(tag => !selectedTags.includes(tag))
                              .map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                              ))
                            }
                          </select>
                        </div>
                      )}

                      {/* Include archived/deleted options */}
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="includeArchived"
                            checked={includeArchived}
                            onChange={(e) => updateFilters({ includeArchived: e.target.checked })}
                            className="rounded text-primary mr-2"
                          />
                          <label htmlFor="includeArchived" className="text-sm">Include archived leads</label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="includeDeleted"
                            checked={includeDeleted}
                            onChange={(e) => updateFilters({ includeDeleted: e.target.checked })}
                            className="rounded text-primary mr-2"
                          />
                          <label htmlFor="includeDeleted" className="text-sm">Include deleted leads</label>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border flex justify-end">
                        <button
                          onClick={clearAllFilters}
                          className="px-3 py-1.5 text-sm bg-muted/50 text-muted-foreground hover:bg-muted transition-colors rounded-md"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Active filters display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
            {selectedStage && (
              <div className="bg-primary/10 text-primary text-xs rounded-md px-2 py-1 flex items-center">
                Stage: {selectedStage.charAt(0) + selectedStage.slice(1).toLowerCase()}
                <button
                  onClick={() => updateFilters({ stage: undefined })}
                  className="ml-1.5 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </div>
            )}

            {selectedSource && (
              <div className="bg-primary/10 text-primary text-xs rounded-md px-2 py-1 flex items-center">
                Source: {selectedSource.charAt(0) + selectedSource.slice(1).toLowerCase().replace('_', ' ')}
                <button
                  onClick={() => updateFilters({ source: undefined })}
                  className="ml-1.5 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </div>
            )}

            {selectedTags.length > 0 && (
              <div className="bg-primary/10 text-primary text-xs rounded-md px-2 py-1 flex items-center">
                Tags: {selectedTags.length} selected
                <button
                  onClick={() => updateFilters({ tags: [] })}
                  className="ml-1.5 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </div>
            )}

            {minConfidence !== undefined && (
              <div className="bg-primary/10 text-primary text-xs rounded-md px-2 py-1 flex items-center">
                Min Confidence: {minConfidence}%
                <button
                  onClick={() => updateFilters({ confidence: undefined })}
                  className="ml-1.5 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </div>
            )}

            {priority !== undefined && (
              <div className="bg-primary/10 text-primary text-xs rounded-md px-2 py-1 flex items-center">
                Priority: {priority}
                <button
                  onClick={() => updateFilters({ priority: undefined })}
                  className="ml-1.5 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </div>
            )}

            {region && (
              <div className="bg-primary/10 text-primary text-xs rounded-md px-2 py-1 flex items-center">
                Region: {region}
                <button
                  onClick={() => updateFilters({ region: undefined })}
                  className="ml-1.5 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </div>
            )}

            {includeArchived && (
              <div className="bg-primary/10 text-primary text-xs rounded-md px-2 py-1 flex items-center">
                Including archived
                <button
                  onClick={() => updateFilters({ includeArchived: false })}
                  className="ml-1.5 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </div>
            )}

            {includeDeleted && (
              <div className="bg-primary/10 text-primary text-xs rounded-md px-2 py-1 flex items-center">
                Including deleted
                <button
                  onClick={() => updateFilters({ includeDeleted: false })}
                  className="ml-1.5 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </div>
            )}

            <button
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
            >
              Clear all
            </button>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card border border-border rounded-md shadow-sm overflow-hidden"
      >
        {loading ? (
          <div className="p-8 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <AlertCircle className="h-8 w-8 mx-auto text-destructive mb-2" />
            <h3 className="font-medium text-lg">Error loading leads</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() => fetchLeads()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : !leads || leads.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">No leads found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || hasActiveFilters
                ? "Try adjusting your filters or search term"
                : "Get started by adding your first lead"}
            </p>
            <Link
              href="/dashboard/leads/new"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} />
              Add Lead
            </Link>
          </div>
        ) : viewMode === 'table' ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 text-muted-foreground text-sm">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Company</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Source</th>
                    <th className="px-4 py-3 text-left">Stage</th>
                    <th className="px-4 py-3 text-center hidden md:table-cell">Confidence</th>
                    <th className="px-4 py-3 text-center hidden lg:table-cell">Priority</th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">Region</th>
                    <th className="px-4 py-3 text-left hidden xl:table-cell">Created</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`hover:bg-primary/5 transition-colors group ${lead.isArchived ? 'bg-muted/30 text-muted-foreground' :
                          lead.isDeleted ? 'bg-destructive/5 text-muted-foreground' : ''
                        }`}
                    >
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/leads/${lead.id}`} className="font-medium hover:text-primary transition-colors">
                          {lead.name}
                          {lead.isArchived && <span className="ml-2 text-xs opacity-70">(Archived)</span>}
                          {lead.isDeleted && <span className="ml-2 text-xs opacity-70">(Deleted)</span>}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {lead.company}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                        {lead.source ? (
                          <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${getSourceColor(lead.source)}`}>
                            {lead.source.charAt(0) + lead.source.slice(1).toLowerCase().replace('_', ' ')}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full transition-colors hover:opacity-90 ${getStageColor(lead.stage)}`}>
                          {lead.stage.charAt(0) + lead.stage.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center hidden md:table-cell">
                        <div className="inline-flex items-center">
                          <div className="w-16 bg-muted rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${(lead.confidence || 0) > 70 ? 'bg-success' :
                                  (lead.confidence || 0) > 40 ? 'bg-primary' : 'bg-muted-foreground/50'
                                }`}
                              style={{ width: `${lead.confidence || 0}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs">{lead.confidence || 0}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center hidden lg:table-cell">
                        <div className="inline-flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-6 rounded-sm ${(lead.priority || 0) > i ? 'bg-primary' : 'bg-muted'
                                }`}
                            ></div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                        {lead.region || '-'}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden xl:table-cell">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1 opacity-70 group-hover:opacity-100">
                          <Link
                            href={`/dashboard/leads/${lead.id}`}
                            className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
                            title="View/Edit Lead"
                          >
                            <Edit size={16} />
                            <span className="sr-only">Edit</span>
                          </Link>

                          {/* Archive/Unarchive button */}
                          {lead.isArchived ? (
                            <button
                              onClick={() => handleArchiveLead(lead.id, false)}
                              className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
                              disabled={actionLoading}
                              title="Unarchive Lead"
                            >
                              <ArchiveRestore size={16} />
                              <span className="sr-only">Unarchive</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleArchiveLead(lead.id, true)}
                              className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
                              disabled={actionLoading}
                              title="Archive Lead"
                            >
                              <Archive size={16} />
                              <span className="sr-only">Archive</span>
                            </button>
                          )}

                          {/* Delete button */}
                          <button
                            onClick={() => setShowDeleteConfirm(lead.id)}
                            className="p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                            disabled={actionLoading}
                            title="Delete Lead"
                          >
                            <Trash2 size={16} />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-border flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalLeads)} of {totalLeads} leads
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => updateFilters({ page: currentPage - 1 })}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md hover:bg-primary/10 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft size={16} />
                    <span className="sr-only">Previous page</span>
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    // Show current page, first, last, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => updateFilters({ page })}
                          className={`w-8 h-8 rounded-md transition-colors ${currentPage === page
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-primary/10"
                            }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page} className="flex items-center justify-center w-8 h-8">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => updateFilters({ page: currentPage + 1 })}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md hover:bg-primary/10 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronRight size={16} />
                    <span className="sr-only">Next page</span>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <KanbanView
            leads={leads}
            onDeleteLead={(id) => setShowDeleteConfirm(id)}
            formatDate={formatDate}
          />
        )}
      </motion.div>

      {deleteLeadData && (
        <DeleteLeadConfirmation
          leadId={deleteLeadData.id}
          leadName={deleteLeadData.name}
          companyName={deleteLeadData.company}
          isArchived={deleteLeadData.isArchived}
          isDeleted={deleteLeadData.isDeleted}
          onClose={() => setDeleteLeadData(null)}
          onSuccess={() => fetchLeads()} // Refresh leads after deletion
        />
      )}
    </div>
  );
}

export default function LeadsPage() {
  return (
    <Suspense fallback={<LeadsLoading />}>
      <LeadsContent />
    </Suspense>
  );
}