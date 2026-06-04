import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, ChevronRight, HelpCircle, Pill } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Handle the search form submit event
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/results?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const categories = [
    { name: 'Antibiotics', query: 'Antibiotic' },
    { name: 'Antimalarial', query: 'Antimalarial' },
    { name: 'Antihypertensive', query: 'Antihypertensive' },
    { name: 'Antidiabetic', query: 'Antidiabetic' },
    { name: 'Antiprotozoal', query: 'Antiprotozoal' }
  ];

  const popularSearches = [
    'Augmentin 625mg',
    'Coartem',
    'Flagyl 400mg',
    'Norvasc 5mg',
    'Glucophage 500mg'
  ];

  return (
    <div className="min-h-screen bg-bg-warm flex flex-col font-sans text-dark-navy">
      {/* Sticky header navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 md:py-16 flex flex-col items-center justify-center">
        
        {/* Hero Section Container */}
        <div className="w-full max-w-2xl text-center space-y-6 mb-12">
          {/* NAFDAC badge/subtext indicator */}
          <div className="inline-flex items-center gap-1.5 bg-success-bg text-primary-dark px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>NAFDAC Approved Alternatives</span>
          </div>

          {/* Headline - Uses display font-serif (Fraunces) and primary-dark (Dark Green) */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark leading-tight tracking-tight">
            Find affordable, NAFDAC-approved generic alternatives.
          </h1>

          {/* Subtext */}
          <p className="text-text-sec text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Instantly search expensive branded drugs in Nigeria and discover high-quality generics containing the exact same active ingredients, at a fraction of the price.
          </p>
        </div>

        {/* Search Bar Block */}
        <div className="w-full max-w-2xl bg-white p-2.5 rounded-2xl shadow-md border border-border-dev hover:border-primary-dark transition-colors mb-12">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow flex items-center">
              {/* Search Icon */}
              <Search className="absolute left-4 text-text-mut w-5 h-5 pointer-events-none" />
              
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                placeholder="Search a drug (e.g., Augmentin, Lonart)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-transparent focus:border-primary-dark focus:ring-0 outline-none text-dark-navy text-base"
              />
            </div>
            
            {/* Search Action Button - Using bg-primary-dark and hover bg-primary-mid */}
            <button
              onClick={() => handleSearchSubmit()}
              className="bg-primary-dark hover:bg-primary-mid text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              Search
            </button>
          </div>
        </div>

        {/* Quick Categories Section */}
        <div className="w-full max-w-2xl space-y-4 mb-10">
          <h3 className="text-sm font-semibold tracking-wider text-text-sec uppercase text-center sm:text-left">
            Browse by Category
          </h3>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate(`/results?category=${encodeURIComponent(cat.query)}`)}
                className="border border-border-dev hover:border-primary-dark hover:text-primary-dark bg-white text-sm text-text-sec px-4 py-2.5 rounded-xl transition-all cursor-pointer font-medium"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Searches / Clickable Templates */}
        <div className="w-full max-w-2xl space-y-4">
          <h3 className="text-sm font-semibold tracking-wider text-text-sec uppercase text-center sm:text-left">
            Popular Searches
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularSearches.map((drug) => (
              <button
                key={drug}
                onClick={() => navigate(`/results?q=${encodeURIComponent(drug)}`)}
                className="flex items-center justify-between text-left p-4 bg-white rounded-xl border border-border-dev hover:border-primary-dark hover:shadow-sm transition-all group group-hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-success-bg text-primary-dark p-2 rounded-lg">
                    <Pill className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm text-dark-navy">{drug}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-text-mut group-hover:text-primary-dark transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Nigerian Reality Card */}
        <div className="w-full max-w-2xl mt-16 p-5 bg-savings-bg rounded-xl border border-savings-amber flex items-start gap-4">
          <HelpCircle className="w-6 h-6 text-savings-amber shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-primary-dark font-serif text-base">
              Why use MediSwitch?
            </h4>
            <p className="text-xs md:text-sm text-text-sec leading-relaxed">
              Due to naira fluctuations and multinational exits, patented branded medicine prices have surged <strong className="text-danger">200% to 400%</strong> in Nigeria. Switching to NAFDAC-certified generics with identical active ingredients helps you save up to <strong className="text-primary-dark">80%</strong> with zero compromise on therapeutic safety.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
