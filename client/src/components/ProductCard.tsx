import React from 'react';
import { Link } from 'wouter';
import type { Watch } from '@shared/schema';
import { formatPriceShort } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  watch: Watch;
}

export function ProductCard({ watch }: ProductCardProps) {
  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return 'bg-green-100 text-green-600';
      case 'very good':
        return 'bg-blue-100 text-blue-600';
      case 'good':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Link href={`/product/${watch.id}`} className="block h-full">
      <div className="group bg-white h-full flex flex-col transition-all duration-500 hover:shadow-lg">
        <div className="aspect-square bg-gray-50 overflow-hidden relative">
          <img 
            src={watch.image} 
            alt={watch.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Hover overlay with buy now button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button className="bg-white/80 hover:bg-white/90 text-luxury-black px-6 py-2 rounded font-medium shadow-lg transition-all duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <h3 className="text-lg font-light text-luxury-black mb-1 leading-tight">{watch.name}</h3>
            <p className="text-gray-600 text-sm">{watch.brand}</p>
          </div>
          
          <div className="mt-auto">
            <p className="omega-price text-xl text-luxury-black font-light">{formatPriceShort(watch.price)}</p>
          </div>
          
          {/* Subtle badges */}
          <div className="flex gap-1 mt-3">
            {watch.featured && (
              <Badge className="bg-luxury-gold/10 text-luxury-gold text-xs border-none">Featured</Badge>
            )}
            <Badge className={`${getConditionColor(watch.condition)} text-xs border-none`}>{watch.condition}</Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
