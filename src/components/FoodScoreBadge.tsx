import React from 'react';
import { FoodScoreBreakdown } from '../types/food';

interface FoodScoreBadgeProps {
  score: FoodScoreBreakdown;
  size?: 'sm' | 'md' | 'lg';
  showSummary?: boolean;
  onClick?: () => void;
}

export const FoodScoreBadge: React.FC<FoodScoreBadgeProps> = ({
  score,
  size = 'md',
  showSummary = false,
  onClick
}) => {
  const getColors = () => {
    switch (score.grade) {
      case 'A':
        return {
          bg: 'bg-emerald-500',
          text: 'text-white',
          badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
          badgeBorder: 'border-emerald-200 dark:border-emerald-800',
          textColor: 'text-emerald-700 dark:text-emerald-300'
        };
      case 'B':
        return {
          bg: 'bg-teal-500',
          text: 'text-white',
          badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
          badgeBorder: 'border-teal-200 dark:border-teal-800',
          textColor: 'text-teal-700 dark:text-teal-300'
        };
      case 'C':
        return {
          bg: 'bg-amber-500',
          text: 'text-slate-900',
          badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
          badgeBorder: 'border-amber-200 dark:border-amber-800',
          textColor: 'text-amber-800 dark:text-amber-300'
        };
      case 'D':
        return {
          bg: 'bg-orange-500',
          text: 'text-white',
          badgeBg: 'bg-orange-50 dark:bg-orange-950/40',
          badgeBorder: 'border-orange-200 dark:border-orange-800',
          textColor: 'text-orange-800 dark:text-orange-300'
        };
      case 'E':
        return {
          bg: 'bg-rose-500',
          text: 'text-white',
          badgeBg: 'bg-rose-50 dark:bg-rose-950/40',
          badgeBorder: 'border-rose-200 dark:border-rose-800',
          textColor: 'text-rose-800 dark:text-rose-300'
        };
    }
  };

  const colors = getColors();

  if (size === 'sm') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${colors.badgeBorder} ${colors.badgeBg} ${onClick ? 'cursor-pointer hover:opacity-90' : ''}`}
      >
        <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs ${colors.bg} ${colors.text}`}>
          {score.grade}
        </span>
        <span className={`text-xs font-semibold ${colors.textColor}`}>
          {score.overallScore}/100
        </span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div 
        onClick={onClick}
        className={`flex items-center gap-3 p-3 rounded-2xl border ${colors.badgeBorder} ${colors.badgeBg} ${onClick ? 'cursor-pointer hover:shadow-sm transition-all' : ''}`}
      >
        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-extrabold shadow-sm ${colors.bg} ${colors.text}`}>
          <span className="text-xl leading-none">{score.grade}</span>
          <span className="text-[10px] opacity-90">{score.overallScore}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${colors.textColor}`}>
              FoodScore: {score.overallScore} / 100
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate">
            {score.summaryLabel}
          </p>
        </div>
      </div>
    );
  }

  // Medium (standard)
  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border ${colors.badgeBorder} ${colors.badgeBg} ${onClick ? 'cursor-pointer hover:opacity-90' : ''}`}
    >
      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-sm ${colors.bg} ${colors.text}`}>
        {score.grade}
      </span>
      <div className="text-left">
        <span className={`text-xs font-bold ${colors.textColor}`}>
          {score.overallScore} <span className="text-[10px] font-normal opacity-75">/100</span>
        </span>
        {showSummary && (
          <span className="block text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 truncate max-w-[120px]">
            {score.summaryLabel}
          </span>
        )}
      </div>
    </div>
  );
};
