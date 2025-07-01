import React from 'react';
import { ShieldCheck, Users, Award, Clock } from 'lucide-react';

export function AboutPage() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-responsive">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-responsive-h1 font-playfair font-bold text-luxury-black mb-4">About LuxurybyUS</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Nigeria's premier destination for authentic luxury timepieces</p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-responsive-h2 font-playfair font-bold text-luxury-black mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded with a passion for horological excellence, LuxurybyUS has been Nigeria's trusted partner 
              for luxury watch enthusiasts for over a decade. We specialize in curating the finest timepieces 
              from the world's most prestigious manufacturers.
            </p>
            <p className="text-gray-600 mb-6">
              Based in the heart of Lagos, we serve discerning clients across Nigeria who appreciate the 
              artistry, craftsmanship, and heritage that define true luxury watches. Every timepiece in our 
              collection is authenticated by certified experts and comes with our guarantee of authenticity.
            </p>
            <p className="text-gray-600">
              Whether you're looking to acquire your first luxury watch or add to your collection, 
              LuxurybyUS provides unparalleled expertise and personalized service.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-luxury-gold/20 to-luxury-gold/5 rounded-lg flex items-center justify-center">
              <div className="w-32 h-32 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                <Clock className="w-16 h-16 text-luxury-gold" />
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-responsive-h2 font-playfair font-bold text-luxury-black text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-luxury-black" />
              </div>
              <h3 className="text-xl font-semibold text-luxury-black mb-4">Authenticity Guaranteed</h3>
              <p className="text-gray-600">Every watch undergoes rigorous authentication by certified experts. We stake our reputation on authenticity.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-luxury-black" />
              </div>
              <h3 className="text-xl font-semibold text-luxury-black mb-4">Personal Service</h3>
              <p className="text-gray-600">We believe in building lasting relationships with our clients through personalized attention and expert guidance.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-luxury-black" />
              </div>
              <h3 className="text-xl font-semibold text-luxury-black mb-4">Excellence</h3>
              <p className="text-gray-600">We maintain the highest standards in everything we do, from curation to customer service.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 rounded-lg p-8 md:p-12">
          <h2 className="text-responsive-h2 font-playfair font-bold text-luxury-black text-center mb-8">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-luxury-black mb-4">Certified Appraisers</h3>
              <p className="text-gray-600 mb-6">
                Our team includes certified watch appraisers with extensive training from leading horological 
                institutions. We stay current with market trends and authentication techniques.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-luxury-black mb-4">Market Expertise</h3>
              <p className="text-gray-600 mb-6">
                With over 10 years in the luxury watch market, we understand the nuances of value, 
                rarity, and investment potential across all major brands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}