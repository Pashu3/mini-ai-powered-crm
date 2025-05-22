import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Trash2, X, AlertTriangle, DatabaseIcon, Archive, ArchiveRestore } from 'lucide-react';
import { useToast } from "@/components/ui/toast/ToastContext";

type DeleteAction = 'archive' | 'softDelete' | 'permanentDelete';

interface DeleteLeadConfirmationProps {
  leadId: string;
  leadName: string;
  companyName: string;
  isArchived?: boolean;
  isDeleted?: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Optional callback for success (e.g. to refresh data)
}

export default function DeleteLeadConfirmation({
  leadId,
  leadName,
  companyName,
  isArchived = false,
  isDeleted = false,
  onClose,
  onSuccess
}: DeleteLeadConfirmationProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<DeleteAction>(
    isArchived ? 'permanentDelete' : 'archive'
  );
  const { toast } = useToast();

  const handleAction = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      let endpoint = '';
      let method = '';
      let body = {};
      
      // Determine what API call to make based on selected action
      switch (selectedAction) {
        case 'archive':
          endpoint = `/api/leads/${leadId}`;
          method = 'PATCH';
          body = { isArchived: true };
          break;
        case 'softDelete':
          endpoint = `/api/leads/${leadId}?soft=true`;
          method = 'DELETE';
          break;
        case 'permanentDelete':
          endpoint = `/api/leads/${leadId}`;
          method = 'DELETE';
          break;
      }
      
      const response = await fetch(endpoint, {
        method: method,
        headers: method === 'PATCH' ? { 'Content-Type': 'application/json' } : undefined,
        body: method === 'PATCH' ? JSON.stringify(body) : undefined
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Check for specific database connection errors
        if (data.error && data.error.includes('Server selection timeout')) {
          throw new Error('Database connection error. Please try again later.');
        }
        throw new Error(data.error || 'Operation failed');
      }
      
      // Different success messages based on the action taken
      let successMessage = '';
      switch (selectedAction) {
        case 'archive':
          successMessage = `${leadName} has been archived`;
          break;
        case 'softDelete':
          successMessage = `${leadName} has been moved to trash`;
          break;
        case 'permanentDelete':
          successMessage = `${leadName} has been permanently deleted`;
          break;
      }
      
      toast({
        type: 'success',
        title: 'Success',
        description: successMessage,
        duration: 3000
      });

      // Close the modal
      onClose();
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (err) {
      console.error('Action failed:', err);
      
      const errorMessage = err instanceof Error ? err.message : 'Operation failed';
      
      // Show user-friendly error message based on error type
      let toastMessage = 'Operation failed';
      if (errorMessage.includes('Database connection')) {
        toastMessage = 'Database connection error. Please try again later.';
      }
      
      toast({
        type: 'error',
        title: 'Action failed',
        description: toastMessage,
        duration: 5000
      });
      
      setError(errorMessage);
      // Don't close modal on error so user can try again
    } finally {
      setIsProcessing(false);
    }
  };

  // Get title based on lead state and selected action
  const getTitle = () => {
    if (isArchived) {
      return selectedAction === 'permanentDelete' 
        ? "Delete Archived Lead" 
        : "Restore Lead";
    }
    if (isDeleted) {
      return "Permanently Delete Lead";
    }
    
    switch (selectedAction) {
      case 'archive': return "Archive Lead";
      case 'softDelete': return "Move Lead to Trash";
      case 'permanentDelete': return "Delete Lead Permanently";
      default: return "Manage Lead";
    }
  };
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">{getTitle()}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-muted-foreground mb-4">
            What would you like to do with <strong>{leadName}</strong> from <strong>{companyName}</strong>?
          </p>

          {/* Option selection */}
          <div className="space-y-3">
            {!isDeleted && !isArchived && (
              <label className="block border border-border rounded-md p-3 cursor-pointer transition-colors hover:bg-muted/20">
                <input
                  type="radio"
                  name="deleteAction"
                  className="mr-2"
                  checked={selectedAction === 'archive'}
                  onChange={() => setSelectedAction('archive')}
                />
                <span className="font-medium">Archive Lead</span>
                <p className="text-sm text-muted-foreground mt-1 ml-5">
                  Hide this lead from regular views while preserving all data. You can unarchive it later.
                </p>
              </label>
            )}

            {!isDeleted && (
              <label className="block border border-border rounded-md p-3 cursor-pointer transition-colors hover:bg-muted/20">
                <input
                  type="radio"
                  name="deleteAction"
                  className="mr-2"
                  checked={selectedAction === 'softDelete'}
                  onChange={() => setSelectedAction('softDelete')}
                />
                <span className="font-medium">Move to Trash</span>
                <p className="text-sm text-muted-foreground mt-1 ml-5">
                  Mark as deleted but keep all data. The lead can be restored if needed.
                </p>
              </label>
            )}
            
            <label className="block border border-destructive/30 rounded-md p-3 cursor-pointer transition-colors hover:bg-destructive/10 bg-destructive/5">
              <input
                type="radio"
                name="deleteAction"
                className="mr-2"
                checked={selectedAction === 'permanentDelete'}
                onChange={() => setSelectedAction('permanentDelete')}
              />
              <span className="font-medium text-destructive">Permanently Delete</span>
              <p className="text-sm text-muted-foreground mt-1 ml-5">
                Completely remove this lead and all associated data. This action cannot be undone.
              </p>
            </label>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md flex items-center gap-2">
            {error.includes('Database') ? (
              <DatabaseIcon size={18} className="shrink-0" />
            ) : (
              <AlertTriangle size={18} className="shrink-0" />
            )}
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <div className="flex justify-end gap-3 mt-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
            disabled={isProcessing}
          >
            Cancel
          </button>
          
          <button 
            onClick={handleAction}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              selectedAction === 'permanentDelete'
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : selectedAction === 'archive'
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {selectedAction === 'archive' && <Archive size={16} />}
                {selectedAction === 'softDelete' && <Trash2 size={16} />}
                {selectedAction === 'permanentDelete' && <Trash2 size={16} />}
                
                {selectedAction === 'archive' && "Archive Lead"}
                {selectedAction === 'softDelete' && "Move to Trash"}
                {selectedAction === 'permanentDelete' && "Permanently Delete"}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}