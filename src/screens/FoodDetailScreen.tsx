import React, { useState } from 'react';
import { FoodItem, ServingPortion } from '../types/food';
import { UserProfile } from '../types/profile';
import { evaluateLens } from '../engine/lensEvaluator';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { DietDot } from '../components/DietDot';
import { FoodScoreBadge } from '../components/FoodScoreBadge';
import { PortionSelector } from '../components/PortionSelector';
import { 
  ArrowLeft, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Scale, 
  Share2, 
  ArrowRight, 
  Check, 
  Sparkles, 
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FoodDetailScreenProps {
  food: FoodItem;
  activeProfile: UserProfile;
  onBack: () => void;
  onSelectAlternative: (foodId: string) => void;
  onToggleCompare: (foodId: string) => void;
  isQueuedForCompare: boolean;
  onOpenProfileSwitcher: () => void;
}

export const FoodDetailScreen: React.FC<FoodDetailScreenProps> = ({
  food,
  activeProfile,
  onBack,
  onSelectAlternative,
  onToggleCompare,
  isQueuedForCompare,
  onOpenProfileSwitcher,
}) => {
  const [selectedPortion, setSelectedPortion] = useState<ServingPortion>(
    food.servingPortions[0] || { name: '100g', weightGrams: 100, unitLabel: 'g' }
  );
  const [isPer100g, setIsPer100g] = useState(false);
  const [showScoreFactors, setShowScoreFactors] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Compute active multiplier
  const multiplier = isPer100g ? 1 : selectedPortion.weightGrams / 100;
  const currentServingName = isPer100g ? '100g' : selectedPortion.name;

  // Active Profile evaluation
  const lens = evaluateLens(food, activeProfile, isPer100g ? undefined : selectedPortion);

  // Scaled nutrition figures
  const cal = Math.round(food.nutritionPer100g.calories * multiplier);
  const protein = Math.round(food.nutritionPer100g.protein * multiplier * 10) / 10;
  const carbs = Math.round(food.nutritionPer100g.carbohydrates * multiplier * 10) / 10;
  const totalSugar = Math.round(food.nutritionPer100g.totalSugar * multiplier * 10) / 10;
  const addedSugar = Math.round(food.nutritionPer100g.addedSugar * multiplier * 10) / 10;
  const fiber = Math.round(food.nutritionPer100g.dietaryFiber * multiplier * 10) / 10;
  const totalFat = Math.round(food.nutritionPer100g.totalFat * multiplier * 10) / 10;
  const satFat = Math.round(food.nutritionPer100g.saturatedFat * multiplier * 10) / 10;
  const sodium = Math.round(food.nutritionPer100g.sodium * multiplier);

  // Indian Daily Values reference (based on 2000 kcal standard Indian RDA)
  const dvProtein = Math.min(100, Math.round((protein / 60) * 100));
  const dvCarbs = Math.min(100, Math.round((carbs / 260) * 100));
  const dvSugar = Math.min(100, Math.round((totalSugar / 50) * 100));
  const dvAddedSugar = Math.min(100, Math.round((addedSugar / 25) * 100)); // WHO recommendation: max 25g added sugar
  const dvFiber = Math.min(100, Math.round((fiber / 30) * 100));
  const dvFat = Math.min(100, Math.round((totalFat / 65) * 100));
  const dvSatFat = Math.min(100, Math.round((satFat / 20) * 100));
  const dvSodium = Math.min(100, Math.round((sodium / 2000) * 100));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${food.name} on FoodLens`,
        text: `FoodScore: ${food.foodScore.overallScore}/100. Verdict: "${food.verdictHeadline}"`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-3xl mx-auto space-y-6">
      {/* Top Bar with Back, Compare, Share */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 p-2 -ml-2 rounded-xl transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Explore</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleCompare(food.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isQueuedForCompare
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-300 dark:border-brand-700'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <Scale size={14} className={isQueuedForCompare ? 'text-brand-600' : ''} />
            <span>{isQueuedForCompare ? 'In Compare' : 'Add to Compare'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
            title="Share Verdict"
          >
            {copiedShare ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
          </button>
        </div>
      </div>

      {/* Hero Food Header */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <DietDot flags={food.dietFlags} showText />
          <ConfidenceBadge confidence={food.confidence} />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
            {food.category.replace('_', ' ')}
          </span>
          {food.brand && (
            <span className="text-xs font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/50 px-2.5 py-0.5 rounded-full border border-brand-200 dark:border-brand-800">
              {food.brand}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {food.name}
        </h1>
        {food.hindiName && (
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            {food.hindiName}
          </p>
        )}
      </div>

      {/* 1. Large Verdict Card First */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Instant Verdict
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              "{food.verdictHeadline}"
            </h2>
          </div>

          <FoodScoreBadge
            score={food.foodScore}
            size="lg"
            onClick={() => setShowScoreFactors(!showScoreFactors)}
          />
        </div>

        {/* Personalized "Your Lens" Active Evaluation Card */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center shrink-0"
                style={{ backgroundColor: activeProfile.avatarColor }}
              >
                {activeProfile.name.charAt(0)}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {lens.fitBadgeText}
              </span>
            </div>
            <button
              onClick={onOpenProfileSwitcher}
              className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold hover:underline"
            >
              Switch Lens
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
            {lens.personalizedHeadline}
          </p>

          {/* Warnings List */}
          {lens.warnings.length > 0 && (
            <div className="space-y-1.5 mt-2">
              {lens.warnings.map((w, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                    w.level === 'critical'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/60 font-medium'
                      : w.level === 'caution'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700'
                  }`}
                >
                  {w.level === 'critical' ? (
                    <ShieldAlert size={15} className="text-rose-600 shrink-0 mt-0.5" />
                  ) : w.level === 'caution' ? (
                    <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <Info size={15} className="text-slate-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold block">{w.title}</span>
                    <span className="text-[11px] opacity-90">{w.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Positive Lens Alignment Reasons */}
          {lens.reasons.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
              {lens.reasons.map((r, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 rounded-md font-medium"
                >
                  <CheckCircle2 size={12} className="text-emerald-600" />
                  <span>{r}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. Transparent FoodScore 4-Pillars Breakdown Card */}
      <section className="bg-slate-50 dark:bg-slate-900/80 rounded-3xl p-5 border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setShowScoreFactors(!showScoreFactors)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-brand-600 dark:text-brand-400" />
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              Why this FoodScore? (Full Transparency)
            </h3>
          </div>
          <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-0.5">
            <span>{showScoreFactors ? 'Hide Breakdown' : 'Show 4 Pillars'}</span>
            {showScoreFactors ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        {showScoreFactors && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-200">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              FoodScore is calculated mathematically using standard verified nutrient ratios and the NOVA food processing index. No hidden formulas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {food.foodScore.factors.map((factor, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-700 shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {factor.label}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        factor.points > 0
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : factor.points < 0
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {factor.points > 0 ? `+${factor.points}` : factor.points} pts
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    {factor.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3 bg-brand-50/70 dark:bg-brand-950/30 rounded-xl border border-brand-200/60 dark:border-brand-900/40 text-[11px] text-brand-900 dark:text-brand-200 flex items-center justify-between">
              <span>Baseline Base + Factor Weights = <strong>{food.foodScore.overallScore} / 100 (Grade {food.foodScore.grade})</strong></span>
              <a href="#methodology" className="font-bold underline">Methodology</a>
            </div>
          </div>
        )}
      </section>

      {/* 3. Indian Portion Switcher & Detailed Nutrition Grid */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
          Nutritional Intelligence
        </h3>

        {/* Portion Switcher */}
        <PortionSelector
          portions={food.servingPortions}
          selectedPortion={selectedPortion}
          isPer100g={isPer100g}
          onSelectPortion={setSelectedPortion}
          onTogglePer100g={setIsPer100g}
        />

        {/* Key Macros Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Calories</span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{cal} <span className="text-xs font-normal text-slate-500">kcal</span></div>
            <div className="mt-1.5 h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.min(100, (cal / 2000) * 100)}%` }} />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">~{Math.round((cal / 2000) * 100)}% of 2000 kcal</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Protein</span>
            <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{protein} <span className="text-xs font-normal text-slate-500">g</span></div>
            <div className="mt-1.5 h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${dvProtein}%` }} />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">{dvProtein}% Daily Target</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Carbs & Fiber</span>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{carbs} <span className="text-xs font-normal text-slate-500">g</span></div>
            <span className="text-[11px] font-medium text-brand-700 dark:text-brand-300 block mt-1">
              Fiber: <strong>{fiber}g</strong> ({dvFiber}% DV)
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Added Sugar</span>
            <div className={`text-xl font-extrabold mt-0.5 ${addedSugar > 8 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
              {addedSugar} <span className="text-xs font-normal text-slate-500">g</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${addedSugar > 10 ? 'bg-rose-500' : 'bg-amber-500'}`} style={{ width: `${dvAddedSugar}%` }} />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">{dvAddedSugar}% of 25g limit</span>
          </div>
        </div>

        {/* Detailed Breakdown Row (Fats, Sodium, Micronutrients) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-600 dark:text-slate-400">Total Fat:</span>
            <span className="font-bold text-slate-900 dark:text-white">{totalFat}g (Saturated: {satFat}g)</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
            <span className="text-slate-600 dark:text-slate-400">Sodium:</span>
            <span className={`font-bold ${sodium > 600 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
              {sodium} mg ({dvSodium}% Daily Limit)
            </span>
          </div>
          {food.nutritionPer100g.calcium && (
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-600 dark:text-slate-400">Calcium:</span>
              <span className="font-bold text-slate-900 dark:text-white">{Math.round(food.nutritionPer100g.calcium * multiplier)} mg</span>
            </div>
          )}
          {food.nutritionPer100g.iron && (
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-600 dark:text-slate-400">Iron:</span>
              <span className="font-bold text-slate-900 dark:text-white">{Math.round(food.nutritionPer100g.iron * multiplier * 10) / 10} mg</span>
            </div>
          )}
        </div>
      </section>

      {/* 4. Balanced Pros (Advantages) and "Things to Consider" */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Advantages */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-3xl p-5 border border-emerald-200/80 dark:border-emerald-900/50 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 size={18} />
            <h3 className="font-bold text-sm">Key Advantages</h3>
          </div>
          <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200/90">
            {food.advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Things to Consider */}
        <div className="bg-amber-50/50 dark:bg-amber-950/20 rounded-3xl p-5 border border-amber-200/80 dark:border-amber-900/50 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
            <HelpCircle size={18} />
            <h3 className="font-bold text-sm">Things to Consider</h3>
          </div>
          <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200/90">
            {food.thingsToConsider.map((ttc, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>{ttc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Ingredients Decoded (Non-fear, Evidence-based context) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            Ingredients Decoded
          </h3>
          <span className="text-xs text-slate-400 font-normal">
            NOVA Classification & Context
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {food.ingredients.map((ing, idx) => (
            <div key={idx} className="py-2.5 flex items-start justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{ing.name}</span>
                  {ing.hindiName && (
                    <span className="text-[11px] text-slate-400">({ing.hindiName})</span>
                  )}
                  {ing.isAllergen && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      Allergen: {ing.allergenType}
                    </span>
                  )}
                </div>
                {ing.concerns && (
                  <p className="text-[11px] text-amber-700 dark:text-amber-300/90 leading-tight">
                    {ing.concerns}
                  </p>
                )}
                {ing.purpose && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Purpose: {ing.purpose}
                  </p>
                )}
              </div>

              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                ing.processingLevel === 'unprocessed'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : ing.processingLevel === 'culinary'
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
                  : ing.processingLevel === 'processed'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
              }`}>
                {ing.processingLevel.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Packaging Claims Reality Check (if any) */}
      {food.claims.length > 0 && (
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 rounded-3xl p-5 border border-amber-200 dark:border-amber-900/60 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🏷️</span>
            <h3 className="font-extrabold text-sm sm:text-base text-amber-950 dark:text-amber-200">
              Front-of-Pack Claims Reality Check
            </h3>
          </div>

          <div className="space-y-2.5">
            {food.claims.map((c, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-slate-900/80 p-3.5 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 dark:text-white">"{c.claim}"</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    c.isMisleading
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {c.verdict}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  {c.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Better Alternatives Carousel */}
      {food.betterAlternatives.length > 0 && (
        <section className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-brand-400" />
              <h3 className="font-bold text-base text-white">Better Alternatives</h3>
            </div>
            <span className="text-xs text-brand-300 font-medium">1-Tap Upgrade</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {food.betterAlternatives.map((alt, idx) => (
              <div
                key={idx}
                onClick={() => onSelectAlternative(alt.targetFoodId)}
                className="bg-slate-800/90 rounded-2xl p-3.5 border border-slate-700 hover:border-brand-500 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {alt.reasonBadge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {alt.note}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-brand-400 group-hover:text-brand-300">
                  <span>View Swap</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Medical Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5">
          <Info size={14} className="text-brand-600" />
          <span>Not Medical Advice</span>
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
          FoodLens empowers informed nutritional decisions. Always consult a qualified medical professional or registered dietitian for specialized therapeutic treatments.
        </p>
      </div>
    </div>
  );
};
