import React from 'react';
import { ServingPortion } from '../types/food';
import { Utensils } from 'lucide-react';

interface PortionSelectorProps {
  portions: ServingPortion[];
  selectedPortion: ServingPortion;
  isPer100g: boolean;
  onSelectPortion: (portion: ServingPortion) => void;
  onTogglePer100g: (per100g: boolean) => void;
}

export const PortionSelector: React.FC<PortionSelectorProps> = ({
  portions,
  selectedPortion,
  isPer100g,
  onSelectPortion,
  onTogglePer100g,
}) => {
  return (
    <div className="bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
      <div className="flex items-center justify-between mb-1.5 px-2 pt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
        <span className="inline-flex items-center gap-1.5">
          <Utensils size={13} className="text-brand-600 dark:text-brand-400" />
          <span>Serving View</span>
        </span>
        <span>
          {isPer100g ? 'Standard Reference (100g)' : `Actual Home Portion (${selectedPortion.weightGrams}g)`}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 mb-2">
        <button
          type="button"
          onClick={() => onTogglePer100g(false)}
          className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center text-center ${
            !isPer100g
              ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Home Serving</span>
          <span className="text-[10px] font-normal opacity-75">{selectedPortion.name}</span>
        </button>

        <button
          type="button"
          onClick={() => onTogglePer100g(true)}
          className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center text-center ${
            isPer100g
              ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>Per 100 g</span>
          <span className="text-[10px] font-normal opacity-75">FSSAI / Scientific Base</span>
        </button>
      </div>

      {!isPer100g && portions.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 px-1">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0 mr-1">Portion:</span>
          {portions.map((p, idx) => {
            const isSelected = selectedPortion.name === p.name;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPortion(p)}
                className={`text-xs px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white/80 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
