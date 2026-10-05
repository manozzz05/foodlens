import React from 'react';
import { FoodItem } from '../types/food';
import { UserProfile } from '../types/profile';
import { evaluateLens } from '../engine/lensEvaluator';
import { FoodScoreBadge } from './FoodScoreBadge';
import { ConfidenceBadge } from './ConfidenceBadge';
import { DietDot } from './DietDot';
import { ArrowRight, PlusCircle, CheckCircle2 } from 'lucide-react';

interface FoodCardProps {
  food: FoodItem;
  activeProfile?: UserProfile;
  onClick: () => void;
  onCompareToggle?: (e: React.MouseEvent) => void;
  isSelectedForCompare?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  activeProfile,
  onClick,
  onCompareToggle,
  isSelectedForCompare = false,
}) => {
  const lens = activeProfile ? evaluateLens(food, activeProfile) : null;
  const defaultServing = food.servingPortions[0];

  const getLensBadgeStyle = () => {
    if (!lens) return null;
    switch (lens.fitStatus) {
      case 'ideal':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
      case 'moderate':
        return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      case 'caution':
        return 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800';
      case 'incompatible':
        return 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 font-semibold';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <DietDot flags={food.dietFlags} />
            <ConfidenceBadge confidence={food.confidence} size="sm" />
            {food.brand && (
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {food.brand}
              </span>
            )}
          </div>

          <FoodScoreBadge score={food.foodScore} size="sm" />
        </div>

        {/* Title and Hindi Name */}
        <div className="mb-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
            {food.name}
          </h3>
          {food.hindiName && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
              {food.hindiName}
            </p>
          )}
        </div>

        {/* Instant Verdict Headline */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3 leading-relaxed">
          {food.verdictHeadline}
        </p>

        {/* Active Profile Lens Verdict Callout */}
        {lens && (
          <div className={`mb-3 px-2.5 py-1.5 rounded-xl border text-[11px] flex items-center justify-between ${getLensBadgeStyle()}`}>
            <span className="truncate pr-2 font-medium">
              {lens.fitBadgeText}
            </span>
            <span className="text-[10px] shrink-0 uppercase tracking-wider font-bold">
              {lens.fitStatus === 'incompatible' ? 'Avoid' : lens.fitStatus}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Macros & Actions */}
      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
        <div className="grid grid-cols-4 gap-1 text-center py-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-[11px] text-slate-600 dark:text-slate-400 mb-2.5">
          <div>
            <span className="block font-bold text-slate-900 dark:text-white">
              {Math.round(food.nutritionPer100g.calories * (defaultServing.weightGrams / 100))}
            </span>
            <span className="text-[10px] text-slate-400">kcal</span>
          </div>
          <div>
            <span className="block font-bold text-slate-900 dark:text-white">
              {Math.round(food.nutritionPer100g.protein * (defaultServing.weightGrams / 100) * 10) / 10}g
            </span>
            <span className="text-[10px] text-slate-400">protein</span>
          </div>
          <div>
            <span className="block font-bold text-slate-900 dark:text-white">
              {Math.round(food.nutritionPer100g.totalSugar * (defaultServing.weightGrams / 100) * 10) / 10}g
            </span>
            <span className="text-[10px] text-slate-400">sugar</span>
          </div>
          <div>
            <span className="block font-bold text-slate-900 dark:text-white">
              {Math.round(food.nutritionPer100g.sodium * (defaultServing.weightGrams / 100))}mg
            </span>
            <span className="text-[10px] text-slate-400">sodium</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-medium text-brand-600 dark:text-brand-400">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Per {defaultServing.name}
          </span>

          <div className="flex items-center gap-2">
            {onCompareToggle && (
              <button
                type="button"
                onClick={onCompareToggle}
                className={`p-1 rounded-lg transition-colors flex items-center gap-1 text-[11px] ${
                  isSelectedForCompare
                    ? 'text-brand-700 bg-brand-50 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                    : 'text-slate-500 hover:text-brand-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={isSelectedForCompare ? 'Selected for comparison' : 'Add to compare'}
              >
                {isSelectedForCompare ? (
                  <>
                    <CheckCircle2 size={13} className="text-brand-600" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <PlusCircle size={13} />
                    <span>Compare</span>
                  </>
                )}
              </button>
            )}

            <span className="inline-flex items-center gap-0.5 text-xs text-brand-600 dark:text-brand-400 font-semibold group-hover:translate-x-0.5 transition-transform">
              <span>View</span>
              <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
