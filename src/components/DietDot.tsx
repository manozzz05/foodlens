import React from 'react';
import { DietFlag } from '../types/food';

interface DietDotProps {
  flags: DietFlag[];
  showText?: boolean;
  className?: string;
}

export const DietDot: React.FC<DietDotProps> = ({ flags, showText = false, className = '' }) => {
  const isJain = flags.includes('jain');
  const isVeg = flags.includes('vegetarian');
  const isVegan = flags.includes('vegan');

  if (isJain) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <span 
          className="w-4 h-4 rounded-sm border border-amber-600 flex items-center justify-center bg-amber-50 dark:bg-amber-950/40 p-0.5"
          title="Certified Jain Friendly"
        >
          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
        </span>
        {showText && <span className="text-xs font-medium text-amber-700 dark:text-amber-400">Jain</span>}
      </div>
    );
  }

  if (isVegan) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <span 
          className="w-4 h-4 rounded-sm border border-emerald-600 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 p-0.5"
          title="100% Vegan"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
        </span>
        {showText && <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Vegan</span>}
      </div>
    );
  }

  if (isVeg) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <span 
          className="w-4 h-4 rounded-sm border border-emerald-600 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 p-0.5"
          title="Vegetarian (Green Dot FSSAI)"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
        </span>
        {showText && <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Pure Veg</span>}
      </div>
    );
  }

  // Non-Veg
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <span 
        className="w-4 h-4 rounded-sm border border-amber-800 flex items-center justify-center bg-amber-50 dark:bg-amber-950/40 p-0.5"
        title="Non-Vegetarian (Brown Symbol FSSAI)"
      >
        <span className="w-2 h-2 rounded-full bg-amber-900 dark:bg-amber-700"></span>
      </span>
      {showText && <span className="text-xs font-medium text-amber-900 dark:text-amber-400">Non-Veg</span>}
    </div>
  );
};
