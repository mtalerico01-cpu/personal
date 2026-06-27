export interface WeightEntry {
  id: string;
  date: string;
  weightKg: number;
  /** Optional body composition data */
  bodyFatPercent?: number;
  muscleMassKg?: number;
  note?: string;
}

export interface WeightTrend {
  current: number;
  sevenDayAvg: number;
  thirtyDayAvg: number;
  weeklyChange: number;
  monthlyChange: number;
  direction: 'up' | 'down' | 'stable';
}
