import React from 'react';
import { Compass, Scale, FileText, UserCheck, BookOpen } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  compareCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onNavigate,
  compareCount = 0,
}) => {
  const tabs = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'compare', label: 'Compare', icon: Scale, badge: compareCount > 0 ? compareCount : undefined },
    { id: 'decoder', label: 'Decoder', icon: FileText },
    { id: 'lens', label: 'Your Lens', icon: UserCheck },
    { id: 'methodology', label: 'Methodology', icon: BookOpen },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe shadow-lg">
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-1 transition-all ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-0.5 rounded-full bg-brand-600 dark:bg-brand-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
