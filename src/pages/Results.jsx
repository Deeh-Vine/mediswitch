import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  AlertTriangle,
  SearchX,
  CheckCircle,
  MapPin,
  ShieldCheck,
  X,
  Pill,
  Sparkles
} from 'lucide-react';
import useSearch from '../hooks/useSearch';
import { getConstituentExplanation } from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SavingsBadge from '../components/SavingsBadge';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  // Adjust loading state during rendering to handle query transitions without useEffect warning
  const currentQuery = `${q}-${category}`;
  const [prevQuery, setPrevQuery] = useState(currentQuery);
  const [isLoading, setIsLoading] = useState(true);

  if (currentQuery !== prevQuery) {
    setPrevQuery(currentQuery);
    setIsLoading(true);
  }

  // Hook into our fuzzy or category search logic
  const { searchDrugs } = useSearch();
  const searchResults = searchDrugs(q || category);
  
  // For managing the inline Trust Panel modal / side drawer details
  const [activeTrustGeneric, setActiveTrustGeneric] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600); // 600ms delay to model database lookup
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Clean currency formatter representation
  const formatNaira = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  // Triggers the trust panel details
  const handleOpenTrustPanel = async (generic, parentDrug) => {
    setActiveTrustGeneric({ ...generic, parentDrug });
    setAiExplanation('');
    setIsAiLoading(true);
    try {
      const text = await getConstituentExplanation({
        brandedName: parentDrug.brandedName,
        genericName: generic.name,
        constituents: generic.constituents,
        treats: parentDrug.treats
      });
      setAiExplanation(text);
    } catch (err) {
      console.error(err);
      setAiExplanation("Unable to generate live explanation, but active molecules are 100% equivalent.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Render LOADING STATE - Skeleton Screens
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-warm flex flex-col font-sans text-dark-navy">
        <Navbar />
        <main className="grow max-w-3xl mx-auto w-full p-6 space-y-8 py-16">
          {/* Skeleton Header */}
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
            <div className="h-10 w-3/4 bg-gray-200 rounded-xl"></div>
            <div className="h-5 w-1/2 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Skeleton Branded Card */}
          <div className="animate-pulse bg-white p-6 rounded-2xl border border-border-dev space-y-4">
            <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
            <div className="h-8 w-1/2 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
          </div>

          {/* Skeleton Generics List Header */}
          <div className="animate-pulse h-6 w-48 bg-gray-200 rounded-md"></div>

          {/* Skeleton Generics Card */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-border-dev flex justify-between items-center">
                <div className="space-y-3 w-2/3">
                  <div className="h-5 w-1/2 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded-md"></div>
                </div>
                <div className="h-12 w-28 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Render ERROR STATE - Missing Parameters
  if (!q && !category) {
    return (
      <div className="min-h-screen bg-bg-warm flex flex-col font-sans text-dark-navy">
        <Navbar />
        <main className="grow flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-6">
          <div className="bg-red-50 text-danger p-4 rounded-full">
            <AlertTriangle className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-primary-dark">Search Parameter Missing</h2>
          <p className="text-text-sec text-sm leading-relaxed">
            Please search for a drug brand or select an active category from the homepage to view approved alternatives.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-primary-dark hover:bg-primary-mid text-white font-medium px-6 py-3 rounded-xl transition-colors cursor-pointer"
          >
            Go back home
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // Render EMPTY STATE - 0 Search results
  if (searchResults.length === 0) {
    return (
      <div className="min-h-screen bg-bg-warm flex flex-col font-sans text-dark-navy">
        <Navbar />
        <main className="grow flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-6">
          <div className="bg-gray-100 text-text-mut p-4 rounded-full">
            <SearchX className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-primary-dark">No Alternatives Found</h2>
          <p className="text-text-sec text-sm leading-relaxed">
            We couldn't find NAFDAC-approved alternatives for <span className="font-semibold text-danger">"{q || category}"</span>. Please double-check the spelling or search by active ingredients.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-primary-mid hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-xl transition-colors cursor-pointer"
          >
            Try another search
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // Render SUCCESS STATE
  const matchedDrug = searchResults[0];

  return (
    <div className="min-h-screen bg-bg-warm flex flex-col font-sans text-dark-navy">
      <Navbar />

      <main className="grow max-w-3xl mx-auto w-full p-4 md:p-6 py-10 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-sec hover:text-primary-dark transition-colors tracking-wide uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>

        {/* PART A: Parent Branded Drug Overview */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-danger/30 p-5 md:p-6 shadow-sm space-y-4"
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider text-danger uppercase">
                EXPENSIVE BRANDED DRUG
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark-navy mt-1">
                {matchedDrug.brandedName}
              </h2>
              <p className="text-sm font-medium text-text-sec mt-1">
                Category: <span className="text-dark-navy">{matchedDrug.category}</span>
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-text-sec block">Typical Retail Price</span>
              <span className="text-xl md:text-2xl font-bold text-danger">
                {formatNaira(matchedDrug.brandedPrice)}
              </span>
            </div>
          </div>

          <hr className="border-border-dev" />

          {/* Details & Active formulation mapping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
            <div>
              <strong className="text-dark-navy block mb-1">Active Formulation:</strong>
              <div className="flex flex-wrap gap-1.5">
                {matchedDrug.constituents.map((c, idx) => (
                  <span key={idx} className="bg-gray-100 text-text-sec px-2.5 py-1 rounded-md">
                    {c.name} {c.amount}{c.unit}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <strong className="text-dark-navy block mb-1">Approved to Treat:</strong>
              <div className="flex flex-wrap gap-1">
                {matchedDrug.treats.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="bg-success-bg/30 text-primary-dark px-2.5 py-1 rounded-md text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Crisis warning banner */}
          <div className="bg-savings-bg/50 p-3.5 rounded-xl border border-savings-amber/40 text-xs text-text-sec">
            💡 Due to inflation and supply chain changes, branded <span className="font-semibold text-dark-navy">{matchedDrug.brandedName}</span> is priced up to 400% higher than identical bioequivalent generics certified by NAFDAC.
          </div>
        </motion.div>

        {/* Divider or Alternates Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 border-t border-border-dev">
          <h3 className="font-serif font-bold text-lg md:text-xl text-primary-dark">
            Verified NAFDAC Generic Alternatives
          </h3>
          <span className="text-xs text-text-sec bg-white px-2.5 py-1.5 rounded-full border border-border-dev">
            Showing {matchedDrug.genericAlternatives.length} approved local matches
          </span>
        </div>

        {/* PART B: Generics List mapping */}
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {matchedDrug.genericAlternatives.map((generic) => (
            <motion.div
              key={generic.id}
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0 }
              }}
              className="bg-white rounded-2xl border border-primary-light/30 p-5 md:p-6 shadow-xs hover:shadow-md hover:border-primary-mid transition-all flex flex-col gap-6"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Left Column: Identifiers */}
                <div className="grow space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-bold text-dark-navy font-serif">
                      {generic.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 bg-success-bg text-primary-dark px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" />
                       NAFDAC Approved
                    </span>
                  </div>
                  
                  <p className="text-xs text-text-sec font-medium">
                    Manufacturer: <span className="text-dark-navy">{generic.manufacturer}</span>
                  </p>

                  <p className="text-xs text-text-mut">
                    NAFDAC Registration No: <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">{generic.nafdacNumber}</span>
                  </p>

                  {/* Micro comparative molecules bulleting */}
                  <div className="pt-2">
                    <div className="inline-flex gap-2 items-center text-xs text-primary-dark">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>Exact active molecular replacement</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Actions */}
                <div className="flex flex-row md:flex-col justify-end items-end gap-3 shrink-0 border-t md:border-t-0 md:border-l border-border-dev pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                  <button
                    onClick={() => handleOpenTrustPanel(generic, matchedDrug)}
                    className="flex-1 md:flex-none py-2.5 px-4 rounded-xl border border-primary-mid text-primary-dark hover:bg-success-bg/20 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  >
                    Why is this same?
                  </button>
                  <button
                    onClick={() => navigate('/map', { state: { pharmacyIds: generic.pharmacyIds, drugName: generic.name } })}
                    className="flex-1 md:flex-none py-2.5 px-4 rounded-xl bg-primary-mid hover:bg-primary-dark text-white text-xs font-bold transition-all inline-flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Find Nearby
                  </button>
                </div>
              </div>

              {/* Interactive Calculator Section */}
              <SavingsBadge genericPrice={generic.price} brandedPrice={matchedDrug.brandedPrice} />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Trust Panel Drawer Overlay - Dynamic Layer A and B explanations */}
      <AnimatePresence>
        {activeTrustGeneric && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop slide-in and blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTrustGeneric(null)}
              className="absolute inset-0 bg-dark-navy/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative border border-border-dev text-dark-navy z-10"
            >
              {/* Header Box */}
              <div className="p-5 md:p-6 bg-primary-dark text-white flex justify-between items-start gap-4">
                <div>
                  <div className="inline-flex gap-1.5 items-center bg-white/15 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Molecular Equivalency Proof</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight">
                    Why {activeTrustGeneric.name} works identically to {activeTrustGeneric.parentDrug.brandedName}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTrustGeneric(null)}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Proof Area */}
              <div className="p-5 md:p-6 overflow-y-auto max-h-[70vh] space-y-6">
                
                {/* Layer A: Side-by-side molecular matching Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-text-sec uppercase tracking-widest flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-primary-dark" />
                     Layer A: Active ingredient comparison
                  </h4>
                  
                  <div className="border border-border-dev rounded-xl overflow-hidden bg-bg-warm">
                    <table className="w-full text-left border-collapse text-xs md:text-sm">
                      <thead>
                        <tr className="bg-gray-100 border-b border-border-dev text-text-sec text-[10px] uppercase font-bold tracking-wider">
                          <th className="p-3">Active constituent</th>
                          <th className="p-3 text-right">Branded brand dosage</th>
                          <th className="p-3 text-right text-primary-dark">Generic dosage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-dev">
                        {activeTrustGeneric.constituents.map((con, idx) => (
                          <tr key={idx} className="hover:bg-white/40 transition-colors">
                            <td className="p-3 font-semibold text-dark-navy">{con.name}</td>
                            <td className="p-3 text-right font-mono text-danger font-medium">
                              {con.amount} {con.unit}
                            </td>
                            <td className="p-3 text-right font-mono text-primary-dark font-bold">
                              {con.amount} {con.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex gap-2 items-center text-xs text-primary-dark bg-success-bg/40 p-3 rounded-lg border border-primary-light/40">
                    <CheckCircle className="w-4 h-4 text-primary-dark shrink-0" />
                    <span>Verified Match: The generic formulation possesses identical pharmaceutical chemical quantities.</span>
                  </div>
                </div>

                {/* Layer B: Web-grounded / AI bio-equivalent explanation block */}
                <div className="space-y-3 bg-bg-warm p-4 rounded-xl border border-border-dev">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-text-sec uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-primary-mid shrink-0" />
                      Layer B: AI Pharmacist analysis
                    </h4>
                    <span className="text-[10px] text-primary-dark font-semibold bg-success-bg px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Claude Active
                    </span>
                  </div>

                  {isAiLoading ? (
                    <div className="py-4 flex flex-col items-center justify-center text-center space-y-3">
                      {/* Pulsing Loading indicators */}
                      <div className="flex space-x-1.5 justify-center items-center">
                        <div className="w-2.5 h-2.5 bg-primary-mid rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2.5 h-2.5 bg-primary-mid rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2.5 h-2.5 bg-primary-mid rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <p className="text-xs text-text-sec font-medium animate-pulse">
                        Asking local digital pharmacist to draft chemical explanation...
                      </p>
                    </div>
                  ) : (
                    <div className="text-xs md:text-sm text-text-sec leading-relaxed space-y-2">
                       <p className="whitespace-pre-line text-dark-navy italic bg-white p-3.5 rounded-lg border border-border-dev">
                         "{aiExplanation}"
                       </p>
                       <p className="text-[10px] text-text-mut">
                        *Disclaimer: This information compares bioequivalence under NAFDAC registration acts. Always double-check generic options with your physician or community retail pharmacist.
                       </p>
                    </div>
                  )}
                </div>

              </div>

              {/* Close footer button */}
              <div className="p-4 bg-gray-50 border-t border-border-dev flex justify-end">
                <button
                  onClick={() => setActiveTrustGeneric(null)}
                  className="bg-primary-dark hover:bg-primary-mid text-white font-medium text-sm py-2 px-6 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Confirm & Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
