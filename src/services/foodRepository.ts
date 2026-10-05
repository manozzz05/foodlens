import { FoodItem, FoodCategory, DietFlag } from '../types/food';
import { getSeededFoods } from '../data/mockFoods';
import { getSupplementaryFoods } from '../data/supplementaryFoods';

// In-memory cache combining base and supplementary foods
let cachedFoods: FoodItem[] | null = null;

function loadAllFoods(): FoodItem[] {
  if (!cachedFoods) {
    const base = getSeededFoods();
    const extra = getSupplementaryFoods();
    cachedFoods = [...base, ...extra];
  }
  return cachedFoods;
}

export const foodRepository = {
  /**
   * Fetches all foods in the database
   */
  async getAllFoods(): Promise<FoodItem[]> {
    return loadAllFoods();
  },

  /**
   * Fetches a single food by ID
   */
  async getFoodById(id: string): Promise<FoodItem | undefined> {
    const foods = loadAllFoods();
    return foods.find(f => f.id === id);
  },

  /**
   * Fast autocomplete for live search bars
   */
  async getAutocompleteSuggestions(query: string, limit = 8): Promise<{
    id: string;
    name: string;
    hindiName?: string;
    category: FoodCategory;
    brand?: string;
    foodScore: number;
    grade: string;
  }[]> {
    if (!query || query.trim().length === 0) return [];

    const q = query.toLowerCase().trim();
    const foods = loadAllFoods();

    const matches = foods.filter(f => 
      f.name.toLowerCase().includes(q) ||
      (f.hindiName && f.hindiName.includes(q)) ||
      (f.brand && f.brand.toLowerCase().includes(q)) ||
      f.category.toLowerCase().includes(q)
    );

    return matches.slice(0, limit).map(f => ({
      id: f.id,
      name: f.name,
      hindiName: f.hindiName,
      category: f.category,
      brand: f.brand,
      foodScore: f.foodScore.overallScore,
      grade: f.foodScore.grade
    }));
  },

  /**
   * Search foods with multi-filter support (category, diet flags, brand)
   */
  async searchFoods(options: {
    query?: string;
    category?: FoodCategory | 'all';
    dietFlags?: DietFlag[];
    minScore?: number;
  }): Promise<FoodItem[]> {
    const foods = loadAllFoods();
    const q = options.query?.toLowerCase().trim();

    return foods.filter(item => {
      // Query filter
      if (q && q.length > 0) {
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesHindi = item.hindiName?.includes(q);
        const matchesBrand = item.brand?.toLowerCase().includes(q);
        const matchesIngredients = item.ingredients.some(i => i.name.toLowerCase().includes(q));
        if (!matchesName && !matchesHindi && !matchesBrand && !matchesIngredients) {
          return false;
        }
      }

      // Category filter
      if (options.category && options.category !== 'all') {
        if (item.category !== options.category) return false;
      }

      // Diet flags filter
      if (options.dietFlags && options.dietFlags.length > 0) {
        const hasAllFlags = options.dietFlags.every(flag => item.dietFlags.includes(flag));
        if (!hasAllFlags) return false;
      }

      // Min score filter
      if (options.minScore !== undefined) {
        if (item.foodScore.overallScore < options.minScore) return false;
      }

      return true;
    });
  },

  /**
   * Retrieves better alternatives linked to a food
   */
  async getBetterAlternatives(food: FoodItem): Promise<{
    food: FoodItem;
    reasonBadge: string;
    note: string;
  }[]> {
    const foods = loadAllFoods();
    const results: { food: FoodItem; reasonBadge: string; note: string }[] = [];

    for (const alt of food.betterAlternatives) {
      const match = foods.find(f => f.id === alt.targetFoodId);
      if (match) {
        results.push({
          food: match,
          reasonBadge: alt.reasonBadge,
          note: alt.note
        });
      }
    }

    // If explicit alternatives weren't populated, find higher-scoring items in same category
    if (results.length === 0) {
      const categoryAlts = foods
        .filter(f => f.category === food.category && f.id !== food.id && f.foodScore.overallScore > food.foodScore.overallScore)
        .sort((a, b) => b.foodScore.overallScore - a.foodScore.overallScore)
        .slice(0, 2);

      for (const alt of categoryAlts) {
        results.push({
          food: alt,
          reasonBadge: `Higher FoodScore (${alt.foodScore.overallScore} vs ${food.foodScore.overallScore})`,
          note: `Less processed alternative with higher nutrient density in ${food.category.replace('_', ' ')}.`
        });
      }
    }

    return results;
  },

  /**
   * Fetches multiple foods by ID for comparison
   */
  async getCompareFoods(ids: string[]): Promise<FoodItem[]> {
    const foods = loadAllFoods();
    return ids
      .map(id => foods.find(f => f.id === id))
      .filter((f): f is FoodItem => f !== undefined);
  },

  /**
   * Featured smart swaps for home screen
   */
  async getFeaturedSwaps(): Promise<{
    worse: FoodItem;
    better: FoodItem;
    why: string;
  }[]> {
    const foods = loadAllFoods();
    const find = (id: string) => foods.find(f => f.id === id);

    const swaps = [
      { worseId: 'maggi-masala-noodles', betterId: 'saffola-masala-oats', why: '4x more fiber, zero palm-oil deep frying, and 50% less sodium.' },
      { worseId: 'lays-magic-masala', betterId: 'roasted-makhana', why: '80% less fat, zero palmolein oil, and rich in natural potassium.' },
      { worseId: 'coca-cola-regular', betterId: 'fresh-coconut-water', why: 'Eliminates 32g added cane sugar, replenishing natural electrolytes instead.' },
      { worseId: 'parle-g-biscuits', betterId: 'roasted-chana', why: 'Swaps refined maida & sugar for 18g plant protein and 15g natural fiber.' }
    ];

    const result: { worse: FoodItem; better: FoodItem; why: string }[] = [];
    for (const s of swaps) {
      const w = find(s.worseId);
      const b = find(s.betterId);
      if (w && b) {
        result.push({ worse: w, better: b, why: s.why });
      }
    }
    return result;
  }
};
