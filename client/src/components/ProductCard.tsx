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
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
        <img 
          src={watch.image} 
          alt={watch.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
          <h3 className="text-lg font-semibold text-luxury-black line-clamp-2 flex-1">{watch.name}</h3>
          <div className="flex gap-1 flex-wrap">
            {watch.featured && (
              <Badge className="bg-luxury-gold/10 text-luxury-gold text-xs">Featured</Badge>
            )}
            <Badge className={`${getConditionColor(watch.condition)} text-xs`}>{watch.condition}</Badge>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{watch.brand}</p>
        <div className="mt-auto">
          <p className="text-lg md:text-xl font-bold text-luxury-black mb-4">{formatPriceShort(watch.price)}</p>
          
          <Link href={`/product/${watch.id}`}>
            <Button className="w-full bg-luxury-black text-white hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 touch-target">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
