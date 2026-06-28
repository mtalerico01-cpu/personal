export const mockProgressData = {
  weight: {
    currentLbs: 203.4,
    goalLbs: 215,
    sevenDayAvgLbs: 202.8,
    weeklyChangeLbs: +0.6,
    monthlyChangeLbs: +2.1,
    history: [
      { label: 'Apr 5', value: 198.2 },
      { label: 'Apr 12', value: 199.1 },
      { label: 'Apr 19', value: 200.0 },
      { label: 'Apr 26', value: 201.2 },
      { label: 'May 3', value: 201.5 },
      { label: 'May 10', value: 202.3 },
      { label: 'May 17', value: 202.9 },
      { label: 'May 24', value: 203.0 },
      { label: 'May 31', value: 203.8 },
      { label: 'Jun 7', value: 203.4 },
      { label: 'Jun 14', value: 204.1 },
      { label: 'Jun 21', value: 203.4 },
    ],
    // 30-day sparkline data retained for compact summaries.
    sparkline: [
      198.2, 198.8, 199.1, 199.6, 200.0, 200.4, 200.1, 200.8, 201.2, 201.0,
      201.5, 201.9, 202.3, 202.0, 202.6, 202.4, 202.9, 203.1, 202.8, 203.2,
      203.0, 203.5, 203.2, 203.6, 203.8, 203.4, 203.9, 204.1, 203.8, 203.4,
    ],
  },

  aiWeightInsight:
    "Your weight is up 0.6 lbs today, but your 7-day average remains on track. This is likely water retention from higher carbohydrate intake yesterday — not true fat gain.",

  strength: {
    score: 782,
    scoreChangeThisMonth: +18,
    aiInsight:
      'Strength is increasing faster than bodyweight, indicating productive training with minimal fat accumulation.',
    history: [
      { label: 'Apr 5', value: 732 },
      { label: 'Apr 12', value: 738 },
      { label: 'Apr 19', value: 741 },
      { label: 'Apr 26', value: 750 },
      { label: 'May 3', value: 755 },
      { label: 'May 10', value: 759 },
      { label: 'May 17', value: 764 },
      { label: 'May 24', value: 769 },
      { label: 'May 31', value: 773 },
      { label: 'Jun 7', value: 776 },
      { label: 'Jun 14', value: 779 },
      { label: 'Jun 21', value: 782 },
    ],
    lifts: [
      {
        id: 'bench',
        name: 'Bench Press',
        estimated1RMLbs: 285,
        ninetyDayChangeLbs: +15,
        relativeStrength: 1.4,
        relativeStrengthLabel: '1.4× bodyweight',
      },
      {
        id: 'squat',
        name: 'Squat',
        estimated1RMLbs: 340,
        ninetyDayChangeLbs: +20,
        relativeStrength: 1.67,
        relativeStrengthLabel: '1.7× bodyweight',
      },
      {
        id: 'deadlift',
        name: 'Deadlift',
        estimated1RMLbs: 405,
        ninetyDayChangeLbs: +25,
        relativeStrength: 1.99,
        relativeStrengthLabel: '2.0× bodyweight',
      },
      {
        id: 'ohp',
        name: 'Overhead Press',
        estimated1RMLbs: 165,
        ninetyDayChangeLbs: +10,
        relativeStrength: 0.81,
        relativeStrengthLabel: '0.8× bodyweight',
      },
    ],
  },

  bodyMeasurements: [
    { id: 'm1', name: 'Arms', value: 15.4, unit: 'in' },
    { id: 'm2', name: 'Chest', value: 43.2, unit: 'in' },
    { id: 'm3', name: 'Waist', value: 33.8, unit: 'in' },
    { id: 'm4', name: 'Legs', value: 24.6, unit: 'in' },
    { id: 'm5', name: 'Calves', value: 15.8, unit: 'in' },
  ],

  bodyMeasurementHistory: [
    { label: 'Apr 5', value: 35.4 },
    { label: 'Apr 12', value: 35.2 },
    { label: 'Apr 19', value: 35.0 },
    { label: 'Apr 26', value: 34.8 },
    { label: 'May 3', value: 34.7 },
    { label: 'May 10', value: 34.5 },
    { label: 'May 17', value: 34.4 },
    { label: 'May 24', value: 34.2 },
    { label: 'May 31', value: 34.1 },
    { label: 'Jun 7', value: 34.0 },
    { label: 'Jun 14', value: 33.9 },
    { label: 'Jun 21', value: 33.8 },
  ],

  progressPhotos: [
    { id: 'p1', label: 'Front' },
    { id: 'p2', label: 'Side' },
    { id: 'p3', label: 'Back' },
  ],
};
