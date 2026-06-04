import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Pill, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show search link if we are already on the search page
  const isHome = location.pathname === '/home';

  return (
    <nav className="bg-white border-b border-border-dev sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="bg-primary-mid p-1.5 rounded-lg group-hover:bg-primary-dark transition-colors">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-dark-navy tracking-tight">
              Medi<span className="text-primary-mid">Switch</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!isHome && (
              <button 
                onClick={() => navigate('/home')}
                className="text-sm font-semibold text-text-sec hover:text-primary-dark transition-colors"
              >
                Search Drugs
              </button>
            )}
            <button className="text-sm font-semibold text-text-sec hover:text-primary-dark transition-colors">
              Pharmacies
            </button>
            <button className="text-sm font-semibold text-text-sec hover:text-primary-dark transition-colors">
              Our Mission
            </button>
            
            <div className="w-px h-6 bg-border-dev mx-2"></div>

            {/* Auth Buttons (Hooks for the Landing Page UI later) */}
            <button className="text-sm font-bold text-primary-dark hover:text-primary-mid transition-colors">
              Log in
            </button>
            <button className="bg-dark-navy hover:bg-primary-dark text-white text-sm font-bold px-5 py-2 rounded-xl transition-all shadow-sm active:scale-95">
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-dark-navy hover:text-primary-mid p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border-dev px-4 pt-2 pb-4 space-y-2 shadow-lg absolute w-full">
          <button onClick={() => { navigate('/home'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2.5 text-base font-semibold text-dark-navy">Search Drugs</button>
          <button className="block w-full text-left py-2.5 text-base font-semibold text-dark-navy">Pharmacies</button>
          <hr className="border-border-dev my-2" />
          <button className="block w-full text-left py-2.5 text-base font-bold text-primary-dark">Log in</button>
          <button className="block w-full bg-dark-navy text-white text-center py-2.5 rounded-xl font-bold mt-2">Sign up</button>
        </div>
      )}
    </nav>
  );
}