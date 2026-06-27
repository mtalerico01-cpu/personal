export type AIInsightType =
  | 'daily_brief'
  | 'nutrition_tip'
  | 'workout_suggestion'
  | 'weight_analysis'
  | 'progress_update'
  | 'recovery_advice';

export interface AIInsight {
  id: string;
  type: AIInsightType;
  title: string;
  summary: string;
  detail?: string;
  generatedAt: string;
  /** Contextual time period this insight covers */
  period?: 'today' | 'this_week' | 'this_month';
}

export interface AIDailyBrief {
  greeting: string;
  headline: string;
  body: string;
  insights: AIInsight[];
  generatedAt: string;
}
