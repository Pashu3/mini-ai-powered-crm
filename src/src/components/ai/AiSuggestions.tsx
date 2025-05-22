"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LightbulbIcon,
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  AlertCircle,
  Loader2,
  RefreshCcw
} from "lucide-react";

// Suggestion types from your schema
type SuggestionType = 'NEXT_STEP' | 'EMAIL_TEMPLATE' | 'QUESTION' | 'RESEARCH';
type SuggestionStatus = 'NEW' | 'ACCEPTED' | 'REJECTED';

interface Suggestion {
  id: string;
  leadId: string;
  suggestion: string;
  type: SuggestionType;
  status: SuggestionStatus;
  priority: number;
  done: boolean;
  isViewed: boolean;
  reasoning?: string | null;
  templateId?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AISuggestionsProps {
  leadId: string;
  initialSuggestions?: Suggestion[];
}

export default function AISuggestions({ leadId, initialSuggestions = [] }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatingSuggestion, setGeneratingSuggestion] = useState(false);

  // Load suggestions if not provided initially
  const fetchSuggestions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/leads/${leadId}/ai/suggestions`);

      if (!response.ok) {
        throw new Error(`Error fetching suggestions: ${response.status}`);
      }

      const data = await response.json();
      const fetchedSuggestions = data.success && data.data ? data.data : data;

      setSuggestions(fetchedSuggestions);
    } catch (err) {
      console.error('Failed to fetch suggestions:', err);
      setError('Failed to load AI suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a new suggestion
  const handleGenerateSuggestion = async () => {
    try {
      setGeneratingSuggestion(true);
      setError(null);

      const response = await fetch(`/api/leads/${leadId}/ai/suggestions`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error(`Error generating suggestion: ${response.status}`);
      }

      const data = await response.json();
      const newSuggestion = data.success && data.data ? data.data : data;

      // Add new suggestion to the list
      setSuggestions([newSuggestion, ...suggestions]);
    } catch (err) {
      console.error('Failed to generate suggestion:', err);
      setError('Failed to generate new suggestion');
    } finally {
      setGeneratingSuggestion(false);
    }
  };

  // Accept/implement a suggestion
  const handleAcceptSuggestion = async (suggestionId: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/leads/${leadId}/ai/suggestions/${suggestionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'ACCEPTED' }),
      });

      if (!response.ok) {
        throw new Error(`Error accepting suggestion: ${response.status}`);
      }

      const data = await response.json();
      const updatedSuggestion = data.success && data.data ? data.data : data;

      // Update the suggestion in the list
      setSuggestions(suggestions.map(s =>
        s.id === suggestionId ? { ...s, status: 'ACCEPTED' as SuggestionStatus } : s
      ));
    } catch (err) {
      console.error('Failed to accept suggestion:', err);
      setError('Failed to update suggestion status');
    } finally {
      setIsLoading(false);
    }
  };

  // Reject a suggestion
  const handleRejectSuggestion = async (suggestionId: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/leads/${leadId}/ai/suggestions/${suggestionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'REJECTED' }),
      });

      if (!response.ok) {
        throw new Error(`Error rejecting suggestion: ${response.status}`);
      }

      // Update the suggestion in the list
      setSuggestions(suggestions.map(s =>
        s.id === suggestionId ? { ...s, status: 'REJECTED' as SuggestionStatus } : s
      ));
    } catch (err) {
      console.error('Failed to reject suggestion:', err);
      setError('Failed to update suggestion status');
    } finally {
      setIsLoading(false);
    }
  };

  // Get suggestion icon based on type
  const getSuggestionIcon = (type: SuggestionType) => {
    switch (type) {
      case 'NEXT_STEP':
        return <Clock size={16} className="text-blue-500" />;
      case 'EMAIL_TEMPLATE':
        return <Mail size={16} className="text-green-500" />;
      case 'QUESTION':
        return <MessageCircle size={16} className="text-amber-500" />;
      case 'RESEARCH':
        return <AlertCircle size={16} className="text-purple-500" />;
      default:
        return <LightbulbIcon size={16} className="text-amber-500" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium flex items-center gap-2 text-foreground">
          <LightbulbIcon size={16} className="text-amber-500" />
          AI Suggestions
        </h3>

        <button
          onClick={handleGenerateSuggestion}
          disabled={generatingSuggestion}
          className="text-xs flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
        >
          {generatingSuggestion ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCcw size={12} />
              New Suggestion
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 text-sm bg-destructive/10 text-destructive rounded-md">
          {error}
        </div>
      )}

      {isLoading && !generatingSuggestion ? (
        <div className="flex justify-center items-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : suggestions.length === 0 ? (
        <div className="text-center py-6">
          <LightbulbIcon size={24} className="mx-auto text-amber-500 mb-2" />
          <p className="text-foreground text-sm">
            No AI suggestions yet. Generate one to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-md border ${suggestion.status === 'NEW'
                  ? 'border-primary/20 bg-primary/5 text-foreground'
                  : suggestion.status === 'ACCEPTED'
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-foreground'
                    : 'border-muted bg-muted/20 text-muted-foreground'
                }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getSuggestionIcon(suggestion.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{suggestion.suggestion}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground dark:text-gray-600">
                      Priority: {suggestion.priority}
                    </span>
                    {suggestion.status === 'NEW' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRejectSuggestion(suggestion.id)}
                          className="text-xs px-2 py-0.5 text-muted-foreground hover:text-foreground dark:text-gray-600 dark:hover:text-gray-800"
                        >
                          Dismiss
                        </button>
                        <button
                          onClick={() => handleAcceptSuggestion(suggestion.id)}
                          className="text-xs flex items-center gap-1 text-primary hover:underline"
                        >
                          <CheckCircle2 size={12} />
                          Implement
                        </button>
                      </div>
                    )}
                    {suggestion.status === 'ACCEPTED' && (
                      <span className="text-xs flex items-center gap-1 text-green-600 dark:text-green-700">
                        <CheckCircle2 size={12} />
                        Implemented
                      </span>
                    )}
                    {suggestion.status === 'REJECTED' && (
                      <span className="text-xs text-muted-foreground dark:text-gray-600">
                        Dismissed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}