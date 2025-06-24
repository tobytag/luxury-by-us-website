import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard } from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useApp } from '@/contexts/AppContext';
import { brands, categories, priceRanges, sortOptions } from '@/data/products';

export function ShopPage() {
  const { filteredWatches, filters, setFilters, isLoading } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  
  // Advanced filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleBrandFilter = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleConditionFilter = (condition: string, checked: boolean) => {
    if (checked) {
      setSelectedConditions([...selectedConditions, condition]);
    } else {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedConditions([]);
    setSelectedCategories([]);
    setFilters({ search: '', brand: 'all', category: 'all', priceRange: 'all', sortBy: 'featured' });
  };

  const activeFiltersCount = selectedBrands.length + selectedConditions.length + selectedCategories.length;

  return (
    <section className="py-8 md:py-16 bg-gray-50 min-h-screen">
      <div className="container-responsive">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-luxury-gold transition-colors">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><a href="/shop" className="hover:text-luxury-gold transition-colors">Watches</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-800">All Collections</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="omega-product-title text-3xl lg:text-4xl text-luxury-black mb-2">Watch Collection</h1>
          <p className="text-lg text-gray-600 font-light">Discover our curated selection of authentic luxury timepieces</p>
        </div>
        
        {/* Search Bar and View Toggle */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search watches, brands, models..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent touch-target"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden touch-target">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 bg-luxury-gold text-luxury-black">{activeFiltersCount}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filter Watches</SheetTitle>
                  </SheetHeader>
                  {/* Mobile filters content will go here */}
                </SheetContent>
              </Sheet>
              
              {/* Desktop Filter Toggle */}
              <Button 
                variant="outline" 
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                className="hidden lg:flex touch-target"
              >
                <Filter className="w-4 h-4 mr-2" />
                {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-luxury-gold text-luxury-black">{activeFiltersCount}</Badge>
                )}
              </Button>
              
              {/* View Mode Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none border-r"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredWatches.length} of {filteredWatches.length} watches
          </p>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                <Skeleton className="aspect-square mb-4" />
                <Skeleton className="h-6 mb-2" />
                <Skeleton className="h-4 mb-2 w-20" />
                <Skeleton className="h-8 mb-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))
          ) : filteredWatches.length > 0 ? (
            filteredWatches.map((watch) => (
              <ProductCard key={watch.id} watch={watch} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No watches found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
