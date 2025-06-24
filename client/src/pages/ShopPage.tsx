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

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-responsive">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-responsive-h1 font-playfair font-bold text-luxury-black mb-4">Our Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our curated selection of authentic luxury timepieces</p>
        </div>
        
        {/* Filter Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <Input
                type="text"
                placeholder="Search watches..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent touch-target"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Brand Filter */}
              <Select value={filters.brand} onValueChange={(value) => setFilters({ brand: value })}>
                <SelectTrigger className="touch-target">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand.toLowerCase()}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Category Filter */}
              <Select value={filters.category} onValueChange={(value) => setFilters({ category: value })}>
                <SelectTrigger className="touch-target">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Price Filter */}
              <Select value={filters.priceRange} onValueChange={(value) => setFilters({ priceRange: value })}>
                <SelectTrigger className="touch-target">
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
              
              {/* Sort */}
              <Select value={filters.sortBy} onValueChange={(value) => setFilters({ sortBy: value })}>
                <SelectTrigger className="touch-target">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
