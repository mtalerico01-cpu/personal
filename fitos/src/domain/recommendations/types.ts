export type RecommendationConfidence = 'low' | 'medium' | 'high';
export type MacroPreference = 'balanced' | 'higher_protein' | 'moderate_carb' | 'lower_carb' | 'higher_carb_endurance' | 'custom';

export interface RecommendationWarning {
  code: string;
  message: string;
  severity: 'info' | 'caution' | 'restricted';
  sourceIds?: string[];
}

export interface RecommendationRationale {
  ruleId: string;
  summary: string;
  sourceIds: string[];
}

export interface RecommendationMetadata {
  confidence: RecommendationConfidence;
  assumptions: string[];
  warnings: RecommendationWarning[];
  rationale: RecommendationRationale[];
  sourceIds: string[];
}

export function uniqueSourceIds(...groups: Array<Array<string | undefined> | undefined>) {
  return Array.from(new Set(groups.flatMap((group) => group ?? []).filter(Boolean) as string[]));
}
