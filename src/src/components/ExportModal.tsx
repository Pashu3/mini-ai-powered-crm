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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileDown size={20} />
                  <h2 className="font-semibold text-lg">Export Data</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
              
              {exportStarted ? (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-success" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Export Started</h3>
                  <p className="text-muted-foreground mb-6">
                    Your export has been started and will be processed in the background. 
                    You can check the status in your export history.
                  </p>
                  <button
                    onClick={() => window.location.href = `/dashboard/exports/${jobId}`}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 mx-auto hover:bg-primary/90 transition-colors"
                  >
                    <FileDown size={16} />
                    <span>View Export Status</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4">
                      Select the type of data you want to export. The exported file will be available for download in CSV format.
                    </p>
                    
                    <fieldset className="space-y-4 mb-6">
                      <legend className="font-medium mb-2">Export Type</legend>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-colors ${exportType === ExportType.LEADS ? 'border-primary bg-primary/5' : 'border-border hover:bg-primary/5'}`}>
                          <input
                            type="radio"
                            name="exportType"
                            value={ExportType.LEADS}
                            checked={exportType === ExportType.LEADS}
                            onChange={() => setExportType(ExportType.LEADS)}
                            className="sr-only"
                          />
                          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <FileSpreadsheet size={18} className="text-primary" />
                          </div>
                          <div>
                            <span className="font-medium block">Leads</span>
                            <span className="text-xs text-muted-foreground">Contact & company info</span>
                          </div>
                        </label>
                        
                        <label className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-colors ${exportType === ExportType.CONVERSATIONS ? 'border-primary bg-primary/5' : 'border-border hover:bg-primary/5'}`}>
                          <input
                            type="radio"
                            name="exportType"
                            value={ExportType.CONVERSATIONS}
                            checked={exportType === ExportType.CONVERSATIONS}
                            onChange={() => setExportType(ExportType.CONVERSATIONS)}
                            className="sr-only"
                          />
                          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <MessageSquare size={18} className="text-primary" />
                          </div>
                          <div>
                            <span className="font-medium block">Conversations</span>
                            <span className="text-xs text-muted-foreground">Call & email logs</span>
                          </div>
                        </label>
                        
                        <label className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-colors ${exportType === ExportType.CAMPAIGN_DATA ? 'border-primary bg-primary/5' : 'border-border hover:bg-primary/5'}`}>
                          <input
                            type="radio"
                            name="exportType"
                            value={ExportType.CAMPAIGN_DATA}
                            checked={exportType === ExportType.CAMPAIGN_DATA}
                            onChange={() => setExportType(ExportType.CAMPAIGN_DATA)}
                            className="sr-only"
                          />
                          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <Package size={18} className="text-primary" />
                          </div>
                          <div>
                            <span className="font-medium block">Campaigns</span>
                            <span className="text-xs text-muted-foreground">Campaign performance</span>
                          </div>
                        </label>
                        
                        <label className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-colors ${exportType === ExportType.ALL_DATA ? 'border-primary bg-primary/5' : 'border-border hover:bg-primary/5'}`}>
                          <input
                            type="radio"
                            name="exportType"
                            value={ExportType.ALL_DATA}
                            checked={exportType === ExportType.ALL_DATA}
                            onChange={() => setExportType(ExportType.ALL_DATA)}
                            className="sr-only"
                          />
                          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <Database size={18} className="text-primary" />
                          </div>
                          <div>
                            <span className="font-medium block">All Data</span>
                            <span className="text-xs text-muted-foreground">Complete export</span>
                          </div>
                        </label>
                      </div>
                    </fieldset>
                    
                    {/* Filter options - show only for Leads export */}
                    {exportType === ExportType.LEADS && leadFilters && (
                      <div className="mb-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeCurrentFilters}
                            onChange={() => setIncludeCurrentFilters(!includeCurrentFilters)}
                            className="rounded text-primary focus:ring-primary"
                          />
                          <span>
                            Apply current filters
                            <span className="block text-xs text-muted-foreground">
                              {Object.entries(leadFilters).some(([_, value]) => 
                                value !== undefined && 
                                (Array.isArray(value) ? value.length > 0 : true)
                              ) ? 
                                'Export will include only filtered leads' :
                                'No active filters - all leads will be exported'}
                            </span>
                          </span>
                        </label>
                        
                        {includeCurrentFilters && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-md text-xs space-y-1">
                            {leadFilters.stage && (
                              <div>
                                <span className="font-medium">Stage:</span> {leadFilters.stage}
                              </div>
                            )}
                            {leadFilters.source && (
                              <div>
                                <span className="font-medium">Source:</span> {leadFilters.source}
                              </div>
                            )}
                            {leadFilters.tags && leadFilters.tags.length > 0 && (
                              <div>
                                <span className="font-medium">Tags:</span> {leadFilters.tags.join(', ')}
                              </div>
                            )}
                            {leadFilters.search && (
                              <div>
                                <span className="font-medium">Search:</span> "{leadFilters.search}"
                              </div>
                            )}
                            {leadFilters.includeArchived && (
                              <div>Including archived leads</div>
                            )}
                            {leadFilters.includeDeleted && (
                              <div>Including deleted leads</div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="p-4 border-t border-border bg-muted/30 flex justify-end gap-3">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/70 transition-colors"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={handleStartExport}
                      disabled={isLoading}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
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