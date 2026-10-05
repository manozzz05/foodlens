import React from 'react';
import { BookOpen, ShieldCheck, Scale, Cpu, CheckCircle2, AlertTriangle, Layers, HeartPulse } from 'lucide-react';

export const MethodologyScreen: React.FC = () => {
  return (
    <div className="pb-28 pt-4 px-4 max-w-4xl mx-auto space-y-8 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="p-1.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <BookOpen size={20} />
          </span>
          <span className="text-xs font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider">
            Evidence-Based Transparency
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How FoodLens Decides
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Our mathematical model, core principles, data sources, and scientific philosophy for transparent food scoring without fear.
        </p>
      </div>

      {/* Core Principles */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck size={20} className="text-brand-600 dark:text-brand-400" />
          <span>Core Engineering Principles</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">
              1. Accuracy First & Serving Tied
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We never fabricate or hallucinate nutritional values. All numbers come strictly from verified datasets (ICMR-NIN Indian Food Composition Tables, USDA FoodData Central, or laboratory FSSAI packaging tables). Every metric is tied to an actual, realistic home serving portion (e.g., <em>1 katori dal</em>, <em>1 roti</em>, <em>1 glass</em>).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">
              2. Context, Not Villains
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We completely reject alarmist, fear-based sensationalism. Ingredients are never labeled "toxic" or "poisonous" without rigorous peer-reviewed toxicology consensus. Sugar isn't "evil", but in high concentrations without fiber, it triggers metabolic stress. We provide calm, nuanced context.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">
              3. Transparent 4-Pillar Scoring
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Every single score displayed (0 to 100) breaks down into exact contributing points across Nutrient Density, Processing Level (NOVA index), Sugar & Sodium Moderation, and Lipid Quality. No proprietary black boxes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block text-sm">
              4. Grounded AI & Rules Engine
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              AI within FoodLens is strictly bounded to retrieve and explain confirmed database facts. A hardcoded deterministic validation layer blocks unsupported medical claims, miracle cure promises, or unvetted health advice.
            </p>
          </div>
        </div>
      </section>

      {/* The FoodScore Mathematical Formula */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale size={20} className="text-brand-600 dark:text-brand-400" />
            <span>The FoodScore Mathematical Model</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Scores range from 5 to 96 points, mapped into five accessible letter grades (A through E).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs overflow-x-auto">
          FoodScore = 42 (Base) + [Nutrient Density: -10 to +30] + [Processing Level: -15 to +25] + [Sugar & Sodium Penalty: -35 to 0] + [Lipid Quality: -15 to +20]
        </div>

        {/* 4 Pillars Table */}
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 dark:text-white">Pillar 1: Nutrient Density (-10 to +30 pts)</span>
              <span className="text-brand-600 font-bold">+30 max</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Rewards protein (+2 pts per 3g up to +12), dietary fiber (+2.5 pts per 2g up to +10), and essential micronutrients (iron, calcium, potassium). Penalizes high calorie empty density (calories &gt; 350 with negligible protein or fiber).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 dark:text-white">Pillar 2: Processing Level / NOVA (-15 to +25 pts)</span>
              <span className="text-brand-600 font-bold">+25 to -15</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Adapted from the internationally validated NOVA classification: Unprocessed whole ingredients (+25 pts), traditional culinary items like cold-pressed oils or ghee (+18 pts), and processed staples (+8 pts). Industrial ultra-processed items with artificial food colors, emulsifiers, or maltodextrin receive deductions up to -15 pts.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 dark:text-white">Pillar 3: Added Sugar & Sodium Moderation (-35 to 0 pts)</span>
              <span className="text-rose-600 font-bold">-35 penalty max</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Added sucrose/syrups above 4g incur penalties up to -20 pts for sugary confectionery (&gt;20g/100g). High sodium (&gt;400mg) incurs up to -15 pts penalty to protect cardiovascular health.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 dark:text-white">Pillar 4: Lipid Quality (-15 to +20 pts)</span>
              <span className="text-brand-600 font-bold">+20 to -15</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Rewards heart-healthy monounsaturated and polyunsaturated fats from whole nuts, mustard oil, and seeds (+12 pts). Severely penalizes industrial trans fats (-15 pts) and high saturated fats from cheap palm oil or hydrogenated vegetable fats.
            </p>
          </div>
        </div>
      </section>

      {/* Confidence Badges & Evidence Tiers */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers size={20} className="text-brand-600 dark:text-brand-400" />
          <span>Confidence Badges & Verification Tiers</span>
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
              🛡️ Verified Tier
            </span>
            <p className="text-emerald-900 dark:text-emerald-200/90 text-[11px] leading-relaxed">
              Direct match from verified laboratory databases (ICMR-NIN IFCT tables or confirmed manufacturer FSSAI lab declarations). Serving weights and macronutrient splits have 99%+ data fidelity.
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20">
            <span className="font-bold text-sky-800 dark:text-sky-300 block mb-1">
              👥 Community Tier
            </span>
            <p className="text-sky-900 dark:text-sky-200/90 text-[11px] leading-relaxed">
              Submitted by verified users or community contributors, cross-checked against standard ingredient tables by peer reviewers.
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20">
            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
              📐 Estimated Tier (Range ±15%)
            </span>
            <p className="text-amber-900 dark:text-amber-200/90 text-[11px] leading-relaxed">
              Applied to restaurant dishes and street foods (e.g. samosa, biryani, pav bhaji) where culinary variation in cooking oil, potato size, and chef salting exists. All metrics display with an explicit ±15% variance range.
            </p>
          </div>
        </div>
      </section>

      {/* Phase 2+ Architecture Roadmap */}
      <section className="bg-slate-100 dark:bg-slate-800/60 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu size={18} className="text-brand-600 dark:text-brand-400" />
          <span>Architecture Roadmap (Phase 2+)</span>
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          FoodLens is engineered with an isolated repository layer (`foodRepository.ts`) ready to connect to external barcode OCR, photo recognition ML pipelines, and receipt scanners. Future capabilities designed into the schema:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-700 dark:text-slate-300 pt-1">
          <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">📸 Camera Barcode & OCR</div>
          <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">🥗 Photo Food Recognition</div>
          <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">📜 Restaurant Menu Scanner</div>
          <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">🗣️ Hindi & Regional Voice Input</div>
          <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">🧾 Grocery Receipt Analyzer</div>
          <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">⚠️ FSSAI Recall Live Alerts</div>
        </div>
      </section>

      {/* Official Legal & Medical Disclaimer */}
      <section className="p-5 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 space-y-2">
        <span className="font-bold flex items-center gap-1.5 text-sm">
          <AlertTriangle size={16} className="text-rose-600" />
          <span>Strict Medical & Healthcare Disclaimer</span>
        </span>
        <p className="leading-relaxed text-[11px] opacity-90">
          FoodLens is an educational consumer decision-support tool. It does not provide medical diagnoses, treatment plans, or therapeutic prescriptions. Dietary requirements for acute medical conditions (such as advanced renal disease, severe celiac enteropathy, or brittle diabetes) require individualized clinical supervision by a certified medical doctor or clinical nutritionist.
        </p>
      </section>
    </div>
  );
};
