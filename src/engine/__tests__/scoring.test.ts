import { describe, it, expect } from 'vitest';
import { calculateFoodScore } from '../scoring';
import { NutritionData, IngredientItem } from '../../types/food';

describe('FoodScore Calculation Engine', () => {
  it('assigns high score (Grade A/B) to nutrient dense whole foods with zero added sugar', () => {
    const nutrition: NutritionData = {
      calories: 120,
      protein: 8,
      carbohydrates: 18,
      totalSugar: 1,
      addedSugar: 0,
      dietaryFiber: 6,
      totalFat: 2.5,
      saturatedFat: 0.5,
      transFat: 0,
      sodium: 120,
      iron: 3.5,
      calcium: 60,
      potassium: 350,
    };

    const ingredients: IngredientItem[] = [
      { name: 'Moong Dal', processingLevel: 'unprocessed' },
      { name: 'Spinach', processingLevel: 'unprocessed' },
      { name: 'Cumin', processingLevel: 'culinary' },
      { name: 'Mustard Oil', processingLevel: 'culinary' },
    ];

    const score = calculateFoodScore(nutrition, ingredients);
    expect(score.overallScore).toBeGreaterThanOrEqual(75);
    expect(['A', 'B']).toContain(score.grade);
    expect(score.sugarSodiumPenalty).toBe(0);
  });

  it('penalizes ultra-processed items with high added sugar and trans fat', () => {
    const nutrition: NutritionData = {
      calories: 495,
      protein: 4.5,
      carbohydrates: 68,
      totalSugar: 32,
      addedSugar: 30,
      dietaryFiber: 1.2,
      totalFat: 22,
      saturatedFat: 11,
      transFat: 0.3,
      sodium: 480,
    };

    const ingredients: IngredientItem[] = [
      { name: 'Refined Wheat Flour (Maida)', processingLevel: 'processed' },
      { name: 'Sugar', processingLevel: 'culinary' },
      { name: 'Palm Oil', processingLevel: 'ultra_processed' },
      { name: 'INS 500(ii) Leavening agent', processingLevel: 'ultra_processed' },
      { name: 'Artificial Flavoring Substances (Vanilla)', processingLevel: 'ultra_processed' },
    ];

    const score = calculateFoodScore(nutrition, ingredients);
    expect(score.overallScore).toBeLessThan(45);
    expect(['D', 'E']).toContain(score.grade);
    expect(score.sugarSodiumPenalty).toBeLessThanOrEqual(-15);
  });

  it('breaks down all 4 scoring factors transparently', () => {
    const nutrition: NutritionData = {
      calories: 250,
      protein: 10,
      carbohydrates: 30,
      totalSugar: 5,
      addedSugar: 2,
      dietaryFiber: 4,
      totalFat: 8,
      saturatedFat: 2,
      transFat: 0,
      sodium: 300,
    };

    const score = calculateFoodScore(nutrition, []);
    expect(score.factors).toHaveLength(4);
    expect(score.factors.map(f => f.factor)).toEqual([
      'nutrient_density',
      'processing',
      'sugar_sodium',
      'lipid_quality',
    ]);
  });
});
