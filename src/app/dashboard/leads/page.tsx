"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Trash2, 
  Edit, 
  Loader2, 
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash.debounce";

type LeadStage = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'CONVERTED' | 'LOST';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  stage: LeadStage;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  value?: number;
  source?: string;
}

interface LeadResponse {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
}

export default function LeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  
  // Filters and pagination
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [selectedStage, setSelectedStage] = useState<LeadStage | undefined>(
    searchParams.get('stage') as LeadStage || undefined
  );
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const pageSize = 10;
  const [stageDropdownOpen, setStageDropdownOpen] = useState(false);

  // Update URL when filters change
  const updateUrlParams = useCallback((search: string, stage?: LeadStage, page: number = 1) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (stage) params.set('stage', stage);
    if (page > 1) params.set('page', page.toString());
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    router.push(`/dashboard/leads${queryString}`, { scroll: false });
  }, [router]);

  // Debounced search function
  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
    updateUrlParams(value, selectedStage, 1);
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
    updateUrlParams(searchTerm, stage, 1);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams(searchTerm, selectedStage, page);
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

  // Get stage color for visual differentiation
  const getStageColor = (stage: LeadStage) => {
    switch (stage) {
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

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalLeads / pageSize);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Manage and track your leads ({totalLeads} total)
          </p>
        </div>
        
       <Link 
    href="/dashboard/leads/new"
    className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
  >
    <Plus size={16} />
    Add Lead
  </Link>
      </motion.div>
      
      {/* Filters bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-md p-4 flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search leads..."
            className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
            defaultValue={searchTerm}
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
        
  <div className="flex gap-2">
  <div className="relative">
    <button 
      onClick={() => setStageDropdownOpen(prev => !prev)}
      className="px-3 py-2 border border-input rounded-md bg-background flex items-center gap-2"
    >
      <Filter size={16} />
      <span>Stage</span>
    </button>
    
    {stageDropdownOpen && (
      <div className="absolute top-full right-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg p-2 z-10">
        <button 
          onClick={() => { 
            handleStageChange(undefined);
            setStageDropdownOpen(false);
          }} 
          className={`w-full text-left px-3 py-2 rounded-md ${!selectedStage ? 'bg-accent' : 'hover:bg-accent'}`}
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
            className={`w-full text-left px-3 py-2 rounded-md ${selectedStage === stage ? 'bg-accent' : 'hover:bg-accent'}`}
          >
            {stage.charAt(0) + stage.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
    )}
  </div>
</div>
      </motion.div>
      
      {/* Leads table */}
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
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
    >
      Try Again
    </button>
  </div>
) : !leads || leads.length === 0 ? ( // Added null check here
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
    className="px-4 py-2 bg-primary text-primary-foreground rounded-md inline-flex items-center gap-2"
  >
    <Plus size={16} />
    Add Lead
  </Link>
</div>
) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted text-muted-foreground text-sm">
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
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/leads/${lead.id}`} className="font-medium hover:text-primary">
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
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStageColor(lead.stage)}`}>
                          {lead.stage.charAt(0) + lead.stage.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/leads/${lead.id}`}
                            className="p-1 rounded-md hover:bg-accent"
                          >
                            <Edit size={16} />
                            <span className="sr-only">Edit</span>
                          </Link>
                          <button 
                            onClick={() => setShowDeleteConfirm(lead.id)}
                            className="p-1 rounded-md hover:bg-destructive/10 hover:text-destructive"
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
                    className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:pointer-events-none"
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
                          className={`w-8 h-8 rounded-md ${
                            currentPage === page
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page}>...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md hover:bg-accent disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <ChevronRight size={16} />
                    <span className="sr-only">Next page</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
      
   
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card border border-border p-6 rounded-lg shadow-lg max-w-md w-full"
          >
            <h3 className="text-lg font-medium mb-2">Delete Lead</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to delete this lead? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(null)} 
                className="px-4 py-2 border border-input rounded-md"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDeleteLead(showDeleteConfirm)}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md flex items-center gap-2"
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

