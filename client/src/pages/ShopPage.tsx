import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { useApp } from '@/contexts/AppContext';
import { brands, categories, priceRanges, sortOptions } from '@/data/products';

export function ShopPage() {
  const { filteredWatches, filters, setFilters, isLoading } = useApp();

  const clearAllFilters = () => {
    setFilters({ search: '', brand: 'all', category: 'all', priceRange: 'all', sortBy: 'featured' });
  };

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
        
        {/* Search Bar */}
        <div className="mb-8">
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
        </div>
        
        {/* Filter Bar */}
        <div className="mb-8 md:mb-12">
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

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            <span className="font-medium text-luxury-black">{filteredWatches.length}</span> watches found
          </p>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
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
