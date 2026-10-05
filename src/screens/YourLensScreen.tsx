import React, { useState } from 'react';
import { UserProfile, DietaryPreference, HealthCondition } from '../types/profile';
import { FoodItem } from '../types/food';
import { evaluateLens } from '../engine/lensEvaluator';
import { foodRepository } from '../services/foodRepository';
import { UserCheck, Plus, Trash2, Edit3, HeartPulse, ShieldAlert, Sparkles, Check, ChevronRight } from 'lucide-react';

interface YourLensScreenProps {
  profiles: UserProfile[];
  activeProfile: UserProfile;
  onSelectProfile: (profile: UserProfile) => void;
  onSaveProfile: (profile: UserProfile) => void;
  onDeleteProfile: (id: string) => void;
  onSelectFood: (food: FoodItem) => void;
}

const HEALTH_CONDITIONS: { id: HealthCondition; label: string; desc: string }[] = [
  { id: 'diabetes', label: 'Diabetes / Blood Sugar Control', desc: 'Strict added sugar thresholds, glycemic surge alerts' },
  { id: 'hypertension', label: 'Hypertension / Low Sodium', desc: 'Alerts on high sodium (>400mg per serving)' },
  { id: 'high_cholesterol', label: 'High Cholesterol / Heart Care', desc: 'Flags high saturated dairy and palm fats' },
  { id: 'weight_loss', label: 'Weight Management', desc: 'Highlights calorie density and satiety fiber' },
  { id: 'muscle_gain', label: 'Muscle Gain / High Protein', desc: 'Highlights high-protein yield (>= 15g per serving)' },
  { id: 'celiac', label: 'Celiac Disease', desc: 'Zero tolerance for gluten, wheat, and maida' },
];

const ALLERGEN_OPTIONS = [
  { id: 'gluten', label: 'Gluten / Wheat / Maida' },
  { id: 'dairy', label: 'Dairy / Milk Solids / Lactose' },
  { id: 'peanut', label: 'Peanuts' },
  { id: 'tree_nut', label: 'Tree Nuts (Almonds, Cashews, Walnuts)' },
  { id: 'soy', label: 'Soy / Soya Chunks / Soya Sauce' },
  { id: 'egg', label: 'Egg' },
];

const AVATAR_COLORS = [
  '#0d9488', // Emerald
  '#ec4899', // Pink
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#f59e0b', // Amber
  '#10b981', // Green
  '#ef4444', // Red
];

export const YourLensScreen: React.FC<YourLensScreenProps> = ({
  profiles,
  activeProfile,
  onSelectProfile,
  onSaveProfile,
  onDeleteProfile,
  onSelectFood,
}) => {
  const [editingProfile, setEditingProfile] = useState<UserProfile | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [simulatorFoods, setSimulatorFoods] = useState<FoodItem[]>([]);
  const [selectedSimFoodId, setSelectedSimFoodId] = useState<string>('gulab-jamun');

  // Load simulator sample foods
  React.useEffect(() => {
    foodRepository.getAllFoods().then(all => {
      const samples = all.filter(f => 
        ['gulab-jamun', 'besan-chilla', 'maggi-masala-noodles', 'samosa-aloo', 'dal-tadka-yellow', 'lays-magic-masala'].includes(f.id)
      );
      setSimulatorFoods(samples);
      if (samples.length > 0 && !samples.some(s => s.id === selectedSimFoodId)) {
        setSelectedSimFoodId(samples[0].id);
      }
    });
  }, []);

  const activeSimFood = simulatorFoods.find(f => f.id === selectedSimFoodId);
  const activeSimLens = activeSimFood ? evaluateLens(activeSimFood, activeProfile) : null;

  const startCreate = () => {
    setEditingProfile({
      id: `profile-${Date.now()}`,
      name: '',
      relationship: 'Family Member',
      avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      dietaryPreference: 'all',
      allergens: [],
      healthConditions: [],
    });
    setIsCreatingNew(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile || !editingProfile.name.trim()) return;

    onSaveProfile(editingProfile);
    setEditingProfile(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="pb-28 pt-4 px-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck size={24} className="text-brand-600 dark:text-brand-400" />
            <span>"Your Lens" Family Profiles</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Food is personal. Switch profiles to see how identical foods yield different verdicts for each family member.
          </p>
        </div>

        <button
          onClick={startCreate}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus size={14} />
          <span>New Profile</span>
        </button>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {profiles.map((p) => {
          const isActive = p.id === activeProfile.id;
          return (
            <div
              key={p.id}
              className={`p-4 rounded-3xl border transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 shadow-sm ring-2 ring-brand-500/20'
                  : 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-xs"
                      style={{ backgroundColor: p.avatarColor }}
                    >
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {p.name}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-400 capitalize">
                        {p.relationship}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingProfile({ ...p });
                        setIsCreatingNew(false);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Edit Profile"
                    >
                      <Edit3 size={14} />
                    </button>
                    {profiles.length > 1 && (
                      <button
                        onClick={() => onDeleteProfile(p.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Profile"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Dietary Tags */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <span className="text-slate-400">Diet:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                      {p.dietaryPreference}
                    </span>
                  </div>

                  {p.healthConditions.length > 0 && (
                    <div className="flex items-start gap-1 text-amber-700 dark:text-amber-400 text-[11px]">
                      <HeartPulse size={13} className="shrink-0 mt-0.5" />
                      <span className="line-clamp-2">
                        {p.healthConditions.map(c => c.replace('_', ' ')).join(', ')}
                      </span>
                    </div>
                  )}

                  {p.allergens.length > 0 && (
                    <div className="flex items-start gap-1 text-rose-600 dark:text-rose-400 text-[11px]">
                      <ShieldAlert size={13} className="shrink-0 mt-0.5" />
                      <span>Allergies: {p.allergens.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                {isActive ? (
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-700 dark:text-brand-300 py-1.5 bg-brand-100/70 dark:bg-brand-900/40 rounded-xl">
                    <Check size={14} />
                    <span>Currently Active Lens</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectProfile(p)}
                    className="w-full py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Switch to This Lens
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Lens Verdict Simulator */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-brand-400" />
            <h2 className="font-extrabold text-base text-white">
              Live Lens Simulator: Test Food Verdicts
            </h2>
          </div>
          <span className="text-xs text-brand-300 font-medium">Real-Time Evaluation</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          See how the verdict dynamically shifts when evaluating through <strong>{activeProfile.name}'s</strong> lens ({activeProfile.dietaryPreference}, {activeProfile.healthConditions.join(', ') || 'No restrictions'}).
        </p>

        {/* Sample food pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {simulatorFoods.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedSimFoodId(f.id)}
              className={`text-xs px-3 py-1.5 rounded-xl shrink-0 font-medium transition-all ${
                selectedSimFoodId === f.id
                  ? 'bg-brand-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Active simulated verdict */}
        {activeSimFood && activeSimLens && (
          <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-white">{activeSimFood.name}</span>
                <span className="text-xs text-slate-400 block">{activeSimFood.verdictHeadline}</span>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-xl ${
                activeSimLens.fitStatus === 'ideal'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : activeSimLens.fitStatus === 'moderate'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : activeSimLens.fitStatus === 'caution'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {activeSimLens.fitBadgeText}
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              👉 {activeSimLens.personalizedHeadline}
            </p>

            {activeSimLens.warnings.length > 0 && (
              <div className="space-y-1">
                {activeSimLens.warnings.map((w, idx) => (
                  <div key={idx} className="text-xs text-rose-300 flex items-center gap-1.5">
                    <ShieldAlert size={14} className="shrink-0" />
                    <span><strong>{w.title}:</strong> {w.detail}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => onSelectFood(activeSimFood)}
              className="text-xs font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 pt-1"
            >
              <span>Inspect Full Food Detail</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </section>

      {/* Edit / Create Profile Modal */}
      {editingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <form
            onSubmit={handleSaveForm}
            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {isCreatingNew ? 'Add Family Profile' : `Edit ${editingProfile.name}'s Profile`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProfile(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto no-scrollbar flex-1 text-xs">
              {/* Name & Relationship */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Name</label>
                  <input
                    type="text"
                    required
                    value={editingProfile.name}
                    onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                    placeholder="e.g. Mummy, Aarav"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Relationship</label>
                  <input
                    type="text"
                    value={editingProfile.relationship}
                    onChange={(e) => setEditingProfile({ ...editingProfile, relationship: e.target.value })}
                    placeholder="e.g. Mother, Self, Child"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Avatar Color */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Avatar Color</label>
                <div className="flex items-center gap-2">
                  {AVATAR_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setEditingProfile({ ...editingProfile, avatarColor: color })}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        editingProfile.avatarColor === color ? 'scale-110 ring-2 ring-brand-500' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Dietary Preference */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Dietary Standard</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['all', 'vegetarian', 'vegan', 'jain', 'halal'] as DietaryPreference[]).map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setEditingProfile({ ...editingProfile, dietaryPreference: pref })}
                      className={`p-2 rounded-xl border capitalize font-semibold transition-all ${
                        editingProfile.dietaryPreference === pref
                          ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {pref === 'all' ? 'No Restrictions' : pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Health Conditions */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Health Context & Conditions
                </label>
                <div className="space-y-1.5">
                  {HEALTH_CONDITIONS.map((cond) => {
                    const isChecked = editingProfile.healthConditions.includes(cond.id);
                    return (
                      <div
                        key={cond.id}
                        onClick={() => {
                          const updated = isChecked
                            ? editingProfile.healthConditions.filter(c => c !== cond.id)
                            : [...editingProfile.healthConditions, cond.id];
                          setEditingProfile({ ...editingProfile, healthConditions: updated });
                        }}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isChecked
                            ? 'border-amber-400 bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-bold block">{cond.label}</span>
                          <span className="text-[10px] opacity-75">{cond.desc}</span>
                        </div>
                        {isChecked && <Check size={16} className="text-amber-600 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Allergens */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Allergies (Critical Red Flag Warning)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ALLERGEN_OPTIONS.map((alg) => {
                    const isChecked = editingProfile.allergens.includes(alg.id);
                    return (
                      <button
                        key={alg.id}
                        type="button"
                        onClick={() => {
                          const updated = isChecked
                            ? editingProfile.allergens.filter(a => a !== alg.id)
                            : [...editingProfile.allergens, alg.id];
                          setEditingProfile({ ...editingProfile, allergens: updated });
                        }}
                        className={`p-2 rounded-xl border text-left font-medium transition-all ${
                          isChecked
                            ? 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {alg.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingProfile(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
