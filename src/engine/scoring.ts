import { NutritionData, IngredientItem, FoodClaim, FoodScoreBreakdown, ScoreFactor } from '../types/food';

/**
 * Calculates a fully transparent FoodScore (0-100) based on 4 evidence-based pillars:
 * 1. Nutrient Density (Protein, Fiber, Micronutrients)
 * 2. Processing & Ingredient Wholesomeness (NOVA equivalent)
 * 3. Added Sugar & Sodium Impact
 * 4. Lipid Quality (Saturated fat, trans fat, healthy fats)
 *
 * Adheres to principle: "Context, not villains".
 */
export function calculateFoodScore(
  nutrition: NutritionData,
  ingredients: IngredientItem[] = [],
  _claims: FoodClaim[] = []
): FoodScoreBreakdown {
  const factors: ScoreFactor[] = [];

  // 1. Pillar 1: Nutrient Density (+30 to -10)
  let nutrientDensityPoints = 0;
  
  // Protein (+2 pts per 3g, up to +12)
  const proteinPts = Math.min(12, Math.round((nutrition.protein / 3) * 2));
  nutrientDensityPoints += proteinPts;

  // Fiber (+2.5 pts per 2g, up to +10)
  const fiberPts = Math.min(10, Math.round((nutrition.dietaryFiber / 2) * 2.5));
  nutrientDensityPoints += fiberPts;

  // Micronutrients bonus (Iron, Calcium, Potassium) (up to +8)
  let microPts = 0;
  if ((nutrition.iron ?? 0) > 2) microPts += 3;
  if ((nutrition.calcium ?? 0) > 100) microPts += 3;
  if ((nutrition.potassium ?? 0) > 300) microPts += 2;
  nutrientDensityPoints += microPts;

  // Empty calorie penalty (high calories with negligible protein and fiber)
  if (nutrition.calories > 350 && nutrition.protein < 2 && nutrition.dietaryFiber < 1) {
    nutrientDensityPoints -= 8;
  }
  nutrientDensityPoints = Math.max(-10, Math.min(30, nutrientDensityPoints));

  factors.push({
    factor: 'nutrient_density',
    label: 'Nutrient Density',
    points: nutrientDensityPoints,
    maxPoints: 30,
    impact: nutrientDensityPoints >= 15 ? 'positive' : nutrientDensityPoints >= 5 ? 'neutral' : 'negative',
    explanation: `${nutrition.protein}g protein, ${nutrition.dietaryFiber}g fiber per 100g${microPts > 0 ? ' with micronutrient density' : ''}.`
  });

  // 2. Pillar 2: Processing & Ingredient Integrity (+25 to -15)
  let processingPoints = 0;
  const ultraProcessedCount = ingredients.filter(i => i.processingLevel === 'ultra_processed').length;
  const processedCount = ingredients.filter(i => i.processingLevel === 'processed').length;
  const culinaryCount = ingredients.filter(i => i.processingLevel === 'culinary').length;
  const unprocessedCount = ingredients.filter(i => i.processingLevel === 'unprocessed').length;

  if (ultraProcessedCount >= 3) {
    processingPoints = -15;
  } else if (ultraProcessedCount >= 1) {
    processingPoints = -8;
  } else if (processedCount > 0) {
    processingPoints = 8;
  } else if (culinaryCount > 0 && unprocessedCount > 0) {
    processingPoints = 20;
  } else if (unprocessedCount > 0) {
    processingPoints = 25;
  } else {
    processingPoints = 12; // default whole baseline
  }

  factors.push({
    factor: 'processing',
    label: 'Processing Level',
    points: processingPoints,
    maxPoints: 25,
    impact: processingPoints >= 15 ? 'positive' : processingPoints >= 0 ? 'neutral' : 'negative',
    explanation: ultraProcessedCount > 0 
      ? `Contains ${ultraProcessedCount} ultra-processed ingredient(s) or industrial additives.`
      : unprocessedCount > 0 ? 'Made from whole, minimally refined natural ingredients.' : 'Moderately culinary processed.'
  });

  // 3. Pillar 3: Sugar & Sodium Impact (0 to -35 penalty)
  let sugarSodiumPenalty = 0;
  let sugarPenalty = 0;
  if (nutrition.addedSugar > 20) {
    sugarPenalty = -20;
  } else if (nutrition.addedSugar > 10) {
    sugarPenalty = -12;
  } else if (nutrition.addedSugar > 4) {
    sugarPenalty = -6;
  }

  let sodiumPenalty = 0;
  if (nutrition.sodium > 800) {
    sodiumPenalty = -15;
  } else if (nutrition.sodium > 400) {
    sodiumPenalty = -8;
  } else if (nutrition.sodium > 200) {
    sodiumPenalty = -3;
  }

  sugarSodiumPenalty = Math.max(-35, sugarPenalty + sodiumPenalty);

  factors.push({
    factor: 'sugar_sodium',
    label: 'Sugar & Sodium Moderation',
    points: sugarSodiumPenalty,
    maxPoints: 0,
    impact: sugarSodiumPenalty >= -5 ? 'positive' : sugarSodiumPenalty >= -15 ? 'neutral' : 'negative',
    explanation: `${nutrition.addedSugar}g added sugar, ${nutrition.sodium}mg sodium per 100g.`
  });

  // 4. Pillar 4: Lipid Quality (+20 to -15)
  let lipidPoints = 5; // neutral start
  if (nutrition.transFat > 0.2) {
    lipidPoints -= 15;
  }
  if (nutrition.saturatedFat > 10) {
    lipidPoints -= 10;
  } else if (nutrition.saturatedFat > 5) {
    lipidPoints -= 4;
  } else if (nutrition.saturatedFat <= 1.5 && nutrition.totalFat > 0) {
    lipidPoints += 10; // low saturated fat
  }

  // Healthy unsaturated fat indicator
  const unsaturatedFat = Math.max(0, nutrition.totalFat - nutrition.saturatedFat - nutrition.transFat);
  if (unsaturatedFat >= 6 && nutrition.transFat <= 0.1) {
    lipidPoints += 5; // healthy nuts/oils bonus
  }
  lipidPoints = Math.max(-15, Math.min(20, lipidPoints));

  factors.push({
    factor: 'lipid_quality',
    label: 'Lipid & Fat Quality',
    points: lipidPoints,
    maxPoints: 20,
    impact: lipidPoints >= 10 ? 'positive' : lipidPoints >= 0 ? 'neutral' : 'negative',
    explanation: `${nutrition.saturatedFat}g sat fat, ${nutrition.transFat}g trans fat out of ${nutrition.totalFat}g total fat.`
  });

  // Composite calculation: Base 42 + sum of factor points
  const rawScore = 42 + nutrientDensityPoints + processingPoints + sugarSodiumPenalty + lipidPoints;
  const overallScore = Math.max(5, Math.min(96, Math.round(rawScore)));

  let grade: 'A' | 'B' | 'C' | 'D' | 'E';
  let summaryLabel: string;

  if (overallScore >= 80) {
    grade = 'A';
    summaryLabel = 'Optimal Everyday Choice';
  } else if (overallScore >= 65) {
    grade = 'B';
    summaryLabel = 'Nutritious & Balanced';
  } else if (overallScore >= 50) {
    grade = 'C';
    summaryLabel = 'Moderate / Enjoy in Context';
  } else if (overallScore >= 35) {
    grade = 'D';
    summaryLabel = 'Occasional Indulgence';
  } else {
    grade = 'E';
    summaryLabel = 'Mindful Portion / Rare Treat';
  }

  return {
    overallScore,
    grade,
    summaryLabel,
    nutrientDensityScore: nutrientDensityPoints,
    processingScore: processingPoints,
    sugarSodiumPenalty,
    lipidQualityScore: lipidPoints,
    factors
  };
}
