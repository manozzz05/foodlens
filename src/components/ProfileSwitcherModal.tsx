import React from 'react';
import { UserProfile } from '../types/profile';
import { X, Check, Plus, HeartPulse, AlertCircle, ShieldAlert } from 'lucide-react';

interface ProfileSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: UserProfile[];
  activeProfile: UserProfile;
  onSelectProfile: (profile: UserProfile) => void;
  onManageProfiles: () => void;
}

export const ProfileSwitcherModal: React.FC<ProfileSwitcherModalProps> = ({
  isOpen,
  onClose,
  profiles,
  activeProfile,
  onSelectProfile,
  onManageProfiles
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Switch "Your Lens"</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select whose health perspective evaluates each food verdict.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile List */}
        <div className="p-4 space-y-2.5 overflow-y-auto no-scrollbar flex-1">
          {profiles.map((profile) => {
            const isActive = profile.id === activeProfile.id;
            return (
              <div
                key={profile.id}
                onClick={() => {
                  onSelectProfile(profile);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 shadow-sm'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm shrink-0"
                    style={{ backgroundColor: profile.avatarColor }}
                  >
                    {profile.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {profile.name}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 capitalize bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {profile.relationship}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                      <span className="capitalize font-medium text-slate-700 dark:text-slate-300">
                        {profile.dietaryPreference}
                      </span>
                      {profile.healthConditions.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center gap-0.5 text-amber-700 dark:text-amber-400">
                            <HeartPulse size={12} />
                            <span>{profile.healthConditions.map(c => c.replace('_', ' ')).join(', ')}</span>
                          </span>
                        </>
                      )}
                      {profile.allergens.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center gap-0.5 text-rose-600 dark:text-rose-400">
                            <ShieldAlert size={12} />
                            <span>No {profile.allergens.join(', ')}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 ml-2">
                  {isActive && (
                    <span className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center">
                      <Check size={14} />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onManageProfiles();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus size={14} />
            <span>Manage or Add Family Member</span>
          </button>
        </div>
      </div>
    </div>
  );
};
