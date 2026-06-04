import React, { useState } from 'react';
import { Calculator, TrendingDown } from 'lucide-react';

export default function SavingsBadge({ genericPrice, brandedPrice }) {
  // This state tracks the slider value (1 to 12 months)
  const [months, setMonths] = useState(1);

  // Safe math fallback just in case data is missing
  const safeGeneric = Number(genericPrice) || 0;
  const safeBranded = Number(brandedPrice) || 0;

  const monthlySavings = safeBranded - safeGeneric;
  const totalSavings = monthlySavings * months;
  const savingsPercent = safeBranded > 0 ? Math.round((monthlySavings / safeBranded) * 100) : 0;

  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white border border-border-dev rounded-2xl p-5 shadow-sm mt-4 w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 border-b border-border-dev pb-3">
        <Calculator className="w-4 h-4 text-primary-mid" />
        <h4 className="text-primary-dark font-bold text-xs uppercase tracking-wider">
          Interactive Savings Calculator
        </h4>
      </div>

      <div className="space-y-6">
        {/* Slider Control Section */}
        <div>
          <div className="flex justify-between items-end mb-3">
            <label className="text-sm font-semibold text-dark-navy">
              Select Supply Duration
            </label>
            <span className="text-primary-dark font-bold bg-primary-pale px-3 py-1 rounded-lg text-xs border border-primary-light/30">
              {months} Month{months > 1 ? 's' : ''}
            </span>
          </div>
          
          <input
            type="range"
            min="1"
            max="12"
            step="1"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-mid"
          />
          <div className="flex justify-between text-[10px] text-text-mut font-bold mt-2 uppercase tracking-wider">
            <span>1 Month</span>
            <span>6 Months</span>
            <span>1 Year</span>
          </div>
        </div>

        {/* Results Dashboard */}
        <div className="bg-savings-bg/50 border border-savings-amber/40 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-dark-navy font-medium">
              You save <strong className="text-primary-dark">{savingsPercent}%</strong> compared to branded.
            </p>
            <p className="text-xs text-text-sec mt-1 font-mono">
              ({formatNaira(monthlySavings)} monthly savings)
            </p>
          </div>
          
          <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
            <span className="text-[10px] text-danger font-bold uppercase tracking-widest flex items-center gap-1.5 bg-red-50 px-2 py-0.5 rounded-full">
              <TrendingDown className="w-3.5 h-3.5" /> Total Saved
            </span>
            <span className="text-3xl md:text-4xl font-extrabold font-serif text-danger leading-none mt-2">
              {formatNaira(totalSavings)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}