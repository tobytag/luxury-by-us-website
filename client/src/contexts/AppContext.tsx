import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  filteredWatches: any[]; // Consider replacing 'any' with a proper Watch interface
  filters: {
    search?: string;
    brand?: string;
    category?: string;
    priceRange?: string;
    condition?: string;
    delivery?: string;
    availability?: string;
    sortBy?: string;
  };
  setFilters: (filters: AppContextType['filters']) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [filters, setFilters] = useState<AppContextType['filters']>({ sortBy: 'relevance' });
  const [filteredWatches, setFilteredWatches] = useState<AppContextType['filteredWatches']>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated data fetching (replace with actual API call)
  React.useEffect(() => {
    const fetchWatches = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        const watches = await fetch('/api/watches').then(res => res.json());
        setFilteredWatches(watches);
      } catch (error) {
        console.error('Error fetching watches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatches();
  }, []);

  return (
    <AppContext.Provider 
      value={{ 
        theme, 
        setTheme,
        filteredWatches,
        filters,
        setFilters,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
