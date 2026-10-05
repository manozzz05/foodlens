export type DietaryPreference = 'all' | 'vegetarian' | 'vegan' | 'jain' | 'halal';

export type HealthCondition = 
  | 'diabetes'
  | 'hypertension'
  | 'high_cholesterol'
  | 'weight_loss'
  | 'muscle_gain'
  | 'celiac';

export interface UserProfile {
  id: string;
  name: string;
  relationship: string;      // "Myself", "Mother", "Father", "Kid", "Partner"
  avatarColor: string;
  dietaryPreference: DietaryPreference;
  allergens: string[];       // 'gluten', 'dairy', 'peanut', 'tree_nut', 'soy', 'egg'
  healthConditions: HealthCondition[];
  dailyCalorieTarget?: number;
}

export type LensFitStatus = 'ideal' | 'moderate' | 'caution' | 'incompatible';

export interface LensWarning {
  level: 'critical' | 'caution' | 'info';
  title: string;
  detail: string;
}

export interface LensEvaluation {
  profileId: string;
  profileName: string;
  fitStatus: LensFitStatus;
  fitBadgeText: string;
  personalizedHeadline: string;
  reasons: string[];
  warnings: LensWarning[];
  recommendation: 'enjoy' | 'portion_control' | 'occasional' | 'swap_recommended' | 'avoid';
  isDietCompatible: boolean;
  isAllergenSafe: boolean;
}
