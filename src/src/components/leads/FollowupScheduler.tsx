import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Calendar, X, AlertCircle } from "lucide-react";

interface FollowupSchedulerProps {
  followupDate: string;
  followupNote: string;
  onDateChange: (date: string) => void;
  onNoteChange: (note: string) => void;
  onSchedule: () => Promise<void>;
  onClose: () => void;
  isSaving: boolean;
  error?: string | null;
}

export default function FollowupScheduler({
  followupDate,
  followupNote,
  onDateChange,
  onNoteChange,
  onSchedule,
  onClose,
  isSaving,
  error
}: FollowupSchedulerProps) {
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Schedule Follow-up</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted"
          >
            <X size={18} />
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={(e) => {
          e.preventDefault();
          onSchedule();
        }}>
          <div className="space-y-4">
            <div>
              <label htmlFor="followupDate" className="block text-sm font-medium mb-1">
                Follow-up Date
              </label>
              <input
                id="followupDate"
                type="date"
                value={followupDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label htmlFor="followupNote" className="block text-sm font-medium mb-1">
                Note <span className="text-destructive">*</span>
              </label>
              <textarea
                id="followupNote"
                value={followupNote}
                onChange={(e) => onNoteChange(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md min-h-[100px]"
                placeholder="What do you need to follow up about?"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button"
              onClick={onClose} 
              className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Calendar size={16} />
                  Schedule
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}