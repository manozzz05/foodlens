import { UserProfile } from '../types/profile';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'user-self',
    name: 'Kabir (You)',
    relationship: 'Myself',
    avatarColor: '#0d9488', // Emerald teal
    dietaryPreference: 'all',
    allergens: [],
    healthConditions: ['muscle_gain', 'weight_loss'],
    dailyCalorieTarget: 2100,
  },
  {
    id: 'user-mom',
    name: 'Mummy (Sunita)',
    relationship: 'Mother',
    avatarColor: '#ec4899', // Pink
    dietaryPreference: 'vegetarian',
    allergens: [],
    healthConditions: ['diabetes', 'hypertension'],
    dailyCalorieTarget: 1700,
  },
  {
    id: 'user-dad',
    name: 'Papa (Rajesh)',
    relationship: 'Father',
    avatarColor: '#3b82f6', // Blue
    dietaryPreference: 'vegetarian',
    allergens: [],
    healthConditions: ['hypertension', 'high_cholesterol'],
    dailyCalorieTarget: 1900,
  },
  {
    id: 'user-aarav',
    name: 'Aarav',
    relationship: 'Child',
    avatarColor: '#8b5cf6', // Violet
    dietaryPreference: 'vegetarian',
    allergens: ['peanut', 'tree_nut'],
    healthConditions: [],
    dailyCalorieTarget: 1600,
  },
  {
    id: 'user-dadi',
    name: 'Dadi ji',
    relationship: 'Grandmother',
    avatarColor: '#f59e0b', // Amber
    dietaryPreference: 'jain',
    allergens: [],
    healthConditions: ['diabetes'],
    dailyCalorieTarget: 1500,
  },
];
