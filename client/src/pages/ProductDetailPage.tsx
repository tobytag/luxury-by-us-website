import React, { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, ShieldCheck, Truck, Award, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCard } from '@/components/ProductCard';
import { formatPriceShort } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { Watch } from '@shared/schema';

export function ProductDetailPage() {
  const [, params] = useRoute('/product/:id');
  const { toast } = useToast();
  const watchId = params?.id ? parseInt(params.id) : null;

  const { data: watch, isLoading } = useQuery<Watch>({
    queryKey: [`/api/watches/${watchId}`],
    enabled: !!watchId,
  });

  const { data: allWatches } = useQuery<Watch[]>({
    queryKey: ['/api/watches'],
  });

  const relatedWatches = allWatches?.filter(w => 
    w.brand === watch?.brand && w.id !== watch?.id
  ).slice(0, 4) || [];

  const handleInquiry = async () => {
    if (!watch) return;
    
    try {
      await apiRequest('POST', '/api/inquiries', {
        watchId: watch.id,
        name: 'Interested Customer',
        email: 'customer@example.com',
        phone: '+234 800 000 0000',
        message: `I'm interested in the ${watch.name}`,
      });
      
      toast({
        title: "Inquiry Sent!",
        description: "We'll contact you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <Skeleton className="h-8 mb-4" />
                <Skeleton className="h-6 mb-2 w-32" />
                <Skeleton className="h-10 w-48" />
              </div>
              <Skeleton className="h-32" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Watch not found</h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-responsive">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/"><span className="text-gray-500 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">Home</span></Link></li>
            <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
            <li><Link href="/shop"><span className="text-gray-500 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">Shop</span></Link></li>
            <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
            <li className="text-luxury-black font-medium">{watch.name}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={watch.image} 
                alt={watch.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-zoom-in"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity duration-300">
                  <img 
                    src={watch.image} 
                    alt={`${watch.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-luxury-gold/10 text-luxury-gold">Certified Authentic</Badge>
                <Badge className="bg-green-100 text-green-600">{watch.condition} Condition</Badge>
              </div>
              <h1 className="text-responsive-h1 font-playfair font-bold text-luxury-black mb-2">{watch.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{watch.brand}</p>
              <p className="text-4xl font-bold text-luxury-black">{formatPriceShort(watch.price)}</p>
            </div>
            
            {/* Product Description */}
            <div>
              <h3 className="text-xl font-semibold text-luxury-black mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{watch.description}</p>
            </div>
            
            {/* Specifications */}
            <div>
              <h3 className="text-xl font-semibold text-luxury-black mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="font-medium text-gray-600 mb-1">Movement</dt>
                  <dd className="text-luxury-black">{watch.movement}</dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="font-medium text-gray-600 mb-1">Case Material</dt>
                  <dd className="text-luxury-black">{watch.caseMaterial}</dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="font-medium text-gray-600 mb-1">Case Size</dt>
                  <dd className="text-luxury-black">{watch.caseSize}</dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="font-medium text-gray-600 mb-1">Water Resistance</dt>
                  <dd className="text-luxury-black">{watch.waterResistance}</dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="font-medium text-gray-600 mb-1">Condition</dt>
                  <dd className="text-luxury-black">{watch.condition}</dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="font-medium text-gray-600 mb-1">Year</dt>
                  <dd className="text-luxury-black">{watch.year}</dd>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                size="lg"
                onClick={handleInquiry}
                className="w-full bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 touch-target"
              >
                Inquire Now
              </Button>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 border-2 border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white py-3 font-semibold transition-all duration-300 touch-target">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="flex-1 border-2 border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white py-3 font-semibold transition-all duration-300 touch-target">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </Button>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-luxury-black mb-4">Why Buy From Us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-luxury-gold" />
                  <span className="text-gray-700">100% Authentic Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-luxury-gold" />
                  <span className="text-gray-700">Secure Delivery in Lagos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-luxury-gold" />
                  <span className="text-gray-700">10+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedWatches.length > 0 && (
          <div className="mt-24">
            <h3 className="text-2xl font-playfair font-bold text-luxury-black mb-8">Related Watches</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedWatches.map((relatedWatch) => (
                <ProductCard key={relatedWatch.id} watch={relatedWatch} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
