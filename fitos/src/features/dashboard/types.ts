export interface KPICardData {
  id: string;
  label: string;
  value: string;
  unit?: string;
  goal?: number;
  current?: number;
  progress?: number; // 0–1
  trend?: 'up' | 'down' | 'stable';
  trendLabel?: string;
  accentColor: string;
  accentColorMuted: string;
}
