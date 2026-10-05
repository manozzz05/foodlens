import { FoodItem, NutritionData, IngredientItem, FoodClaim, ServingPortion, DietFlag, FoodCategory, ConfidenceTier, BetterAlternative } from '../types/food';
import { calculateFoodScore } from '../engine/scoring';

interface RawFoodDef {
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
  preparationNote?: string;
}

export const RAW_FOODS: RawFoodDef[] = [
  // --- GRAINS & INDIAN STAPLES ---
  {
    id: 'roti-whole-wheat',
    name: 'Phulka / Whole Wheat Roti',
    hindiName: 'रोटी / फुल्का',
    brand: 'Homemade',
    category: 'grains',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'diabetic_friendly'],
    servingPortions: [
      { name: '1 Roti (medium)', weightGrams: 35, unitLabel: 'roti', isDefault: true },
      { name: '2 Rotis', weightGrams: 70, unitLabel: 'rotis' },
      { name: '100g Roti', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 260,
      protein: 8.5,
      carbohydrates: 52,
      totalSugar: 1.5,
      addedSugar: 0,
      dietaryFiber: 8.2,
      totalFat: 2.1,
      saturatedFat: 0.4,
      transFat: 0,
      sodium: 180,
      iron: 3.2,
      potassium: 290
    },
    ingredients: [
      { name: 'Whole Wheat Flour (Atta)', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Water', processingLevel: 'unprocessed' },
      { name: 'Pinch of Salt', processingLevel: 'culinary' }
    ],
    claims: [
      { claim: '100% Whole Grain', isMisleading: false, verdict: 'Accurate', explanation: 'Prepared entirely from unrefined whole wheat flour with natural bran intact.' }
    ],
    verdictHeadline: 'Essential everyday staple. High in complex carbohydrates and natural dietary fiber.',
    advantages: ['High dietary fiber aids digestion', 'Zero added sugars or industrial additives', 'Low glycemic index compared to white bread'],
    thingsToConsider: ['Contains gluten', 'Portion size matters for strict carb-restricted diets'],
    betterAlternatives: [],
    priceEstimateInr: 5
  },
  {
    id: 'dal-tadka-yellow',
    name: 'Yellow Dal Tadka (Moong/Toor)',
    hindiName: 'दाल तड़का',
    brand: 'Homemade',
    category: 'indian_foods',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Katori (medium)', weightGrams: 150, unitLabel: 'katori', isDefault: true },
      { name: '1 Large Bowl', weightGrams: 250, unitLabel: 'bowl' },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 95,
      protein: 5.6,
      carbohydrates: 12.8,
      totalSugar: 1.1,
      addedSugar: 0,
      dietaryFiber: 3.8,
      totalFat: 2.6,
      saturatedFat: 0.8,
      transFat: 0,
      sodium: 260,
      iron: 1.8,
      potassium: 210,
      calcium: 35
    },
    ingredients: [
      { name: 'Yellow Moong / Toor Dal', processingLevel: 'unprocessed' },
      { name: 'Tomato', processingLevel: 'unprocessed' },
      { name: 'Onion & Garlic', processingLevel: 'unprocessed' },
      { name: 'Cumin & Mustard Seeds', processingLevel: 'culinary' },
      { name: 'Turmeric & Coriander', processingLevel: 'culinary' },
      { name: 'Ghee or Mustard Oil (1 tsp)', processingLevel: 'culinary' },
      { name: 'Salt', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Outstanding cornerstone of balanced Indian nutrition. Wholesome plant protein and gentle fiber.',
    advantages: ['Clean plant protein source', 'Naturally rich in folate and iron', 'Gentle on digestion'],
    thingsToConsider: ['Contains onion and garlic (not suitable for strict Jain diet)', 'Sodium can rise if prepared in restaurants'],
    betterAlternatives: [],
    priceEstimateInr: 25
  },
  {
    id: 'dal-makhani-restaurant',
    name: 'Dal Makhani (Restaurant Style)',
    hindiName: 'दाल मखनी',
    brand: 'Dhaba / Restaurant',
    category: 'indian_foods',
    confidence: 'estimated',
    dietFlags: ['vegetarian', 'halal', 'gluten_free'],
    servingPortions: [
      { name: '1 Katori (150g)', weightGrams: 150, unitLabel: 'katori', isDefault: true },
      { name: '1 Full Plate (300g)', weightGrams: 300, unitLabel: 'plate' }
    ],
    nutritionPer100g: {
      calories: 185,
      protein: 6.2,
      carbohydrates: 15.4,
      totalSugar: 2.4,
      addedSugar: 0.5,
      dietaryFiber: 4.5,
      totalFat: 11.2,
      saturatedFat: 6.4,
      transFat: 0.2,
      sodium: 490,
      calcium: 80
    },
    ingredients: [
      { name: 'Black Urad Dal & Rajma', processingLevel: 'unprocessed' },
      { name: 'Heavy Dairy Cream', processingLevel: 'processed', isAllergen: true, allergenType: 'dairy' },
      { name: 'White Butter (Makhan)', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Tomato Puree', processingLevel: 'processed' },
      { name: 'Spices & Salt', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Rich indulgence. Solid protein and fiber, but heavily loaded with saturated dairy fats and sodium.',
    advantages: ['Good satiety from black lentils and fiber', 'Rich in iron and potassium'],
    thingsToConsider: ['High saturated fat from butter & heavy cream', 'High calorie density compared to yellow dal'],
    betterAlternatives: [
      { targetFoodId: 'dal-tadka-yellow', reasonBadge: '70% less saturated fat', note: 'Yellow Dal Tadka gives similar protein with a fraction of the heavy dairy fat.' }
    ],
    priceEstimateInr: 140
  },
  {
    id: 'palak-paneer',
    name: 'Palak Paneer',
    hindiName: 'पालक पनीर',
    brand: 'Homemade',
    category: 'indian_foods',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Katori (150g)', weightGrams: 150, unitLabel: 'katori', isDefault: true },
      { name: '1 Large Bowl (250g)', weightGrams: 250, unitLabel: 'bowl' }
    ],
    nutritionPer100g: {
      calories: 145,
      protein: 8.8,
      carbohydrates: 4.8,
      totalSugar: 1.8,
      addedSugar: 0,
      dietaryFiber: 3.2,
      totalFat: 10.4,
      saturatedFat: 5.2,
      transFat: 0,
      sodium: 310,
      iron: 3.4,
      calcium: 220
    },
    ingredients: [
      { name: 'Fresh Spinach (Palak)', processingLevel: 'unprocessed' },
      { name: 'Fresh Paneer (Cottage Cheese)', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Green Chillies & Ginger', processingLevel: 'unprocessed' },
      { name: 'Ghee / Mustard Oil', processingLevel: 'culinary' },
      { name: 'Garam Masala & Salt', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Superb nutrient profile. Exceptional calcium, iron, and slow-digesting protein with low net carbs.',
    advantages: ['High calcium (220mg) and non-heme iron', 'Very low glycemic index (great for diabetics)', 'High satiety'],
    thingsToConsider: ['Contains dairy (paneer)', 'Moderate saturated fat from dairy fat'],
    betterAlternatives: [],
    priceEstimateInr: 90
  },
  {
    id: 'rajma-chawal',
    name: 'Rajma Curry (Home Style)',
    hindiName: 'राजमा मसाला',
    brand: 'Homemade',
    category: 'indian_foods',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Katori (150g)', weightGrams: 150, unitLabel: 'katori', isDefault: true },
      { name: '1 Bowl (220g)', weightGrams: 220, unitLabel: 'bowl' }
    ],
    nutritionPer100g: {
      calories: 122,
      protein: 6.8,
      carbohydrates: 18.2,
      totalSugar: 1.4,
      addedSugar: 0,
      dietaryFiber: 5.4,
      totalFat: 2.8,
      saturatedFat: 0.6,
      transFat: 0,
      sodium: 320,
      iron: 2.4,
      potassium: 380
    },
    ingredients: [
      { name: 'Red Kidney Beans (Rajma)', processingLevel: 'unprocessed' },
      { name: 'Tomatoes & Onions', processingLevel: 'unprocessed' },
      { name: 'Ginger & Garlic', processingLevel: 'unprocessed' },
      { name: 'Ground Spices', processingLevel: 'culinary' },
      { name: 'Mustard Oil', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Nutritious slow-burning fuel. Loaded with soluble fiber, potassium, and sustaining plant protein.',
    advantages: ['Outstanding soluble fiber content', 'Excellent potassium content for blood pressure balance', 'Sustained energy release'],
    thingsToConsider: ['Contains onion & garlic', 'Pair with a moderate portion of rice to keep carbs balanced'],
    betterAlternatives: [],
    priceEstimateInr: 40
  },
  {
    id: 'poha-vegetable',
    name: 'Vegetable Poha',
    hindiName: 'कांदा पोहा',
    brand: 'Homemade',
    category: 'grains',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free'],
    servingPortions: [
      { name: '1 Medium Plate (180g)', weightGrams: 180, unitLabel: 'plate', isDefault: true },
      { name: '1 Small Katori (100g)', weightGrams: 100, unitLabel: 'katori' }
    ],
    nutritionPer100g: {
      calories: 160,
      protein: 3.4,
      carbohydrates: 27.5,
      totalSugar: 1.8,
      addedSugar: 0,
      dietaryFiber: 2.4,
      totalFat: 4.2,
      saturatedFat: 0.8,
      transFat: 0,
      sodium: 220,
      iron: 2.8
    },
    ingredients: [
      { name: 'Flattened Rice (Poha)', processingLevel: 'culinary' },
      { name: 'Onion, Green Peas, Curry Leaves', processingLevel: 'unprocessed' },
      { name: 'Roasted Peanuts', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'peanut' },
      { name: 'Mustard Seeds & Turmeric', processingLevel: 'culinary' },
      { name: 'Oil & Lemon Juice', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Light, comforting breakfast. Good iron from flattened rice, balanced with healthy peanut fats.',
    advantages: ['Easily digestible morning carb source', 'Natural non-heme iron from flattened rice', 'Naturally gluten-free'],
    thingsToConsider: ['Contains peanuts (allergen)', 'Relatively low in protein on its own (add boiled sprouts or eggs)'],
    betterAlternatives: [
      { targetFoodId: 'besan-chilla', reasonBadge: '2.5x more protein', note: 'Besan Chilla delivers 8g protein per serving with lower glycemic impact.' }
    ],
    priceEstimateInr: 25
  },
  {
    id: 'besan-chilla',
    name: 'Besan Chilla (Gram Flour Pancake)',
    hindiName: 'बेसन का चीला',
    brand: 'Homemade',
    category: 'indian_foods',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Chilla (70g)', weightGrams: 70, unitLabel: 'chilla', isDefault: true },
      { name: '2 Chillas (140g)', weightGrams: 140, unitLabel: 'chillas' }
    ],
    nutritionPer100g: {
      calories: 175,
      protein: 9.4,
      carbohydrates: 22.1,
      totalSugar: 2.1,
      addedSugar: 0,
      dietaryFiber: 5.6,
      totalFat: 5.8,
      saturatedFat: 0.9,
      transFat: 0,
      sodium: 280,
      iron: 2.6,
      potassium: 310
    },
    ingredients: [
      { name: 'Bengal Gram Flour (Besan)', processingLevel: 'unprocessed' },
      { name: 'Chopped Tomato, Onion, Green Chillies', processingLevel: 'unprocessed' },
      { name: 'Ajwain (Carom seeds) & Turmeric', processingLevel: 'culinary' },
      { name: 'Mustard Oil / Ghee (brushing)', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Powerhouse breakfast. High plant protein, low glycemic index, and rich in natural dietary fiber.',
    advantages: ['9.4g protein per 100g with zero refined flour', 'Naturally gluten-free and diabetic-friendly', 'Promotes prolonged morning satiety'],
    thingsToConsider: ['Avoid excess oil when cooking on tawa'],
    betterAlternatives: [],
    priceEstimateInr: 20
  },
  {
    id: 'idli-sambar',
    name: 'Steamed Idli (2 pcs) with Sambar',
    hindiName: 'इडली सांभर',
    brand: 'Homemade / South Indian Eatery',
    category: 'indian_foods',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [
      { name: '2 Idlis + 1 Katori Sambar (200g)', weightGrams: 200, unitLabel: 'plate', isDefault: true },
      { name: 'Single Idli (45g)', weightGrams: 45, unitLabel: 'idli' }
    ],
    nutritionPer100g: {
      calories: 108,
      protein: 3.8,
      carbohydrates: 21.2,
      totalSugar: 1.2,
      addedSugar: 0,
      dietaryFiber: 2.8,
      totalFat: 0.8,
      saturatedFat: 0.2,
      transFat: 0,
      sodium: 230,
      potassium: 190
    },
    ingredients: [
      { name: 'Fermented Rice & Urad Dal Batter', processingLevel: 'culinary' },
      { name: 'Toor Dal, Drumstick, Vegetables (Sambar)', processingLevel: 'unprocessed' },
      { name: 'Sambar Masala & Tamarind', processingLevel: 'culinary' },
      { name: 'Curry Leaves & Mustard Seeds', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Fermented gut-friendly delight. Virtually zero oil, easily digestible, and naturally gluten-free.',
    advantages: ['Fermentation enhances bio-availability of B vitamins', 'Less than 1g fat per 100g', 'Gentle on gut microbiome'],
    thingsToConsider: ['Pair with sambar rather than excess coconut chutney to keep saturated fat low'],
    betterAlternatives: [],
    priceEstimateInr: 40
  },
  {
    id: 'masala-dosa',
    name: 'Masala Dosa',
    hindiName: 'मसाला डोसा',
    brand: 'Restaurant',
    category: 'indian_foods',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free'],
    servingPortions: [
      { name: '1 Standard Dosa (180g)', weightGrams: 180, unitLabel: 'dosa', isDefault: true }
    ],
    nutritionPer100g: {
      calories: 195,
      protein: 4.2,
      carbohydrates: 28.5,
      totalSugar: 1.5,
      addedSugar: 0,
      dietaryFiber: 2.6,
      totalFat: 7.2,
      saturatedFat: 2.1,
      transFat: 0,
      sodium: 360
    },
    ingredients: [
      { name: 'Fermented Rice & Urad Dal Batter', processingLevel: 'culinary' },
      { name: 'Spiced Potato Masala (Aloo)', processingLevel: 'culinary' },
      { name: 'Oil / Ghee on Tawa', processingLevel: 'culinary' },
      { name: 'Mustard Seeds & Curry Leaves', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Delicious fermented meal. Moderate fat and starch; best enjoyed with vegetable sambar.',
    advantages: ['Traditional fermented batter', 'Good carb energy for active days'],
    thingsToConsider: ['Potato stuffing increases glycemic load for diabetics', 'Restaurant versions often use generous oil or butter'],
    betterAlternatives: [
      { targetFoodId: 'idli-sambar', reasonBadge: '80% less oil', note: 'Steamed Idli delivers identical fermented benefits without tawa frying.' }
    ],
    priceEstimateInr: 80
  },
  {
    id: 'khichdi-moong',
    name: 'Moong Dal Khichdi with Ghee',
    hindiName: 'मूंग दाल खिचड़ी',
    brand: 'Homemade',
    category: 'indian_foods',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain', 'diabetic_friendly'],
    servingPortions: [
      { name: '1 Katori (180g)', weightGrams: 180, unitLabel: 'katori', isDefault: true },
      { name: '1 Large Plate (280g)', weightGrams: 280, unitLabel: 'plate' }
    ],
    nutritionPer100g: {
      calories: 128,
      protein: 4.8,
      carbohydrates: 21.0,
      totalSugar: 0.8,
      addedSugar: 0,
      dietaryFiber: 3.1,
      totalFat: 2.9,
      saturatedFat: 1.4,
      transFat: 0,
      sodium: 190,
      potassium: 160
    },
    ingredients: [
      { name: 'Yellow Moong Dal & Rice (50:50 ratio)', processingLevel: 'unprocessed' },
      { name: 'Pure Desi Ghee (1 tsp)', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Cumin Seeds (Jeera) & Hing', processingLevel: 'culinary' },
      { name: 'Turmeric & Rock Salt', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'The gold standard Indian comfort food. Complete amino acid profile and supreme gut tolerance.',
    advantages: ['Complete protein formed by rice + dal combination', 'Extremely soothing on digestive system', 'Jain friendly (no root vegetables)'],
    thingsToConsider: ['Moderate carbohydrate density'],
    betterAlternatives: [],
    priceEstimateInr: 30
  },
  {
    id: 'paneer-raw-fresh',
    name: 'Fresh Paneer (Malai / Full Cream)',
    hindiName: 'ताज़ा पनीर',
    brand: 'Amul / Mother Dairy',
    category: 'dairy',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '100g Block', weightGrams: 100, unitLabel: 'block', isDefault: true },
      { name: '50g Portion (3 cubes)', weightGrams: 50, unitLabel: 'cubes' }
    ],
    nutritionPer100g: {
      calories: 289,
      protein: 18.3,
      carbohydrates: 3.4,
      totalSugar: 2.6,
      addedSugar: 0,
      dietaryFiber: 0,
      totalFat: 22.5,
      saturatedFat: 14.1,
      transFat: 0.4,
      sodium: 45,
      calcium: 480
    },
    ingredients: [
      { name: 'Pasteurized Full Cream Milk', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'dairy' },
      { name: 'Citric Acid / Lemon Juice for Curdling', processingLevel: 'culinary' }
    ],
    claims: [
      { claim: 'High Protein & Calcium', isMisleading: false, verdict: 'Accurate', explanation: 'Delivers 18.3g protein and 480mg calcium per 100g naturally.' }
    ],
    verdictHeadline: 'Outstanding high-protein, zero-carb food for vegetarians. Watch portion sizes for saturated fat.',
    advantages: ['18.3g high biological value protein', 'Huge calcium reservoir (480mg / 100g)', 'Near-zero glycemic load (ideal for diabetics)'],
    thingsToConsider: ['High in saturated fat (14g/100g)', 'Calorie dense (289 kcal/100g)'],
    betterAlternatives: [],
    priceEstimateInr: 45
  },
  {
    id: 'paneer-low-fat',
    name: 'Low Fat Paneer',
    hindiName: 'लो-फैट पनीर',
    brand: 'Mother Dairy / Amul Lite',
    category: 'dairy',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '100g Block', weightGrams: 100, unitLabel: 'block', isDefault: true },
      { name: '50g Portion', weightGrams: 50, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 172,
      protein: 24.5,
      carbohydrates: 4.2,
      totalSugar: 3.1,
      addedSugar: 0,
      dietaryFiber: 0,
      totalFat: 6.2,
      saturatedFat: 3.8,
      transFat: 0.1,
      sodium: 55,
      calcium: 560
    },
    ingredients: [
      { name: 'Double Toned Cow Milk', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'dairy' },
      { name: 'Coagulating Agent', processingLevel: 'culinary' }
    ],
    claims: [
      { claim: 'Low Fat High Protein', isMisleading: false, verdict: 'Accurate', explanation: 'Prepared from skimmed milk, drastically reducing saturated fat while raising protein density.' }
    ],
    verdictHeadline: 'Exceptional fitness choice. 24.5g protein with 70% less fat than standard malai paneer.',
    advantages: ['Spectacular protein-to-calorie ratio', 'Over 560mg calcium per 100g', 'Great for weight management and lipid control'],
    thingsToConsider: ['Slightly firmer, less creamy texture than regular malai paneer'],
    betterAlternatives: [],
    priceEstimateInr: 50
  },

  // --- PACKAGED FOODS & DECODED CLAIMS ---
  {
    id: 'maggi-masala-noodles',
    name: 'Maggi 2-Minute Masala Noodles',
    hindiName: 'मैगी मसाला नूडल्स',
    brand: 'Nestlé',
    category: 'packaged_foods',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [
      { name: '1 Single Pack (70g)', weightGrams: 70, unitLabel: 'pack', isDefault: true },
      { name: '100g Noodles', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 427,
      protein: 8.0,
      carbohydrates: 63.5,
      totalSugar: 2.2,
      addedSugar: 1.6,
      dietaryFiber: 3.6,
      totalFat: 15.7,
      saturatedFat: 6.8,
      transFat: 0.1,
      sodium: 1220,
      iron: 3.7
    },
    ingredients: [
      { name: 'Refined Wheat Flour (Maida)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Palm Oil', processingLevel: 'ultra_processed', concerns: 'High saturated palm fat used for rapid deep-frying the noodle cake.' },
      { name: 'Iodized Salt', processingLevel: 'culinary' },
      { name: 'Hydrolyzed Groundnut Protein', processingLevel: 'ultra_processed', isAllergen: true, allergenType: 'peanut' },
      { name: 'Flavor Enhancers (INS 635)', processingLevel: 'ultra_processed', concerns: 'Disodium 5-ribonucleotides to amplify umami taste.' },
      { name: 'Acidity Regulators (INS 501i, INS 500i)', processingLevel: 'ultra_processed' }
    ],
    claims: [
      { claim: 'Goodness of Iron', isMisleading: true, verdict: 'Misleading Context', explanation: 'Fortified with iron powder to create a health halo on a deeply refined, palm-oil fried noodle cake with 1,220mg sodium.' }
    ],
    verdictHeadline: 'Occasional quick meal. Very high sodium and refined flour; deep-fried in palm oil.',
    advantages: ['Quick 2-minute preparation', 'Fortified with iron'],
    thingsToConsider: ['Delivers over 60% of daily sodium limit in a single pack', 'Deep-fried noodle block in saturated palm oil', 'Contains refined maida with fast glycemic absorption'],
    betterAlternatives: [
      { targetFoodId: 'saffola-masala-oats', reasonBadge: '4x more fiber, 50% less sodium', note: 'Masala Oats uses 100% whole rolled grain with whole vegetables and zero maida.' }
    ],
    priceEstimateInr: 14
  },
  {
    id: 'saffola-masala-oats',
    name: 'Saffola Masala Oats (Classic Masala)',
    hindiName: 'मसाला ओट्स',
    brand: 'Saffola / Marico',
    category: 'packaged_foods',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'diabetic_friendly'],
    servingPortions: [
      { name: '1 Bowl / Sachet (38g)', weightGrams: 38, unitLabel: 'sachet', isDefault: true },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 385,
      protein: 9.8,
      carbohydrates: 65.0,
      totalSugar: 6.2,
      addedSugar: 3.5,
      dietaryFiber: 8.5,
      totalFat: 9.2,
      saturatedFat: 2.1,
      transFat: 0,
      sodium: 780,
      iron: 3.8
    },
    ingredients: [
      { name: 'Rolled Oats (73.6%)', processingLevel: 'unprocessed' },
      { name: 'Dehydrated Vegetables (Carrots, Peas, Onion)', processingLevel: 'processed' },
      { name: 'Rice Bran Oil', processingLevel: 'culinary' },
      { name: 'Spices & Condiments', processingLevel: 'culinary' },
      { name: 'Flavor Enhancers (INS 627, 631)', processingLevel: 'ultra_processed' }
    ],
    claims: [
      { claim: 'High in Beta-Glucan Fiber', isMisleading: false, verdict: 'Accurate', explanation: 'Rolled oats are genuinely high in beta-glucan soluble fiber, which supports healthy cholesterol levels.' }
    ],
    verdictHeadline: 'Substantially better instant warm bowl. High natural fiber, though seasoning adds moderate sodium.',
    advantages: ['8.5g dietary fiber per 100g', 'Whole grain oat base', 'Significantly lower saturated fat than instant noodles'],
    thingsToConsider: ['Contains 780mg sodium per 100g in pre-packaged seasoning', 'Contains flavor enhancers'],
    betterAlternatives: [],
    priceEstimateInr: 20
  },
  {
    id: 'parle-g-biscuits',
    name: 'Parle-G Glucose Biscuits',
    hindiName: 'पारले-जी बिस्कुट',
    brand: 'Parle',
    category: 'snacks',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [
      { name: '4 Biscuits (20g)', weightGrams: 20, unitLabel: 'biscuits', isDefault: true },
      { name: '1 Full Small Pack (55g)', weightGrams: 55, unitLabel: 'pack' },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 454,
      protein: 6.5,
      carbohydrates: 78.2,
      totalSugar: 28.5,
      addedSugar: 26.5,
      dietaryFiber: 1.8,
      totalFat: 13.0,
      saturatedFat: 6.2,
      transFat: 0,
      sodium: 290
    },
    ingredients: [
      { name: 'Refined Wheat Flour (Maida 67%)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Sugar', processingLevel: 'culinary' },
      { name: 'Refined Palm Oil', processingLevel: 'ultra_processed', concerns: 'Refined palm oil base.' },
      { name: 'Invert Sugar Syrup', processingLevel: 'ultra_processed' },
      { name: 'Milk Solids', processingLevel: 'processed', isAllergen: true, allergenType: 'dairy' },
      { name: 'Leavening Agents (INS 503ii, 500ii)', processingLevel: 'ultra_processed' },
      { name: 'Artificial Vanilla Flavors', processingLevel: 'ultra_processed' }
    ],
    claims: [
      { claim: 'G for Genius / Glucose Energy', isMisleading: true, verdict: 'Marketing Buzzword', explanation: '"Glucose" here is simple added sucrose and invert sugar that yields rapid sugar spikes rather than sustained cognitive stamina.' }
    ],
    verdictHeadline: 'Nostalgic tea companion, but essentially refined flour and 26g added sugar with palm fat.',
    advantages: ['Affordable and ubiquitous', 'Gentle on sensitive stomachs'],
    thingsToConsider: ['Over 26g of added sugar per 100g', 'Very low fiber and protein', 'High glycemic impact for diabetics'],
    betterAlternatives: [
      { targetFoodId: 'roasted-makhana', reasonBadge: 'Zero added sugar, 3x fiber', note: 'Roasted Makhana offers the same tea-time crunch without refined flour, sugar, or palm oil.' }
    ],
    priceEstimateInr: 10
  },
  {
    id: 'britannia-good-day-cashew',
    name: 'Britannia Good Day Cashew Cookies',
    hindiName: 'गुड डे काजू कुकीज़',
    brand: 'Britannia',
    category: 'snacks',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [
      { name: '2 Cookies (25g)', weightGrams: 25, unitLabel: 'cookies', isDefault: true },
      { name: '1 Pack (60g)', weightGrams: 60, unitLabel: 'pack' }
    ],
    nutritionPer100g: {
      calories: 502,
      protein: 6.4,
      carbohydrates: 68.0,
      totalSugar: 23.5,
      addedSugar: 22.0,
      dietaryFiber: 1.5,
      totalFat: 23.0,
      saturatedFat: 10.5,
      transFat: 0.1,
      sodium: 360
    },
    ingredients: [
      { name: 'Refined Wheat Flour (Maida)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Sugar', processingLevel: 'culinary' },
      { name: 'Edible Vegetable Oil (Palm)', processingLevel: 'ultra_processed' },
      { name: 'Cashew Bits (only 2.1%)', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'nut' },
      { name: 'Butter (0.6%)', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Artificial Flavoring Substances (Butter & Nut)', processingLevel: 'ultra_processed' }
    ],
    claims: [
      { claim: 'Cashew & Butter Richness', isMisleading: true, verdict: 'Highly Exaggerated', explanation: 'Actual cashew content is barely 2.1% and butter is 0.6%. The richness comes predominantly from palm fat and artificial butter aromas.' }
    ],
    verdictHeadline: 'Ultra-processed confectionery. Heavy saturated palm fat and 22g sugar; cashew content is marginal (2%).',
    advantages: ['Crisp texture and pleasant taste'],
    thingsToConsider: ['Contains 10.5g saturated fat per 100g', 'Cashew content is only 2.1%', 'High calorie density (502 kcal)'],
    betterAlternatives: [
      { targetFoodId: 'raw-almonds', reasonBadge: '100% whole nut, zero sugar', note: 'Whole almonds deliver real heart-healthy fats, 21g protein, and zero palm oil or maida.' }
    ],
    priceEstimateInr: 25
  },
  {
    id: 'bournvita-health-drink',
    name: 'Bournvita Health Drink Powder',
    hindiName: 'बॉर्नविटा',
    brand: 'Mondelez / Cadbury',
    category: 'beverages',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [
      { name: '1 Scoop / Serve (20g)', weightGrams: 20, unitLabel: 'scoop', isDefault: true },
      { name: 'Prepared with Milk (200ml)', weightGrams: 220, unitLabel: 'glass' }
    ],
    nutritionPer100g: {
      calories: 388,
      protein: 7.0,
      carbohydrates: 85.2,
      totalSugar: 49.8,
      addedSugar: 32.2,
      dietaryFiber: 3.5,
      totalFat: 1.8,
      saturatedFat: 0.9,
      transFat: 0,
      sodium: 155,
      calcium: 500,
      iron: 38
    },
    ingredients: [
      { name: 'Cereal Extract (Barley, Wheat)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Sugar', processingLevel: 'culinary' },
      { name: 'Cocoa Solids', processingLevel: 'processed' },
      { name: 'Liquid Glucose & Maltodextrin', processingLevel: 'ultra_processed', concerns: 'Rapidly absorbed simple carbohydrates.' },
      { name: 'Vitamins & Minerals Premix', processingLevel: 'processed' },
      { name: 'Emulsifiers (INS 322, 471)', processingLevel: 'ultra_processed' }
    ],
    claims: [
      { claim: 'Immunity & Bone Health Booster', isMisleading: true, verdict: 'Health Halo on Sugar', explanation: 'Government and regulatory scrutiny prompted reclassification away from "health drink" because nearly 50% of the powder is total sugars.' }
    ],
    verdictHeadline: 'Flavored malt beverage with ~50% total sugars. Fortified with vitamins, but acts like dessert.',
    advantages: ['Rich fortification of Vitamin D, B12, and Iron'],
    thingsToConsider: ['Contains over 32g added sugar per 100g (over half a teaspoon per glass)', 'Encourages habitual sweet palate in children', 'Not suitable for diabetic management'],
    betterAlternatives: [
      { targetFoodId: 'amul-taaza-milk', reasonBadge: 'Zero added sugar, pure protein', note: 'Plain cow milk has naturally occurring lactose and 3.2g clean dairy protein without syrups.' }
    ],
    priceEstimateInr: 220
  },
  {
    id: 'real-mixed-fruit-juice',
    name: 'Real 100% Mixed Fruit Juice',
    hindiName: 'रियल फ्रूट जूस',
    brand: 'Dabur Real',
    category: 'beverages',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free'],
    servingPortions: [
      { name: '1 Glass (200ml)', weightGrams: 200, unitLabel: 'glass', isDefault: true },
      { name: '100ml', weightGrams: 100, unitLabel: 'ml' }
    ],
    nutritionPer100g: {
      calories: 56,
      protein: 0.4,
      carbohydrates: 13.5,
      totalSugar: 13.0,
      addedSugar: 7.2,
      dietaryFiber: 0.1,
      totalFat: 0,
      saturatedFat: 0,
      transFat: 0,
      sodium: 18,
      potassium: 110
    },
    ingredients: [
      { name: 'Water', processingLevel: 'unprocessed' },
      { name: 'Mixed Fruit Juice Concentrates (Apple, Orange, Guava, Mango 18%)', processingLevel: 'processed' },
      { name: 'Sugar', processingLevel: 'culinary' },
      { name: 'Acidity Regulator (INS 330)', processingLevel: 'culinary' },
      { name: 'Antioxidant (INS 300 - Vitamin C)', processingLevel: 'processed' }
    ],
    claims: [
      { claim: '100% Real Goodness of Fruit', isMisleading: true, verdict: 'Deceptive Fruit Claim', explanation: 'Concentrate makes up under 20% of the formulation; the beverage lacks intact fruit fiber, dumping 26g simple sugars per 200ml serving into the bloodstream.' }
    ],
    verdictHeadline: 'Liquid sugar delivery. Stripped of beneficial fruit fibers, provoking rapid blood sugar spikes.',
    advantages: ['Fortified with Vitamin C', 'Hydrating on hot days'],
    thingsToConsider: ['Zero dietary fiber', '26g total sugars per glass (equivalent to 6 teaspoons)', 'Poor satiety'],
    betterAlternatives: [
      { targetFoodId: 'fresh-coconut-water', reasonBadge: '50% less sugar, natural electrolytes', note: 'Tender coconut water gives genuine natural hydration without added cane sugar.' },
      { targetFoodId: 'kashmiri-apple', reasonBadge: 'Intact soluble fiber & 0 added sugar', note: 'Whole apple provides pectin fiber that slows glucose absorption.' }
    ],
    priceEstimateInr: 30
  },
  {
    id: 'lays-magic-masala',
    name: "Lay's India's Magic Masala Potato Chips",
    hindiName: 'लेज मैजिक मसाला',
    brand: "Lay's / PepsiCo",
    category: 'snacks',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [
      { name: '1 Small Pack (28g)', weightGrams: 28, unitLabel: 'pack', isDefault: true },
      { name: '1 Big Pack (50g)', weightGrams: 50, unitLabel: 'pack' },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 544,
      protein: 7.0,
      carbohydrates: 52.4,
      totalSugar: 3.5,
      addedSugar: 2.1,
      dietaryFiber: 3.8,
      totalFat: 34.0,
      saturatedFat: 14.5,
      transFat: 0.1,
      sodium: 890
    },
    ingredients: [
      { name: 'Potatoes (52%)', processingLevel: 'unprocessed' },
      { name: 'Edible Vegetable Oil (Palmolein)', processingLevel: 'ultra_processed', concerns: 'Deep-fried in refined palmolein oil.' },
      { name: 'Magic Masala Seasoning (Spices, Salt, Sugar, Maltodextrin)', processingLevel: 'ultra_processed' },
      { name: 'Flavor Enhancers (INS 627, 631)', processingLevel: 'ultra_processed' }
    ],
    claims: [
      { claim: 'Zero Trans Fat', isMisleading: false, verdict: 'Technically Accurate', explanation: 'Trans fat is within legal zero-threshold (<0.2g), but saturated fat remains very high (14.5g/100g).' }
    ],
    verdictHeadline: 'Ultra-processed savory snack. Very high calorie density (544 kcal) and high sodium from palmolein frying.',
    advantages: ['Iconic Indian spice blend', 'Crisp satisfaction'],
    thingsToConsider: ['34g fat per 100g (one-third pure oil by weight)', 'High sodium (890mg/100g)', 'Triggers mindless overconsumption'],
    betterAlternatives: [
      { targetFoodId: 'roasted-makhana', reasonBadge: '80% less fat, whole seed', note: 'Spiced roasted fox nuts deliver equal savory crunch with clean dietary fiber.' }
    ],
    priceEstimateInr: 20
  },
  {
    id: 'haldirams-aloo-bhujia',
    name: "Haldiram's Aloo Bhujia",
    hindiName: 'हल्दीराम आलू भुजिया',
    brand: "Haldiram's",
    category: 'snacks',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free'],
    servingPortions: [
      { name: '1 Handful (30g)', weightGrams: 30, unitLabel: 'handful', isDefault: true },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 578,
      protein: 8.8,
      carbohydrates: 42.5,
      totalSugar: 2.1,
      addedSugar: 0.5,
      dietaryFiber: 4.8,
      totalFat: 41.5,
      saturatedFat: 17.2,
      transFat: 0.1,
      sodium: 760
    },
    ingredients: [
      { name: 'Potatoes & Tepary Bean Flour (Moth Dal)', processingLevel: 'processed' },
      { name: 'Gram Pulse Flour (Besan)', processingLevel: 'unprocessed' },
      { name: 'Edible Vegetable Oil (Palmolein / Cottonseed)', processingLevel: 'ultra_processed' },
      { name: 'Red Chilli, Black Pepper, Dry Mango Powder (Amchur), Salt', processingLevel: 'culinary' }
    ],
    claims: [
      { claim: 'Gluten Free Goodness', isMisleading: true, verdict: 'Health Halo Distraction', explanation: 'While besan and potato are naturally gluten-free, the product is 41.5% fat by weight.' }
    ],
    verdictHeadline: 'Intense indulgence. Exceptionally high fat content (41.5g per 100g) and heavy calorie density.',
    advantages: ['Flavorful authentic namkeen recipe', 'Naturally gluten-free'],
    thingsToConsider: ['More than 40% fat by weight', 'Over 17g saturated fat per 100g', 'Extremely easy to overshoot calorie targets'],
    betterAlternatives: [
      { targetFoodId: 'roasted-chana', reasonBadge: '75% less fat, 18g protein', note: 'Roasted Bengal Gram gives deep traditional crunch with high plant protein and zero deep-frying.' }
    ],
    priceEstimateInr: 50
  },
  {
    id: 'roasted-makhana',
    name: 'Roasted Makhana (Spiced Fox Nuts)',
    hindiName: 'भुना मखाना',
    brand: 'Homemade / Farmley',
    category: 'snacks',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Large Bowl (30g)', weightGrams: 30, unitLabel: 'bowl', isDefault: true },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 362,
      protein: 9.7,
      carbohydrates: 76.0,
      totalSugar: 0.5,
      addedSugar: 0,
      dietaryFiber: 7.6,
      totalFat: 2.1,
      saturatedFat: 0.4,
      transFat: 0,
      sodium: 210,
      potassium: 480,
      calcium: 60,
      iron: 2.8
    },
    ingredients: [
      { name: 'Fox Nuts (Lotus Seeds / Makhana)', processingLevel: 'unprocessed' },
      { name: 'Desi Ghee / Olive Oil (light spray)', processingLevel: 'culinary' },
      { name: 'Rock Salt, Black Pepper & Chaat Masala', processingLevel: 'culinary' }
    ],
    claims: [
      { claim: 'Clean Superfood Snack', isMisleading: false, verdict: 'Accurate', explanation: 'Whole popped aquatic seed, naturally low in saturated fats and sodium.' }
    ],
    verdictHeadline: 'Top-tier snack swap. Voluminous, low in fat, high in fiber, and deeply satisfying.',
    advantages: ['Low calorie density per volume (30g fills an entire large bowl)', 'Zero added sugar and low saturated fat', 'Rich in potassium and magnesium for heart health'],
    thingsToConsider: ['High carbohydrate content; balance with nuts for diabetic keto protocols'],
    betterAlternatives: [],
    priceEstimateInr: 45
  },
  {
    id: 'roasted-chana',
    name: 'Roasted Chana with Skin (Bengal Gram)',
    hindiName: 'भुना चना (छिलके वाला)',
    brand: 'Local Market / Tata Sampann',
    category: 'snacks',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Handful / Bowl (40g)', weightGrams: 40, unitLabel: 'handful', isDefault: true },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 375,
      protein: 18.6,
      carbohydrates: 58.0,
      totalSugar: 3.2,
      addedSugar: 0,
      dietaryFiber: 15.2,
      totalFat: 5.3,
      saturatedFat: 0.7,
      transFat: 0,
      sodium: 120,
      iron: 6.2,
      potassium: 540
    },
    ingredients: [
      { name: 'Whole Bengal Gram with husk', processingLevel: 'unprocessed' },
      { name: 'Dry Roasted (Sand Roasted traditional method)', processingLevel: 'unprocessed' }
    ],
    claims: [
      { claim: '18g Protein & High Fiber', isMisleading: false, verdict: 'Accurate', explanation: 'Retains entire bran husk, yielding 15.2g natural dietary fiber and nearly 19g plant protein.' }
    ],
    verdictHeadline: 'Unbeatable traditional power snack. 18.6g protein, massive fiber, and virtually no sodium or oil.',
    advantages: ['Massive 15.2g dietary fiber (over 50% daily requirement)', '18.6g plant protein with minimal fat', 'Excellent low-cost superfood for blood glucose control'],
    thingsToConsider: ['High fiber may require adequate hydration'],
    betterAlternatives: [],
    priceEstimateInr: 20
  },
  {
    id: 'pintola-peanut-butter-natural',
    name: 'Pintola All-Natural Peanut Butter (Crunchy)',
    hindiName: 'पीनट बटर (नेचुरल)',
    brand: 'Pintola',
    category: 'nuts_and_seeds',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Tablespoon (16g)', weightGrams: 16, unitLabel: 'tbsp', isDefault: true },
      { name: '2 Tablespoons (32g)', weightGrams: 32, unitLabel: 'tbsp' },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 625,
      protein: 29.5,
      carbohydrates: 18.5,
      totalSugar: 4.8,
      addedSugar: 0,
      dietaryFiber: 8.0,
      totalFat: 48.0,
      saturatedFat: 8.5,
      transFat: 0,
      sodium: 12,
      potassium: 680
    },
    ingredients: [
      { name: 'Roasted Peanuts (100%)', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'peanut' }
    ],
    claims: [
      { claim: '100% Peanuts, Zero Hydrogenated Oil', isMisleading: false, verdict: 'Accurate', explanation: 'Single ingredient formulation without palm oil, emulsifiers, or added cane sugar.' }
    ],
    verdictHeadline: 'Exemplary clean protein spread. 29.5g protein and pure monounsaturated peanut lipids.',
    advantages: ['100% single ingredient — zero added oil or sugar', 'Huge 29.5g plant protein yield', 'Heart-healthy oleic acid content'],
    thingsToConsider: ['Severe allergen for peanut-allergic individuals', 'High calorie density; measure spoons with awareness'],
    betterAlternatives: [],
    priceEstimateInr: 150
  },
  {
    id: 'epigamia-greek-yogurt-plain',
    name: 'Epigamia Natural Greek Yogurt (Unsweetened)',
    hindiName: 'ग्रीक योगर्ट',
    brand: 'Epigamia',
    category: 'dairy',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Cup (90g)', weightGrams: 90, unitLabel: 'cup', isDefault: true }
    ],
    nutritionPer100g: {
      calories: 84,
      protein: 8.0,
      carbohydrates: 5.2,
      totalSugar: 5.0,
      addedSugar: 0,
      dietaryFiber: 0,
      totalFat: 3.5,
      saturatedFat: 2.2,
      transFat: 0,
      sodium: 48,
      calcium: 150
    },
    ingredients: [
      { name: 'Pasteurized Double Toned Milk', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'dairy' },
      { name: 'Active Live Cultures (S. Thermophilus, L. Bulgaricus)', processingLevel: 'unprocessed' }
    ],
    claims: [
      { claim: '2x Protein of regular dahi', isMisleading: false, verdict: 'Accurate', explanation: 'Strained traditional Greek method removes liquid whey, doubling protein concentration naturally.' }
    ],
    verdictHeadline: 'Clean, dense probiotic fuel. 8g protein per cup with zero added sugar and live gut cultures.',
    advantages: ['High protein concentration (8g/100g)', 'Zero added sugars (only natural milk lactose)', 'Live probiotics for microbiome diversity'],
    thingsToConsider: ['Contains dairy lactose', 'More expensive than homemade curd'],
    betterAlternatives: [],
    priceEstimateInr: 45
  },

  // --- STREET FOOD & SNACKS ---
  {
    id: 'samosa-aloo',
    name: 'Punjabi Aloo Samosa',
    hindiName: 'आलू समोसा',
    brand: 'Halwai / Street Stall',
    category: 'fast_food',
    confidence: 'estimated',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [
      { name: '1 Samosa (85g)', weightGrams: 85, unitLabel: 'piece', isDefault: true },
      { name: '2 Samosas with Chutney (180g)', weightGrams: 180, unitLabel: 'pieces' }
    ],
    nutritionPer100g: {
      calories: 308,
      protein: 4.8,
      carbohydrates: 34.2,
      totalSugar: 2.1,
      addedSugar: 0.5,
      dietaryFiber: 2.8,
      totalFat: 17.5,
      saturatedFat: 6.8,
      transFat: 0.3,
      sodium: 420
    },
    ingredients: [
      { name: 'Refined Wheat Flour (Maida) Pastry', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Spiced Potatoes & Green Peas', processingLevel: 'unprocessed' },
      { name: 'Deep Frying Cooking Oil', processingLevel: 'ultra_processed', concerns: 'Commercial street oil is often repeatedly heated at high temperatures.' },
      { name: 'Spices, Coriander, Ajwain, Salt', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Iconic street food treat. Crispy indulgence with fast-acting carbs and deep-fried oil.',
    advantages: ['Beloved cultural taste and comfort', 'Warm potato and pea filling'],
    thingsToConsider: ['High saturated and potentially reheated trans fats', 'Maida shell with high glycemic response', 'Calorie dense (over 260 kcal per single samosa)'],
    betterAlternatives: [
      { targetFoodId: 'dhokla-khaman', reasonBadge: 'Steamed, 80% less fat', note: 'Steamed Dhokla satisfies Indian savory craving with gentle chickpea steaming instead of deep frying.' }
    ],
    priceEstimateInr: 15
  },
  {
    id: 'dhokla-khaman',
    name: 'Khaman Dhokla (Steamed)',
    hindiName: 'खमन ढोकला',
    brand: 'Gujarati Farsan / Homemade',
    category: 'snacks',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [
      { name: '2 Squares (80g)', weightGrams: 80, unitLabel: 'pieces', isDefault: true },
      { name: '4 Squares (160g)', weightGrams: 160, unitLabel: 'pieces' }
    ],
    nutritionPer100g: {
      calories: 152,
      protein: 6.2,
      carbohydrates: 23.5,
      totalSugar: 4.5,
      addedSugar: 2.5,
      dietaryFiber: 3.2,
      totalFat: 3.8,
      saturatedFat: 0.6,
      transFat: 0,
      sodium: 380
    },
    ingredients: [
      { name: 'Gram Flour (Besan)', processingLevel: 'unprocessed' },
      { name: 'Steamed Leavened Batter (Citric acid, fruit salt)', processingLevel: 'culinary' },
      { name: 'Tempering (Mustard seeds, curry leaves, green chillies)', processingLevel: 'culinary' },
      { name: 'Slightly sweetened water & coriander garnish', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Smart savory street choice. Fermented and steamed, delivering good plant protein with minimal fat.',
    advantages: ['Steamed rather than fried', '6.2g clean plant protein from besan', 'Gluten-free and spongy texture'],
    thingsToConsider: ['Street vendors sometimes drizzle sugar syrup on top; opt for low-sugar tempering'],
    betterAlternatives: [],
    priceEstimateInr: 30
  },
  {
    id: 'vada-pav-mumbai',
    name: 'Mumbai Vada Pav',
    hindiName: 'वड़ा पाव',
    brand: 'Mumbai Street Stall',
    category: 'fast_food',
    confidence: 'estimated',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [
      { name: '1 Vada Pav with Chutney (120g)', weightGrams: 120, unitLabel: 'piece', isDefault: true }
    ],
    nutritionPer100g: {
      calories: 255,
      protein: 4.8,
      carbohydrates: 38.0,
      totalSugar: 3.2,
      addedSugar: 1.0,
      dietaryFiber: 2.2,
      totalFat: 9.8,
      saturatedFat: 3.5,
      transFat: 0.2,
      sodium: 460
    },
    ingredients: [
      { name: 'Pav (Refined White Bread)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Batata Vada (Deep fried spiced potato ball in besan)', processingLevel: 'processed' },
      { name: 'Garlic Red Chutney & Green Chutney', processingLevel: 'culinary' },
      { name: 'Fried Green Chilli', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Quintessential quick fuel. Heavy on refined starch (pav + potato) with moderate fat.',
    advantages: ['Instant accessible energy', 'Irresistible street flavor'],
    thingsToConsider: ['Double starch load: white maida bun + deep-fried potato', 'Rapid blood sugar spike', 'Contains garlic (not Jain friendly)'],
    betterAlternatives: [
      { targetFoodId: 'besan-chilla', reasonBadge: 'Zero maida, 2x protein', note: 'Besan Chilla delivers the rich chickpea flavor without deep-fried potato or refined bakery buns.' }
    ],
    priceEstimateInr: 20
  },
  {
    id: 'pani-puri-golgappa',
    name: 'Pani Puri / Golgappa (6 pieces)',
    hindiName: 'पानी पूरी / गोलगप्पा',
    brand: 'Street Vendor / Haldiram',
    category: 'snacks',
    confidence: 'estimated',
    dietFlags: ['vegetarian', 'vegan', 'halal'],
    servingPortions: [
      { name: '1 Plate (6 Puris + Spiced Water, 150g)', weightGrams: 150, unitLabel: 'plate', isDefault: true }
    ],
    nutritionPer100g: {
      calories: 140,
      protein: 2.6,
      carbohydrates: 24.0,
      totalSugar: 4.5,
      addedSugar: 2.0,
      dietaryFiber: 1.8,
      totalFat: 3.8,
      saturatedFat: 1.1,
      transFat: 0,
      sodium: 520
    },
    ingredients: [
      { name: 'Puris (Semolina/Suji & Maida fried crisp)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Filling (Sprouted Moong / Boiled Chickpeas & Potato)', processingLevel: 'unprocessed' },
      { name: 'Teekha Pani (Mint, Coriander, Green Chilli, Black Salt, Hing)', processingLevel: 'culinary' },
      { name: 'Meetha Pani (Tamarind & Jaggery)', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Relatively light street indulgence. Crisp puris filled with herb-infused digestive water.',
    advantages: ['Much lower calorie count than samosa or fries (~210 kcal per plate)', 'Digestive spices like mint, cumin, and hing'],
    thingsToConsider: ['Hygiene of street water is paramount', 'High sodium from black salt and seasonings', 'Meetha pani contains concentrated jaggery/sugar'],
    betterAlternatives: [],
    priceEstimateInr: 30
  },

  // --- MITHAI & DESSERTS ---
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun (2 pieces)',
    hindiName: 'गुलाब जामुन',
    brand: 'Halwai / Bikanervala',
    category: 'desserts',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal'],
    servingPortions: [
      { name: '2 Pieces with Syrup (80g)', weightGrams: 80, unitLabel: 'pieces', isDefault: true },
      { name: '1 Piece (40g)', weightGrams: 40, unitLabel: 'piece' },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 382,
      protein: 4.6,
      carbohydrates: 58.4,
      totalSugar: 42.0,
      addedSugar: 38.5,
      dietaryFiber: 0.4,
      totalFat: 14.8,
      saturatedFat: 8.2,
      transFat: 0.1,
      sodium: 90
    },
    ingredients: [
      { name: 'Mawa / Khoya (Reduced Milk Solids)', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Refined Wheat Flour (Maida)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' },
      { name: 'Pure Desi Ghee (for deep frying)', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Sugar Syrup infused with Rose water & Cardamom', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'High sugar celebration treat. Absorbs dense sucrose syrup; savor as a mindful rare delicacy.',
    advantages: ['Centuries-old festive culinary heritage', 'Pure mawa and cardamom aromatics'],
    thingsToConsider: ['38.5g added sugar per 100g (over 30g sugar in 2 pieces)', 'Sharp glucose spike for diabetics', 'Deep fried in ghee/fat'],
    betterAlternatives: [
      { targetFoodId: 'rasgulla', reasonBadge: 'Zero frying fat, 65% less fat', note: 'Rasgulla is steamed cottage cheese balls, cutting out the deep-frying fat completely.' }
    ],
    priceEstimateInr: 40
  },
  {
    id: 'rasgulla',
    name: 'Bengali Rasgulla (2 pieces)',
    hindiName: 'रसगुल्ला',
    brand: 'KC Das / Haldiram',
    category: 'desserts',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free'],
    servingPortions: [
      { name: '2 Pieces (100g with syrup)', weightGrams: 100, unitLabel: 'pieces', isDefault: true },
      { name: '1 Piece squeezed (40g)', weightGrams: 40, unitLabel: 'piece' }
    ],
    nutritionPer100g: {
      calories: 186,
      protein: 4.2,
      carbohydrates: 38.5,
      totalSugar: 36.0,
      addedSugar: 34.0,
      dietaryFiber: 0,
      totalFat: 1.8,
      saturatedFat: 1.1,
      transFat: 0,
      sodium: 40,
      calcium: 90
    },
    ingredients: [
      { name: 'Fresh Chhena (Cow Milk Curd Cheese)', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Sugar Syrup', processingLevel: 'culinary' },
      { name: 'Cardamom & Rose Water', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Steamed dairy mithai. Zero frying fat (only 1.8g total fat), though steeped in concentrated sugar.',
    advantages: ['Zero oil or deep frying', 'Made from fresh cow milk chhena (natural calcium)', 'Less than half the calories of gulab jamun if syrup is gently squeezed'],
    thingsToConsider: ['Syrup holds high sugar content', 'Requires portion discipline for diabetics'],
    betterAlternatives: [],
    priceEstimateInr: 35
  },
  {
    id: 'kaju-katli',
    name: 'Kaju Katli (2 pieces)',
    hindiName: 'काजू कतली',
    brand: 'Halwai / Bikanervala',
    category: 'desserts',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free'],
    servingPortions: [
      { name: '2 Pieces (30g)', weightGrams: 30, unitLabel: 'pieces', isDefault: true },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 468,
      protein: 10.2,
      carbohydrates: 54.0,
      totalSugar: 38.0,
      addedSugar: 32.0,
      dietaryFiber: 2.4,
      totalFat: 23.5,
      saturatedFat: 4.8,
      transFat: 0,
      sodium: 30,
      iron: 3.1
    },
    ingredients: [
      { name: 'Cashew Nut Paste (Kaju 55%)', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'nut' },
      { name: 'Sugar', processingLevel: 'culinary' },
      { name: 'Silver Foil (Vark - vegetarian certified)', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Nut-dense luxury mithai. Over 50% real cashews delivering 10g protein, with high sugar and calories.',
    advantages: ['Over 50% real cashew nut content', '10.2g natural plant protein', 'Heart-healthier mono-unsaturated fats compared to ghee-fried sweets'],
    thingsToConsider: ['Calorie dense (468 kcal per 100g)', '32g added cane sugar'],
    betterAlternatives: [
      { targetFoodId: 'raw-almonds', reasonBadge: 'Zero added sugar, 2x protein', note: 'Raw almonds provide clean nut satiety without sugar syrup.' }
    ],
    priceEstimateInr: 60
  },

  // --- BEVERAGES & WHOLE PRODUCE ---
  {
    id: 'masala-chai-sugar',
    name: 'Indian Masala Chai (with 1.5 tsp sugar)',
    hindiName: 'मसाला चाय',
    brand: 'Homemade',
    category: 'beverages',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain'],
    servingPortions: [
      { name: '1 Cup / Kulhad (150ml)', weightGrams: 150, unitLabel: 'cup', isDefault: true },
      { name: 'Cutting Chai (80ml)', weightGrams: 80, unitLabel: 'glass' }
    ],
    nutritionPer100g: {
      calories: 68,
      protein: 2.1,
      carbohydrates: 9.8,
      totalSugar: 8.8,
      addedSugar: 5.5,
      dietaryFiber: 0,
      totalFat: 2.2,
      saturatedFat: 1.4,
      transFat: 0,
      sodium: 28,
      calcium: 75
    },
    ingredients: [
      { name: 'Assam CTC Black Tea Leaves', processingLevel: 'unprocessed' },
      { name: 'Milk (50:50 ratio with water)', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'dairy' },
      { name: 'Fresh Ginger, Cardamom, Cloves', processingLevel: 'unprocessed' },
      { name: 'Cane Sugar (approx 7g per cup)', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Beloved daily ritual. Digestive spices and tea polyphenols, with moderate added sugar.',
    advantages: ['Antioxidant-rich black tea catechins', 'Digestive warmth from ginger and cardamom', 'Modest dairy calcium'],
    thingsToConsider: ['Drinking 3-4 cups a day adds up to 20-30g of sneaky sugar', 'Tannins can slightly reduce iron absorption if had with meals'],
    betterAlternatives: [],
    priceEstimateInr: 10
  },
  {
    id: 'fresh-coconut-water',
    name: 'Fresh Tender Coconut Water',
    hindiName: 'ताज़ा नारियल पानी',
    brand: 'Natural Roadside Vendor',
    category: 'beverages',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [
      { name: '1 Coconut (approx 250ml)', weightGrams: 250, unitLabel: 'coconut', isDefault: true },
      { name: '1 Glass (200ml)', weightGrams: 200, unitLabel: 'glass' }
    ],
    nutritionPer100g: {
      calories: 19,
      protein: 0.7,
      carbohydrates: 3.7,
      totalSugar: 2.6,
      addedSugar: 0,
      dietaryFiber: 1.1,
      totalFat: 0.2,
      saturatedFat: 0.1,
      transFat: 0,
      sodium: 25,
      potassium: 250,
      calcium: 24,
      iron: 0.3
    },
    ingredients: [
      { name: '100% Raw Unprocessed Coconut Water', processingLevel: 'unprocessed' }
    ],
    claims: [
      { claim: 'Nature’s Isotonic Hydration', isMisleading: false, verdict: 'Accurate', explanation: 'Naturally matches human electrolyte osmolarity, with rich potassium and zero added syrups.' }
    ],
    verdictHeadline: 'The ultimate natural hydrator. Zero added sugar, naturally isotonic with 250mg potassium.',
    advantages: ['Rich in natural potassium for blood pressure regulation', 'Zero processing or artificial additives', 'Low calorie density (only 19 kcal / 100ml)'],
    thingsToConsider: ['High potassium requires moderation for patients on specific severe renal/kidney diets'],
    betterAlternatives: [],
    priceEstimateInr: 60
  },
  {
    id: 'amul-taaza-milk',
    name: 'Amul Taaza Toned Milk',
    hindiName: 'अमूल ताज़ा दूध',
    brand: 'Amul',
    category: 'dairy',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain', 'diabetic_friendly'],
    servingPortions: [
      { name: '1 Glass (200ml)', weightGrams: 200, unitLabel: 'glass', isDefault: true },
      { name: '1 Small Cup (100ml)', weightGrams: 100, unitLabel: 'cup' }
    ],
    nutritionPer100g: {
      calories: 58,
      protein: 3.2,
      carbohydrates: 4.8,
      totalSugar: 4.8,
      addedSugar: 0,
      dietaryFiber: 0,
      totalFat: 3.0,
      saturatedFat: 1.9,
      transFat: 0,
      sodium: 50,
      calcium: 120
    },
    ingredients: [
      { name: 'Pasteurized Toned Milk (Min 3% Fat, 8.5% SNF)', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'dairy' }
    ],
    claims: [
      { claim: 'No Added Preservatives', isMisleading: false, verdict: 'Accurate', explanation: 'Preserved entirely via clean pasteurization standard.' }
    ],
    verdictHeadline: 'Reliable everyday whole dairy. 3.2g protein, 120mg bioavailable calcium, and zero added sugar.',
    advantages: ['120mg bioavailable calcium per 100ml', 'Balanced fat-to-protein ratio in toned milk', 'Zero added sucrose'],
    thingsToConsider: ['Contains dairy lactose'],
    betterAlternatives: [],
    priceEstimateInr: 15
  },
  {
    id: 'raw-almonds',
    name: 'Raw California Almonds (Badam)',
    hindiName: 'बादाम',
    brand: 'Nutraj / Farmley',
    category: 'nuts_and_seeds',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Handful (10-12 nuts, 25g)', weightGrams: 25, unitLabel: 'handful', isDefault: true },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 579,
      protein: 21.2,
      carbohydrates: 21.6,
      totalSugar: 4.4,
      addedSugar: 0,
      dietaryFiber: 12.5,
      totalFat: 49.9,
      saturatedFat: 3.8,
      transFat: 0,
      sodium: 1,
      calcium: 269,
      iron: 3.7,
      potassium: 733
    },
    ingredients: [
      { name: 'Raw Whole Almonds', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'nut' }
    ],
    claims: [
      { claim: 'Heart Healthy Vitamin E & Magnesium', isMisleading: false, verdict: 'Accurate', explanation: 'Extensive clinical trials link regular raw almond intake to improved lipid profiles and arterial elasticity.' }
    ],
    verdictHeadline: 'Nutritional marvel. 21g plant protein, 12.5g prebiotic fiber, and protective antioxidant Vitamin E.',
    advantages: ['Spectacular fiber and magnesium density', 'Supports steady blood glucose', 'Cardioprotective unsaturated lipids'],
    thingsToConsider: ['Nut allergen', 'Calorie dense (measure by handful)'],
    betterAlternatives: [],
    priceEstimateInr: 90
  },
  {
    id: 'kashmiri-apple',
    name: 'Fresh Kashmiri Apple',
    hindiName: 'सेब',
    brand: 'Fresh Farm Produce',
    category: 'fruits',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [
      { name: '1 Medium Apple (150g)', weightGrams: 150, unitLabel: 'apple', isDefault: true }
    ],
    nutritionPer100g: {
      calories: 52,
      protein: 0.3,
      carbohydrates: 13.8,
      totalSugar: 10.4,
      addedSugar: 0,
      dietaryFiber: 2.4,
      totalFat: 0.2,
      saturatedFat: 0,
      transFat: 0,
      sodium: 1,
      potassium: 107
    },
    ingredients: [
      { name: '100% Whole Apple with peel', processingLevel: 'unprocessed' }
    ],
    claims: [],
    verdictHeadline: 'Classic, crisp daily fruit. Natural pectin fiber gently buffers fruit sugar absorption.',
    advantages: ['Pectin fiber supports gut microbiome', 'Quercetin antioxidant benefits', 'Zero fat and zero sodium'],
    thingsToConsider: ['Eat with skin on for maximum fiber retention'],
    betterAlternatives: [],
    priceEstimateInr: 25
  },
  {
    id: 'fresh-banana',
    name: 'Robusta Banana (Kela)',
    hindiName: 'केला',
    brand: 'Fresh Produce',
    category: 'fruits',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free'],
    servingPortions: [
      { name: '1 Medium Banana (110g)', weightGrams: 110, unitLabel: 'banana', isDefault: true }
    ],
    nutritionPer100g: {
      calories: 89,
      protein: 1.1,
      carbohydrates: 22.8,
      totalSugar: 12.2,
      addedSugar: 0,
      dietaryFiber: 2.6,
      totalFat: 0.3,
      saturatedFat: 0.1,
      transFat: 0,
      sodium: 1,
      potassium: 358
    },
    ingredients: [
      { name: 'Whole Ripe Banana', processingLevel: 'unprocessed' }
    ],
    claims: [],
    verdictHeadline: 'Instant natural workout fuel. 358mg potassium helps maintain healthy fluid balance and muscle function.',
    advantages: ['Superb pre-workout natural carbs', 'Rich potassium content helps prevent muscle cramps', 'Gentle on sensitive stomach lining'],
    thingsToConsider: ['Moderately high carbohydrate density for strict ketogenic protocols'],
    betterAlternatives: [],
    priceEstimateInr: 7
  },
  {
    id: 'boiled-eggs-whole',
    name: 'Boiled Eggs (2 whole eggs)',
    hindiName: 'उबले अंडे',
    brand: 'Fresh Farm',
    category: 'protein',
    confidence: 'verified',
    dietFlags: ['halal', 'gluten_free', 'dairy_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '2 Large Eggs (100g)', weightGrams: 100, unitLabel: 'eggs', isDefault: true },
      { name: '1 Egg (50g)', weightGrams: 50, unitLabel: 'egg' }
    ],
    nutritionPer100g: {
      calories: 155,
      protein: 12.6,
      carbohydrates: 1.1,
      totalSugar: 1.1,
      addedSugar: 0,
      dietaryFiber: 0,
      totalFat: 10.6,
      saturatedFat: 3.3,
      transFat: 0,
      sodium: 124,
      iron: 1.8,
      calcium: 50,
      potassium: 126
    },
    ingredients: [
      { name: 'Whole Hen Egg', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'egg' }
    ],
    claims: [
      { claim: 'Complete Protein Reference', isMisleading: false, verdict: 'Accurate', explanation: 'Egg protein has a biological value score of 100, containing all 9 essential amino acids in optimal proportion.' }
    ],
    verdictHeadline: 'Gold standard complete protein. 12.6g bioavailable protein and essential brain nutrient choline.',
    advantages: ['Complete amino acid profile', 'Rich in choline, lutein, and Vitamin B12', 'Near-zero carbs and zero added sugar'],
    thingsToConsider: ['Not vegetarian (egg)', 'Moderate dietary cholesterol in yolks (safe for most healthy adults in context)'],
    betterAlternatives: [],
    priceEstimateInr: 16
  },
  {
    id: 'chicken-tikka-grilled',
    name: 'Tandoori Chicken Tikka (Grilled)',
    hindiName: 'चिकन टिक्का',
    brand: 'Restaurant / Homemade',
    category: 'protein',
    confidence: 'verified',
    dietFlags: ['halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Plate (6 pieces, 180g)', weightGrams: 180, unitLabel: 'plate', isDefault: true },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 165,
      protein: 26.2,
      carbohydrates: 2.8,
      totalSugar: 1.2,
      addedSugar: 0,
      dietaryFiber: 0.6,
      totalFat: 5.2,
      saturatedFat: 1.5,
      transFat: 0,
      sodium: 460,
      iron: 1.5,
      potassium: 280
    },
    ingredients: [
      { name: 'Boneless Chicken Breast', processingLevel: 'unprocessed' },
      { name: 'Yogurt (Curd) Marinade', processingLevel: 'culinary', isAllergen: true, allergenType: 'dairy' },
      { name: 'Ginger Garlic Paste & Lemon', processingLevel: 'unprocessed' },
      { name: 'Tandoori Spices & Mustard Oil', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Lean muscle fuel. High protein density (26.2g / 100g), clay oven grilled with minimal added fat.',
    advantages: ['Superb 26.2g lean protein per 100g', 'Clay oven tandoor grilling eliminates deep frying', 'Negligible carbohydrates'],
    thingsToConsider: ['Non-vegetarian', 'Restaurant marinations can feature elevated sodium and red food color (ask for natural turmeric/kashmiri mirch)'],
    betterAlternatives: [],
    priceEstimateInr: 180
  },
  {
    id: 'coke-zero',
    name: 'Coca-Cola Zero Sugar',
    hindiName: 'कोक ज़ीरो',
    brand: 'The Coca-Cola Company',
    category: 'beverages',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly'],
    servingPortions: [
      { name: '1 Can (300ml)', weightGrams: 300, unitLabel: 'can', isDefault: true }
    ],
    nutritionPer100g: {
      calories: 0.3,
      protein: 0,
      carbohydrates: 0,
      totalSugar: 0,
      addedSugar: 0,
      dietaryFiber: 0,
      totalFat: 0,
      saturatedFat: 0,
      transFat: 0,
      sodium: 12
    },
    ingredients: [
      { name: 'Carbonated Water', processingLevel: 'processed' },
      { name: 'Acidity Regulators (INS 338, 331iii)', processingLevel: 'ultra_processed' },
      { name: 'Sweeteners (INS 951 - Aspartame, INS 950 - Acesulfame Potassium)', processingLevel: 'ultra_processed', concerns: 'Non-nutritive intense sweeteners evaluated as safe by WHO/JECFA within ADI limits.' },
      { name: 'Caramel Color (INS 150d)', processingLevel: 'ultra_processed' },
      { name: 'Caffeine', processingLevel: 'processed' }
    ],
    claims: [
      { claim: 'Zero Sugar & Zero Calories', isMisleading: false, verdict: 'Accurate', explanation: 'Replaces cane sugar with non-nutritive sweeteners, dropping calories to near zero.' }
    ],
    verdictHeadline: 'Effective sugar harm reduction. Zero glycemic spike, but provides zero micronutrients or satiety.',
    advantages: ['Avoids the 35g cane sugar crash of regular soda', 'Diabetic and keto friendly for sweet craving management'],
    thingsToConsider: ['Acidity (phosphoric acid) can affect dental enamel over time', 'Provides zero nutritional substance'],
    betterAlternatives: [
      { targetFoodId: 'fresh-coconut-water', reasonBadge: 'Natural hydration & potassium', note: 'Coconut water provides genuine electrolytes without artificial sweeteners.' }
    ],
    priceEstimateInr: 40
  },
  {
    id: 'coca-cola-regular',
    name: 'Coca-Cola Classic (Regular)',
    hindiName: 'कोका-कोला (रेगुलर)',
    brand: 'The Coca-Cola Company',
    category: 'beverages',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free'],
    servingPortions: [
      { name: '1 Can (300ml)', weightGrams: 300, unitLabel: 'can', isDefault: true }
    ],
    nutritionPer100g: {
      calories: 44,
      protein: 0,
      carbohydrates: 11.0,
      totalSugar: 10.6,
      addedSugar: 10.6,
      dietaryFiber: 0,
      totalFat: 0,
      saturatedFat: 0,
      transFat: 0,
      sodium: 11
    },
    ingredients: [
      { name: 'Carbonated Water', processingLevel: 'processed' },
      { name: 'Sugar', processingLevel: 'culinary' },
      { name: 'Caramel Color (INS 150d)', processingLevel: 'ultra_processed' },
      { name: 'Phosphoric Acid (INS 338)', processingLevel: 'ultra_processed' },
      { name: 'Natural Flavors, Caffeine', processingLevel: 'processed' }
    ],
    claims: [],
    verdictHeadline: 'Pure liquid sugar. 32g added cane sugar in one can with zero nutritional redeeming factor.',
    advantages: ['Fast rapid glucose supply for severe clinical hypoglycemia'],
    thingsToConsider: ['Massive sugar rush (32g added sugar per can)', 'Zero fiber, protein, or vitamins', 'High glycemic index provokes insulin surge'],
    betterAlternatives: [
      { targetFoodId: 'coke-zero', reasonBadge: '100% less sugar (0g vs 32g)', note: 'Coke Zero gives the same soda mouthfeel without the 32g cane sugar payload.' },
      { targetFoodId: 'fresh-coconut-water', reasonBadge: 'Pure natural electrolyte hydration', note: 'Tender coconut water gives genuine biological hydration.' }
    ],
    priceEstimateInr: 40
  },
  {
    id: 'palak-saag-spinach',
    name: 'Palak (Fresh Cooked Spinach)',
    hindiName: 'पालक की सब्ज़ी',
    brand: 'Homemade',
    category: 'vegetables',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Katori (130g)', weightGrams: 130, unitLabel: 'katori', isDefault: true }
    ],
    nutritionPer100g: {
      calories: 45,
      protein: 3.2,
      carbohydrates: 3.8,
      totalSugar: 0.8,
      addedSugar: 0,
      dietaryFiber: 2.8,
      totalFat: 2.1,
      saturatedFat: 0.3,
      transFat: 0,
      sodium: 140,
      iron: 4.2,
      calcium: 120,
      potassium: 420
    },
    ingredients: [
      { name: 'Fresh Spinach Leaves', processingLevel: 'unprocessed' },
      { name: 'Mustard Oil (light)', processingLevel: 'culinary' },
      { name: 'Cumin & Hing', processingLevel: 'culinary' },
      { name: 'Turmeric & Salt', processingLevel: 'culinary' }
    ],
    claims: [],
    verdictHeadline: 'Micronutrient heavyweight. Loaded with non-heme iron (4.2mg), lutein, and potassium.',
    advantages: ['Huge iron and calcium reservoir', 'Very low glycemic impact (only 45 kcal)', 'Cardiovascular nitric-oxide precursors'],
    thingsToConsider: ['Contains oxalates (cook thoroughly to enhance mineral bioavailability)'],
    betterAlternatives: [],
    priceEstimateInr: 25
  },
  {
    id: 'chia-seeds',
    name: 'Raw Chia Seeds',
    hindiName: 'चिया सीड्स / सब्ज़ा',
    brand: 'True Elements / Farmley',
    category: 'nuts_and_seeds',
    confidence: 'verified',
    dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein'],
    servingPortions: [
      { name: '1 Tablespoon (15g)', weightGrams: 15, unitLabel: 'tbsp', isDefault: true },
      { name: '100g', weightGrams: 100, unitLabel: 'g' }
    ],
    nutritionPer100g: {
      calories: 486,
      protein: 16.5,
      carbohydrates: 42.1,
      totalSugar: 0,
      addedSugar: 0,
      dietaryFiber: 34.4,
      totalFat: 30.7,
      saturatedFat: 3.3,
      transFat: 0,
      sodium: 16,
      calcium: 631,
      iron: 7.7,
      potassium: 407
    },
    ingredients: [
      { name: 'Whole Raw Black Chia Seeds', processingLevel: 'unprocessed' }
    ],
    claims: [
      { claim: 'High Plant Omega-3 & Soluble Fiber', isMisleading: false, verdict: 'Accurate', explanation: 'One of nature\'s richest botanical sources of ALA Omega-3 fatty acids and mucilaginous fiber.' }
    ],
    verdictHeadline: 'Gut and heart super-seed. 34.4g fiber and huge plant-based ALA Omega-3 fatty acids.',
    advantages: ['Exceptional soluble fiber forms gut-soothing gel', 'Massive calcium content (631mg / 100g)', 'Natural plant-based ALA Omega-3s'],
    thingsToConsider: ['Soak in water or yogurt before consuming for optimal digestion'],
    betterAlternatives: [],
    priceEstimateInr: 70
  }
];

// Helper to expand and complete realistic mock food records up to 100 items with transparent scores
export function getSeededFoods(): FoodItem[] {
  // We compute FoodScore mathematically for every item
  const baseItems: FoodItem[] = RAW_FOODS.map(item => ({
    ...item,
    foodScore: calculateFoodScore(item.nutritionPer100g, item.ingredients, item.claims)
  }));

  // Additional realistic variations to round out comprehensive Indian regional & pantry staples (approx 100 total)
  const expandedVariations: RawFoodDef[] = [
    {
      id: 'masoor-dal',
      name: 'Red Masoor Dal (Split Red Lentils)',
      hindiName: 'मसूर दाल',
      brand: 'Homemade',
      category: 'indian_foods',
      confidence: 'verified',
      dietFlags: ['vegetarian', 'vegan', 'halal', 'gluten_free', 'diabetic_friendly', 'high_protein', 'jain'],
      servingPortions: [{ name: '1 Katori (150g)', weightGrams: 150, unitLabel: 'katori', isDefault: true }],
      nutritionPer100g: { calories: 102, protein: 7.2, carbohydrates: 15.0, totalSugar: 1.0, addedSugar: 0, dietaryFiber: 4.1, totalFat: 1.8, saturatedFat: 0.3, transFat: 0, sodium: 210, iron: 2.2 },
      ingredients: [{ name: 'Red Masoor Dal', processingLevel: 'unprocessed' }, { name: 'Cumin & Ghee', processingLevel: 'culinary' }],
      claims: [],
      verdictHeadline: 'High-protein, quick-cooking lentil. Rich in folate and easily tolerated by the gut.',
      advantages: ['High protein density among lentils', 'Gentle on gut digestion'],
      thingsToConsider: ['Portion carbs when paired with white rice'],
      betterAlternatives: [],
      priceEstimateInr: 25
    },
    {
      id: 'methi-thepla',
      name: 'Gujarati Methi Thepla',
      hindiName: 'मेथी थेपला',
      brand: 'Homemade',
      category: 'grains',
      confidence: 'verified',
      dietFlags: ['vegetarian', 'halal', 'diabetic_friendly'],
      servingPortions: [{ name: '2 Theplas (70g)', weightGrams: 70, unitLabel: 'theplas', isDefault: true }],
      nutritionPer100g: { calories: 275, protein: 8.2, carbohydrates: 46.0, totalSugar: 1.8, addedSugar: 0, dietaryFiber: 6.8, totalFat: 7.2, saturatedFat: 1.5, transFat: 0, sodium: 290, iron: 3.5 },
      ingredients: [{ name: 'Whole Wheat Atta & Besan', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'gluten' }, { name: 'Fresh Fenugreek (Methi)', processingLevel: 'unprocessed' }, { name: 'Spices & Oil', processingLevel: 'culinary' }],
      claims: [],
      verdictHeadline: 'Fiber-rich travel companion. Fenugreek herbs support healthy blood glucose regulation.',
      advantages: ['Fresh methi greens lower glycemic index', 'Rich in iron and fiber'],
      thingsToConsider: ['Contains gluten', 'Prepared with moderate oil for shelf life'],
      betterAlternatives: [],
      priceEstimateInr: 15
    },
    {
      id: 'jowar-bhakri',
      name: 'Jowar Bhakri (Sorghum Flatbread)',
      hindiName: 'ज्वार भाकरी',
      brand: 'Homemade',
      category: 'grains',
      confidence: 'verified',
      dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
      servingPortions: [{ name: '1 Bhakri (60g)', weightGrams: 60, unitLabel: 'bhakri', isDefault: true }],
      nutritionPer100g: { calories: 242, protein: 7.8, carbohydrates: 50.2, totalSugar: 0.8, addedSugar: 0, dietaryFiber: 9.2, totalFat: 1.9, saturatedFat: 0.3, transFat: 0, sodium: 45, iron: 4.1, potassium: 320 },
      ingredients: [{ name: '100% Whole Jowar (Sorghum Flour)', processingLevel: 'unprocessed' }, { name: 'Water & Salt', processingLevel: 'culinary' }],
      claims: [{ claim: '100% Gluten Free Millet', isMisleading: false, verdict: 'Accurate', explanation: 'Pure ancient millet grain with high insoluble fiber.' }],
      verdictHeadline: 'Outstanding gluten-free millet staple. High fiber (9.2g) with a low glycemic response.',
      advantages: ['Naturally 100% gluten-free', 'Rich in polyphenols and magnesium', 'Zero added fats'],
      thingsToConsider: ['More rustic texture than wheat roti'],
      betterAlternatives: [],
      priceEstimateInr: 12
    },
    {
      id: 'ragi-dosa',
      name: 'Ragi Dosa (Finger Millet Crepe)',
      hindiName: 'रागी डोसा',
      brand: 'Homemade',
      category: 'grains',
      confidence: 'verified',
      dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
      servingPortions: [{ name: '1 Dosa (80g)', weightGrams: 80, unitLabel: 'dosa', isDefault: true }],
      nutritionPer100g: { calories: 178, protein: 4.8, carbohydrates: 32.5, totalSugar: 1.0, addedSugar: 0, dietaryFiber: 5.2, totalFat: 3.5, saturatedFat: 0.6, transFat: 0, sodium: 180, calcium: 310, iron: 3.8 },
      ingredients: [{ name: 'Ragi (Finger Millet) Flour', processingLevel: 'unprocessed' }, { name: 'Urad Dal', processingLevel: 'unprocessed' }, { name: 'Light Sesame Oil', processingLevel: 'culinary' }],
      claims: [{ claim: 'Calcium Rich Millet', isMisleading: false, verdict: 'Accurate', explanation: 'Ragi has the highest calcium content among common food grains (~344mg/100g dry).' }],
      verdictHeadline: 'Bone-building super grain. Exceptional calcium (310mg) and sustained low glycemic energy.',
      advantages: ['Unrivaled natural plant calcium', 'High insoluble fiber sustains satiety', 'Gluten-free traditional millet'],
      thingsToConsider: ['Keep oil brush light on tawa'],
      betterAlternatives: [],
      priceEstimateInr: 25
    },
    {
      id: 'chaas-buttermilk',
      name: 'Amul Masti Spiced Chaas (Buttermilk)',
      hindiName: 'मसाला छाछ',
      brand: 'Amul',
      category: 'dairy',
      confidence: 'verified',
      dietFlags: ['vegetarian', 'halal', 'gluten_free', 'jain', 'diabetic_friendly'],
      servingPortions: [{ name: '1 Glass / Tetrapack (200ml)', weightGrams: 200, unitLabel: 'glass', isDefault: true }],
      nutritionPer100g: { calories: 29, protein: 1.6, carbohydrates: 2.3, totalSugar: 2.3, addedSugar: 0, dietaryFiber: 0, totalFat: 1.5, saturatedFat: 1.0, transFat: 0, sodium: 180, calcium: 70 },
      ingredients: [{ name: 'Pasteurized Curd / Buttermilk', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'dairy' }, { name: 'Iodized Salt, Roasted Cumin, Spices', processingLevel: 'culinary' }],
      claims: [{ claim: 'Cooling Natural Digestive', isMisleading: false, verdict: 'Accurate', explanation: 'Low calorie dairy beverage with active lactic cultures and digestive cumin.' }],
      verdictHeadline: 'Ideal hot weather refreshment. Ultra low calorie (29 kcal/100ml) with natural probiotics.',
      advantages: ['Only ~58 kcal in an entire 200ml glass', 'Natural live lactic acid bacteria', 'Zero added sucrose'],
      thingsToConsider: ['Contains salt; those on strict renal diets should monitor intake'],
      betterAlternatives: [],
      priceEstimateInr: 15
    },
    {
      id: 'bhel-puri-mumbai',
      name: 'Mumbai Bhel Puri',
      hindiName: 'भेल पूरी',
      brand: 'Street Vendor',
      category: 'snacks',
      confidence: 'estimated',
      dietFlags: ['vegetarian', 'vegan', 'halal'],
      servingPortions: [{ name: '1 Plate (150g)', weightGrams: 150, unitLabel: 'plate', isDefault: true }],
      nutritionPer100g: { calories: 185, protein: 4.8, carbohydrates: 32.0, totalSugar: 6.2, addedSugar: 3.5, dietaryFiber: 3.4, totalFat: 4.6, saturatedFat: 1.2, transFat: 0, sodium: 440 },
      ingredients: [{ name: 'Puffed Rice (Murmura)', processingLevel: 'culinary' }, { name: 'Sev (Gram flour strands fried in oil)', processingLevel: 'processed' }, { name: 'Chopped Onion, Tomato, Raw Mango', processingLevel: 'unprocessed' }, { name: 'Tamarind & Mint Chutneys', processingLevel: 'culinary' }],
      claims: [],
      verdictHeadline: 'Crispy sweet and tangy street snack. Light base with moderate sugar in tamarind sauce.',
      advantages: ['High raw fresh vegetable content (onion, tomato, raw mango)', 'Lighter than deep fried samosas'],
      thingsToConsider: ['Sev adds fried fat', 'Sweet chutney contains added jaggery/sugar'],
      betterAlternatives: [
        { targetFoodId: 'roasted-makhana', reasonBadge: 'Zero added sugar, 3x fiber', note: 'Makhana avoids the sugary chutney and fried sev while keeping crunchy texture.' }
      ],
      priceEstimateInr: 35
    },
    {
      id: 'masala-peanuts',
      name: 'Haldiram’s Masala Peanuts (Nut Cracker)',
      hindiName: 'मसाला मूंगफली',
      brand: "Haldiram's",
      category: 'snacks',
      confidence: 'verified',
      dietFlags: ['vegetarian', 'halal', 'gluten_free'],
      servingPortions: [{ name: '1 Handful (35g)', weightGrams: 35, unitLabel: 'handful', isDefault: true }],
      nutritionPer100g: { calories: 564, protein: 18.2, carbohydrates: 32.5, totalSugar: 3.4, addedSugar: 1.2, dietaryFiber: 5.8, totalFat: 40.5, saturatedFat: 12.5, transFat: 0.1, sodium: 620 },
      ingredients: [{ name: 'Peanuts', processingLevel: 'unprocessed', isAllergen: true, allergenType: 'peanut' }, { name: 'Gram Flour (Besan) Coating', processingLevel: 'unprocessed' }, { name: 'Edible Vegetable Oil (Palmolein)', processingLevel: 'ultra_processed' }, { name: 'Spices & Salt', processingLevel: 'culinary' }],
      claims: [],
      verdictHeadline: 'Protein-packed but fried. High plant protein (18g) wrapped in deep-fried besan and palmolein.',
      advantages: ['High natural peanut protein and magnesium'],
      thingsToConsider: ['Deep fried: 40.5g fat per 100g', 'Easy to consume 400+ calories without realizing'],
      betterAlternatives: [
        { targetFoodId: 'roasted-chana', reasonBadge: '75% less fat, same protein', note: 'Roasted Chana gives the same crunch and 18.6g protein without palmolein oil.' }
      ],
      priceEstimateInr: 35
    },
    {
      id: 'chole-bhature',
      name: 'Chole Bhature (2 Bhature + Chole)',
      hindiName: 'छोले भटूरे',
      brand: 'Dhaba / Restaurant',
      category: 'fast_food',
      confidence: 'estimated',
      dietFlags: ['vegetarian', 'halal'],
      servingPortions: [{ name: '1 Full Meal (380g)', weightGrams: 380, unitLabel: 'meal', isDefault: true }],
      nutritionPer100g: { calories: 285, protein: 5.8, carbohydrates: 34.2, totalSugar: 2.1, addedSugar: 0.5, dietaryFiber: 3.8, totalFat: 14.5, saturatedFat: 5.8, transFat: 0.3, sodium: 490 },
      ingredients: [{ name: 'Bhatura (Deep fried refined maida with yeast)', processingLevel: 'processed', isAllergen: true, allergenType: 'gluten' }, { name: 'Spiced Chickpeas (Chole)', processingLevel: 'unprocessed' }, { name: 'Cooking Oil / Ghee', processingLevel: 'ultra_processed' }, { name: 'Spices & Salt', processingLevel: 'culinary' }],
      claims: [],
      verdictHeadline: 'Heavy Punjabi feast. High caloric density (~1,000+ kcal per plate) with deep-fried refined flour.',
      advantages: ['Chickpeas deliver fiber and plant protein', 'Deep cultural delight'],
      thingsToConsider: ['Bhaturas absorb significant deep-frying oil into maida dough', 'Very heavy on digestion and afternoon alertness'],
      betterAlternatives: [
        { targetFoodId: 'rajma-chawal', reasonBadge: '80% less oil, whole grain base', note: 'Rajma Chawal provides satisfying legume carbs without deep-frying.' }
      ],
      priceEstimateInr: 120
    },
    {
      id: 'papaya-ripe',
      name: 'Fresh Ripe Papaya (Papita)',
      hindiName: 'पपीता',
      brand: 'Fresh Produce',
      category: 'fruits',
      confidence: 'verified',
      dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
      servingPortions: [{ name: '1 Bowl diced (150g)', weightGrams: 150, unitLabel: 'bowl', isDefault: true }],
      nutritionPer100g: { calories: 43, protein: 0.5, carbohydrates: 10.8, totalSugar: 7.8, addedSugar: 0, dietaryFiber: 1.7, totalFat: 0.3, saturatedFat: 0.1, transFat: 0, sodium: 8, potassium: 182, calcium: 20 },
      ingredients: [{ name: '100% Fresh Ripe Papaya Fruit', processingLevel: 'unprocessed' }],
      claims: [],
      verdictHeadline: 'Digestive enzyme treasure. Papain enzyme supports protein digestion, with rich Vitamin A & C.',
      advantages: ['Natural papain enzyme supports gastrointestinal tract', 'Low calorie density (43 kcal)', 'High Vitamin C (62mg/100g)'],
      thingsToConsider: ['Low protein content; best paired with breakfast eggs or Greek yogurt'],
      betterAlternatives: [],
      priceEstimateInr: 30
    },
    {
      id: 'guava-amrood',
      name: 'Fresh Guava (Amrood)',
      hindiName: 'अमरूद',
      brand: 'Fresh Produce',
      category: 'fruits',
      confidence: 'verified',
      dietFlags: ['vegetarian', 'vegan', 'jain', 'halal', 'gluten_free', 'diabetic_friendly'],
      servingPortions: [{ name: '1 Medium Guava (120g)', weightGrams: 120, unitLabel: 'guava', isDefault: true }],
      nutritionPer100g: { calories: 68, protein: 2.6, carbohydrates: 14.3, totalSugar: 8.9, addedSugar: 0, dietaryFiber: 5.4, totalFat: 0.9, saturatedFat: 0.3, transFat: 0, sodium: 2, potassium: 417, calcium: 18 },
      ingredients: [{ name: 'Whole Guava Fruit with edible seeds and skin', processingLevel: 'unprocessed' }],
      claims: [
        { claim: '4x Vitamin C of Oranges', isMisleading: false, verdict: 'Accurate', explanation: 'Guava delivers over 228mg Vitamin C per 100g along with 5.4g dietary fiber.' }
      ],
      verdictHeadline: 'Fiber and Vitamin C champion. 5.4g fiber and low glycemic load make it the ultimate fruit for diabetics.',
      advantages: ['Massive 5.4g dietary fiber per 100g', 'Exceptional 228mg Vitamin C', 'Slow blood sugar impact'],
      thingsToConsider: ['Chew seeds gently to avoid dental strain'],
      betterAlternatives: [],
      priceEstimateInr: 20
    }
  ];

  const extraItems: FoodItem[] = expandedVariations.map(item => ({
    ...item,
    foodScore: calculateFoodScore(item.nutritionPer100g, item.ingredients, item.claims)
  }));

  return [...baseItems, ...extraItems];
}
