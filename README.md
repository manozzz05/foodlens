# FoodLens 🥗🔍
> **A mobile-first, installable PWA food decision engine — helping you decide what to eat, right now, for you.**

FoodLens is not just another calorie counter. It replaces fear-based labeling with calm, transparent nutritional intelligence grounded in verified data, tailored to individual and family health contexts, with first-class support for Indian culinary staples, home portions (*katori*, *roti*, *glass*), and FSSAI packaging standards.

---

## 🎯 Core Principles

1. **Accuracy First**: Never invent nutrition values. All figures come from verified data sources (ICMR-NIN IFCT tables, USDA FoodData Central, laboratory FSSAI declarations) tied to specific serving sizes.
2. **Context, Not Villains**: No sensationalist fear-mongering (e.g. no labeling food "toxic"). Objective nuance (e.g., *"High glycemic index; pair with fiber or enjoy in moderation"*).
3. **Transparent 4-Pillar Scoring**: Every score displays its exact contributing weights across:
   - **Nutrient Density** (Protein, fiber, iron, calcium, potassium)
   - **Processing Level** (NOVA scale: whole, culinary, processed, ultra-processed)
   - **Sugar & Sodium Impact** (Added sugars and sodium penalties)
   - **Lipid Quality** (Saturated fat, trans fat, healthy mono/poly-unsaturated fats)
4. **"Your Lens" Personalization Engine**: User profiles evaluate foods against active user constraints (Diabetes, Hypertension, Jain, Vegan, Celiac, Nut Allergy, Muscle Gain) to alter the instant verdict and surface specific warnings without distorting baseline objective numbers.
5. **Confidence Badges**: Every result displays an explicit verification tier: `Verified` (laboratory/IFCT), `Community` (peer-reviewed), or `Estimated` (±15% variance range for restaurant/street food).
6. **Strict Medical Advice Disclaimer**: Clear disclaimers stating that FoodLens provides informational context, not medical advice.

---

## 📱 Implemented Screens & Features (Phase 1 MVP)

### 1. Home / Explore Screen
- **Instant Search with Autocomplete**: Fast search across English & Hindi dish names (e.g., *Palak Paneer*, *Besan Chilla*, *Maggi*, *Gulab Jamun*), brands, and categories.
- **Category Filter Rail**: All 12 categories: *Fruits, Vegetables, Protein, Grains, Dairy, Fast Food, Snacks, Beverages, Indian Foods, Desserts, Nuts & Seeds, Packaged Foods*.
- **Diet & Allergen Quick Toggles**: Pure Veg (🟢 FSSAI green dot), Jain Friendly (🟡), Diabetic Friendly, High Protein, Gluten Free, Vegan, Halal.
- **Better Swaps in 1 Tap**: Curated smart alternatives (e.g., *Maggi Noodles ➔ Masala Oats*, *Lay's ➔ Roasted Makhana*, *Coca-Cola ➔ Tender Coconut Water*, *Parle-G ➔ Roasted Bengal Gram*).
- **Active Lens Banner**: Displays who is currently evaluating the food (e.g., *"Mummy's Lens: Vegetarian • Diabetes & Hypertension alerts active"*).

### 2. Food Detail & Instant Verdict Screen
- **Large Verdict Card First**: Plain language summary headline (e.g., *"Fine occasionally, high in added sugar"*).
- **Personalized Lens Verdict**: Highlights specific risks for the active family member (e.g., *"⚠️ Alert for Mom: 22g sugar per serving exceeds recommended snack threshold"*).
- **Indian Portion Switcher**: Toggle effortlessly between **Per 100g** (standard reference) and **Actual Indian Home Serving** (*1 katori*, *2 rotis*, *1 glass*, *1 pack*).
- **Transparent FoodScore Breakdown**: Visual score (0-100) expandable into exact positive and negative points for each of the 4 pillars.
- **Nutritional Intelligence Grid**: Calorie gauge, Protein, Net Carbs, Fiber, Added Sugar, Saturated Fat, and Sodium against Indian RDA Daily Values.
- **Ingredients Decoded**: Plain-English translation of additives (e.g., *INS 551*, *Palmolein oil*, *Citric acid*) with NOVA classification and zero fear-mongering.
- **Balanced Pros & "Things to Consider"**: Objective advantages and caveats.
- **Better Alternatives Section**: 1-tap swappable upgrades with reason badges (*"70% less fat"*, *"3x more protein"*).

### 3. "Your Lens" Multi-Profile Family Engine
- Support for multiple household profiles (*Self*, *Mom*, *Dad*, *Kid*, *Elderly*).
- Customizable dietary standards (All, Vegetarian, Vegan, Jain, Halal).
- Allergen safety screening with critical red-flag clash alerts (Gluten, Dairy, Peanuts, Tree Nuts, Soy, Egg).
- Health condition tracking (Diabetes, Hypertension, High Cholesterol, Weight Loss, Muscle Gain, Celiac).
- **Live Lens Simulator**: Real-time simulation testing how different household profiles evaluate the exact same food item.

### 4. Side-by-Side Comparison Matrix
- Compare 2 to 3 foods side-by-side.
- Metric deltas with green highlights for superior stats.
- **Personalized Winner Recommendation**: Tailored advice indicating which product to pick based on the active Lens profile.

### 5. Label Decoder & FSSAI Watch
- Searchable directory of packaging marketing claims (*"No Added Sugar"*, *"Multigrain"*, *"High Protein"*, *"100% Real Fruit"*, *"Zero Cholesterol"*, *"Baked Not Fried"*, *"Organic"*, *"Diet/Lite"*).
- Explains what FSSAI regulations say vs what marketers actually do ("The Catch").
- Clear instructions on how to spot misleading claims on the ingredient table.

### 6. Methodology & Scientific Transparency (`/methodology`)
- Mathematical formula: `FoodScore = 42 (Base) + [Nutrient Density] + [Processing Level] + [Sugar/Sodium Penalty] + [Lipid Quality]`.
- Evidence basis, data sources, and strict healthcare disclaimers.

---

## 🇮🇳 India Focus

- **Home Portions**: *Katori (150g)*, *Roti/Phulka (35g)*, *Glass (200ml)*, *Plate (250g)*, *Cup/Kulhad*.
- **Regional Dishes & Street Foods**: Poha, Upma, Idli Sambar, Masala Dosa, Khichdi, Besan Chilla, Samosa, Vada Pav, Pani Puri, Dhokla, Dal Makhani, Sarson Ka Saag, Bhindi Masala, Karela.
- **Mithai & Sweets**: Gulab Jamun, Rasgulla, Kaju Katli, Sugar-Free Kaju Katli.
- **Packaged FMCG Staples**: Parle-G, Maggi, Britannia Good Day, Haldiram's Bhujia, Lay's Magic Masala, Kurkure, Bournvita, Amul Taaza Milk, Epigamia Greek Yogurt, Pintola Peanut Butter.
- **FSSAI Alignment**: Green veg dot, brown non-veg symbol, Jain dietary flags, INR pricing references.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React icons.
- **Data Layer**: Clean Repository/Service pattern (`foodRepository.ts`, `profileRepository.ts`) ready to connect to Supabase, PostgreSQL, or REST APIs in Phase 2.
- **Testing**: Vitest automated unit tests for FoodScore calculation and Lens personalization evaluation.
- **PWA**: Web App Manifest (`manifest.json`), service worker (`sw.js`) for offline caching, install prompt support.
- **Accessibility**: WCAG AA color-blind compliant (icons + text + colors, never color alone).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Automated Unit Tests
```bash
npm test
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🗺️ Roadmap (Phase 2+)

- [ ] Camera barcode scanner (GS1 / EAN barcode integration)
- [ ] Ingredient label OCR scanner
- [ ] Meal photo recognition
- [ ] Multilingual support (Hindi, Marathi, Gujarati, Tamil, Telugu)
- [ ] Restaurant menu scanner & food delivery integration (Swiggy / Zomato link analysis)
- [ ] Live FSSAI product recall alerts
