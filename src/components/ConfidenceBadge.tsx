import React from 'react';
import { ConfidenceTier } from '../types/food';
import { ShieldCheck, Users, HelpCircle } from 'lucide-react';

interface ConfidenceBadgeProps {
  confidence: ConfidenceTier;
  size?: 'sm' | 'md';
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence, size = 'md' }) => {
  const isSm = size === 'sm';
  const iconSize = isSm ? 12 : 14;

  switch (confidence) {
    case 'verified':
      return (
        <span 
          className={`inline-flex items-center gap-1 rounded-full font-medium ${
            isSm ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
          } bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800`}
          title="Verified against laboratory / IFCT-ICMR / FSSAI verified data"
        >
          <ShieldCheck size={iconSize} className="text-emerald-600 dark:text-emerald-400" />
          <span>Verified</span>
        </span>
      );
    case 'community':
      return (
        <span 
          className={`inline-flex items-center gap-1 rounded-full font-medium ${
            isSm ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
          } bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800`}
          title="Crowdsourced submission verified by community consensus"
        >
          <Users size={iconSize} className="text-sky-600 dark:text-sky-400" />
          <span>Community</span>
        </span>
      );
    case 'estimated':
      return (
        <span 
          className={`inline-flex items-center gap-1 rounded-full font-medium ${
            isSm ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
          } bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800`}
          title="Estimated standard recipe calculation (expect a ±15% variance based on restaurant oil/portion)"
        >
          <HelpCircle size={iconSize} className="text-amber-600 dark:text-amber-400" />
          <span>Estimated (Range ±15%)</span>
        </span>
      );
  }
};
