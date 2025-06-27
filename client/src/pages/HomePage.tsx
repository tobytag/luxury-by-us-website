import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ShieldCheck, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Skeleton } from '@/components/ui/skeleton';
import type { Watch } from '@shared/schema';

export function HomePage() {
  const { data: featuredWatches, isLoading } = useQuery<Watch[]>({
    queryKey: ['/api/watches/featured'],
  });

  const brands = [
    'ROLEX',
    'PATEK PHILIPPE', 
    'AUDEMARS PIGUET',
    'OMEGA',
    'CARTIER',
    'TAG HEUER',
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 to-luxury-dark/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=1920&h=1080&fit=crop')"
          }}
        ></div>
        
        <div className="relative z-20 text-center text-white container-responsive">
          <h1 className="text-responsive-h1 md:text-6xl lg:text-7xl font-playfair font-bold mb-6 animate-fade-in">
            Curated <span className="text-luxury-gold">Luxury Timepieces</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 font-light max-w-2xl mx-auto animate-slide-up">
            Nigeria's premier destination for authentic luxury watches from the world's most prestigious brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link href="/shop">
              <Button size="lg" className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 touch-target">
                Explore Collection
              </Button>
            </Link>
            <Link href="/sell">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-luxury-black px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 touch-target">
                Sell you Watch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-responsive-h2 md:text-4xl font-playfair font-bold text-luxury-black mb-4">Featured Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Handpicked timepieces representing the pinnacle of horological excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <Skeleton className="aspect-square mb-4" />
                  <Skeleton className="h-6 mb-2" />
                  <Skeleton className="h-4 mb-2 w-20" />
                  <Skeleton className="h-8 mb-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))
            ) : (
              featuredWatches?.slice(0, 6).map((watch) => (
                <ProductCard key={watch.id} watch={watch} />
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 touch-target">
                Explore More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Showcase Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-responsive-h2 md:text-4xl font-playfair font-bold text-luxury-black mb-4">Prestigious Brands</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We deal exclusively with the world's most renowned watchmakers</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {brands.map((brand) => (
              <div key={brand} className="text-center group cursor-pointer">
                <div className="h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl font-playfair font-bold text-gray-400 group-hover:text-luxury-gold transition-colors duration-300">
                    {brand}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Your Watch Section */}
      <section className="py-16 md:py-24 bg-luxury-black text-white">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-responsive-h2 font-playfair font-bold mb-6">Sell Your Luxury Timepiece</h2>
              <p className="text-lg text-gray-300 mb-8">Get expert evaluation and the best prices for your luxury watch. Our certified appraisers ensure fair market value.</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                  <span>Free professional evaluation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                  <span>Secure and confidential process</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                  <span>Immediate payment in Lagos</span>
                </div>
              </div>
              <Link href="/sell">
                <Button size="lg" className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 touch-target">
                  Get Free Evaluation
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-luxury-gold/20 to-luxury-gold/5 rounded-lg flex items-center justify-center">
                <div className="w-32 h-32 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-luxury-gold rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose LuxurybyUS Section */}
      <section className="py-16 md:py-24 bg-luxury-dark text-white">
        <div className="container-responsive">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-responsive-h2 font-playfair font-bold mb-4">Why Choose LuxurybyUS</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Your trusted partner for authentic luxury timepieces in Nigeria</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8 text-luxury-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">100% Authentic</h3>
              <p className="text-gray-300">Every watch is rigorously authenticated by our certified experts. We guarantee authenticity or your money back.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-luxury-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Delivery</h3>
              <p className="text-gray-300">Insured and tracked delivery throughout Lagos. White-glove service for high-value timepieces.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-luxury-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Service</h3>
              <p className="text-gray-300">Over 10 years of experience in luxury watches. Professional consultation and after-sales support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-responsive text-center max-w-4xl">
          <h2 className="text-responsive-h2 font-playfair font-bold text-luxury-black mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Stay informed about new arrivals and exclusive collections</p>
          
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
