export const mockProgressData = {
  weight: {
    currentLbs: 203.4,
    goalLbs: 215,
    sevenDayAvgLbs: 202.8,
    weeklyChangeLbs: +0.6,
    monthlyChangeLbs: +2.1,
    // 30-day sparkline data (relative values for bar chart)
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
    { id: 'm1', name: 'Arms', value: null, unit: 'in' },
    { id: 'm2', name: 'Chest', value: null, unit: 'in' },
    { id: 'm3', name: 'Waist', value: null, unit: 'in' },
    { id: 'm4', name: 'Legs', value: null, unit: 'in' },
    { id: 'm5', name: 'Calves', value: null, unit: 'in' },
  ],

  progressPhotos: [
    { id: 'p1', label: 'Front' },
    { id: 'p2', label: 'Side' },
    { id: 'p3', label: 'Back' },
  ],
};
