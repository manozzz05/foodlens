export type ConfidenceTier = 'verified' | 'community' | 'estimated';

export type DietFlag = 
  | 'vegetarian'
  | 'vegan'
  | 'jain'
  | 'halal'
  | 'gluten_free'
  | 'dairy_free'
  | 'nut_free'
  | 'diabetic_friendly'
  | 'high_protein';

export type FoodCategory =
  | 'fruits'
  | 'vegetables'
  | 'protein'
  | 'grains'
  | 'dairy'
  | 'fast_food'
  | 'snacks'
  | 'beverages'
  | 'indian_foods'
  | 'desserts'
  | 'nuts_and_seeds'
  | 'packaged_foods';

export interface ServingPortion {
  name: string;        // e.g., "1 katori (150g)", "1 roti", "1 glass (200ml)"
  weightGrams: number; // e.g., 150
  unitLabel: string;   // "katori", "roti", "piece", "glass", "plate", "pack"
  isDefault?: boolean;
}

export interface NutritionData {
  calories: number;        // kcal
  protein: number;         // g
  carbohydrates: number;   // g
  totalSugar: number;      // g
  addedSugar: number;      // g
  dietaryFiber: number;    // g
  totalFat: number;        // g
  saturatedFat: number;    // g
  transFat: number;        // g
  sodium: number;          // mg
  cholesterol?: number;    // mg
  potassium?: number;      // mg
  calcium?: number;        // mg
  iron?: number;           // mg
  zinc?: number;           // mg
  magnesium?: number;      // mg
}

export type ProcessingLevel = 'unprocessed' | 'culinary' | 'processed' | 'ultra_processed';

export interface IngredientItem {
  name: string;
  hindiName?: string;
  purpose?: string;
  processingLevel: ProcessingLevel;
  concerns?: string;       // Evidence-based context without fear
  isAllergen?: boolean;
  allergenType?: string;   // 'gluten' | 'dairy' | 'nut' | 'soy' | 'egg'
}

export interface FoodClaim {
  claim: string;           // e.g. "No Added Sugar", "Multigrain", "100% Real Juice"
  isMisleading: boolean;
  verdict: string;         // e.g. "Accurate", "Misleading Context", "Technically True but High in Substitutes"
  explanation: string;
  fssaiRuleReference?: string;
}

export interface ScoreFactor {
  factor: 'nutrient_density' | 'processing' | 'sugar_sodium' | 'lipid_quality';
  label: string;
  points: number;          // points contributed to the 0-100 total
  maxPoints: number;
  impact: 'positive' | 'negative' | 'neutral';
  explanation: string;
}

export interface FoodScoreBreakdown {
  overallScore: number;    // 0 - 100
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  summaryLabel: string;    // e.g. "Excellent Daily Choice", "Fine Occasionally"
  nutrientDensityScore: number;
  processingScore: number;
  sugarSodiumPenalty: number;
  lipidQualityScore: number;
  factors: ScoreFactor[];
}

export interface BetterAlternative {
  targetFoodId: string;
  reasonBadge: string;     // e.g. "65% less sugar", "4x more fiber", "No palm oil"
  note: string;
}

export interface FoodItem {
  id: string;
  name: string;
  hindiName?: string;
  brand?: string;          // e.g., "Amul", "Britannia", "Homemade", "Haldiram's"
  category: FoodCategory;
  imageUrl?: string;
  confidence: ConfidenceTier;
  dietFlags: DietFlag[];
  servingPortions: ServingPortion[];
  nutritionPer100g: NutritionData;
  ingredients: IngredientItem[];
  claims: FoodClaim[];
  foodScore: FoodScoreBreakdown;
  verdictHeadline: string; // Plain language verdict e.g., "Fine occasionally, high in added sugar"
  advantages: string[];
  thingsToConsider: string[];
  betterAlternatives: BetterAlternative[];
  priceEstimateInr?: number;
  preparationNote?: string;
}
