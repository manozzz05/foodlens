import React from 'react';
import { UserProfile } from '../types/profile';
import { Sun, Moon, Download, ChevronDown, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeProfile: UserProfile;
  onOpenProfileSwitcher: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onInstallClick?: () => void;
  canInstall?: boolean;
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeProfile,
  onOpenProfileSwitcher,
  isDarkMode,
  onToggleDarkMode,
  onInstallClick,
  canInstall = false,
  activeTab,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div 
          onClick={() => onNavigate('explore')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center shadow-md shadow-brand-500/20 text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Food<span className="text-brand-600 dark:text-brand-400">Lens</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                PWA
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-0.5 hidden sm:block">
              Decide what to eat, right now, for you.
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
          {[
            { id: 'explore', label: 'Explore' },
            { id: 'compare', label: 'Compare Foods' },
            { id: 'decoder', label: 'Label Decoder' },
            { id: 'lens', label: 'Your Lens' },
            { id: 'methodology', label: 'Methodology' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Tools: Profile Lens Pill, Install, Dark Mode */}
        <div className="flex items-center gap-2">
          {/* Active Lens Pill */}
          <button
            onClick={onOpenProfileSwitcher}
            className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
            title="Switch family member lens"
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-xs shrink-0"
              style={{ backgroundColor: activeProfile.avatarColor }}
            >
              {activeProfile.name.charAt(0)}
            </span>
            <span className="truncate max-w-[90px] sm:max-w-[120px]">
              {activeProfile.name}
            </span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>

          {/* PWA Install Button */}
          {canInstall && (
            <button
              onClick={onInstallClick}
              className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all"
              title="Install FoodLens app"
            >
              <Download size={14} />
              <span>Install App</span>
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
