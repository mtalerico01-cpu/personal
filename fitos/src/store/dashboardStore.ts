import { create } from 'zustand';

export type KPICardId = 'calories' | 'protein' | 'carbs' | 'fat' | 'weight' | 'steps';

interface DashboardState {
  /** Ordered list of visible KPI card IDs */
  visibleCards: KPICardId[];
  setVisibleCards: (cards: KPICardId[]) => void;
  toggleCard: (id: KPICardId) => void;
}

const DEFAULT_CARDS: KPICardId[] = [
  'calories',
  'protein',
  'carbs',
  'fat',
  'weight',
  'steps',
];

export const useDashboardStore = create<DashboardState>((set) => ({
  visibleCards: DEFAULT_CARDS,
  setVisibleCards: (cards) => set({ visibleCards: cards }),
  toggleCard: (id) =>
    set((state) => ({
      visibleCards: state.visibleCards.includes(id)
        ? state.visibleCards.filter((c) => c !== id)
        : [...state.visibleCards, id],
    })),
}));
