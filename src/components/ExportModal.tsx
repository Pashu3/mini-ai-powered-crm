"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  FileDown, 
  FileSpreadsheet, 
  MessageSquare, 
  Package, 
  Database, 
  Check, 
  Loader2 
} from "lucide-react";
import { useToast } from "@/components/ui/toast/ToastContext";
import { ExportType, ExportModalProps } from "../types/lead";

export default function ExportModal({ isOpen, onClose, leadFilters }: ExportModalProps) {
  const { toast } = useToast();
  const [exportType, setExportType] = useState<ExportType>(ExportType.LEADS);
  const [includeCurrentFilters, setIncludeCurrentFilters] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [exportStarted, setExportStarted] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleStartExport = async () => {
    try {
      setIsLoading(true);
      
      const filters = includeCurrentFilters && leadFilters 
        ? leadFilters 
        : undefined;
        
      const response = await fetch('/api/exports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: exportType,
          filters
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to start export');
      }
      
      const data = await response.json();
      const jobData = data.success && data.data ? data.data : data;
      
      setJobId(jobData.id);
      setExportStarted(true);
      
      toast({
        type: 'success',
        title: 'Export started',
        description: `Your ${exportType.toLowerCase()} export has been started. You'll be notified when it's ready.`,
        duration: 5000
      });
      
      // Redirect to export tracking page or keep the user informed
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Export error:', error);
      toast({
        type: 'error',
        title: 'Export failed',
        description: 'There was a problem starting your export. Please try again.',
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Fixed at top */}
              <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
                <div className="flex items-center gap-2.5">
                  <FileDown size={22} />
                  <h2 className="font-semibold text-lg">Export Data</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-primary/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
              
              {exportStarted ? (
                <div className="p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-5">
                    <Check size={28} className="text-success" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Export Started</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Your export has been started and will be processed in the background. 
                    You can check the status in your export history.
                  </p>
                  <button
                    onClick={() => window.location.href = `/dashboard/exports/${jobId}`}
                    className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md flex items-center gap-2 mx-auto hover:bg-primary/90 transition-colors"
                  >
                    <FileDown size={16} />
                    <span>View Export Status</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Scrollable content area */}
                  <div className="flex-1 overflow-y-auto p-5 md:p-6">
                    <p className="text-muted-foreground mb-6">
                      Select the type of data you want to export. The exported file will be available for download in CSV format.
                    </p>
                    
                    <fieldset className="space-y-5 mb-8">
                      <legend className="font-medium text-base mb-3">Export Type</legend>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className={`border rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors ${exportType === ExportType.LEADS ? 'border-primary bg-primary/5' : 'border-border hover:bg-primary/5'}`}>
                          <input
                            type="radio"
                            name="exportType"
                            value={ExportType.LEADS}
                            checked={exportType === ExportType.LEADS}
                            onChange={() => setExportType(ExportType.LEADS)}
                            className="sr-only"
                          />
                          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileSpreadsheet size={20} className="text-primary" />
                          </div>
                          <div>
                            <span className="font-medium block mb-1">Leads</span>
                            <span className="text-xs text-muted-foreground">Contact & company info</span>
                          </div>
                        </label>
                        
                        <label className={`border rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors ${exportType === ExportType.CONVERSATIONS ? 'border-primary bg-primary/5' : 'border-border hover:bg-primary/5'}`}>
                          <input
                            type="radio"
                            name="exportType"
                            value={ExportType.CONVERSATIONS}
                            checked={exportType === ExportType.CONVERSATIONS}
                            onChange={() => setExportType(ExportType.CONVERSATIONS)}
                            className="sr-only"
                          />
                          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MessageSquare size={20} className="text-primary" />
                          </div>
                          <div>
                            <span className="font-medium block mb-1">Conversations</span>
                            <span className="text-xs text-muted-foreground">Call & email logs</span>
                          </div>
                        </label>
                        
                        <label className={`border rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors ${exportType === ExportType.CAMPAIGN_DATA ? 'border-primary bg-primary/5' : 'border-border hover:bg-primary/5'}`}>
                          <input
                            type="radio"
                            name="exportType"
                            value={ExportType.CAMPAIGN_DATA}
                            checked={exportType === ExportType.CAMPAIGN_DATA}
                            onChange={() => setExportType(ExportType.CAMPAIGN_DATA)}
                            className="sr-only"
                          />
                          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Package size={20} className="text-primary" />
                          </div>
                          <div>
                            <span className="font-medium block mb-1">Campaigns</span>
                            <span className="text-xs text-muted-foreground">Campaign performance</span>
                          </div>
                        </label>
                        
                        <label className={`border rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors ${exportType === ExportType.ALL_DATA ? 'border-primary bg-primary/5' : 'border-border hover:bg-primary/5'}`}>
                          <input
                            type="radio"
                            name="exportType"
                            value={ExportType.ALL_DATA}
                            checked={exportType === ExportType.ALL_DATA}
                            onChange={() => setExportType(ExportType.ALL_DATA)}
                            className="sr-only"
                          />
                          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Database size={20} className="text-primary" />
                          </div>
                          <div>
                            <span className="font-medium block mb-1">All Data</span>
                            <span className="text-xs text-muted-foreground">Complete export</span>
                          </div>
                        </label>
                      </div>
                    </fieldset>
                    
                    {/* Filter options - show only for Leads export */}
                    {exportType === ExportType.LEADS && leadFilters && (
                      <div className="mb-8 p-5 border border-border rounded-lg">
                        <h3 className="font-medium mb-4">Filter Options</h3>
                        
                        <label className="flex items-center gap-3 cursor-pointer mb-4">
                          <input
                            type="checkbox"
                            checked={includeCurrentFilters}
                            onChange={() => setIncludeCurrentFilters(!includeCurrentFilters)}
                            className="rounded text-primary focus:ring-primary h-4 w-4"
                          />
                          <div>
                            <span className="font-medium">Apply current filters</span>
                            <span className="block text-sm text-muted-foreground mt-0.5">
                              {Object.entries(leadFilters).some(([_, value]) => 
                                value !== undefined && 
                                (Array.isArray(value) ? value.length > 0 : true)
                              ) ? 
                                'Export will include only filtered leads' :
                                'No active filters - all leads will be exported'}
                            </span>
                          </div>
                        </label>
                        
                        {includeCurrentFilters && (
                          <div className="mt-4 p-4 bg-muted/50 rounded-md text-sm space-y-2 border border-muted">
                            <h4 className="font-medium mb-2 text-muted-foreground">Applied Filters:</h4>
                            {leadFilters.stage && (
                              <div className="flex">
                                <span className="font-medium w-20">Stage:</span> 
                                <span>{leadFilters.stage}</span>
                              </div>
                            )}
                            {leadFilters.source && (
                              <div className="flex">
                                <span className="font-medium w-20">Source:</span> 
                                <span>{leadFilters.source}</span>
                              </div>
                            )}
                            {leadFilters.tags && leadFilters.tags.length > 0 && (
                              <div className="flex">
                                <span className="font-medium w-20">Tags:</span> 
                                <span>{leadFilters.tags.join(', ')}</span>
                              </div>
                            )}
                            {leadFilters.search && (
                              <div className="flex">
                                <span className="font-medium w-20">Search:</span> 
                                <span>"{leadFilters.search}"</span>
                              </div>
                            )}
                            {leadFilters.includeArchived && (
                              <div className="flex items-center text-muted-foreground">
                                <Check size={14} className="mr-2" />
                                <span>Including archived leads</span>
                              </div>
                            )}
                            {leadFilters.includeDeleted && (
                              <div className="flex items-center text-muted-foreground">
                                <Check size={14} className="mr-2" />
                                <span>Including deleted leads</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-6 text-sm text-muted-foreground">
                      <p>
                        Exports are processed in the background and may take a few minutes to complete 
                        depending on the amount of data. You'll be notified when your export is ready.
                      </p>
                    </div>
                  </div>
                  
                  {/* Footer - Fixed at bottom */}
                  <div className="p-5 border-t border-border bg-muted/30 flex justify-end gap-3 sticky bottom-0">
                    <button
                      onClick={onClose}
                      className="px-4 py-2.5 bg-muted text-muted-foreground rounded-md hover:bg-muted/70 transition-colors"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={handleStartExport}
                      disabled={isLoading}
                      className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Starting...</span>
                        </>
                      ) : (
                        <>
                          <FileDown size={16} />
                          <span>Start Export</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}