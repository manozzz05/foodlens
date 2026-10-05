import React, { useState, useEffect } from 'react';
import { FoodItem } from '../types/food';
import { UserProfile } from '../types/profile';
import { foodRepository } from '../services/foodRepository';
import { evaluateLens } from '../engine/lensEvaluator';
import { FoodScoreBadge } from '../components/FoodScoreBadge';
import { DietDot } from '../components/DietDot';
import { Scale, Plus, X, ArrowRight, CheckCircle2, AlertTriangle, Sparkles, HelpCircle } from 'lucide-react';

interface CompareScreenProps {
  compareIds: string[];
  activeProfile: UserProfile;
  onRemoveFood: (foodId: string) => void;
  onAddFood: (foodId: string) => void;
  onSelectFood: (food: FoodItem) => void;
}

export const CompareScreen: React.FC<CompareScreenProps> = ({
  compareIds,
  activeProfile,
  onRemoveFood,
  onAddFood,
  onSelectFood,
}) => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [allFoods, setAllFoods] = useState<FoodItem[]>([]);
  const [showAddPicker, setShowAddPicker] = useState(false);
  const [pickerQuery, setPickerQuery] = useState('');

  useEffect(() => {
    foodRepository.getCompareFoods(compareIds).then(setFoods);
  }, [compareIds]);

  useEffect(() => {
    foodRepository.getAllFoods().then(setAllFoods);
  }, []);

  const evaluations = foods.map(f => evaluateLens(f, activeProfile));

  // Determine tailored recommendation for active profile
  const getRecommendation = () => {
    if (foods.length < 2) return null;

    // Rank foods by score and lens fit
    const ranked = [...foods].sort((a, b) => {
      const evalA = evaluateLens(a, activeProfile);
      const evalB = evaluateLens(b, activeProfile);

      // Incompatible always last
      if (evalA.fitStatus === 'incompatible' && evalB.fitStatus !== 'incompatible') return 1;
      if (evalB.fitStatus === 'incompatible' && evalA.fitStatus !== 'incompatible') return -1;

      // Higher FoodScore wins
      return b.foodScore.overallScore - a.foodScore.overallScore;
    });

    const winner = ranked[0];
    const runnerUp = ranked[1];

    let reason = `${winner.name} achieves a higher FoodScore (${winner.foodScore.overallScore} vs ${runnerUp.foodScore.overallScore})`;
    if (winner.nutritionPer100g.addedSugar < runnerUp.nutritionPer100g.addedSugar) {
      reason += ` with significantly less added sugar (${winner.nutritionPer100g.addedSugar}g vs ${runnerUp.nutritionPer100g.addedSugar}g).`;
    } else if (winner.nutritionPer100g.protein > runnerUp.nutritionPer100g.protein) {
      reason += ` and higher protein density (${winner.nutritionPer100g.protein}g vs ${runnerUp.nutritionPer100g.protein}g).`;
    } else {
      reason += ` with less industrial processing.`;
    }

    return { winner, reason };
  };

  const recommendation = getRecommendation();

  // Filtered foods for picker
  const filteredPickerFoods = allFoods.filter(f =>
    !compareIds.includes(f.id) &&
    (f.name.toLowerCase().includes(pickerQuery.toLowerCase()) ||
     (f.hindiName && f.hindiName.includes(pickerQuery)) ||
     (f.brand && f.brand.toLowerCase().includes(pickerQuery.toLowerCase())))
  );

  return (
    <div className="pb-28 pt-4 px-4 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale size={24} className="text-brand-600 dark:text-brand-400" />
            <span>Side-by-Side Comparison</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare 2 to 3 foods objectively. Evaluated for {activeProfile.name}'s profile.
          </p>
        </div>

        {foods.length < 3 && (
          <button
            onClick={() => setShowAddPicker(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus size={14} />
            <span>Add Item ({foods.length}/3)</span>
          </button>
        )}
      </div>

      {foods.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto text-2xl">
            ⚖️
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">
              No foods selected for comparison
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Select 2 or 3 foods to see side-by-side nutrition, FoodScore breakdowns, and a personalized recommendation for {activeProfile.name}.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowAddPicker(true)}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Choose Foods to Compare
            </button>
          </div>

          {/* Quick presets */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 max-w-md mx-auto">
            <span className="text-xs font-semibold text-slate-400 block mb-2.5">
              Popular Indian Dilemmas:
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => {
                  onAddFood('maggi-masala-noodles');
                  onAddFood('saffola-masala-oats');
                }}
                className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Maggi vs Masala Oats
              </button>
              <button
                onClick={() => {
                  onAddFood('lays-magic-masala');
                  onAddFood('roasted-makhana');
                }}
                className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Lay's vs Roasted Makhana
              </button>
              <button
                onClick={() => {
                  onAddFood('dal-tadka-yellow');
                  onAddFood('dal-makhani-restaurant');
                }}
                className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Yellow Dal vs Dal Makhani
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Recommendation Banner */}
          {recommendation && (
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 rounded-3xl border border-emerald-200 dark:border-emerald-900/60 shadow-xs flex items-start gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-xl shrink-0 mt-0.5">
                <Sparkles size={16} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Decision Verdict for {activeProfile.name}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Choose <span className="text-emerald-700 dark:text-emerald-400">{recommendation.winner.name}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {recommendation.reason}
                </p>
              </div>
            </div>
          )}

          {/* Side by Side Matrix */}
          <div className="overflow-x-auto no-scrollbar rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <th className="p-4 font-bold text-slate-500 w-1/4">Metric</th>
                  {foods.map((food, idx) => (
                    <th key={food.id} className="p-4 w-1/4 align-top">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <DietDot flags={food.dietFlags} />
                          <button
                            onClick={() => onRemoveFood(food.id)}
                            className="p-1 rounded-full text-slate-400 hover:text-rose-600 transition-colors"
                            title="Remove from compare"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div>
                          <span 
                            onClick={() => onSelectFood(food)}
                            className="font-bold text-sm text-slate-900 dark:text-white hover:text-brand-600 cursor-pointer block leading-tight"
                          >
                            {food.name}
                          </span>
                          {food.brand && (
                            <span className="text-[10px] text-slate-400">{food.brand}</span>
                          )}
                        </div>
                        <FoodScoreBadge score={food.foodScore} size="sm" />
                      </div>
                    </th>
                  ))}
                  {foods.length < 3 && (
                    <th className="p-4 w-1/4 align-middle text-center bg-slate-50/50 dark:bg-slate-800/20 border-l border-dashed border-slate-200 dark:border-slate-800">
                      <button
                        onClick={() => setShowAddPicker(true)}
                        className="p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-brand-500 hover:text-brand-600 transition-all flex flex-col items-center justify-center gap-1 mx-auto"
                      >
                        <Plus size={18} />
                        <span className="text-xs font-semibold">Add 3rd Food</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {/* Profile Fit Status */}
                <tr className="bg-brand-50/20 dark:bg-brand-950/10">
                  <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">
                    Lens Fit ({activeProfile.name})
                  </td>
                  {evaluations.map((ev, idx) => (
                    <td key={idx} className="p-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                        ev.fitStatus === 'ideal'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : ev.fitStatus === 'moderate'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : ev.fitStatus === 'caution'
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {ev.fitBadgeText}
                      </span>
                    </td>
                  ))}
                  {foods.length < 3 && <td />}
                </tr>

                {/* Instant Verdict Summary */}
                <tr>
                  <td className="p-3.5 font-medium text-slate-500">Verdict Headline</td>
                  {foods.map((food) => (
                    <td key={food.id} className="p-3.5 text-slate-700 dark:text-slate-300 italic text-[11px] leading-tight">
                      "{food.verdictHeadline}"
                    </td>
                  ))}
                  {foods.length < 3 && <td />}
                </tr>

                {/* Serving reference */}
                <tr>
                  <td className="p-3.5 font-medium text-slate-500">Default Serving</td>
                  {foods.map((food) => (
                    <td key={food.id} className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                      {food.servingPortions[0]?.name || '100g'}
                    </td>
                  ))}
                  {foods.length < 3 && <td />}
                </tr>

                {/* Calories per 100g */}
                <tr>
                  <td className="p-3.5 font-medium text-slate-500">Calories (100g)</td>
                  {foods.map((food) => (
                    <td key={food.id} className="p-3.5 font-bold text-slate-900 dark:text-white">
                      {food.nutritionPer100g.calories} kcal
                    </td>
                  ))}
                  {foods.length < 3 && <td />}
                </tr>

                {/* Protein */}
                <tr>
                  <td className="p-3.5 font-medium text-slate-500">Protein</td>
                  {foods.map((food) => {
                    const maxProtein = Math.max(...foods.map(f => f.nutritionPer100g.protein));
                    const isWinner = food.nutritionPer100g.protein === maxProtein && foods.length > 1;
                    return (
                      <td key={food.id} className={`p-3.5 font-bold ${isWinner ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {food.nutritionPer100g.protein} g {isWinner && '★'}
                      </td>
                    );
                  })}
                  {foods.length < 3 && <td />}
                </tr>

                {/* Added Sugar */}
                <tr>
                  <td className="p-3.5 font-medium text-slate-500">Added Sugar</td>
                  {foods.map((food) => {
                    const minSugar = Math.min(...foods.map(f => f.nutritionPer100g.addedSugar));
                    const isBest = food.nutritionPer100g.addedSugar === minSugar && foods.length > 1;
                    return (
                      <td key={food.id} className={`p-3.5 font-bold ${food.nutritionPer100g.addedSugar > 15 ? 'text-rose-600' : isBest ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {food.nutritionPer100g.addedSugar} g {isBest && '✓'}
                      </td>
                    );
                  })}
                  {foods.length < 3 && <td />}
                </tr>

                {/* Dietary Fiber */}
                <tr>
                  <td className="p-3.5 font-medium text-slate-500">Dietary Fiber</td>
                  {foods.map((food) => (
                    <td key={food.id} className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                      {food.nutritionPer100g.dietaryFiber} g
                    </td>
                  ))}
                  {foods.length < 3 && <td />}
                </tr>

                {/* Saturated Fat */}
                <tr>
                  <td className="p-3.5 font-medium text-slate-500">Saturated Fat</td>
                  {foods.map((food) => (
                    <td key={food.id} className={`p-3.5 font-semibold ${food.nutritionPer100g.saturatedFat > 8 ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'}`}>
                      {food.nutritionPer100g.saturatedFat} g
                    </td>
                  ))}
                  {foods.length < 3 && <td />}
                </tr>

                {/* Sodium */}
                <tr>
                  <td className="p-3.5 font-medium text-slate-500">Sodium</td>
                  {foods.map((food) => (
                    <td key={food.id} className={`p-3.5 font-semibold ${food.nutritionPer100g.sodium > 600 ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'}`}>
                      {food.nutritionPer100g.sodium} mg
                    </td>
                  ))}
                  {foods.length < 3 && <td />}
                </tr>

                {/* Approximate Price INR */}
                <tr>
                  <td className="p-3.5 font-medium text-slate-500">Est. Price (INR)</td>
                  {foods.map((food) => (
                    <td key={food.id} className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                      {food.priceEstimateInr ? `₹${food.priceEstimateInr}` : '—'}
                    </td>
                  ))}
                  {foods.length < 3 && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Food Picker Modal */}
      {showAddPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Add Food to Compare
              </h3>
              <button
                onClick={() => setShowAddPicker(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 border-b border-slate-100 dark:border-slate-800">
              <input
                type="text"
                value={pickerQuery}
                onChange={(e) => setPickerQuery(e.target.value)}
                placeholder="Search food by name or brand..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="p-2 space-y-1 overflow-y-auto no-scrollbar flex-1 divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPickerFoods.slice(0, 15).map((food) => (
                <div
                  key={food.id}
                  onClick={() => {
                    onAddFood(food.id);
                    setShowAddPicker(false);
                    setPickerQuery('');
                  }}
                  className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <DietDot flags={food.dietFlags} />
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">
                        {food.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {food.category.replace('_', ' ')} {food.brand ? `• ${food.brand}` : ''}
                    </span>
                  </div>

                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {food.foodScore.overallScore}/100
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
