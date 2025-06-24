import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Sell', href: '/sell' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-playfair font-bold text-luxury-black hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                LuxurybyUS
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className={`px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                    isActive(item.href)
                      ? 'text-luxury-black'
                      : 'text-gray-600 hover:text-luxury-gold'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Search and Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-luxury-gold touch-target">
              <Search className="w-5 h-5" />
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-600 hover:text-luxury-gold touch-target">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span 
                        className={`block px-3 py-2 text-base font-medium transition-colors duration-300 cursor-pointer ${
                          isActive(item.href)
                            ? 'text-luxury-black'
                            : 'text-gray-600 hover:text-luxury-gold'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
