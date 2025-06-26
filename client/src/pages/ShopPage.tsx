import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/ProductCard';
import { useApp } from '@/contexts/AppContext';
import { brands, categories, priceRanges, sortOptions, conditions } from '@/data/products';

const deliveryOptions = [
  'Watch with original box and original papers',
  'Watch with original papers',
  'Watch with original box'
];

const availabilityOptions = [
  'In stock',
  'Needs to be procured', 
  'Available on request'
];

const conditionDetails = [
  'New/unworn',
  'Used',
  'No details'
];

const sortOptionsExtended = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'newest', label: 'Newest' },
  { value: 'popularity', label: 'Popularity' }
];

export function ShopPage() {
  const { filteredWatches, filters, setFilters, isLoading } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [] as string[],
    conditions: [] as string[],
    delivery: [] as string[],
    availability: [] as string[],
    conditionDetails: [] as string[],
    yearFrom: '',
    yearTo: ''
  });

  const [tempFilters, setTempFilters] = useState(selectedFilters);

  const clearAllFilters = () => {
    setFilters({ search: '', brand: 'all', category: 'all', priceRange: 'all', sortBy: 'relevance' });
    const emptyFilters = {
      brands: [],
      conditions: [],
      delivery: [],
      availability: [],
      conditionDetails: [],
      yearFrom: '',
      yearTo: ''
    };
    setSelectedFilters(emptyFilters);
    setTempFilters(emptyFilters);
  };

  const applyFilters = () => {
    setSelectedFilters(tempFilters);
    // Apply brand filter to main context
    if (tempFilters.brands.length > 0) {
      setFilters({ brand: tempFilters.brands[0].toLowerCase() });
    } else {
      setFilters({ brand: 'all' });
    }
    setIsFilterOpen(false);
  };

  const activeFiltersCount = Object.values(selectedFilters).reduce((count, arr) => {
    if (Array.isArray(arr)) return count + arr.length;
    if (typeof arr === 'string' && arr) return count + 1;
    return count;
  }, 0);

  return (
    <section className="py-16 md:py-24 bg-white">
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
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-responsive-h1 font-playfair font-bold text-luxury-black mb-4">Our Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our curated selection of authentic luxury timepieces</p>
        </div>
        
        {/* Filter and Sort Bar */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Filter Button */}
            <div className="flex items-center gap-4">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="touch-target">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 bg-luxury-gold text-luxury-black">{activeFiltersCount}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-96 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                      Filter Watches
                      {activeFiltersCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-500">
                          Clear All
                        </Button>
                      )}
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-6">
                    {/* Brand Filter */}
                    <div>
                      <h4 className="font-medium text-luxury-black mb-3">Brand</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {brands.map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                              id={`brand-${brand}`}
                              checked={tempFilters.brands.includes(brand)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setTempFilters(prev => ({
                                    ...prev,
                                    brands: [...prev.brands, brand]
                                  }));
                                } else {
                                  setTempFilters(prev => ({
                                    ...prev,
                                    brands: prev.brands.filter(b => b !== brand)
                                  }));
                                }
                              }}
                            />
                            <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Price Range */}
                    <div>
                      <h4 className="font-medium text-luxury-black mb-3">Price Range</h4>
                      <Select value={filters.priceRange} onValueChange={(value) => setFilters({ priceRange: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Prices" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Prices</SelectItem>
                          {priceRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* Year */}
                    <div>
                      <h4 className="font-medium text-luxury-black mb-3">Year of Production</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Input 
                          placeholder="From" 
                          type="number" 
                          value={tempFilters.yearFrom}
                          onChange={(e) => setTempFilters(prev => ({ ...prev, yearFrom: e.target.value }))}
                        />
                        <Input 
                          placeholder="To" 
                          type="number" 
                          value={tempFilters.yearTo}
                          onChange={(e) => setTempFilters(prev => ({ ...prev, yearTo: e.target.value }))}
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Condition */}
                    <div>
                      <h4 className="font-medium text-luxury-black mb-3">Condition</h4>
                      <div className="space-y-2">
                        {conditions.map((condition) => (
                          <div key={condition} className="flex items-center space-x-2">
                            <Checkbox
                              id={`condition-${condition}`}
                              checked={tempFilters.conditions.includes(condition)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setTempFilters(prev => ({
                                    ...prev,
                                    conditions: [...prev.conditions, condition]
                                  }));
                                } else {
                                  setTempFilters(prev => ({
                                    ...prev,
                                    conditions: prev.conditions.filter(c => c !== condition)
                                  }));
                                }
                              }}
                            />
                            <label htmlFor={`condition-${condition}`} className="text-sm cursor-pointer">
                              {condition}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Delivery Content */}
                    <div>
                      <h4 className="font-medium text-luxury-black mb-3">Delivery Content</h4>
                      <div className="space-y-2">
                        {deliveryOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`delivery-${option}`}
                              checked={tempFilters.delivery.includes(option)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setTempFilters(prev => ({
                                    ...prev,
                                    delivery: [...prev.delivery, option]
                                  }));
                                } else {
                                  setTempFilters(prev => ({
                                    ...prev,
                                    delivery: prev.delivery.filter(d => d !== option)
                                  }));
                                }
                              }}
                            />
                            <label htmlFor={`delivery-${option}`} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Availability */}
                    <div>
                      <h4 className="font-medium text-luxury-black mb-3">Availability</h4>
                      <div className="space-y-2">
                        {availabilityOptions.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`availability-${option}`}
                              checked={tempFilters.availability.includes(option)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setTempFilters(prev => ({
                                    ...prev,
                                    availability: [...prev.availability, option]
                                  }));
                                } else {
                                  setTempFilters(prev => ({
                                    ...prev,
                                    availability: prev.availability.filter(a => a !== option)
                                  }));
                                }
                              }}
                            />
                            <label htmlFor={`availability-${option}`} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Apply Filter Button */}
                    <div className="sticky bottom-0 bg-white border-t pt-4 mt-6">
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setTempFilters(selectedFilters)} className="flex-1">
                          Reset
                        </Button>
                        <Button onClick={applyFilters} className="flex-1 bg-luxury-black text-white hover:bg-luxury-gold hover:text-luxury-black">
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Sort Dropdown */}
            <Select value={filters.sortBy} onValueChange={(value) => setFilters({ sortBy: value })}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptionsExtended.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            <span className="font-medium text-luxury-black">{filteredWatches.length}</span> watches found
          </p>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12 min-h-[400px]">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))
          ) : filteredWatches.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No watches found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria or clearing filters.</p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            </div>
          ) : (
            filteredWatches.map((watch) => (
              <ProductCard key={watch.id} watch={watch} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
