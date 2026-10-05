import React, { useState, useEffect } from 'react';
import { FoodItem } from './types/food';
import { UserProfile } from './types/profile';
import { profileRepository } from './services/profileRepository';
import { foodRepository } from './services/foodRepository';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { ProfileSwitcherModal } from './components/ProfileSwitcherModal';
import { HomeScreen } from './screens/HomeScreen';
import { FoodDetailScreen } from './screens/FoodDetailScreen';
import { CompareScreen } from './screens/CompareScreen';
import { YourLensScreen } from './screens/YourLensScreen';
import { LabelDecoderScreen } from './screens/LabelDecoderScreen';
import { MethodologyScreen } from './screens/MethodologyScreen';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<UserProfile>(profileRepository.getActiveProfile());
  const [compareList, setCompareList] = useState<string[]>(['maggi-masala-noodles', 'saffola-masala-oats']);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('foodlens_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  // Initialize profiles
  useEffect(() => {
    const loaded = profileRepository.getProfiles();
    setProfiles(loaded);
    const active = profileRepository.getActiveProfile();
    setActiveProfile(active);
  }, []);

  // Theme synchronization
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('foodlens_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('foodlens_theme', 'light');
    }
  }, [isDarkMode]);

  // PWA Install prompt listener
  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Register service worker if available in production
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration error', err);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Hash-based routing sync
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['explore', 'compare', 'decoder', 'lens', 'methodology'].includes(hash)) {
        setActiveTab(hash);
        setSelectedFood(null);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setSelectedFood(null);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = () => {
    setSelectedFood(null);
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAlternative = async (targetFoodId: string) => {
    const altFood = await foodRepository.getFoodById(targetFoodId);
    if (altFood) {
      setSelectedFood(altFood);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleCompare = (foodId: string) => {
    setCompareList((prev) => {
      if (prev.includes(foodId)) {
        return prev.filter(id => id !== foodId);
      } else {
        if (prev.length >= 3) {
          alert('You can compare up to 3 foods at a time. Remove one first!');
          return prev;
        }
        return [...prev, foodId];
      }
    });
  };

  const handleRemoveCompare = (foodId: string) => {
    setCompareList(prev => prev.filter(id => id !== foodId));
  };

  const handleAddCompare = (foodId: string) => {
    if (!compareList.includes(foodId) && compareList.length < 3) {
      setCompareList(prev => [...prev, foodId]);
    }
  };

  const handleSelectProfile = (profile: UserProfile) => {
    setActiveProfile(profile);
    profileRepository.setActiveProfile(profile.id);
  };

  const handleSaveProfile = (profile: UserProfile) => {
    const updated = profileRepository.saveProfile(profile);
    setProfiles(updated);
    if (profile.id === activeProfile.id || updated.length === 1) {
      setActiveProfile(profile);
    }
  };

  const handleDeleteProfile = (id: string) => {
    const updated = profileRepository.deleteProfile(id);
    setProfiles(updated);
    setActiveProfile(profileRepository.getActiveProfile());
  };

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => {
        setInstallPrompt(null);
      });
    } else {
      alert('To install FoodLens: tap Share or Menu in your browser, then tap "Add to Home Screen".');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        activeProfile={activeProfile}
        onOpenProfileSwitcher={() => setIsProfileModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onInstallClick={handleInstallClick}
        canInstall={!!installPrompt}
        activeTab={activeTab}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'detail' && selectedFood ? (
          <FoodDetailScreen
            food={selectedFood}
            activeProfile={activeProfile}
            onBack={handleBackFromDetail}
            onSelectAlternative={handleSelectAlternative}
            onToggleCompare={handleToggleCompare}
            isQueuedForCompare={compareList.includes(selectedFood.id)}
            onOpenProfileSwitcher={() => setIsProfileModalOpen(true)}
          />
        ) : activeTab === 'compare' ? (
          <CompareScreen
            compareIds={compareList}
            activeProfile={activeProfile}
            onRemoveFood={handleRemoveCompare}
            onAddFood={handleAddCompare}
            onSelectFood={handleSelectFood}
          />
        ) : activeTab === 'decoder' ? (
          <LabelDecoderScreen />
        ) : activeTab === 'lens' ? (
          <YourLensScreen
            profiles={profiles}
            activeProfile={activeProfile}
            onSelectProfile={handleSelectProfile}
            onSaveProfile={handleSaveProfile}
            onDeleteProfile={handleDeleteProfile}
            onSelectFood={handleSelectFood}
          />
        ) : activeTab === 'methodology' ? (
          <MethodologyScreen />
        ) : (
          <HomeScreen
            activeProfile={activeProfile}
            onSelectFood={handleSelectFood}
            onNavigate={handleNavigate}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
            onOpenProfileSwitcher={() => setIsProfileModalOpen(true)}
          />
        )}
      </main>

      {/* Profile Switcher Modal */}
      <ProfileSwitcherModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profiles={profiles}
        activeProfile={activeProfile}
        onSelectProfile={handleSelectProfile}
        onManageProfiles={() => {
          setIsProfileModalOpen(false);
          handleNavigate('lens');
        }}
      />

      {/* Bottom Navigation for Mobile */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={handleNavigate}
        compareCount={compareList.length}
      />
    </div>
  );
}

export default App;
