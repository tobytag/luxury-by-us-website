import React from 'react';
import { Link } from 'wouter';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-luxury-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-playfair font-bold text-luxury-gold mb-4">LuxurybyUS</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Nigeria's premier destination for authentic luxury watches. We specialize in buying and selling 
              the world's most prestigious timepieces with guaranteed authenticity and professional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><span className="text-gray-300 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">Home</span></Link></li>
              <li><Link href="/shop"><span className="text-gray-300 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">Shop</span></Link></li>
              <li><Link href="/sell"><span className="text-gray-300 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">Sell Your Watch</span></Link></li>
              <li><Link href="/about"><span className="text-gray-300 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">About Us</span></Link></li>
              <li><a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors duration-300">Authentication</a></li>
              <li><a href="#" className="text-gray-300 hover:text-luxury-gold transition-colors duration-300">Warranty</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Victoria Island</p>
                  <p className="text-gray-300">Lagos, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-luxury-gold" />
                <a href="tel:+2348012345678" className="text-gray-300 hover:text-luxury-gold transition-colors duration-300">+234 801 234 5678</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-luxury-gold" />
                <a href="mailto:info@luxurybyus.ng" className="text-gray-300 hover:text-luxury-gold transition-colors duration-300">info@luxurybyus.ng</a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-luxury-gold" />
                <a href="https://wa.me/2348012345678" className="text-gray-300 hover:text-luxury-gold transition-colors duration-300">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 LuxurybyUS. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
