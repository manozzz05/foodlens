import { FoodItem, ServingPortion } from '../types/food';
import { UserProfile, LensEvaluation, LensWarning, LensFitStatus } from '../types/profile';

/**
 * Evaluates a food item against a personalized user profile ("Your Lens").
 * Generates clear, non-alarmist guidance and personal fit status.
 */
export function evaluateLens(
  food: FoodItem,
  profile: UserProfile,
  selectedPortion?: ServingPortion
): LensEvaluation {
  const portion = selectedPortion || food.servingPortions[0] || {
    name: '100g',
    weightGrams: 100,
    unitLabel: 'g'
  };

  const portionRatio = portion.weightGrams / 100;
  const portionCalories = Math.round(food.nutritionPer100g.calories * portionRatio);
  const portionProtein = Math.round(food.nutritionPer100g.protein * portionRatio * 10) / 10;
  const portionAddedSugar = Math.round(food.nutritionPer100g.addedSugar * portionRatio * 10) / 10;
  const portionSodium = Math.round(food.nutritionPer100g.sodium * portionRatio);
  const portionSatFat = Math.round(food.nutritionPer100g.saturatedFat * portionRatio * 10) / 10;

  const warnings: LensWarning[] = [];
  const reasons: string[] = [];
  let isDietCompatible = true;
  let isAllergenSafe = true;

  // 1. Dietary Preference Check
  if (profile.dietaryPreference === 'jain') {
    const isJain = food.dietFlags.includes('jain');
    if (!isJain) {
      isDietCompatible = false;
      warnings.push({
        level: 'critical',
        title: 'Dietary Restriction',
        detail: 'Not certified Jain. May contain root vegetables, onion, garlic, or animal products.'
      });
    } else {
      reasons.push('Verified Jain friendly (zero root vegetables, onion, or garlic).');
    }
  } else if (profile.dietaryPreference === 'vegan') {
    const isVegan = food.dietFlags.includes('vegan');
    if (!isVegan) {
      isDietCompatible = false;
      warnings.push({
        level: 'critical',
        title: 'Vegan Restriction',
        detail: 'Contains dairy, honey, eggs, or animal-derived ingredients.'
      });
    }
  } else if (profile.dietaryPreference === 'vegetarian') {
    const isVeg = food.dietFlags.includes('vegetarian');
    if (!isVeg) {
      isDietCompatible = false;
      warnings.push({
        level: 'critical',
        title: 'Non-Vegetarian Item',
        detail: 'Contains meat, poultry, seafood, or animal gelatine.'
      });
    }
  }

  // 2. Allergen Screening
  for (const allergen of profile.allergens) {
    const lowerAllergen = allergen.toLowerCase();
    const allergenFlagPresent = food.dietFlags.some(f => {
      if (lowerAllergen.includes('gluten') && f === 'gluten_free') return false;
      if (lowerAllergen.includes('nut') && f === 'nut_free') return false;
      if (lowerAllergen.includes('dairy') && f === 'dairy_free') return false;
      return false;
    });

    const ingredientClash = food.ingredients.some(i => 
      i.isAllergen && i.allergenType?.toLowerCase().includes(lowerAllergen)
    );

    // Specific direct allergen checks
    let detected = ingredientClash;
    if (lowerAllergen === 'dairy' && !food.dietFlags.includes('dairy_free') && food.category === 'dairy') {
      detected = true;
    }
    if (lowerAllergen === 'gluten' && !food.dietFlags.includes('gluten_free')) {
      const hasGluten = food.ingredients.some(i => 
        /wheat|maida|atta|barley|rye|semolina|suji/i.test(i.name)
      );
      if (hasGluten) detected = true;
    }
    if (lowerAllergen === 'nuts' || lowerAllergen === 'peanut' || lowerAllergen === 'tree_nut') {
      const hasNuts = food.ingredients.some(i => 
        /peanut|cashew|kaju|badam|almond|walnut|pista/i.test(i.name)
      );
      if (hasNuts) detected = true;
    }

    if (detected) {
      isAllergenSafe = false;
      warnings.push({
        level: 'critical',
        title: `Allergen Alert: ${allergen.toUpperCase()}`,
        detail: `Contains ${allergen} ingredients. Severe risk for ${profile.name}'s recorded allergy.`
      });
    }
  }

  // 3. Health Conditions Impact
  let cautionCount = 0;

  // Diabetes / Blood Sugar Lens
  if (profile.healthConditions.includes('diabetes')) {
    if (portionAddedSugar > 8) {
      cautionCount += 2;
      warnings.push({
        level: 'caution',
        title: 'Blood Sugar Surge Risk',
        detail: `${portionAddedSugar}g added sugar per ${portion.name} may trigger a sharp glucose spike.`
      });
    } else if (portionAddedSugar > 4) {
      cautionCount += 1;
      warnings.push({
        level: 'info',
        title: 'Moderate Sugar',
        detail: `${portionAddedSugar}g sugar per serving. Best paired with fiber or protein.`
      });
    } else if (food.dietFlags.includes('diabetic_friendly')) {
      reasons.push('Low glycemic impact with adequate fiber for blood sugar stability.');
    }
  }

  // Hypertension / Low Sodium Lens
  if (profile.healthConditions.includes('hypertension')) {
    if (portionSodium > 600) {
      cautionCount += 2;
      warnings.push({
        level: 'caution',
        title: 'High Sodium for Blood Pressure',
        detail: `${portionSodium}mg sodium in ${portion.name} (~30% of daily recommended limit for hypertension).`
      });
    } else if (portionSodium > 350) {
      cautionCount += 1;
      warnings.push({
        level: 'info',
        title: 'Moderate Sodium',
        detail: `${portionSodium}mg sodium per serving. Monitor total daily salt intake.`
      });
    } else {
      reasons.push(`Heart-safe sodium levels (${portionSodium}mg per ${portion.name}).`);
    }
  }

  // High Cholesterol / Heart Care Lens
  if (profile.healthConditions.includes('high_cholesterol')) {
    if (portionSatFat > 4 || food.nutritionPer100g.transFat > 0.1) {
      cautionCount += 1;
      warnings.push({
        level: 'caution',
        title: 'Saturated / Trans Fat Consideration',
        detail: `${portionSatFat}g saturated fat per serving. Heart guidelines recommend keeping under 13g daily.`
      });
    }
  }

  // Weight Management Lens
  if (profile.healthConditions.includes('weight_loss')) {
    if (portionCalories > 350) {
      cautionCount += 1;
      warnings.push({
        level: 'info',
        title: 'High Calorie Density',
        detail: `${portionCalories} kcal per ${portion.name}. Savor mindful portions.`
      });
    } else if (food.nutritionPer100g.dietaryFiber >= 4) {
      reasons.push(`High fiber (${Math.round(food.nutritionPer100g.dietaryFiber * portionRatio)}g) promotes sustained fullness.`);
    }
  }

  // Muscle Gain Lens
  if (profile.healthConditions.includes('muscle_gain')) {
    if (portionProtein >= 12) {
      reasons.push(`High protein yield: ${portionProtein}g protein per ${portion.name}!`);
    } else if (portionProtein < 3 && portionCalories > 200) {
      warnings.push({
        level: 'info',
        title: 'Low Protein Ratio',
        detail: `Only ${portionProtein}g protein for ${portionCalories} kcal. Pair with a protein source.`
      });
    }
  }

  // 4. Synthesize Status & Verdict
  let fitStatus: LensFitStatus = 'ideal';
  let fitBadgeText = `Great match for ${profile.name}`;
  let recommendation: LensEvaluation['recommendation'] = 'enjoy';
  let personalizedHeadline = '';

  if (!isDietCompatible || !isAllergenSafe) {
    fitStatus = 'incompatible';
    fitBadgeText = !isAllergenSafe ? `Allergen Clash for ${profile.name}` : `Dietary Clash for ${profile.name}`;
    recommendation = 'avoid';
    personalizedHeadline = !isAllergenSafe
      ? `Avoid for ${profile.name}: contains flagged allergen ingredients.`
      : `Does not align with ${profile.name}'s ${profile.dietaryPreference} dietary preferences.`;
  } else if (cautionCount >= 2) {
    fitStatus = 'caution';
    fitBadgeText = `Caution for ${profile.name}`;
    recommendation = 'swap_recommended';
    personalizedHeadline = `Requires caution for ${profile.name} due to ${profile.healthConditions.join(', ')} considerations.`;
  } else if (cautionCount === 1) {
    fitStatus = 'moderate';
    fitBadgeText = `Mindful Portion for ${profile.name}`;
    recommendation = 'portion_control';
    personalizedHeadline = `Suitable in controlled portions for ${profile.name}. Check serving guidance.`;
  } else {
    fitStatus = 'ideal';
    fitBadgeText = `Ideal Fit for ${profile.name}`;
    recommendation = 'enjoy';
    personalizedHeadline = `Excellent alignment with ${profile.name}'s health goals and dietary preferences.`;
  }

  return {
    profileId: profile.id,
    profileName: profile.name,
    fitStatus,
    fitBadgeText,
    personalizedHeadline,
    reasons,
    warnings,
    recommendation,
    isDietCompatible,
    isAllergenSafe
  };
}
