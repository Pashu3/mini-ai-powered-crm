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
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";
import { getStageColor } from "@/utils/styleHelpers";
import { Lead, LeadStage } from "@/types/lead";

interface LeadResponse {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
}

// View mode type
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

// Main component that uses searchParams
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
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const [viewMode, setViewMode] = useState<ViewMode>(searchParams.get('view') as ViewMode || 'table');
  const pageSize = 10;
  const [stageDropdownOpen, setStageDropdownOpen] = useState(false);
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);

  // Create refs for dropdown containers
  const viewDropdownRef = useRef<HTMLDivElement>(null);
  const stageDropdownRef = useRef<HTMLDivElement>(null);

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
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateUrlParams = useCallback(
    (search: string, stage?: LeadStage, page: number = 1, view: ViewMode = 'table') => {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (stage) params.set('stage', stage);
      if (page > 1) params.set('page', page.toString());
      if (view !== 'table') params.set('view', view);

      const queryString = params.toString() ? `?${params.toString()}` : '';
      router.push(`/dashboard/leads${queryString}`, { scroll: false });
    },
    [router]
  );

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
    updateUrlParams(value, selectedStage, 1, viewMode);
    setCurrentPage(1);
  }, 500);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (searchTerm) params.set('search', searchTerm);
      if (selectedStage) params.set('stage', selectedStage);

      // Pagination
      const offset = (currentPage - 1) * pageSize;
      params.set('limit', pageSize.toString());
      params.set('offset', offset.toString());

      // Fetch leads
      const response = await fetch(`/api/leads?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Error fetching leads: ${response.status}`);
      }

      const responseData = await response.json();

      // Handle the success response format which includes data.leads
      if (responseData.success && responseData.data) {
        setLeads(responseData.data.leads || []);
        setTotalLeads(responseData.data.total || 0);
      } else {
        // Handle older API format
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
  }, [searchTerm, selectedStage, currentPage, pageSize]);

  // Initial fetch and refetch when filters change
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle stage filter change
  const handleStageChange = (stage?: LeadStage) => {
    setSelectedStage(stage);
    updateUrlParams(searchTerm, stage, 1, viewMode);
    setCurrentPage(1);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    updateUrlParams(searchTerm, selectedStage, currentPage, mode);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams(searchTerm, selectedStage, page, viewMode);
  };

  // Handle lead deletion
  const handleDeleteLead = async (id: string) => {
    try {
      setActionLoading(true);
      const response = await fetch(`/api/leads/${id}`, {
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
                    onClick={() => {
                      handleViewModeChange('table');
                      setViewDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm ${viewMode === 'table'
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-primary/5'
                      } transition-colors`}
                  >
                    <Table size={16} />
                    <span>Table View</span>
                  </button>

                  <button
                    onClick={() => {
                      handleViewModeChange('kanban');
                      setViewDropdownOpen(false);
                    }}
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

      {/* Filters bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-md p-4 flex flex-col sm:flex-row gap-4 shadow-sm"
      >
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

        <div className="flex gap-2">
          <div className="relative" ref={stageDropdownRef}>
            <button
              onClick={() => setStageDropdownOpen(prev => !prev)}
              className="px-3 py-2 border border-input rounded-md bg-background flex items-center gap-2 hover:bg-primary/5 transition-colors"
              aria-haspopup="true"
              aria-expanded={stageDropdownOpen}
            >
              <Filter size={16} />
              <span>
                {selectedStage
                  ? selectedStage.charAt(0) + selectedStage.slice(1).toLowerCase()
                  : "All Stages"}
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
                      onClick={() => {
                        handleStageChange(undefined);
                        setStageDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${!selectedStage ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'} transition-colors`}
                    >
                      All Stages
                    </button>

                    {(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST'] as LeadStage[]).map(stage => (
                      <button
                        key={stage}
                        onClick={() => {
                          handleStageChange(stage);
                          setStageDropdownOpen(false);
                        }}
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
        </div>
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
              {searchTerm || selectedStage
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
          // Table View
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 text-muted-foreground text-sm">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Company</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Stage</th>
                    <th className="px-4 py-3 text-left">Created</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-primary/5 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/leads/${lead.id}`} className="font-medium hover:text-primary transition-colors">
                          {lead.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {lead.company}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {lead.email}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full transition-colors hover:opacity-90 ${getStageColor(lead.stage)}`}>
                          {lead.stage.charAt(0) + lead.stage.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2 opacity-70 group-hover:opacity-100">
                          <Link
                            href={`/dashboard/leads/${lead.id}`}
                            className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
                          >
                            <Edit size={16} />
                            <span className="sr-only">Edit</span>
                          </Link>
                          <button
                            onClick={() => setShowDeleteConfirm(lead.id)}
                            className="p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
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
                    onClick={() => handlePageChange(currentPage - 1)}
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
                          onClick={() => handlePageChange(page)}
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
                    onClick={() => handlePageChange(currentPage + 1)}
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
          // Kanban View
          <div className="p-4 overflow-x-auto">
            <div className="flex gap-4 min-w-[1000px]">
              {(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CONVERTED', 'LOST'] as LeadStage[]).map(stage => (
                <div key={stage} className="flex-1 min-w-[250px]">
                  <div className={`rounded-t-md py-2 px-3 font-medium text-sm ${getStageColor(stage)} border-b border-border/50`}>
                    {stage.charAt(0) + stage.slice(1).toLowerCase()}
                    <span className="ml-2 text-xs opacity-70 font-normal">
                      ({leadsByStage[stage].length})
                    </span>
                  </div>

                  <div className="bg-muted/20 rounded-b-md h-[calc(100vh-260px)] overflow-y-auto p-2 space-y-2">
                    {leadsByStage[stage].length === 0 ? (
                      <div className="flex items-center justify-center h-24 border border-dashed border-border/50 rounded-md">
                        <p className="text-sm text-muted-foreground">No leads</p>
                      </div>
                    ) : (
                      leadsByStage[stage].map(lead => (
                        <motion.div
                          key={lead.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-card p-3 rounded-md border border-border/60 hover:border-border hover:shadow-sm hover:bg-primary/5 transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <Link href={`/dashboard/leads/${lead.id}`} className="font-medium hover:text-primary transition-colors text-sm mb-1 block">
                              {lead.name}
                            </Link>
                            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link
                                href={`/dashboard/leads/${lead.id}`}
                                className="p-1 rounded-md hover:bg-primary/10 transition-colors"
                              >
                                <Edit size={14} />
                                <span className="sr-only">Edit</span>
                              </Link>
                              <button
                                onClick={() => setShowDeleteConfirm(lead.id)}
                                className="p-1 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors"
                              >
                                <Trash2 size={14} />
                                <span className="sr-only">Delete</span>
                              </button>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mb-2">
                            {lead.company}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {lead.email}
                          </div>
                          <div className="mt-3 text-xs text-muted-foreground">
                            {formatDate(lead.createdAt)}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card border border-border p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Delete Lead</h3>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-muted-foreground mb-5">
              Are you sure you want to delete this lead? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-input bg-background hover:bg-muted transition-colors rounded-md"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteLead(showDeleteConfirm)}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md flex items-center gap-2 hover:bg-destructive/90 transition-colors"
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Lead
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
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