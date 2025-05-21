import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Trash2, X, AlertTriangle, DatabaseIcon } from 'lucide-react';
import { useToast } from "@/components/ui/toast/ToastContext";

interface DeleteLeadConfirmationProps {
  leadId: string;
  leadName: string;
  companyName: string;
  onClose: () => void;
}

export default function DeleteLeadConfirmation({
  leadId,
  leadName,
  companyName,
  onClose
}: DeleteLeadConfirmationProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Check for specific database connection errors
        if (data.error && data.error.includes('Server selection timeout')) {
          throw new Error('Database connection error. Please try again later.');
        }
        throw new Error(data.error || 'Failed to delete lead');
      }
      
      toast({
        type: 'success',
        title: 'Lead deleted',
        description: `${leadName} has been removed successfully`,
        duration: 3000
      });

      // Close the modal first before navigation
      onClose();

      // Navigate after a brief delay to allow the toast to be seen
      setTimeout(() => {
        router.push('/dashboard/leads');
      }, 500);
    } catch (err) {
      console.error('Failed to delete lead:', err);
      
      const errorMessage = err instanceof Error ? err.message : 'Could not delete the lead';
      
      // Show user-friendly error message based on error type
      let toastMessage = 'Could not delete the lead';
      if (errorMessage.includes('Database connection')) {
        toastMessage = 'Database connection error. Please try again later.';
      }
      
      toast({
        type: 'error',
        title: 'Delete failed',
        description: toastMessage,
        duration: 5000
      });
      
      setError(errorMessage);
      // Don't close modal on error so user can try again
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Delete Lead</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Are you sure you want to delete <strong>{leadName}</strong> from <strong>{companyName}</strong>? This action cannot be undone.
        </p>
        
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
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md flex items-center gap-2 hover:bg-destructive/90 transition-colors"
            disabled={isDeleting}
          >
            {isDeleting ? (
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
  );
}