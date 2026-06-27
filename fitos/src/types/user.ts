export interface UserGoals {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  weightGoalKg: number;
  dailySteps: number;
}

export type WeightUnit = 'kg' | 'lbs';
export type EnergyUnit = 'kcal' | 'kJ';

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  weightUnit: WeightUnit;
  energyUnit: EnergyUnit;
  goals: UserGoals;
  createdAt: string;
}
