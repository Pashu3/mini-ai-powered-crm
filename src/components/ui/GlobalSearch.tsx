"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useToast } from '@/components/ui/toast/ToastContext';

interface SearchResult {
  id: string;
  type: 'lead' | 'contact' | 'deal' | 'task';
  title: string;
  subtitle?: string;
  url: string;
}

export default function GlobalSearch() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle clicks outside of search results to close them
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Handle search query changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length >= 2) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setShowSearchResults(true);
    
    try {
      // This would be your actual API endpoint
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.success ? data.data : []);
      } else {
        // For demo purposes - mock results if API not implemented yet
        // Cast the mock results to ensure they match the SearchResult type
        const mockResults: SearchResult[] = [
          { id: '1', type: 'lead', title: 'John Corporation', subtitle: 'Lead • Technology', url: '/dashboard/leads/1' },
          { id: '2', type: 'contact', title: 'Sarah Johnson', subtitle: 'Contact • Marketing Director', url: '/dashboard/contacts/2' },
          { id: '3', type: 'deal', title: 'Enterprise Contract', subtitle: 'Deal • $50,000', url: '/dashboard/deals/3' },
          { id: '4', type: 'task', title: 'Follow up call', subtitle: 'Task • Due tomorrow', url: '/dashboard/tasks/4' },
        ].filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        
        setSearchResults(mockResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        type: 'error',
        title: 'Search failed',
        description: 'An error occurred while searching. Please try again.',
        duration: 3000
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchResultClick = (result: SearchResult) => {
    router.push(result.url);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'lead': return '👥';
      case 'contact': return '👤';
      case 'deal': return '💰';
      case 'task': return '✓';
      default: return '📄';
    }
  };

  return (
    <div className="w-full" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          ref={searchInputRef}
          placeholder="Search leads, contacts, deals..."
          className="w-full pl-8 pr-4 py-2 rounded-md border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowSearchResults(false);
              searchInputRef.current?.blur();
            }
          }}
        />
        {searchQuery && (
          <button 
            className="absolute right-2.5 top-2.5"
            onClick={() => {
              setSearchQuery("");
              setShowSearchResults(false);
            }}
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}

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
              <div className="max-h-[350px] overflow-y-auto py-1">
                {isSearching ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="ml-2 text-sm">Searching...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    {searchResults.map((result) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        className="w-full text-left px-4 py-2 hover:bg-accent flex items-start gap-3"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-muted flex-shrink-0">
                          <span role="img" aria-label={result.type}>
                            {getResultIcon(result.type)}
                          </span>
                        </div>
                        <div className="overflow-hidden">
                          <div className="font-medium truncate">{result.title}</div>
                          {result.subtitle && (
                            <div className="text-xs text-muted-foreground">{result.subtitle}</div>
                          )}
                        </div>
                      </button>
                    ))}
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
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-input rounded text-xs">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-background border border-input rounded text-xs">↓</kbd>
                    <span>to navigate</span>
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