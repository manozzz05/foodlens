import { DecodedClaim } from '../types/claims';

export const DECODED_CLAIMS: DecodedClaim[] = [
  {
    id: 'claim-no-added-sugar',
    claim: 'No Added Sugar / Zero Added Sugar',
    commonIn: ['Packaged Juices', 'Energy Bars', 'Granola', 'Flavored Yogurts', 'Digestive Cookies'],
    regulationSummary: 'Under FSSAI guidelines, products claiming "No Added Sugar" cannot add refined sucrose, honey, or corn syrup during manufacturing.',
    theCatch: 'Manufacturers frequently substitute sucrose with concentrated fruit juice purées, date paste, maltodextrin, or maltitol. While technically not "table sugar", these still trigger high glycemic spikes and high calorie density.',
    whatToLookFor: 'Examine "Total Carbohydrates of which Sugars" and ingredient list for Maltodextrin, Invert Sugar syrup, Concentrated Apple Juice, or High-Fructose corn derivatives.',
    misleadingRisk: 'high',
    exampleGood: 'Unsweetened Greek Yogurt (only natural milk lactose ~4g/100g).',
    exampleTricky: 'Packaged "100% Real Juice" with 24g natural fructose per 200ml glass, devoid of fibrous pulp.',
    tag: 'Sugar & Sweeteners'
  },
  {
    id: 'claim-multigrain',
    claim: 'Multigrain / Wheat Goodness',
    commonIn: ['Multigrain Bread', 'Cookies', 'Atta Noodles', 'Rusk'],
    regulationSummary: 'FSSAI allows "multigrain" as long as more than one grain flour is in the formulation, without specifying a minimum percentage threshold for whole millets.',
    theCatch: 'Most commercial "multigrain" breads and biscuits are 85-90% refined wheat flour (Maida) with a 2-5% dusting of oats or malted barley for visual appearance.',
    whatToLookFor: 'Check the very first ingredient. If it lists "Refined Wheat Flour (Maida)" or doesn\'t say "Whole Wheat Flour (Atta 100%)", the whole-grain benefit is negligible.',
    misleadingRisk: 'high',
    exampleGood: '100% Whole Wheat Sourdough or 100% Jowar/Ragi Roti.',
    exampleTricky: 'Multigrain Digestive Biscuit containing 60% Maida, palm oil, and 4% oat flakes.',
    tag: 'Grain Claims'
  },
  {
    id: 'claim-high-protein',
    claim: 'High Protein / Protein Rich',
    commonIn: ['Breakfast Cereals', 'Peanut Butter', 'Protein Bars', 'Nut-Mixes', 'Cookies'],
    regulationSummary: 'FSSAI specifies a product can claim "source of protein" if it contains >= 6g per 100g, and "high protein" if it contains >= 12g per 100g (or >= 10% / 20% of RDA).',
    theCatch: 'A packaged cookie may boast "6g Protein", but it also delivers 450 calories, 25g of saturated palm fat, and 28g of sugar to get that modest protein.',
    whatToLookFor: 'Evaluate protein-to-calorie ratio. Ideal high-protein foods deliver >= 10g protein per 100 kcal, rather than 5g protein per 400 kcal.',
    misleadingRisk: 'medium',
    exampleGood: 'Sattu Drink (20g protein/100g), Paneer, Boiled Eggs, Epigamia Plain Greek Yogurt.',
    exampleTricky: 'Choco-Protein Bar with 10g protein accompanied by 22g sugar and palm fat.',
    tag: 'Protein Claims'
  },
  {
    id: 'claim-real-fruit',
    claim: 'Made with 100% Real Fruit',
    commonIn: ['Jams', 'Fruit Drinks', 'Gummies', 'Breakfast Bars', 'Ice Creams'],
    regulationSummary: 'Products can claim real fruit if real fruit puree, concentrate, or juice is used in any declared quantity.',
    theCatch: 'The real fruit content is often reconstituted fruit concentrate (which strips volatile aromas and fibers), representing under 5-10% of the product, with the bulk being water, sugar syrup, and synthetic flavorings.',
    whatToLookFor: 'Read the percentage in parentheses next to the fruit ingredient (e.g. "Mango Pulp (8%)").',
    misleadingRisk: 'high',
    exampleGood: 'Fresh seasonal mango, guava, or homemade unsweetened fruit compote.',
    exampleTricky: 'Fruit drink with 10% fruit pulp and 12g added sugar per 100ml.',
    tag: 'Purity Buzzwords'
  },
  {
    id: 'claim-zero-cholesterol',
    claim: 'Zero Cholesterol / Heart Friendly',
    commonIn: ['Potato Chips', 'Refined Cooking Oils', 'Peanut Butter', 'Packaged Namkeen'],
    regulationSummary: 'Under regulatory guidelines, plant-origin foods have 0mg cholesterol naturally.',
    theCatch: 'Cholesterol is ONLY present in animal products. Marketers slap "Zero Cholesterol" on deep-fried potato chips or palm-oil namkeen to create a "health halo", even though it is packed with high saturated fats and sodium.',
    whatToLookFor: 'Check Saturated Fat and Trans Fat lines, not cholesterol.',
    misleadingRisk: 'high',
    exampleGood: 'Cold-pressed mustard oil or whole soaked almonds.',
    exampleTricky: 'Deep fried banana chips fried in reused vegetable oil claiming "100% Zero Cholesterol".',
    tag: 'Fat & Oils'
  },
  {
    id: 'claim-baked-not-fried',
    claim: 'Baked, Not Fried',
    commonIn: ['Extruded Chips', 'Pita Crisps', 'Bhujia/Namkeen Puffs', 'Samosa Crisps'],
    regulationSummary: 'Indicates baking or oven extrusion was used instead of immersion in a deep fryer.',
    theCatch: 'To maintain consumer crispiness and mouthfeel, manufacturers heavily spray oil onto the baked dough before or after baking. Fat content is often only 10-15% lower than fried chips, but marketed as an unrestricted diet snack.',
    whatToLookFor: 'Compare fat grams per 100g. If fat exceeds 15-20g per 100g, it remains calorie-dense.',
    misleadingRisk: 'medium',
    exampleGood: 'Dry roasted makhana (fox nuts) or roasted chana.',
    exampleTricky: 'Baked tortilla chips with 18g fat and 650mg sodium per 100g.',
    tag: 'Fat & Oils'
  },
  {
    id: 'claim-natural-organic',
    claim: '100% Natural / Organic',
    commonIn: ['Jaggery Candies', 'Herbal Beverages', 'Flavored Honey', 'Organic Biscuits'],
    regulationSummary: 'Organic certifies agricultural farming practices without synthetic pesticides (Jaivik Bharat / USDA Organic). "Natural" generally means no artificial colors or synthetic additives.',
    theCatch: '"Organic Cane Sugar" or "Natural Raw Jaggery" is still 95-99% simple sucrose. It elicits the exact same insulin and glucose response as regular sugar.',
    whatToLookFor: 'Acknowledge that organic ingredients are great for pesticide avoidance, but do not change the nutritional physics of sugar, fat, or salt.',
    misleadingRisk: 'medium',
    exampleGood: 'Organic fresh spinach, whole moong dal, organic eggs.',
    exampleTricky: 'Organic cookies with 28g organic brown sugar and 20g organic palm fat.',
    tag: 'Purity Buzzwords'
  },
  {
    id: 'claim-diet-lite',
    claim: 'Diet / Lite / Slim',
    commonIn: ['Diet Namkeen', 'Diet Chivda', 'Zero Sugar Soda', 'Lite Mayonnaise'],
    regulationSummary: 'Must contain at least 25-30% fewer calories or fat than the standard reference formulation.',
    theCatch: '"Diet Chivda" is often still deep-fried poha with a bit more roasted murmura, or replaces fat with artificial thickeners and higher sodium to maintain flavor.',
    whatToLookFor: 'Check actual serving size; consumers often eat double because it has a "diet" label.',
    misleadingRisk: 'high',
    exampleGood: 'Plain puffed rice (murmura) tossed with roasted peanuts, turmeric, and green chillies.',
    exampleTricky: 'Diet bhujia containing 32g fat per 100g.',
    tag: 'Purity Buzzwords'
  }
];
