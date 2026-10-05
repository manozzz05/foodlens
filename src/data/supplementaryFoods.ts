import { FoodItem, FoodCategory, ConfidenceTier, DietFlag, ServingPortion, NutritionData, IngredientItem, FoodClaim, BetterAlternative } from '../types/food';
import { calculateFoodScore } from '../engine/scoring';

interface MiniFoodDef {
  id: string;
  name: string;
  hindiName?: string;
  brand?: string;
  category: FoodCategory;
  confidence: ConfidenceTier;
  dietFlags: DietFlag[];
  servingPortions: ServingPortion[];
  nutritionPer100g: NutritionData;
  ingredients: IngredientItem[];
  claims: FoodClaim[];
  verdictHeadline: string;
  advantages: string[];
  thingsToConsider: string[];
  betterAlternatives: BetterAlternative[];
  priceEstimateInr?: number;
}

export const ADDITIONAL_FOODS: MiniFoodDef[] = [
  // --- FAST FOOD & RESTAURANT ---
  {
    id: 'pav-bhaji',
    name: 'Mumbai Pav Bhaji with Butter',
    hindiName: 'पाव भाजी',
    brand: 'Street Stall / Restaurant',
    category: 'fast_food',
    confidence: 'estimated',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [{ name: '1 Plate (2 Pavs + Bhaji, 280g)', weightGrams: 280, unitLabel: 'plate', isDefault: true }],
    nutritionPer100g: { calories: 172, protein: 3.5, carbohydrates: 22.0, totalSugar: 3.0, addedSugar: 0.5, dietaryFiber: 3.2, totalFat: 8.0, saturatedFat: 4.2, transFat: 0.2, sodium: 490 },
    ingredients: [
      { name: 'Pav (Refined Wheat Bread)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Mashed Potatoes, Cauliflower, Tomatoes, Green Peas', processingLevel: 'unprocessed' },
      { name: 'Amul Butter (generous dollop)', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Pav Bhaji Masala & Salt', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Vegetable-packed comfort food, but heavily buttered with refined flour pav.',
    advantages: ['Diverse boiled vegetable medley (peas, tomatoes, cauliflower)', 'Rich in lycopene from cooked tomatoes'],
    thingsToConsider: ['Significant saturated dairy fat from melted butter', 'White bread pav induces quick glucose rise'],
    betterAlternatives: [],
    priceEstimateInr: 100
  },
  {
    id: 'hyderabadi-chicken-biryani',
    name: 'Hyderabadi Chicken Dum Biryani',
    hindiName: 'चिकन बिरयानी',
    brand: 'Restaurant / Paradise Style',
    category: 'fast_food',
    confidence: 'estimated',
    dietFlags: ['halal', 'gluten_free', 'high_protein'],
    servingPortions: [{ name: '1 Portion (350g)', weightGrams: 350, unitLabel: 'portion', isDefault: true }],
    nutritionPer100g: { calories: 198, protein: 9.8, carbohydrates: 24.5, totalSugar: 1.2, addedSugar: 0, dietaryFiber: 1.4, totalFat: 7.2, saturatedFat: 2.8, transFat: 0.1, sodium: 440 },
    ingredients: [
      { name: 'Basmati Rice', processingLevel: 'unprocessed' },
      { name: 'Marinated Chicken with Bone', processingLevel: 'unprocessed' },
      { name: 'Ghee & Fried Onions (Birista)', processingLevel: 'culinary' },
      { name: 'Whole Biryani Spices (Star Anise, Mace, Saffron)', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Royal culinary classic. Good protein from slow-cooked chicken, with dense calorie and sodium levels.',
    advantages: ['Substantial protein per portion (~34g in full serving)', 'Rich in aromatic spice polyphenols'],
    thingsToConsider: ['Large portion sizes easily reach 700+ kcal', 'Fried onions and ghee elevate total calories'],
    betterAlternatives: [],
    priceEstimateInr: 220
  },
  {
    id: 'steamed-veg-momos',
    name: 'Steamed Vegetable Momos (6 pcs)',
    hindiName: 'वेज मोमोज़',
    brand: 'Street Vendor / Wow! Momo',
    category: 'fast_food',
    confidence: 'estimated',
    dietFlags: ['vegetarian', 'vegan', 'halal'],
    servingPortions: [{ name: '1 Plate (6 pieces, 130g)', weightGrams: 130, unitLabel: 'plate', isDefault: true }],
    nutritionPer100g: { calories: 145, protein: 4.2, carbohydrates: 26.5, totalSugar: 1.8, addedSugar: 0.2, dietaryFiber: 2.4, totalFat: 2.4, saturatedFat: 0.4, transFat: 0, sodium: 380 },
    ingredients: [
      { name: 'Refined Wheat Flour Outer Wrapper (Maida)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Finely Shredded Cabbage, Carrots & Onions', processingLevel: 'unprocessed' },
      { name: 'Light Soya Sauce, Ginger, Garlic, Salt', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Light steamed snack. Very low fat (2.4g), though outer wrapper is refined flour with spicy red chutney.',
    advantages: ['Steamed with zero deep frying', 'Low in calories compared to samosa or fried items'],
    thingsToConsider: ['Spicy red dipping chutney is usually packed with sodium and dried chillies', 'Maida dough wrapper'],
    betterAlternatives: [],
    priceEstimateInr: 60
  },
  {
    id: 'mcdonalds-mcaloo-tikki',
    name: "McDonald's McAloo Tikki Burger",
    hindiName: 'मैकआलू टिक्की बर्गर',
    brand: "McDonald's India",
    category: 'fast_food',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [{ name: '1 Burger (146g)', weightGrams: 146, unitLabel: 'burger', isDefault: true }],
    nutritionPer100g: { calories: 232, protein: 4.8, carbohydrates: 34.8, totalSugar: 4.2, addedSugar: 3.1, dietaryFiber: 2.2, totalFat: 8.2, saturatedFat: 2.9, transFat: 0.1, sodium: 430 },
    ingredients: [
      { name: 'Refined Flour Burger Bun', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Aloo & Green Pea Patty (Fried in Vegetable Oil)', processingLevel: 'ultra_processed' },
      { name: 'Tomato Mayo Sauce', processingLevel: 'ultra_processed', isAllergen: true, allergenType: 'soy' },
      { name: 'Fresh Tomato Slice & Onion', processingLevel: 'unprocessed' }
    ],
    claims: [],
    verdictHeadline: 'Fast food staple. Convenient comfort meal, but high in refined flour and processed sauces.',
    advantages: ['Consistent hygiene standards', 'Affordable quick bite'],
    thingsToConsider: ['Refined white bun + breaded potato patty', 'Sweetened emulsified mayonnaise sauce', 'Low protein density'],
    betterAlternatives: [],
    priceEstimateInr: 65
  },
  {
    id: 'dominos-farmhouse-pizza-slice',
    name: "Domino's Farmhouse Pizza (1 Regular Slice)",
    hindiName: 'फार्महाउस पिज़्ज़ा',
    brand: "Domino's Pizza",
    category: 'fast_food',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [{ name: '1 Slice (85g)', weightGrams: 85, unitLabel: 'slice', isDefault: true }, { name: 'Full Regular Pizza (4 slices, 340g)', weightGrams: 340, unitLabel: 'pizza' }],
    nutritionPer100g: { calories: 238, protein: 8.6, carbohydrates: 29.2, totalSugar: 3.4, addedSugar: 2.0, dietaryFiber: 1.8, totalFat: 9.8, saturatedFat: 4.8, transFat: 0.1, sodium: 540 },
    ingredients: [
      { name: 'Refined Wheat Pizza Crust', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Mozzarella Cheese Blend', processingLevel: 'processed', isAllergen: true, allergenType: 'dairy' },
      { name: 'Herb Spiced Tomato Sauce', processingLevel: 'processed' },
      { name: 'Capsicum, Onion, Mushroom, Tomato', processingLevel: 'unprocessed' }
    ],
    claims: [],
    verdictHeadline: 'Cheesy pleasure. Good protein from cheese (8.6g), balanced by high sodium and refined flour crust.',
    advantages: ['Vegetable toppings provide texture', '8.6g protein per 100g from dairy cheese'],
    thingsToConsider: ['High sodium (540mg per 100g)', 'Saturated fat from melted cheese', 'Eating 3-4 slices quickly stacks calories'],
    betterAlternatives: [],
    priceEstimateInr: 80
  },

  // --- DAIRY & ESSENTIALS ---
  {
    id: 'homemade-curd-dahi',
    name: 'Homemade Dahi (Fresh Curd)',
    hindiName: 'घर का ताज़ा दही',
    brand: 'Homemade',
    category: 'dairy',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain', 'diabetic_friendly'],
    servingPortions: [{ name: '1 Katori (150g)', weightGrams: 150, unitLabel: 'katori', isDefault: true }],
    nutritionPer100g: { calories: 60, protein: 3.4, carbohydrates: 4.6, totalSugar: 4.6, addedSugar: 0, dietaryFiber: 0, totalFat: 3.2, saturatedFat: 2.0, transFat: 0, sodium: 46, calcium: 140 },
    ingredients: [
      { name: 'Pasteurized Milk', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'dairy' },
      { name: 'Traditional Jamun Culture (Lactic acid bacteria)', processingLevel: 'unprocessed' }
    ],
    claims: [{ claim: 'Live Gut-Healthy Probiotic', isMisleading: false, verdict: 'Accurate', explanation: 'Natural bacterial fermentation supports diverse gut microflora and ease of digestion.' }],
    verdictHeadline: 'Essential Indian gut guardian. Natural probiotic, bioavailable calcium, and zero added sugar.',
    advantages: ['Supports gut microbiome and eases digestion', '140mg natural calcium per 100g', 'Buffers spicy Indian curries'],
    thingsToConsider: ['Contains dairy lactose (though lower than raw milk due to bacterial conversion)'],
    betterAlternatives: [],
    priceEstimateInr: 15
  },
  {
    id: 'desi-cow-ghee',
    name: 'Desi Gir Cow Ghee (Clarified Butter)',
    hindiName: 'शुद्ध देसी घी',
    brand: 'Amul / Anveshan',
    category: 'dairy',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain', 'diabetic_friendly'],
    servingPortions: [{ name: '1 Teaspoon (5g)', weightGrams: 5, unitLabel: 'tsp', isDefault: true }, { name: '1 Tablespoon (15g)', weightGrams: 15, unitLabel: 'tbsp' }],
    nutritionPer100g: { calories: 897, protein: 0.1, carbohydrates: 0, totalSugar: 0, addedSugar: 0, dietaryFiber: 0, totalFat: 99.7, saturatedFat: 62.0, transFat: 2.5, sodium: 2 },
    ingredients: [
      { name: 'Clarified Cow Milk Fat', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' }
    ],
    claims: [{ claim: 'Rich in Butyric Acid & High Smoke Point', isMisleading: false, verdict: 'Accurate', explanation: 'Traditional bilona ghee has a very high smoke point (250°C) and butyric acid which supports colon wall integrity.' }],
    verdictHeadline: 'Pure culinary fat. High smoke point and rich aroma; enjoy in teaspoon portions.',
    advantages: ['Virtually free of milk solids / lactose and casein', 'High smoke point resists oxidation during cooking', 'Supports absorption of fat-soluble vitamins (A, D, E, K)'],
    thingsToConsider: ['Almost 100% fat by weight; 1 tablespoon is ~135 kcal', 'High in saturated fats; moderation is key for cardiovascular profiles'],
    betterAlternatives: [],
    priceEstimateInr: 45
  },
  {
    id: 'amul-salted-butter',
    name: 'Amul Pasteurized Salted Butter',
    hindiName: 'अमूल मक्खन',
    brand: 'Amul',
    category: 'dairy',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain'],
    servingPortions: [{ name: '1 Cube / Portion (10g)', weightGrams: 10, unitLabel: 'cube', isDefault: true }],
    nutritionPer100g: { calories: 720, protein: 0.6, carbohydrates: 0.8, totalSugar: 0.8, addedSugar: 0, dietaryFiber: 0, totalFat: 80.0, saturatedFat: 51.0, transFat: 1.8, sodium: 830 },
    ingredients: [
      { name: 'Milk Fat (Butter)', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Common Salt (approx 2.5%)', processingLevel: 'culinary' },
      { name: 'Natural Annatto Food Color', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Iconic salty table butter. Rich flavor and creamy mouthfeel; high in saturated dairy fat and sodium.',
    advantages: ['Classic Indian taste companion for parathas and pav', 'Vitamin A rich'],
    thingsToConsider: ['High sodium (830mg/100g) due to 2.5% salt addition', 'Over 50g saturated fat per 100g'],
    betterAlternatives: [
      { targetFoodId: 'desi-cow-ghee', reasonBadge: 'Zero added sodium, pure fat', note: 'Ghee contains no added salt and handles high heat without burning.' }
    ],
    priceEstimateInr: 10
  },
  {
    id: 'sweet-lassi-punjabi',
    name: 'Punjabi Sweet Lassi (with Malai)',
    hindiName: 'पंजाबी मीठी लस्सी',
    brand: 'Local Dairy / Halwai',
    category: 'dairy',
    confidence: 'estimated',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain'],
    servingPortions: [{ name: '1 Glass (250ml)', weightGrams: 250, unitLabel: 'glass', isDefault: true }],
    nutritionPer100g: { calories: 92, protein: 2.8, carbohydrates: 13.5, totalSugar: 13.0, addedSugar: 9.0, dietaryFiber: 0, totalFat: 3.2, saturatedFat: 2.0, transFat: 0, sodium: 55, calcium: 110 },
    ingredients: [
      { name: 'Fresh Whole Milk Curd', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'dairy' },
      { name: 'Sugar', processingLevel: 'culinary' },
      { name: 'Thick Malai Top Layer', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Rose Water & Cardamom', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Rich dairy refreshment. Creamy and gut-friendly, but delivers over 22g sugar per large glass.',
    advantages: ['Probiotics and calcium from cultured curd', 'Deeply satisfying summer beverage'],
    thingsToConsider: ['Large glass contains ~22g added sucrose', 'Acts more like a dessert than a light drink'],
    betterAlternatives: [
      { targetFoodId: 'chaas-buttermilk', reasonBadge: 'Zero added sugar, 65% less calories', note: 'Spiced Chaas gives identical cooling and probiotic benefits with zero added sugar.' }
    ],
    priceEstimateInr: 50
  },

  // --- PROTEIN & VEGAN POWER ---
  {
    id: 'soya-chunks-nutrela',
    name: 'Nutrela Soya Chunks (Cooked Curry)',
    hindiName: 'सोया चंक्स करी',
    brand: 'Ruchi Soya / Nutrela',
    category: 'protein',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [{ name: '1 Katori (150g)', weightGrams: 150, unitLabel: 'katori', isDefault: true }],
    nutritionPer100g: { calories: 124, protein: 16.5, carbohydrates: 9.2, totalSugar: 1.4, addedSugar: 0, dietaryFiber: 4.8, totalFat: 1.8, saturatedFat: 0.3, transFat: 0, sodium: 290, iron: 4.5, calcium: 90 },
    ingredients: [
      { name: 'Defatted Soy Flour Chunks', processingLevel: 'processed', isAllergen: true, allergenType: 'soy' },
      { name: 'Onion, Tomato, Ginger Curry Base', processingLevel: 'unprocessed' },
      { name: 'Garam Masala & Mustard Oil', processingLevel: 'culinary' }
    ],
    claims: [{ claim: 'Over 52% Protein in Raw Form', isMisleading: false, verdict: 'Accurate', explanation: 'Defatted soy meal is one of the densest plant protein sources known, with complete amino acid coverage.' }],
    verdictHeadline: 'The undisputed plant protein champion. 16.5g protein per cooked katori, low fat, and high iron.',
    advantages: ['Exceptional protein-to-calorie ratio for vegetarians', 'Rich in iron (4.5mg) and prebiotic fiber', 'Very economical protein per rupee'],
    thingsToConsider: ['Contains soy allergen', 'Requires thorough boiling and rinsing to remove beany aftertaste'],
    betterAlternatives: [],
    priceEstimateInr: 25
  },
  {
    id: 'roasted-sattu-flour',
    name: 'Bihari Roasted Chana Sattu Drink',
    hindiName: 'सत्तू का शरबत (नमकीन)',
    brand: 'Homemade / Local Mills',
    category: 'beverages',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [{ name: '1 Large Glass (30g powder in 250ml water)', weightGrams: 280, unitLabel: 'glass', isDefault: true }],
    nutritionPer100g: { calories: 48, protein: 2.8, carbohydrates: 7.2, totalSugar: 0.4, addedSugar: 0, dietaryFiber: 2.1, totalFat: 0.7, saturatedFat: 0.1, transFat: 0, sodium: 160, iron: 1.8, potassium: 120 },
    ingredients: [
      { name: 'Roasted Bengal Gram Flour (Sattu)', processingLevel: 'unprocessed' },
      { name: 'Chilled Water & Lemon Juice', processingLevel: 'unprocessed' },
      { name: 'Roasted Cumin Powder & Black Salt', processingLevel: 'culinary' }
    ],
    claims: [{ claim: 'Desi Protein Shake', isMisleading: false, verdict: 'Accurate', explanation: 'Centuries-old Indian functional drink made from roasted pulses, cooling the body while supplying steady plant protein.' }],
    verdictHeadline: 'India’s original protein drink. Zero processed whey, highly cooling, with steady sustained energy.',
    advantages: ['Natural plant protein with zero ultra-processing', 'Low glycemic index and high satiety', 'Digestive cooling with cumin and lemon'],
    thingsToConsider: ['Savory flavor profile may be unfamiliar to those used to sweet milkshakes'],
    betterAlternatives: [],
    priceEstimateInr: 20
  },
  {
    id: 'tofu-organic-firm',
    name: 'Firm Organic Soya Tofu',
    hindiName: 'सोया पनीर (टोफू)',
    brand: 'Health On / Morinu',
    category: 'protein',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [{ name: '100g Block', weightGrams: 100, unitLabel: 'block', isDefault: true }],
    nutritionPer100g: { calories: 83, protein: 10.0, carbohydrates: 1.8, totalSugar: 0.5, addedSugar: 0, dietaryFiber: 1.2, totalFat: 4.8, saturatedFat: 0.7, transFat: 0, sodium: 14, calcium: 350, iron: 2.7 },
    ingredients: [
      { name: 'Organic Soybeans & Water', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'soy' },
      { name: 'Calcium Sulfate (Firming agent / coagulant)', processingLevel: 'culinary' }
    ],
    claims: [{ claim: 'Plant Protein & High Calcium', isMisleading: false, verdict: 'Accurate', explanation: 'Calcium-set tofu delivers 350mg bioavailable calcium and 10g vegan protein with minimal saturated fat.' }],
    verdictHeadline: 'Super clean vegan protein. 10g protein, massive calcium (350mg), and 90% less saturated fat than paneer.',
    advantages: ['Only 0.7g saturated fat (vs 14g in regular malai paneer)', 'Huge calcium reservoir', 'Absorbs marinades and Indian spices beautifully'],
    thingsToConsider: ['Contains soy allergen', 'Less naturally flavorful than dairy paneer without seasoning'],
    betterAlternatives: [],
    priceEstimateInr: 40
  },
  {
    id: 'homestyle-chicken-curry',
    name: 'Homestyle Tariwala Chicken Curry',
    hindiName: 'तरीवाला चिकन',
    brand: 'Homemade',
    category: 'protein',
    confidence: 'verified',
    dietFlags: ['halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [{ name: '1 Bowl (2 pieces + gravy, 200g)', weightGrams: 200, unitLabel: 'bowl', isDefault: true }],
    nutritionPer100g: { calories: 135, protein: 14.5, carbohydrates: 3.2, totalSugar: 1.1, addedSugar: 0, dietaryFiber: 1.0, totalFat: 7.0, saturatedFat: 1.8, transFat: 0, sodium: 320, iron: 1.6, potassium: 240 },
    ingredients: [
      { name: 'Chicken Pieces on bone', processingLevel: 'unprocessed' },
      { name: 'Onion, Tomato, Ginger, Garlic Masala', processingLevel: 'unprocessed' },
      { name: 'Mustard Oil (moderate)', processingLevel: 'culinary' },
      { name: 'Whole spices, Turmeric, Coriander, Salt', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Classic nourishing dinner. 14.5g clean animal protein in a light, whole-spice gravy.',
    advantages: ['Bone-in simmer releases collagen and minerals', 'High protein with very modest carbohydrate load', 'Zero heavy restaurant cream'],
    thingsToConsider: ['Non-vegetarian', 'Contains onion and garlic'],
    betterAlternatives: [],
    priceEstimateInr: 90
  },
  {
    id: 'bengali-fish-curry',
    name: 'Macher Jhol (Bengali Fish Curry with Rohu)',
    hindiName: 'माछेर झोल (मछली करी)',
    brand: 'Homemade',
    category: 'protein',
    confidence: 'verified',
    dietFlags: ['halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [{ name: '1 Piece + Gravy (180g)', weightGrams: 180, unitLabel: 'portion', isDefault: true }],
    nutritionPer100g: { calories: 118, protein: 13.8, carbohydrates: 2.4, totalSugar: 0.8, addedSugar: 0, dietaryFiber: 0.8, totalFat: 5.8, saturatedFat: 1.1, transFat: 0, sodium: 290, potassium: 290 },
    ingredients: [
      { name: 'Fresh Rohu Carp / Katla Fish', processingLevel: 'unprocessed' },
      { name: 'Light Mustard Oil', processingLevel: 'culinary' },
      { name: 'Panch Phoron (Bengali 5 spice mix) & Turmeric', processingLevel: 'culinary' },
      { name: 'Kalonji, Green Chillies & Light Potato Cube', processingLevel: 'unprocessed' }
    ],
    claims: [{ claim: 'Heart-Healthy Marine Protein', isMisleading: false, verdict: 'Accurate', explanation: 'Freshwater fish cooked in antioxidant-rich mustard oil provides essential fatty acids and light digestibility.' }],
    verdictHeadline: 'Exemplary light marine meal. Easily digestible protein with heart-healthy monounsaturated mustard oil.',
    advantages: ['High lean protein and easy digestibility', 'Mustard oil contains beneficial omega-3 ALA fatty acids', 'Very light on the stomach'],
    thingsToConsider: ['Contains fish bones; eat mindfully', 'Non-vegetarian'],
    betterAlternatives: [],
    priceEstimateInr: 95
  },

  // --- VEGETABLES & EVERYDAY SUBZIS ---
  {
    id: 'bhindi-masala',
    name: 'Bhindi Masala (Stir-Fried Okra)',
    hindiName: 'भिंडी मसाला',
    brand: 'Homemade',
    category: 'vegetables',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [{ name: '1 Katori (130g)', weightGrams: 130, unitLabel: 'katori', isDefault: true }],
    nutritionPer100g: { calories: 84, protein: 2.1, carbohydrates: 7.2, totalSugar: 2.1, addedSugar: 0, dietaryFiber: 3.4, totalFat: 5.2, saturatedFat: 0.8, transFat: 0, sodium: 190, calcium: 75, potassium: 260 },
    ingredients: [
      { name: 'Fresh Okra (Bhindi)', processingLevel: 'unprocessed' },
      { name: 'Sliced Onions & Green Chillies', processingLevel: 'unprocessed' },
      { name: 'Mustard Oil (1 tbsp)', processingLevel: 'culinary' },
      { name: 'Amchur (Dry Mango), Coriander & Turmeric', processingLevel: 'culinary' }
    ],
    claims: [{ claim: 'Blood Sugar Friendly Fiber', isMisleading: false, verdict: 'Accurate', explanation: 'Okra mucilage fiber binds to glucose molecules, blunting carbohydrate absorption rates.' }],
    verdictHeadline: 'Classic household vegetable. Okra mucilage fiber promotes slow glucose absorption.',
    advantages: ['Soluble mucilaginous fiber supports glycemic management', 'Low calorie density', 'Rich in Vitamin C and magnesium'],
    thingsToConsider: ['Cook with controlled oil to prevent high fat absorption'],
    betterAlternatives: [],
    priceEstimateInr: 30
  },
  {
    id: 'baingan-bharta',
    name: 'Smoked Baingan Bharta (Roasted Eggplant)',
    hindiName: 'बैंगन का भर्ता',
    brand: 'Homemade',
    category: 'vegetables',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [{ name: '1 Katori (150g)', weightGrams: 150, unitLabel: 'katori', isDefault: true }],
    nutritionPer100g: { calories: 76, protein: 1.8, carbohydrates: 6.8, totalSugar: 2.8, addedSugar: 0, dietaryFiber: 3.6, totalFat: 4.5, saturatedFat: 0.7, transFat: 0, sodium: 210, potassium: 230 },
    ingredients: [
      { name: 'Fire-Roasted Large Eggplant', processingLevel: 'unprocessed' },
      { name: 'Tomatoes, Onions, Green Peas', processingLevel: 'unprocessed' },
      { name: 'Mustard Oil & Garlic', processingLevel: 'unprocessed' },
      { name: 'Spices & Salt', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Smoky nutrient delight. Loaded with nasunin anthocyanin antioxidants from eggplant skin.',
    advantages: ['Rich in nasunin antioxidants which protect brain cell membranes', 'Very low glycemic index', 'High fiber-to-calorie ratio'],
    thingsToConsider: ['Contains nightshade family vegetables'],
    betterAlternatives: [],
    priceEstimateInr: 35
  },
  {
    id: 'lauki-sabzi',
    name: 'Lauki Ki Sabzi (Bottle Gourd)',
    hindiName: 'लौकी की सब्ज़ी',
    brand: 'Homemade',
    category: 'vegetables',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [{ name: '1 Katori (150g)', weightGrams: 150, unitLabel: 'katori', isDefault: true }],
    nutritionPer100g: { calories: 42, protein: 1.2, carbohydrates: 4.5, totalSugar: 1.8, addedSugar: 0, dietaryFiber: 2.1, totalFat: 2.0, saturatedFat: 0.4, transFat: 0, sodium: 140, potassium: 170 },
    ingredients: [
      { name: 'Fresh Bottle Gourd (Ghia/Lauki)', processingLevel: 'unprocessed' },
      { name: 'Cumin & Hing Tempering in Ghee/Oil', processingLevel: 'culinary' },
      { name: 'Tomato & Turmeric', processingLevel: 'unprocessed' }
    ],
    claims: [{ claim: 'Gentle Alkaline Hydration', isMisleading: false, verdict: 'Accurate', explanation: 'Bottle gourd consists of over 92% water with gentle soluble fiber, easing stomach acidity.' }],
    verdictHeadline: 'Ultra light and alkaline. 92% water content, gentle on stomach acidity and kidneys.',
    advantages: ['Extremely low calorie (only ~60 kcal per full katori)', 'Alkalizing effect relieves acidity and heartburn', 'Jain friendly (no root vegetables)'],
    thingsToConsider: ['Never consume bitter-tasting bottle gourd (cucurbitacin toxicity warning)'],
    betterAlternatives: [],
    priceEstimateInr: 20
  },
  {
    id: 'karela-fry',
    name: 'Bitter Gourd Stir Fry (Karela Masala)',
    hindiName: 'करेला की सब्ज़ी',
    brand: 'Homemade',
    category: 'vegetables',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [{ name: '1 Katori (100g)', weightGrams: 100, unitLabel: 'katori', isDefault: true }],
    nutritionPer100g: { calories: 92, protein: 2.4, carbohydrates: 8.5, totalSugar: 2.0, addedSugar: 0, dietaryFiber: 4.2, totalFat: 5.5, saturatedFat: 0.8, transFat: 0, sodium: 220, iron: 2.1, potassium: 310 },
    ingredients: [
      { name: 'Bitter Gourd Slices', processingLevel: 'unprocessed' },
      { name: 'Fennel Seeds (Saunf), Amchur & Turmeric', processingLevel: 'culinary' },
      { name: 'Mustard Oil', processingLevel: 'culinary' }
    ],
    claims: [{ claim: 'Clinically Proven Glycemic Benefits', isMisleading: false, verdict: 'Accurate', explanation: 'Contains charantin, vicine, and polypeptide-p which mimic insulin activity in peripheral tissues.' }],
    verdictHeadline: 'The gold standard for glycemic balance. Plant polypeptide-p naturally improves insulin sensitivity.',
    advantages: ['Charantin and polypeptide-p help regulate insulin response', 'High dietary fiber (4.2g)', 'Stimulates liver digestive bile production'],
    thingsToConsider: ['Sharp bitter taste requires culinary acclimatization'],
    betterAlternatives: [],
    priceEstimateInr: 25
  },

  // --- GRAINS, RICE & BREAKFAST ---
  {
    id: 'basmati-white-rice',
    name: 'Steamed White Basmati Rice',
    hindiName: 'उबले बासमती चावल',
    brand: 'Homemade / India Gate',
    category: 'grains',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free'],
    servingPortions: [{ name: '1 Katori (150g)', weightGrams: 150, unitLabel: 'katori', isDefault: true }, { name: '1 Big Plate (250g)', weightGrams: 250, unitLabel: 'plate' }],
    nutritionPer100g: { calories: 130, protein: 2.7, carbohydrates: 28.2, totalSugar: 0.1, addedSugar: 0, dietaryFiber: 0.4, totalFat: 0.3, saturatedFat: 0.1, transFat: 0, sodium: 2, potassium: 35 },
    ingredients: [
      { name: 'Milled White Basmati Rice', processingLevel: 'culinary' },
      { name: 'Water', processingLevel: 'unprocessed' }
    ],
    claims: [],
    verdictHeadline: 'Clean digestive staple. Rapidly assimilated carbohydrate fuel; pair with dal or sabzi for fiber.',
    advantages: ['Naturally gluten-free and extremely gentle on the gut', 'Zero sodium and minimal fat', 'Aged basmati has a lower GI than short-grain white rice'],
    thingsToConsider: ['Low fiber (0.4g/100g); eat with fiber-rich dal and vegetables to prevent rapid sugar spike'],
    betterAlternatives: [
      { targetFoodId: 'steamed-brown-rice', reasonBadge: '5x more fiber, higher magnesium', note: 'Brown rice preserves the germ and bran layer, lowering glycemic load.' }
    ],
    priceEstimateInr: 15
  },
  {
    id: 'steamed-brown-rice',
    name: 'Steamed Whole Grain Brown Rice',
    hindiName: 'ब्राउन राइस',
    brand: 'Homemade / Daawat',
    category: 'grains',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [{ name: '1 Katori (150g)', weightGrams: 150, unitLabel: 'katori', isDefault: true }],
    nutritionPer100g: { calories: 123, protein: 2.8, carbohydrates: 25.6, totalSugar: 0.2, addedSugar: 0, dietaryFiber: 2.0, totalFat: 0.9, saturatedFat: 0.2, transFat: 0, sodium: 3, magnesium: 44, potassium: 85 },
    ingredients: [
      { name: 'Unpolished Whole Grain Brown Rice', processingLevel: 'unprocessed' },
      { name: 'Water', processingLevel: 'unprocessed' }
    ],
    claims: [{ claim: 'Whole Grain Fiber & Minerals', isMisleading: false, verdict: 'Accurate', explanation: 'Maintains intact bran and germ coating, providing magnesium, selenium, and fiber.' }],
    verdictHeadline: 'Sustained energy grain. Intact bran layer tempers blood sugar release and supplies magnesium.',
    advantages: ['Lower glycemic index than polished white rice', 'Rich in magnesium for vascular relaxation', 'Naturally gluten-free'],
    thingsToConsider: ['Takes longer to cook and has a chewier, nuttier mouthfeel'],
    betterAlternatives: [],
    priceEstimateInr: 25
  },
  {
    id: 'vegetable-upma',
    name: 'Vegetable Rava Upma',
    hindiName: 'वेजिटेबल उपमा',
    brand: 'Homemade / MTR',
    category: 'grains',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [{ name: '1 Plate (180g)', weightGrams: 180, unitLabel: 'plate', isDefault: true }],
    nutritionPer100g: { calories: 158, protein: 3.8, carbohydrates: 26.5, totalSugar: 1.5, addedSugar: 0, dietaryFiber: 2.5, totalFat: 4.0, saturatedFat: 0.8, transFat: 0, sodium: 260, iron: 1.4 },
    ingredients: [
      { name: 'Roasted Semolina (Rava/Suji)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Carrots, Peas, Beans, Curry Leaves', processingLevel: 'unprocessed' },
      { name: 'Mustard Seeds, Chana Dal, Ginger', processingLevel: 'culinary' },
      { name: 'Vegetable Oil / Ghee', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Comforting warm breakfast. Good vegetable inclusion, though semolina has a moderate glycemic response.',
    advantages: ['Vegetables boost micronutrient and fiber density', 'Quickly prepared comfort staple'],
    thingsToConsider: ['Contains gluten (suji)', 'Moderate glycemic index; add extra vegetables and dal for balance'],
    betterAlternatives: [
      { targetFoodId: 'besan-chilla', reasonBadge: '2.5x more protein, gluten-free', note: 'Besan Chilla provides higher protein with a much slower blood sugar impact.' }
    ],
    priceEstimateInr: 25
  },

  // --- PACKAGED DRINKS & SNACKS ---
  {
    id: 'frooti-mango-drink',
    name: "Frooti Fresh 'N' Juicy Mango Drink",
    hindiName: 'फ्रूटी मैंगो ड्रिंक',
    brand: 'Parle Agro',
    category: 'beverages',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free'],
    servingPortions: [{ name: '1 Tetrapack (160ml)', weightGrams: 160, unitLabel: 'pack', isDefault: true }],
    nutritionPer100g: { calories: 65, protein: 0, carbohydrates: 16.2, totalSugar: 15.8, addedSugar: 13.5, dietaryFiber: 0, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 22 },
    ingredients: [
      { name: 'Water', processingLevel: 'unprocessed' },
      { name: 'Mango Pulp (19%)', processingLevel: 'processed' },
      { name: 'Sugar', processingLevel: 'culinary' },
      { name: 'Acidity Regulator (INS 330)', processingLevel: 'culinary' },
      { name: 'Antioxidant (INS 300) & Permitted Synthetic Food Color (INS 110)', processingLevel: 'ultra_processed', concerns: 'Sunset Yellow FCF artificial coloring.' }
    ],
    claims: [
      { claim: 'Fresh N Juicy Mango', isMisleading: true, verdict: 'Misleading Sugar Drink', explanation: 'Actual mango pulp is only 19%; over 80% is sweetened water delivering ~22g added sucrose per small box.' }
    ],
    verdictHeadline: 'Heavily sweetened fruit beverage. 13.5g added sugar per 100ml with artificial food dye (INS 110).',
    advantages: ['Affordable nostalgic mango flavor'],
    thingsToConsider: ['High sugar surge (over 5 teaspoons sugar per small carton)', 'Contains artificial color Sunset Yellow', 'Zero fiber or satiety'],
    betterAlternatives: [
      { targetFoodId: 'fresh-coconut-water', reasonBadge: 'Zero added sugar, 100% natural', note: 'Tender coconut water gives genuine hydration without added syrups.' }
    ],
    priceEstimateInr: 15
  },
  {
    id: 'kurkure-masala-munch',
    name: 'Kurkure Masala Munch',
    hindiName: 'कुरकुरे मसाला मंच',
    brand: 'PepsiCo',
    category: 'snacks',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [{ name: '1 Small Pack (40g)', weightGrams: 40, unitLabel: 'pack', isDefault: true }],
    nutritionPer100g: { calories: 558, protein: 6.0, carbohydrates: 54.5, totalSugar: 2.8, addedSugar: 1.5, dietaryFiber: 3.2, totalFat: 35.2, saturatedFat: 15.8, transFat: 0.1, sodium: 890 },
    ingredients: [
      { name: 'Rice Meal (43%) & Corn Meal (14%)', processingLevel: 'processed' },
      { name: 'Edible Vegetable Oil (Palmolein)', processingLevel: 'ultra_processed', concerns: 'High saturated palm fat.' },
      { name: 'Gram Meal (Besan)', processingLevel: 'unprocessed' },
      { name: 'Masala Seasoning & Flavor Enhancers (INS 627, 631)', processingLevel: 'ultra_processed' }
    ],
    claims: [
      { claim: 'Made with Dal, Corn and Rice', isMisleading: true, verdict: 'Grain Health Halo', explanation: 'Marketers tout kitchen grains, but the product is over 35% palmolein oil and nearly 900mg sodium.' }
    ],
    verdictHeadline: 'Ultra-processed extruded snack. 35.2g fat, high sodium, and industrial flavor enhancers.',
    advantages: ['Unique Indian crunchy texture'],
    thingsToConsider: ['Palmolein oil yields 15.8g saturated fat per 100g', 'Very high sodium (890mg)', 'Designed to trigger hyper-palatable eating'],
    betterAlternatives: [
      { targetFoodId: 'roasted-makhana', reasonBadge: '80% less fat, no palm oil', note: 'Roasted Makhana matches the crunch with zero industrial processing.' }
    ],
    priceEstimateInr: 20
  },
  {
    id: 'britannia-bourbon',
    name: 'Britannia Bourbon Chocolate Creams',
    hindiName: 'बॉर्बन बिस्कुट',
    brand: 'Britannia',
    category: 'snacks',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [{ name: '2 Biscuits (25g)', weightGrams: 25, unitLabel: 'biscuits', isDefault: true }],
    nutritionPer100g: { calories: 488, protein: 5.5, carbohydrates: 72.0, totalSugar: 38.0, addedSugar: 35.0, dietaryFiber: 2.1, totalFat: 20.0, saturatedFat: 9.8, transFat: 0.1, sodium: 280 },
    ingredients: [
      { name: 'Refined Wheat Flour (Maida)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Sugar & Sugar Crystals topping', processingLevel: 'culinary' },
      { name: 'Refined Palm Oil & Hydrogenated Fats', processingLevel: 'ultra_processed' },
      { name: 'Cocoa Solids (2.3%)', processingLevel: 'processed' },
      { name: 'Invert Sugar Syrup & Leavening agents', processingLevel: 'ultra_processed' }
    ],
    claims: [],
    verdictHeadline: 'High sugar confectionery biscuit. 35g added sugar per 100g and refined palm cream.',
    advantages: ['Classic chocolate cream biscuit for tea indulgence'],
    thingsToConsider: ['Over one-third sugar by weight', 'Refined palm oil chocolate filling', 'Negligible cocoa benefits due to 2.3% cocoa level'],
    betterAlternatives: [
      { targetFoodId: 'amul-dark-chocolate-55', reasonBadge: '55% real cocoa, less sugar', note: 'Dark chocolate gives real flavanols with significantly less refined flour.' }
    ],
    priceEstimateInr: 30
  },
  {
    id: 'amul-dark-chocolate-55',
    name: 'Amul 55% Cocoa Dark Chocolate',
    hindiName: 'डार्क चॉकलेट (55%)',
    brand: 'Amul',
    category: 'desserts',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free'],
    servingPortions: [{ name: '3 Squares (25g)', weightGrams: 25, unitLabel: 'squares', isDefault: true }],
    nutritionPer100g: { calories: 540, protein: 7.0, carbohydrates: 54.0, totalSugar: 43.0, addedSugar: 42.0, dietaryFiber: 7.2, totalFat: 32.8, saturatedFat: 19.5, transFat: 0, sodium: 28, iron: 5.8, magnesium: 140 },
    ingredients: [
      { name: 'Cocoa Solids (55%) & Cocoa Butter', processingLevel: 'processed' },
      { name: 'Sugar', processingLevel: 'culinary' },
      { name: 'Permitted Emulsifiers (INS 322, 476)', processingLevel: 'ultra_processed' }
    ],
    claims: [{ claim: 'Rich in Cocoa Antioxidants', isMisleading: false, verdict: 'Accurate', explanation: 'Contains 55% minimum cocoa solids, yielding natural flavanols, iron, and magnesium.' }],
    verdictHeadline: 'Antioxidant-rich treat. Real cocoa butter and 7.2g fiber; balance against 42g added sugar.',
    advantages: ['Rich in cocoa polyphenol antioxidants', 'Natural cocoa butter rather than cheap vegetable fats', 'Good source of dietary magnesium and iron'],
    thingsToConsider: ['Still contains 42g sugar per 100g; keep to 2-3 squares daily'],
    betterAlternatives: [],
    priceEstimateInr: 100
  },
  {
    id: 'dairy-milk-chocolate',
    name: 'Cadbury Dairy Milk Chocolate',
    hindiName: 'डेयरी मिल्क चॉकलेट',
    brand: 'Mondelez / Cadbury',
    category: 'desserts',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free'],
    servingPortions: [{ name: '1 Small Bar (24g)', weightGrams: 24, unitLabel: 'bar', isDefault: true }],
    nutritionPer100g: { calories: 534, protein: 8.0, carbohydrates: 60.5, totalSugar: 57.0, addedSugar: 48.0, dietaryFiber: 2.0, totalFat: 29.5, saturatedFat: 18.2, transFat: 0.1, sodium: 145, calcium: 210 },
    ingredients: [
      { name: 'Sugar (1st Ingredient)', processingLevel: 'culinary' },
      { name: 'Milk Solids (16%)', processingLevel: 'processed', isAllergen: true, allergenType: 'dairy' },
      { name: 'Cocoa Butter & Cocoa Solids (9%)', processingLevel: 'processed' },
      { name: 'Emulsifiers (INS 442, 476)', processingLevel: 'ultra_processed' }
    ],
    claims: [{ claim: 'A Glass and a Half of Pure Milk', isMisleading: true, verdict: 'Marketing Nostalgia', explanation: 'Sugar is the number one ingredient by weight (~57g total sugars/100g), far exceeding milk solids.' }],
    verdictHeadline: 'Milk chocolate confectionery. First ingredient is sugar (~57g total sugars) with 18g saturated fat.',
    advantages: ['Creamy smooth milk chocolate texture', 'Modest dairy calcium'],
    thingsToConsider: ['Over 57% total sugars by weight', 'Spikes blood glucose rapidly', 'High saturated fat'],
    betterAlternatives: [
      { targetFoodId: 'amul-dark-chocolate-55', reasonBadge: '6x more cocoa, lower sugar', note: '55% Dark Chocolate has higher antioxidant density with less sugar.' }
    ],
    priceEstimateInr: 20
  },

  // --- NUTS, SEEDS & WHOLE PRODUCE ---
  {
    id: 'walnuts-akhrot',
    name: 'Raw Kashmiri Walnut Kernels (Akhrot)',
    hindiName: 'अखरोट',
    brand: 'Nutraj / Farmley',
    category: 'nuts_and_seeds',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [{ name: '4 Halves / Kernels (20g)', weightGrams: 20, unitLabel: 'handful', isDefault: true }],
    nutritionPer100g: { calories: 654, protein: 15.2, carbohydrates: 13.7, totalSugar: 2.6, addedSugar: 0, dietaryFiber: 6.7, totalFat: 65.2, saturatedFat: 6.1, transFat: 0, sodium: 2, potassium: 441, iron: 2.9 },
    ingredients: [
      { name: '100% Raw Walnut Halves', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'nut' }
    ],
    claims: [{ claim: 'Brain & Heart ALA Omega-3', isMisleading: false, verdict: 'Accurate', explanation: 'Walnuts have the highest plant-based Omega-3 (Alpha-Linolenic Acid, ~9g/100g) of any nut.' }],
    verdictHeadline: 'Top plant Omega-3 source. Packed with 9g ALA Omega-3 fatty acids for cognitive and cardiovascular health.',
    advantages: ['Unsurpassed botanical source of ALA Omega-3', 'High in neuroprotective polyphenols', 'Supports healthy LDL cholesterol'],
    thingsToConsider: ['Nut allergen', 'Calorie dense (654 kcal per 100g)'],
    betterAlternatives: [],
    priceEstimateInr: 120
  },
  {
    id: 'pumpkin-seeds',
    name: 'Raw Shelled Pumpkin Seeds (Kaddu Ke Beej)',
    hindiName: 'कद्दू के बीज',
    brand: 'True Elements',
    category: 'nuts_and_seeds',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [{ name: '1 Tablespoon (15g)', weightGrams: 15, unitLabel: 'tbsp', isDefault: true }],
    nutritionPer100g: { calories: 559, protein: 30.2, carbohydrates: 10.7, totalSugar: 1.4, addedSugar: 0, dietaryFiber: 6.0, totalFat: 49.0, saturatedFat: 8.7, transFat: 0, sodium: 7, iron: 8.8, zinc: 7.8, magnesium: 592 },
    ingredients: [
      { name: 'Raw Shelled Pumpkin Seeds', processingLevel: 'unprocessed' }
    ],
    claims: [{ claim: 'Zinc & Magnesium Powerhouse', isMisleading: false, verdict: 'Accurate', explanation: 'One of nature\'s richest botanical sources of zinc (crucial for immunity) and magnesium.' }],
    verdictHeadline: 'Immunity and zinc powerhouse. 30g plant protein, massive zinc (7.8mg), and magnesium (592mg).',
    advantages: ['Exceptional 30.2g natural plant protein', 'High zinc content supports immune cell signaling', 'Massive magnesium promotes deep sleep and muscle recovery'],
    thingsToConsider: ['Rich in calories; 1-2 tablespoons daily is the ideal portion'],
    betterAlternatives: [],
    priceEstimateInr: 60
  },
  {
    id: 'flax-seeds',
    name: 'Roasted Brown Flax Seeds (Alsi)',
    hindiName: 'अलसी के बीज',
    brand: 'Farmley / Organic Tattva',
    category: 'nuts_and_seeds',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [{ name: '1 Tablespoon ground (12g)', weightGrams: 12, unitLabel: 'tbsp', isDefault: true }],
    nutritionPer100g: { calories: 534, protein: 18.3, carbohydrates: 28.9, totalSugar: 1.5, addedSugar: 0, dietaryFiber: 27.3, totalFat: 42.2, saturatedFat: 3.7, transFat: 0, sodium: 30, calcium: 255, iron: 5.7 },
    ingredients: [
      { name: 'Whole Roasted Brown Flax Seeds', processingLevel: 'unprocessed' }
    ],
    claims: [{ claim: 'Lignans & Soluble Fiber', isMisleading: false, verdict: 'Accurate', explanation: 'Contains up to 800 times more lignans (potent antioxidant phytoestrogens) than other plant foods.' }],
    verdictHeadline: 'Hormonal and gut balancer. 27.3g dietary fiber and rich lignan antioxidants.',
    advantages: ['Tremendous 27.3g fiber content for cholesterol regulation', 'High lignan antioxidant content', 'Rich in plant-based Omega-3'],
    thingsToConsider: ['Best consumed in ground or powder form to enable absorption through the gut wall'],
    betterAlternatives: [],
    priceEstimateInr: 30
  },
  {
    id: 'alphonso-mango',
    name: 'Ratnagiri Alphonso Mango (Hapus)',
    hindiName: 'हापुस आम',
    brand: 'Fresh Produce',
    category: 'fruits',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free'],
    servingPortions: [{ name: '1 Medium Mango (200g sliced)', weightGrams: 200, unitLabel: 'mango', isDefault: true }],
    nutritionPer100g: { calories: 65, protein: 0.8, carbohydrates: 16.5, totalSugar: 14.2, addedSugar: 0, dietaryFiber: 1.8, totalFat: 0.4, saturatedFat: 0.1, transFat: 0, sodium: 1, potassium: 168, calcium: 11 },
    ingredients: [
      { name: '100% Fresh Ripe Mango', processingLevel: 'unprocessed' }
    ],
    claims: [],
    verdictHeadline: 'King of summer fruits. Rich beta-carotene and natural sugars; pair with protein for sustained digestion.',
    advantages: ['Spectacular Vitamin A (beta-carotene) content', 'Rich digestive enzymes (amylases)', 'Unrivaled aromatic sensory joy'],
    thingsToConsider: ['High natural sugar (~28g sugar in one whole mango)', 'Diabetics should limit portion to 2-3 slices paired with nuts'],
    betterAlternatives: [],
    priceEstimateInr: 80
  },
  {
    id: 'pomegranate-anar',
    name: 'Fresh Pomegranate Seeds (Anar)',
    hindiName: 'अनार के दाने',
    brand: 'Fresh Produce',
    category: 'fruits',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [{ name: '1 Katori / Cup arils (120g)', weightGrams: 120, unitLabel: 'cup', isDefault: true }],
    nutritionPer100g: { calories: 83, protein: 1.7, carbohydrates: 18.7, totalSugar: 13.7, addedSugar: 0, dietaryFiber: 4.0, totalFat: 1.2, saturatedFat: 0.2, transFat: 0, sodium: 3, potassium: 236, iron: 0.3 },
    ingredients: [
      { name: 'Fresh Raw Pomegranate Arils with seeds', processingLevel: 'unprocessed' }
    ],
    claims: [{ claim: 'Punicalagin Polyphenols', isMisleading: false, verdict: 'Accurate', explanation: 'Contains punicalagins, unique antioxidants shown to protect blood lipids from oxidative damage.' }],
    verdictHeadline: 'Vascular protection champion. Punicalagin antioxidants and 4g fiber support arterial elasticity.',
    advantages: ['Exceptional punicalagin antioxidant potency (3x green tea)', '4.0g fiber from edible seeds', 'Nitric-oxide boosting properties support blood flow'],
    thingsToConsider: ['Edible seeds should be chewed thoroughly'],
    betterAlternatives: [],
    priceEstimateInr: 50
  },
  {
    id: 'sweet-lime-mosambi',
    name: 'Fresh Sweet Lime (Mosambi)',
    hindiName: 'मौसमी',
    brand: 'Fresh Produce',
    category: 'fruits',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [{ name: '1 Medium Fruit peeled (140g)', weightGrams: 140, unitLabel: 'fruit', isDefault: true }],
    nutritionPer100g: { calories: 43, protein: 0.8, carbohydrates: 9.3, totalSugar: 7.2, addedSugar: 0, dietaryFiber: 2.8, totalFat: 0.3, saturatedFat: 0, transFat: 0, sodium: 1, potassium: 190, calcium: 40 },
    ingredients: [
      { name: 'Whole Fresh Sweet Lime segments', processingLevel: 'unprocessed' }
    ],
    claims: [],
    verdictHeadline: 'Gentle hydration fruit. Low calorie (43 kcal), alkalizing, and rich in natural Vitamin C.',
    advantages: ['Low calorie and low glycemic impact', 'Alkalizing effect relieves nausea and dehydration', 'Eating whole fruit retains valuable segment pulp fiber'],
    thingsToConsider: ['Eat whole rather than straining juice to keep blood sugar steady'],
    betterAlternatives: [],
    priceEstimateInr: 15
  },
  {
    id: 'kaju-raw-cashew',
    name: 'Raw Cashew Nuts (Kaju)',
    hindiName: 'काजू',
    brand: 'Farmley / Nutraj',
    category: 'nuts_and_seeds',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [{ name: '1 Handful (10-12 nuts, 25g)', weightGrams: 25, unitLabel: 'handful', isDefault: true }],
    nutritionPer100g: { calories: 553, protein: 18.2, carbohydrates: 30.2, totalSugar: 5.9, addedSugar: 0, dietaryFiber: 3.3, totalFat: 43.8, saturatedFat: 7.8, transFat: 0, sodium: 12, iron: 6.7, magnesium: 292 },
    ingredients: [
      { name: '100% Raw Whole Cashew Nuts', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'nut' }
    ],
    claims: [{ claim: 'Rich in Copper, Iron and Magnesium', isMisleading: false, verdict: 'Accurate', explanation: 'Delivers 6.7mg iron (crucial for vegetarian hemoglobin) and cardioprotective stearic and oleic fats.' }],
    verdictHeadline: 'Creamy vegetarian iron booster. 18.2g protein, 6.7mg iron, and heart-healthy monounsaturated fats.',
    advantages: ['Very rich in non-heme iron and magnesium', 'Natural creamy satiety', 'Cardioprotective oleic acid profile'],
    thingsToConsider: ['Nut allergen', 'Highest carbohydrate content among common nuts (~30g/100g)'],
    betterAlternatives: [],
    priceEstimateInr: 75
  },
  {
    id: 'filter-coffee-south-indian',
    name: 'South Indian Filter Coffee (with Milk & 1 tsp sugar)',
    hindiName: 'फ़िल्टर कॉफ़ी',
    brand: 'Homemade / Udipi Eatery',
    category: 'beverages',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain'],
    servingPortions: [{ name: '1 Davara-Tumbler (120ml)', weightGrams: 120, unitLabel: 'tumbler', isDefault: true }],
    nutritionPer100g: { calories: 72, protein: 2.4, carbohydrates: 8.8, totalSugar: 8.2, addedSugar: 4.5, dietaryFiber: 0, totalFat: 2.8, saturatedFat: 1.8, transFat: 0, sodium: 32, calcium: 90 },
    ingredients: [
      { name: 'Freshly Brewed Decoction (80% Coffee, 20% Chicory)', processingLevel: 'unprocessed' },
      { name: 'Boiled Full Cream Milk', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'dairy' },
      { name: 'Cane Sugar', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Aromatic morning wake-up. Rich chlorogenic acid antioxidants with moderate milk fat and sugar.',
    advantages: ['Chlorogenic acid helps modulate glucose metabolism', 'Alertness and cognitive focus', 'Rich sensory aroma'],
    thingsToConsider: ['Drinking 3-4 tumblers daily accumulates added sugar', 'Avoid late in the evening to protect sleep architecture'],
    betterAlternatives: [],
    priceEstimateInr: 25
  },
  {
    id: 'nimbu-paani-fresh',
    name: 'Fresh Nimbu Paani (Shikanji with Rock Salt)',
    hindiName: 'नींबू पानी / शिकंजी',
    brand: 'Homemade',
    category: 'beverages',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [{ name: '1 Tall Glass (250ml)', weightGrams: 250, unitLabel: 'glass', isDefault: true }],
    nutritionPer100g: { calories: 18, protein: 0.2, carbohydrates: 4.2, totalSugar: 3.8, addedSugar: 2.0, dietaryFiber: 0.2, totalFat: 0, saturatedFat: 0, transFat: 0, sodium: 120, potassium: 45 },
    ingredients: [
      { name: 'Fresh Squeezed Lemon Juice', processingLevel: 'unprocessed' },
      { name: 'Water & Crushed Ice', processingLevel: 'unprocessed' },
      { name: 'Black Salt & Roasted Cumin', processingLevel: 'culinary' },
      { name: 'Light Cane Sugar (half teaspoon)', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Traditional digestive lemonade. Very light calories (only ~45 kcal per glass) with natural Vitamin C.',
    advantages: ['High citric acid promotes digestive saliva and bile flow', 'Electrolytes from black salt and cumin', 'Infinitely superior to bottled soda'],
    thingsToConsider: ['Control added sugar quantity'],
    betterAlternatives: [],
    priceEstimateInr: 15
  },
  {
    id: 'sarson-ka-saag',
    name: 'Punjabi Sarson Ka Saag',
    hindiName: 'सरसों का साग',
    brand: 'Homemade',
    category: 'vegetables',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [{ name: '1 Katori (160g)', weightGrams: 160, unitLabel: 'katori', isDefault: true }],
    nutritionPer100g: { calories: 68, protein: 3.6, carbohydrates: 5.4, totalSugar: 1.2, addedSugar: 0, dietaryFiber: 3.8, totalFat: 3.5, saturatedFat: 0.5, transFat: 0, sodium: 180, calcium: 180, iron: 4.8 },
    ingredients: [
      { name: 'Mustard Greens (Sarson), Bathua & Spinach', processingLevel: 'unprocessed' },
      { name: 'Makki Atta (Cornmeal thickening)', processingLevel: 'unprocessed' },
      { name: 'Ginger, Garlic, Green Chillies', processingLevel: 'unprocessed' },
      { name: 'Mustard Oil (light)', processingLevel: 'culinary' }
    ],
    claims: [{ claim: 'Glucosinolates & Winter Nutrients', isMisleading: false, verdict: 'Accurate', explanation: 'Mustard greens are packed with glucosinolates and sulfur compounds that activate liver detoxification pathways.' }],
    verdictHeadline: 'Winter superfood. 4.8mg iron, 180mg calcium, and cellular protective glucosinolates.',
    advantages: ['Sensational iron (4.8mg/100g) and calcium density', 'Glucosinolates support cellular defense', 'Very low glycemic load'],
    thingsToConsider: ['Traditionally served with generous white butter (makhan); portion butter mindfully'],
    betterAlternatives: [],
    priceEstimateInr: 45
  },
  {
    id: 'kaju-katli-premium',
    name: 'Sugar-Free Kaju Katli (with Stevia)',
    hindiName: 'शुगर-फ्री काजू कतली',
    brand: 'Artisanal / Diabetic Care',
    category: 'desserts',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [{ name: '2 Pieces (30g)', weightGrams: 30, unitLabel: 'pieces', isDefault: true }],
    nutritionPer100g: { calories: 395, protein: 12.0, carbohydrates: 26.0, totalSugar: 4.2, addedSugar: 0, dietaryFiber: 3.8, totalFat: 28.5, saturatedFat: 5.4, transFat: 0, sodium: 18, iron: 4.2 },
    ingredients: [
      { name: '100% Pure Cashew Paste (75%)', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'nut' },
      { name: 'Steviol Glycosides & Erythritol Sweetener', processingLevel: 'processed' },
      { name: 'Cardamom & Rose Water', processingLevel: 'culinary' }
    ],
    claims: [{ claim: 'Diabetic Friendly Mithai', isMisleading: false, verdict: 'Accurate', explanation: 'Substitutes cane sugar with non-glycemic stevia and erythritol while maintaining real cashew nut integrity.' }],
    verdictHeadline: 'Smart festive sweet for diabetics. Zero added sugar, 12g protein, and heart-healthy cashew fats.',
    advantages: ['Zero added sucrose', 'Higher cashew concentration (75%) yields 12g protein', 'Prevents glucose spikes'],
    thingsToConsider: ['Still calorically dense due to natural cashew fats', 'Nut allergen'],
    betterAlternatives: [],
    priceEstimateInr: 90
  }
];

export function getSupplementaryFoods(): FoodItem[] {
  return ADDITIONAL_FOODS.map(item => ({
    ...item,
    foodScore: calculateFoodScore(item.nutritionPer100g, item.ingredients, item.claims)
  }));
}
