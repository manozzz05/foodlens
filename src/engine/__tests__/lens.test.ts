import { describe, it, expect } from 'vitest';
import { evaluateLens } from '../lensEvaluator';
import { FoodItem } from '../../types/food';
import { UserProfile } from '../../types/profile';

describe('Lens Personalization Evaluator', () => {
  const sampleSweet: FoodItem = {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    category: 'desserts',
    confidence: 'verified',
    dietFlags: ['vegetarian'],
    servingPortions: [{ name: '2 pieces (80g)', weightGrams: 80, unitLabel: 'pieces' }],
    nutritionPer100g: {
      calories: 380,
      protein: 5,
      carbohydrates: 55,
      totalSugar: 38,
      addedSugar: 35,
      dietaryFiber: 0.5,
      totalFat: 16,
      saturatedFat: 8,
      transFat: 0,
      sodium: 85,
    },
    ingredients: [
      { name: 'Mawa / Khoya', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Sugar Syrup', processingLevel: 'culinary' },
      { name: 'Refined Flour', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Ghee', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
    ],
    claims: [],
    foodScore: {
      overallScore: 28,
      grade: 'E',
      summaryLabel: 'Mindful Portion / Rare Treat',
      nutrientDensityScore: 2,
      processingScore: 10,
      sugarSodiumPenalty: -25,
      lipidQualityScore: -5,
      factors: []
    },
    verdictHeadline: 'High sugar festival treat. Best enjoyed occasionally.',
    advantages: ['Traditional cultural sweet'],
    thingsToConsider: ['Rapid glycemic spike', 'High calories in small volume'],
    betterAlternatives: []
  };

  it('triggers blood sugar caution for a diabetic profile', () => {
    const diabeticMom: UserProfile = {
      id: 'mom',
      name: 'Mom',
      relationship: 'Mother',
      avatarColor: '#ec4899',
      dietaryPreference: 'vegetarian',
      allergens: [],
      healthConditions: ['diabetes'],
    };

    const evaluation = evaluateLens(sampleSweet, diabeticMom);
    expect(evaluation.fitStatus).toBe('caution');
    expect(evaluation.warnings.some(w => w.title.includes('Blood Sugar'))).toBe(true);
    expect(evaluation.isDietCompatible).toBe(true);
    expect(evaluation.isAllergenSafe).toBe(true);
  });

  it('flags an incompatible allergen clash when user has dairy allergy', () => {
    const allergicKid: UserProfile = {
      id: 'kid',
      name: 'Aarav',
      relationship: 'Child',
      avatarColor: '#3b82f6',
      dietaryPreference: 'all',
      allergens: ['dairy'],
      healthConditions: [],
    };

    const evaluation = evaluateLens(sampleSweet, allergicKid);
    expect(evaluation.fitStatus).toBe('incompatible');
    expect(evaluation.isAllergenSafe).toBe(false);
    expect(evaluation.warnings.some(w => w.title.includes('DAIRY'))).toBe(true);
  });

  it('flags non-Jain food for a Jain profile', () => {
    const jainProfile: UserProfile = {
      id: 'grandpa',
      name: 'Dada ji',
      relationship: 'Grandfather',
      avatarColor: '#f59e0b',
      dietaryPreference: 'jain',
      allergens: [],
      healthConditions: [],
    };

    const onionDal: FoodItem = {
      ...sampleSweet,
      id: 'dal-fry',
      name: 'Dal Fry with Onion Garlic',
      dietFlags: ['vegetarian'], // Notice NOT flagged as 'jain'
      ingredients: [
        { name: 'Yellow Moong Dal', processingLevel: 'unprocessed' },
        { name: 'Onion', processingLevel: 'unprocessed' },
        { name: 'Garlic', processingLevel: 'unprocessed' },
      ]
    };

    const evaluation = evaluateLens(onionDal, jainProfile);
    expect(evaluation.fitStatus).toBe('incompatible');
    expect(evaluation.isDietCompatible).toBe(false);
  });
});
