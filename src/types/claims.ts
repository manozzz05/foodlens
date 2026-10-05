export interface DecodedClaim {
  id: string;
  claim: string;                // e.g. "No Added Sugar"
  commonIn: string[];           // e.g. ["Fruit Juices", "Granola Bars", "Ketchup"]
  regulationSummary: string;    // What FSSAI / FDA rules say
  theCatch: string;             // What marketers do instead
  whatToLookFor: string;        // Specific ingredient list check
  misleadingRisk: 'high' | 'medium' | 'low';
  exampleGood: string;
  exampleTricky: string;
  tag: string;                  // "Sugar & Sweeteners" | "Grain Claims" | "Fat & Oils" | "Protein Claims" | "Purity Buzzwords"
}
