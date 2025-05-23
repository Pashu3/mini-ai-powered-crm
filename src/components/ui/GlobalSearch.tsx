"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, User, Calendar, MessageSquare, FileText, Layout } from 'lucide-react';
import { useToast } from '@/components/ui/toast/ToastContext';

interface SearchResultItem {
  id: string;
  type: string;
  url: string;
  [key: string]: any;
}

type GroupedResults = {
  [key: string]: SearchResultItem[];
};

export default function GlobalSearch() {
  const router = useRouter();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [groupedResults, setGroupedResults] = useState<GroupedResults>({});
  const [totalResults, setTotalResults] = useState(0);
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const [flatResults, setFlatResults] = useState<SearchResultItem[]>([]);
  const [suggestions, setSuggestions] = useState<{ type: string, text: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!showSearchResults) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveResultIndex(prevIndex => {
            const newIndex = prevIndex + 1 >= flatResults.length ? 0 : prevIndex + 1;
            scrollToItem(newIndex);
            return newIndex;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveResultIndex(prevIndex => {
            const newIndex = prevIndex - 1 < 0 ? flatResults.length - 1 : prevIndex - 1;
            scrollToItem(newIndex);
            return newIndex;
          });
          break;
        case 'Enter':
          if (activeResultIndex >= 0 && activeResultIndex < flatResults.length) {
            e.preventDefault();
            handleResultClick(flatResults[activeResultIndex]);
          }
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSearchResults, activeResultIndex, flatResults]);

  // Scroll to the active item
  const scrollToItem = (index: number) => {
    if (resultsContainerRef.current && index >= 0) {
      const items = resultsContainerRef.current.querySelectorAll('[data-result-item]');
      if (items[index]) {
        items[index].scrollIntoView({ block: 'nearest' });
      }
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const res = await fetch(`/api/search/suggest?q=${encodeURIComponent(searchQuery)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setSuggestions(data.suggestions || []);
            setShowSuggestions((data.suggestions || []).length > 0);
          }
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Handle search query changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length >= 2 && !showSuggestions) {
        performSearch();
      } else if (searchQuery.length < 2) {
        setGroupedResults({});
        setTotalResults(0);
        setFlatResults([]);
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, showSuggestions]);

  // Flatten the grouped results into a single array for keyboard navigation
  useEffect(() => {
    const flattened: SearchResultItem[] = [];
    Object.values(groupedResults).forEach(group => {
      if (Array.isArray(group)) {
        group.forEach(item => flattened.push(item));
      }
    });
    setFlatResults(flattened);
    setActiveResultIndex(-1); // Reset active index when results change
  }, [groupedResults]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowSearchResults(true);
    setShowSuggestions(false);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=5`);

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          // Ensure the results are in the expected format before setting state
          const processedResults: GroupedResults = {};

          // Process each result category to ensure they're arrays
          if (data.results) {
            Object.keys(data.results).forEach(key => {
              if (Array.isArray(data.results[key])) {
                processedResults[key] = data.results[key];
              }
            });
          }

          setGroupedResults(processedResults);
          setTotalResults(data.totalResults || 0);
        } else {
          toast({
            type: 'error',
            title: 'Search failed',
            description: data.message || 'Failed to get search results',
            duration: 3000
          });
          setGroupedResults({});
          setTotalResults(0);
        }
      } else {
        throw new Error('Search request failed');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        type: 'error',
        title: 'Search failed',
        description: 'An error occurred while searching. Please try again.',
        duration: 3000
      });
      setGroupedResults({});
      setTotalResults(0);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (result: SearchResultItem) => {
    router.push(result.url);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const handleSuggestionClick = (suggestion: { type: string, text: string }) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    performSearch();
  };

  // Get icon for different result types
  const getResultIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'task':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'conversation':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'template':
        return <FileText className="h-4 w-4 text-amber-500" />;
      case 'campaign':
        return <Layout className="h-4 w-4 text-red-500" />;
      default:
        return <Search className="h-4 w-4 text-gray-500" />;
    }
  };

  // Format subtitle based on result type
  const getItemSubtitle = (result: SearchResultItem): string => {
    if (!result) return '';

    switch (result.type) {
      case 'lead':
        return `${result.company || ''}${result.company && result.email ? ' • ' : ''}${result.email || ''}`;
      case 'task':
        return `${result.status || 'Unknown status'} • ${result.lead?.name ? `Lead: ${result.lead.name}` : 'No lead'} • Due: ${result.dueDate ? new Date(result.dueDate).toLocaleDateString() : 'No date'}`;
      case 'conversation':
        return `${result.type || 'Unknown type'} • Lead: ${result.lead?.name || 'Unknown'} • ${result.date ? new Date(result.date).toLocaleDateString() : 'Unknown date'}`;
      case 'template':
        return `${result.type || 'Unknown type'} • Tags: ${Array.isArray(result.tags) && result.tags.length > 0 ? result.tags.join(', ') : 'None'}`;
      case 'campaign':
        return `${result.isActive ? 'Active' : 'Inactive'} • Leads: ${result._count?.leads || 0} • Steps: ${result._count?.steps || 0}`;
      default:
        return '';
    }
  };

  // Get the title for each result type
  const getItemTitle = (result: SearchResultItem): string => {
    if (!result) return 'Unknown';

    switch (result.type) {
      case 'lead':
        return result.name || 'Unnamed Lead';
      case 'task':
        return result.title || 'Untitled Task';
      case 'conversation':
        return result.subject || `Conversation with ${result.lead?.name || 'Unknown'}`;
      case 'template':
        return result.name || 'Unnamed Template';
      case 'campaign':
        return result.name || 'Unnamed Campaign';
      default:
        return 'Unknown item';
    }
  };

  // Get readable name for result group
  const getGroupLabel = (key: string): string => {
    switch (key) {
      case 'leads': return 'Leads';
      case 'tasks': return 'Tasks';
      case 'conversations': return 'Conversations';
      case 'templates': return 'Templates';
      case 'campaigns': return 'Campaigns';
      default: return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  return (
    <div className="w-full" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          ref={searchInputRef}
          placeholder="Search leads, tasks, conversations..."
          className="w-full pl-8 pr-10 py-2 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchQuery.length >= 2) {
              if (totalResults > 0) {
                setShowSearchResults(true);
                setShowSuggestions(false);
              } else {
                setShowSuggestions(true);
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowSearchResults(false);
              setShowSuggestions(false);
              searchInputRef.current?.blur();
            } else if (e.key === 'Enter' && !showSearchResults && searchQuery.length >= 2) {
              performSearch();
            }
          }}
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => {
              setSearchQuery("");
              setShowSearchResults(false);
              setShowSuggestions(false);
              setGroupedResults({});
              setTotalResults(0);
            }}
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute mt-2 w-full bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden"
            >
              <div className="max-h-[200px] overflow-y-auto py-1">
                <div className="px-3 py-1.5 text-xs text-muted-foreground border-b border-border">
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${index}`}
                    className="w-full text-left px-3 py-1.5 hover:bg-accent flex items-center gap-2"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="text-xs bg-muted rounded px-1.5 py-0.5">{suggestion.type}</span>
                    <span>{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Results Dropdown */}
        <AnimatePresence>
          {showSearchResults && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute mt-2 w-full bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden"
            >
              <div
                ref={resultsContainerRef}
                className="max-h-[350px] overflow-y-auto"
              >
                {isSearching ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                    <span className="text-sm">Searching...</span>
                  </div>
                ) : totalResults > 0 ? (
                  <div>
                    {Object.keys(groupedResults).map(groupKey => {
                      const groupResults = groupedResults[groupKey];
                      if (!Array.isArray(groupResults) || groupResults.length === 0) {
                        return null;
                      }

                      return (
                        <div key={groupKey} className="mb-2">
                          <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted/50">
                            {getGroupLabel(groupKey)}
                          </div>
                          <div>
                            {groupResults.map((result, resultIdx) => {
                              if (!result || !result.id || !result.type) return null;

                              const globalIndex = flatResults.findIndex(
                                item => item && item.id === result.id && item.type === result.type
                              );
                              const isActive = globalIndex === activeResultIndex;

                              return (
                                <button
                                  key={`${result.type}-${result.id}-${resultIdx}`}
                                  data-result-item
                                  className={`w-full text-left px-4 py-2 hover:bg-primary/10 flex items-start gap-3 ${isActive ? 'bg-primary/10' : ''
                                    }`}
                                  onClick={() => handleResultClick(result)}
                                  onMouseEnter={() => setActiveResultIndex(globalIndex)}
                                >
                                  <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary/10 flex-shrink-0 mt-1">
                                    {getResultIcon(result.type)}
                                  </div>
                                  <div className="overflow-hidden">
                                    <div className="font-medium truncate">
                                      {getItemTitle(result)}
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate">
                                      {getItemSubtitle(result)}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : searchQuery.length >= 2 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Type at least 2 characters to search
                  </div>
                )}
              </div>

              <div className="p-2 bg-muted/50 border-t border-border">
                <div className="text-xs text-muted-foreground flex justify-between items-center">
                  <span>Press ESC to close</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      <kbd className="px-1.5 py-0.5 bg-background border border-input rounded text-xs">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-background border border-input rounded text-xs">↓</kbd>
                      <span>navigate</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <kbd className="px-1.5 py-0.5 bg-background border border-input rounded text-xs">Enter</kbd>
                      <span>select</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}