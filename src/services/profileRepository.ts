import { UserProfile } from '../types/profile';
import { INITIAL_PROFILES } from '../data/mockProfiles';

const STORAGE_KEY_PROFILES = 'foodlens_profiles_v1';
const STORAGE_KEY_ACTIVE = 'foodlens_active_profile_id_v1';

export const profileRepository = {
  getProfiles(): UserProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PROFILES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading profiles from localStorage', e);
    }
    return INITIAL_PROFILES;
  },

  getActiveProfile(): UserProfile {
    const profiles = this.getProfiles();
    try {
      const activeId = localStorage.getItem(STORAGE_KEY_ACTIVE);
      if (activeId) {
        const found = profiles.find(p => p.id === activeId);
        if (found) return found;
      }
    } catch (e) {
      console.warn('Error reading active profile from localStorage', e);
    }
    return profiles[0] || INITIAL_PROFILES[0];
  },

  setActiveProfile(id: string): void {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE, id);
    } catch (e) {
      console.warn('Error setting active profile', e);
    }
  },

  saveProfile(profile: UserProfile): UserProfile[] {
    const profiles = this.getProfiles();
    const existingIndex = profiles.findIndex(p => p.id === profile.id);
    let updated: UserProfile[];

    if (existingIndex >= 0) {
      updated = [...profiles];
      updated[existingIndex] = profile;
    } else {
      updated = [...profiles, profile];
    }

    try {
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(updated));
    } catch (e) {
      console.warn('Error saving profiles to localStorage', e);
    }
    return updated;
  },

  deleteProfile(id: string): UserProfile[] {
    const profiles = this.getProfiles();
    const updated = profiles.filter(p => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(updated));
      if (localStorage.getItem(STORAGE_KEY_ACTIVE) === id) {
        localStorage.setItem(STORAGE_KEY_ACTIVE, updated[0]?.id || INITIAL_PROFILES[0].id);
      }
    } catch (e) {
      console.warn('Error deleting profile', e);
    }
    return updated;
  }
};
