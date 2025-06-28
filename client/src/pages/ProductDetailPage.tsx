import React, { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, ShieldCheck, Truck, Award, MessageCircle, Phone, Heart, Share2, ZoomIn, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ProductCard';
import { formatPriceShort } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { Watch } from '@shared/schema';

export function ProductDetailPage() {
  const [, params] = useRoute('/product/:id');
  const { toast } = useToast();
  const watchId = params?.id ? parseInt(params.id) : null;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(0);

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

  // Mock image gallery for luxury watch
  const imageGallery = [
    watch?.image || '',
    watch?.image || '',
    watch?.image || '',
    watch?.image || '',
    watch?.image || ''
  ];

  // Mock product variations for luxury watch
  const productVariations = [
    { id: 1, name: 'Steel on Steel Bracelet', price: watch?.price || 0, available: true },
    { id: 2, name: 'Steel on Leather Strap', price: (watch?.price || 0) - 500000, available: true },
    { id: 3, name: 'Gold Accents on Steel', price: (watch?.price || 0) + 2000000, available: false },
    { id: 4, name: 'Limited Edition', price: (watch?.price || 0) + 5000000, available: true },
  ];

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageGallery.length) % imageGallery.length);
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
          
          {/* Product Info - Omega Style */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20">Certified Authentic</Badge>
                <Badge className="bg-green-50 text-green-700 border border-green-200">{watch.condition} Condition</Badge>
              </div>
              
              {/* Omega-style Product Title */}
              <div className="mb-6">
                <h1 className="omega-product-title text-3xl lg:text-4xl text-luxury-black mb-2 leading-tight">
                  {watch.name}
                </h1>
                <p className="text-lg text-gray-600 font-light mb-1">{watch.brand} Collection</p>
                <p className="text-sm text-gray-500 mb-4">Model: {watch.year}-{watch.id.toString().padStart(4, '0')}</p>
              </div>
              
              {/* Price Display */}
              <div className="mb-8">
                <p className="omega-price text-4xl text-luxury-black mb-2">
                  {formatPriceShort(productVariations[selectedVariation]?.price || watch.price)}
                </p>
                <p className="text-sm text-gray-500">Price includes VAT</p>
              </div>
            </div>

            {/* Key Features */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-luxury-black mb-6">Key Features</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Movement</span>
                  <span className="font-medium text-luxury-black">{watch.movement}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Case</span>
                  <span className="font-medium text-luxury-black">{watch.caseSize} {watch.caseMaterial}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Water Resistance</span>
                  <span className="font-medium text-luxury-black">{watch.waterResistance}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Condition</span>
                  <span className="font-medium text-luxury-black">{watch.condition}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Year</span>
                  <span className="font-medium text-luxury-black">{watch.year}</span>
                </div>
              </div>
            </div>

            {/* Product Variations */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-luxury-black mb-6">Available Variations</h3>
              <div className="space-y-3">
                {productVariations.map((variation, index) => (
                  <button
                    key={variation.id}
                    onClick={() => setSelectedVariation(index)}
                    disabled={!variation.available}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedVariation === index
                        ? 'border-luxury-gold bg-luxury-gold/5'
                        : variation.available
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-100 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-luxury-black">{variation.name}</p>
                        <p className="text-sm text-gray-500">
                          {variation.available ? 'In Stock' : 'Out of Stock'}
                        </p>
                      </div>
                      <p className="text-lg font-medium text-luxury-black">
                        {formatPriceShort(variation.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            
            {/* Action Buttons - Omega Style */}
            <div className="space-y-6 border-t border-gray-200 pt-8">
              <div className="space-y-4">
                <Button 
                  size="lg"
                  onClick={handleInquiry}
                  disabled={!productVariations[selectedVariation]?.available}
                  className="w-full bg-luxury-black hover:bg-luxury-dark text-white py-4 text-lg font-medium transition-all duration-300 touch-target disabled:bg-gray-300"
                >
                  {productVariations[selectedVariation]?.available ? 'Request Information' : 'Out of Stock'}
                </Button>
                
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-luxury-black hover:text-luxury-black py-3 transition-all duration-300 touch-target">
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Wishlist
                  </Button>
                  <Button variant="outline" className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-luxury-black hover:text-luxury-black py-3 transition-all duration-300 touch-target">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1 border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black py-3 font-medium transition-all duration-300 touch-target">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1 border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black py-3 font-medium transition-all duration-300 touch-target">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Expert
                  </Button>
                </div>
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

        {/* Product Details Tabs - Omega Style */}
        <div className="mt-16 border-t border-gray-200">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto bg-gray-50 rounded-lg p-1">
              <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
              <TabsTrigger value="technical" className="text-sm font-medium">Technical Details</TabsTrigger>
              <TabsTrigger value="heritage" className="text-sm font-medium">Heritage</TabsTrigger>
              <TabsTrigger value="size" className="text-sm font-medium">Size Guide</TabsTrigger>
            </TabsList>
            
            <div className="mt-12">
              <TabsContent value="overview" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-light text-luxury-black mb-6">Product Overview</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {watch.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      This exceptional timepiece represents the pinnacle of horological craftsmanship, 
                      combining traditional watchmaking techniques with modern precision engineering. 
                      Each component has been meticulously crafted and assembled by skilled artisans.
                    </p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0"></span>
                        <span>Certified authentic with original documentation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0"></span>
                        <span>Professional servicing and condition assessment</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0"></span>
                        <span>Comprehensive warranty and after-sales support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="technical" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-light text-luxury-black mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-luxury-black mb-3">Movement</h4>
                        <p className="text-gray-600">{watch.movement}</p>
                        <p className="text-sm text-gray-500 mt-1">Swiss-made precision mechanism</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-luxury-black mb-3">Case</h4>
                        <p className="text-gray-600">{watch.caseSize} diameter</p>
                        <p className="text-gray-600">{watch.caseMaterial}</p>
                        <p className="text-sm text-gray-500 mt-1">Polished and brushed finish</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-luxury-black mb-3">Water Resistance</h4>
                        <p className="text-gray-600">{watch.waterResistance}</p>
                        <p className="text-sm text-gray-500 mt-1">Screw-down crown</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-luxury-black mb-3">Condition</h4>
                        <p className="text-gray-600">{watch.condition}</p>
                        <p className="text-sm text-gray-500 mt-1">Professionally assessed</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-luxury-black mb-3">Year</h4>
                        <p className="text-gray-600">{watch.year}</p>
                        <p className="text-sm text-gray-500 mt-1">Production year</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-luxury-black mb-3">Warranty</h4>
                        <p className="text-gray-600">2 years comprehensive coverage</p>
                        <p className="text-sm text-gray-500 mt-1">LuxurybyUS guarantee</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="heritage" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-light text-luxury-black mb-6">Brand Heritage</h3>
                  <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">
                      {watch.brand} has been at the forefront of luxury watchmaking for over a century, 
                      creating timepieces that have witnessed historic moments and accompanied extraordinary individuals 
                      on their greatest achievements.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      This particular model represents decades of innovation and refinement, embodying the brand's 
                      commitment to excellence and precision. Each watch is a testament to the master craftsmen 
                      who have dedicated their lives to perfecting the art of horology.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-medium text-luxury-black mb-3">Notable Achievements</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• First luxury watch to achieve chronometer certification</li>
                        <li>• Worn by explorers, athletes, and world leaders</li>
                        <li>• Featured in prestigious exhibitions worldwide</li>
                        <li>• Recognized for innovation in mechanical engineering</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="size" className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-light text-luxury-black mb-6">Size Guide</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium text-luxury-black mb-4">Case Dimensions</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Diameter</span>
                          <span className="font-medium">{watch.caseSize}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Thickness</span>
                          <span className="font-medium">12mm</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">Lug Width</span>
                          <span className="font-medium">20mm</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Weight</span>
                          <span className="font-medium">150g</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-luxury-black mb-4">Fit Recommendations</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-800 mb-2">Small Wrists (6-7 inches)</p>
                          <p className="text-sm text-gray-600">Comfortable fit with elegant proportions</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-800 mb-2">Medium Wrists (7-8 inches)</p>
                          <p className="text-sm text-gray-600">Perfect proportions and optimal comfort</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-800 mb-2">Large Wrists (8+ inches)</p>
                          <p className="text-sm text-gray-600">Refined elegance with substantial presence</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedWatches.length > 0 && (
          <div className="mt-24 border-t border-gray-200 pt-16">
            <h3 className="text-2xl font-light text-luxury-black text-center mb-12">You Might Also Like</h3>
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
