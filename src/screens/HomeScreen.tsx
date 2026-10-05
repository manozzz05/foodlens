import React, { useState, useEffect, useRef } from 'react';
import { FoodItem, FoodCategory, DietFlag } from '../types/food';
import { UserProfile } from '../types/profile';
import { foodRepository } from '../services/foodRepository';
import { FoodCard } from '../components/FoodCard';
import { Search, X, Sparkles, Filter, ChevronRight, Scale, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

interface HomeScreenProps {
  activeProfile: UserProfile;
  onSelectFood: (food: FoodItem) => void;
  onNavigate: (tab: string) => void;
  compareList: string[];
  onToggleCompare: (foodId: string) => void;
  onOpenProfileSwitcher: () => void;
}

const CATEGORIES: { id: FoodCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Foods', icon: '🍽️' },
  { id: 'indian_foods', label: 'Indian Curries & Staples', icon: '🍛' },
  { id: 'grains', label: 'Roti & Grains', icon: '🌾' },
  { id: 'dairy', label: 'Dairy & Paneer', icon: '🥛' },
  { id: 'protein', label: 'Protein & Eggs', icon: '🍳' },
  { id: 'snacks', label: 'Namkeen & Snacks', icon: '🍿' },
  { id: 'packaged_foods', label: 'Packaged Products', icon: '📦' },
  { id: 'beverages', label: 'Chai & Drinks', icon: '☕' },
  { id: 'fast_food', label: 'Street & Fast Food', icon: '🍔' },
  { id: 'fruits', label: 'Fresh Fruits', icon: '🍎' },
  { id: 'vegetables', label: 'Vegetables & Saag', icon: '🥬' },
  { id: 'desserts', label: 'Mithai & Sweets', icon: '🍨' },
  { id: 'nuts_and_seeds', label: 'Nuts & Seeds', icon: '🥜' },
];

const DIET_FILTER_OPTIONS: { id: DietFlag; label: string }[] = [
  { id: 'vegetarian', label: 'Pure Veg 🟢' },
  { id: 'jain', label: 'Jain Friendly 🟡' },
  { id: 'diabetic_friendly', label: 'Diabetic Friendly' },
  { id: 'high_protein', label: 'High Protein' },
  { id: 'gluten_free', label: 'Gluten Free' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'halal', label: 'Halal' },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  activeProfile,
  onSelectFood,
  onNavigate,
  compareList,
  onToggleCompare,
  onOpenProfileSwitcher
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [selectedDietFlags, setSelectedDietFlags] = useState<DietFlag[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [featuredSwaps, setFeaturedSwaps] = useState<{ worse: FoodItem; better: FoodItem; why: string }[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load featured swaps and initial foods
  useEffect(() => {
    foodRepository.getFeaturedSwaps().then(setFeaturedSwaps);
  }, []);

  // Sync filtered foods
  useEffect(() => {
    foodRepository.searchFoods({
      query: searchQuery,
      category: selectedCategory,
      dietFlags: selectedDietFlags,
    }).then(setFoods);
  }, [searchQuery, selectedCategory, selectedDietFlags]);

  // Autocomplete debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(() => {
      foodRepository.getAutocompleteSuggestions(searchQuery, 6).then(setSuggestions);
    }, 150);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const toggleDietFlag = (flag: DietFlag) => {
    setSelectedDietFlags(prev =>
      prev.includes(flag) ? prev.filter(f => f !== flag) : [...prev, flag]
    );
  };

  const handleSuggestionClick = async (id: string) => {
    const food = await foodRepository.getFoodById(id);
    if (food) {
      setSuggestions([]);
      onSelectFood(food);
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-6xl mx-auto space-y-6">
      {/* Active Profile Context Banner */}
      <div className="p-3.5 bg-gradient-to-r from-brand-50 to-teal-50 dark:from-brand-950/40 dark:to-teal-950/30 rounded-2xl border border-brand-200/80 dark:border-brand-900/60 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-xs"
            style={{ backgroundColor: activeProfile.avatarColor }}
          >
            {activeProfile.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-800 dark:text-slate-200">
              <span className="font-bold">{activeProfile.name}'s Lens Active</span>
              <span className="text-slate-400">•</span>
              <span className="capitalize text-slate-600 dark:text-slate-400">{activeProfile.dietaryPreference}</span>
            </div>
            {activeProfile.healthConditions.length > 0 ? (
              <p className="text-[11px] text-brand-800 dark:text-brand-300 font-medium truncate">
                Adapting verdicts for: {activeProfile.healthConditions.map(c => c.replace('_', ' ')).join(', ')}
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                General wellness & nutrition clarity
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onOpenProfileSwitcher}
          className="shrink-0 text-xs font-bold text-brand-700 dark:text-brand-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-brand-200 dark:border-brand-800/80 hover:bg-brand-50 dark:hover:bg-slate-700 transition-all shadow-xs"
        >
          Change
        </button>
      </div>

      {/* Hero Search & Instant Autocomplete */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearching(true)}
            placeholder="Search any food, brand, or Indian dish (e.g. Maggi, Dal, Besan Chilla)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-30 mt-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in duration-150">
            {suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSuggestionClick(item.id)}
                className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">
                      {item.name}
                    </span>
                    {item.hindiName && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {item.hindiName}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="capitalize">{item.category.replace('_', ' ')}</span>
                    {item.brand && <span>• {item.brand}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Score {item.foodScore}
                  </span>
                  <ChevronRight size={14} className="text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Pills Rail */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Categories</span>
          <span className="text-slate-400 font-normal">{foods.length} items</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-brand-500 dark:text-slate-950 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diet & Allergen Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0 mr-1 flex items-center gap-1">
          <Filter size={12} />
          <span>Filters:</span>
        </span>
        {DIET_FILTER_OPTIONS.map((flag) => {
          const isSelected = selectedDietFlags.includes(flag.id);
          return (
            <button
              key={flag.id}
              onClick={() => toggleDietFlag(flag.id)}
              className={`text-xs px-3 py-1.5 rounded-lg shrink-0 font-medium transition-all ${
                isSelected
                  ? 'bg-brand-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {flag.label}
            </button>
          );
        })}
      </div>

      {/* Featured Better Swaps Carousel (shown when no specific search is active) */}
      {!searchQuery && selectedCategory === 'all' && selectedDietFlags.length === 0 && (
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-3xl shadow-md border border-slate-800">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-brand-500/20 text-brand-400">
                <Sparkles size={16} />
              </span>
              <h2 className="font-bold text-sm sm:text-base tracking-tight text-white">
                Better Swaps in 1 Tap
              </h2>
            </div>
            <span className="text-xs text-brand-400 font-medium">Smart Alternatives</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredSwaps.slice(0, 2).map((swap, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                  <span className="text-rose-300 font-medium line-through opacity-80 truncate">
                    {swap.worse.name}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">➔</span>
                  <span 
                    onClick={() => onSelectFood(swap.better)}
                    className="text-emerald-300 font-bold hover:underline cursor-pointer truncate"
                  >
                    {swap.better.name}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                  {swap.why}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectFood(swap.better)}
                  className="self-end inline-flex items-center gap-1 text-[11px] font-bold text-brand-300 hover:text-brand-200"
                >
                  <span>Explore {swap.better.name.split(' ')[0]}</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Label Decoder Banner Shortcut */}
      {!searchQuery && selectedCategory === 'all' && (
        <div 
          onClick={() => onNavigate('decoder')}
          className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-amber-500/15 transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🔍</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  Label Decoder: "Multigrain" or 90% Maida?
                </span>
                <span className="text-[10px] bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 px-2 py-0.2 rounded-full font-semibold">
                  FSSAI Watch
                </span>
              </div>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
                Learn how brands disguise refined flour and fruit juice concentrates as healthy.
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />
        </div>
      )}

      {/* Comparison Drawer / Sticky Bar (When items are queued for compare) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-lg mx-auto bg-slate-900 text-white rounded-2xl p-3 shadow-2xl border border-slate-700 flex items-center justify-between animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2.5">
            <Scale size={18} className="text-brand-400" />
            <span className="text-xs font-semibold">
              {compareList.length} food{compareList.length > 1 ? 's' : ''} queued for side-by-side comparison
            </span>
          </div>
          <button
            onClick={() => onNavigate('compare')}
            className="px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
          >
            Compare Now
          </button>
        </div>
      )}

      {/* Food Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            {searchQuery ? `Results for "${searchQuery}"` : 'Browse Decisions'}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing {foods.length} items
          </span>
        </div>

        {foods.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400 text-xl">
              🔍
            </div>
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 mb-1">
              No matching foods found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              We couldn't find items matching your search and active filters. Try clearing filters or searching for staples like dal, roti, makhana, or paneer.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietFlags([]);
              }}
              className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                activeProfile={activeProfile}
                onClick={() => onSelectFood(food)}
                isSelectedForCompare={compareList.includes(food.id)}
                onCompareToggle={(e) => {
                  e.stopPropagation();
                  onToggleCompare(food.id);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Transparent Disclaimer Footer */}
      <footer className="pt-8 pb-4 text-center border-t border-slate-200 dark:border-slate-800/80 space-y-2">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-brand-600 dark:text-brand-400" />
          <span>FoodLens is an educational decision engine, not medical advice.</span>
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-md mx-auto">
          Nutritional figures derive from ICMR-NIN IFCT, USDA, and verified FSSAI packaging declarations. Individual metabolic responses vary.
        </p>
      </footer>
    </div>
  );
};
