import React, { useState } from 'react';
import { DECODED_CLAIMS } from '../data/decodedClaims';
import { DecodedClaim } from '../types/claims';
import { FileText, Search, AlertTriangle, ShieldCheck, HelpCircle, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';

export const LabelDecoderScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [expandedClaimId, setExpandedClaimId] = useState<string | null>(DECODED_CLAIMS[0].id);

  const tags = ['all', 'Sugar & Sweeteners', 'Grain Claims', 'Protein Claims', 'Fat & Oils', 'Purity Buzzwords'];

  const filteredClaims = DECODED_CLAIMS.filter(c => {
    const matchesSearch = c.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.theCatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.commonIn.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === 'all' || c.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="pb-28 pt-4 px-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <FileText size={20} />
          </span>
          <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
            FSSAI Label Intelligence
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Food Label Claim Decoder
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
          Front-of-pack claims are legally permitted marketing slogans. We decode the gap between package promises and real ingredient science.
        </p>
      </div>

      {/* Search & Tags */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search claims like 'No Added Sugar', 'Multigrain', 'Baked'..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-3 py-1.5 rounded-xl shrink-0 font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-amber-600 text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {tag === 'all' ? 'All Buzzwords' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {filteredClaims.map((item) => {
          const isExpanded = expandedClaimId === item.id;
          return (
            <div
              key={item.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'border-amber-400/80 dark:border-amber-700/80 shadow-md ring-1 ring-amber-400/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {/* Accordion Header */}
              <div
                onClick={() => setExpandedClaimId(isExpanded ? null : item.id)}
                className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.tag}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      item.misleadingRisk === 'high'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : item.misleadingRisk === 'medium'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {item.misleadingRisk} Misleading Risk
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    "{item.claim}"
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Common on: {item.commonIn.join(', ')}
                  </p>
                </div>

                <button
                  type="button"
                  className={`p-1.5 rounded-full text-slate-400 transition-transform ${isExpanded ? 'rotate-90 text-amber-600' : ''}`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                  {/* The Catch Callout */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-1">
                    <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                      <AlertTriangle size={14} className="text-amber-600" />
                      <span>The Real Marketing Catch</span>
                    </span>
                    <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed text-[11px]">
                      {item.theCatch}
                    </p>
                  </div>

                  {/* Regulation Summary */}
                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      What FSSAI Regulations Say:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.regulationSummary}
                    </p>
                  </div>

                  {/* What to look for on label */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-brand-600" />
                      <span>How to Spot It on the Ingredient Table:</span>
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.whatToLookFor}
                    </p>
                  </div>

                  {/* Good vs Tricky Examples */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-0.5">
                        Genuine Example
                      </span>
                      <p className="text-emerald-900 dark:text-emerald-200 text-[11px]">
                        {item.exampleGood}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 block mb-0.5">
                        Sneaky / Tricky Example
                      </span>
                      <p className="text-rose-900 dark:text-rose-200 text-[11px]">
                        {item.exampleTricky}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
