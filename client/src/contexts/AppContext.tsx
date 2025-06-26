import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Watch } from '@shared/schema';

interface FilterState {
  search: string;
  brand: string;
  category: string;
  priceRange: string;
  sortBy: string;
}

interface AppContextType {
  watches: Watch[];
  filteredWatches: Watch[];
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialFilters: FilterState = {
  search: '',
  brand: 'all',
  category: 'all',
  priceRange: 'all',
  sortBy: 'featured',
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [filters, setFiltersState] = useState<FilterState>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWatches();
  }, []);

  const fetchWatches = async () => {
    try {
      const response = await fetch('/api/watches');
      if (response.ok) {
        const watchesData = await response.json();
        setWatches(watchesData);
      }
    } catch (error) {
      console.error('Failed to fetch watches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFiltersState(initialFilters);
  };

  const filteredWatches = React.useMemo(() => {
    let filtered = [...watches];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(watch =>
        watch.name.toLowerCase().includes(searchTerm) ||
        watch.brand.toLowerCase().includes(searchTerm) ||
        watch.description.toLowerCase().includes(searchTerm)
      );
    }

    // Brand filter - support multiple brands
    if (filters.brand && filters.brand !== 'all') {
      const brandArray = Array.isArray(filters.brand) ? filters.brand : [filters.brand];
      filtered = filtered.filter(watch => 
        brandArray.some(brand => watch.brand.toLowerCase() === brand.toLowerCase())
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(watch => watch.category.toLowerCase() === filters.category.toLowerCase());
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(p => parseInt(p));
      if (max) {
        filtered = filtered.filter(watch => watch.price >= min && watch.price <= max);
      } else {
        filtered = filtered.filter(watch => watch.price >= min);
      }
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default: // featured
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [watches, filters]);

  const value: AppContextType = {
    watches,
    filteredWatches,
    filters,
    setFilters,
    resetFilters,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
