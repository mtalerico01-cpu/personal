export interface Persona {
  id: 'cedric' | 'elara';
  name: string;
  role: string;
  tone: string;
  initials: string;
  greeting: (name: string, dayPart: string) => string;
  weightFluctuation: (lbs: number, direction: 'up' | 'down' | 'stable') => string;
  proteinLow: (remaining: number) => string;
  workoutIncomplete: (name: string) => string;
  caloriesLow: (remaining: number) => string;
  mealLogged: (mealName: string, calories: number, remaining: number) => string;
  macrosUpdated: (calories: number) => string;
  workoutSaved: (name: string) => string;
  generalAck: () => string;
}

export const PERSONAS: Record<'cedric' | 'elara', Persona> = {
  cedric: {
    id: 'cedric',
    name: 'Cedric',
    role: 'AI Performance Coach',
    tone: 'analytical, direct, evidence-oriented',
    initials: 'C',

    greeting: (name, dayPart) => {
      const map: Record<string, string> = {
        morning: `Morning, ${name}. Here's what you need to know.`,
        afternoon: `${name}. Mid-day check-in.`,
        evening: `Evening, ${name}. Let's review your day.`,
        night: `${name}. Quick debrief before tomorrow.`,
      };
      return map[dayPart] ?? `${name}. Ready to work.`;
    },

    weightFluctuation: (lbs, direction) => {
      if (direction === 'up')
        return `Weight is up ${lbs.toFixed(1)} lbs. Your 7-day average is on track — this is most likely glycogen and water retention, not tissue gain. No adjustment needed.`;
      if (direction === 'down')
        return `Weight is down ${Math.abs(lbs).toFixed(1)} lbs. Rate of loss is within target range. Continue current protocol.`;
      return `Weight is stable. 7-day average unchanged. On track.`;
    },

    proteinLow: (remaining) =>
      `Protein is ${remaining}g short of target. Prioritise a high-protein source in your next meal to stay on track.`,

    workoutIncomplete: (name) =>
      `${name} is not yet logged as complete. Do you want to build it now?`,

    caloriesLow: (remaining) =>
      `${remaining} calories remaining. Plan your next meal to close the deficit cleanly.`,

    mealLogged: (mealName, calories, remaining) =>
      `${mealName} logged — ${calories} kcal. ${remaining} calories remaining today.`,

    macrosUpdated: (calories) =>
      `Macro targets updated. New calorie target: ${calories} kcal. Applied to today's tracking.`,

    workoutSaved: (name) =>
      `${name} saved. Start when ready.`,

    generalAck: () =>
      `Noted. Let me know if you need anything adjusted.`,
  },

  elara: {
    id: 'elara',
    name: 'Elara',
    role: 'AI Wellness Coach',
    tone: 'warm, supportive, habit-focused',
    initials: 'E',

    greeting: (name, dayPart) => {
      const map: Record<string, string> = {
        morning: `Good morning, ${name}! Here's a look at your day ahead.`,
        afternoon: `Hey ${name} — here's where things stand for the afternoon.`,
        evening: `Good evening, ${name}. Let's see how your day went.`,
        night: `Hi ${name}. Before you wind down, here's a quick overview.`,
      };
      return map[dayPart] ?? `Hi ${name}! Here's your update.`;
    },

    weightFluctuation: (lbs, direction) => {
      if (direction === 'up')
        return `Your weight is up ${lbs.toFixed(1)} lbs today, but your weekly trend still looks healthy. This kind of daily fluctuation is completely normal — it's most likely temporary water weight rather than anything to worry about.`;
      if (direction === 'down')
        return `Your weight is down ${Math.abs(lbs).toFixed(1)} lbs — great progress! Your trend is moving in the right direction. Keep doing what you're doing.`;
      return `Your weight is holding steady today. That's a great sign — consistency is what drives real results over time.`;
    },

    proteinLow: (remaining) =>
      `You're about ${remaining}g short on protein for today. Adding a protein-rich snack or meal before the day ends would really help you hit your goal.`,

    workoutIncomplete: (name) =>
      `It looks like ${name} hasn't been logged yet. Would you like me to put together a plan for you?`,

    caloriesLow: (remaining) =>
      `You still have ${remaining} calories to work with today. I can suggest something balanced if you're not sure what to eat.`,

    mealLogged: (mealName, calories, remaining) =>
      `${mealName} has been added — that's ${calories} calories. You have ${remaining} calories left for the day. You're doing great!`,

    macrosUpdated: (calories) =>
      `Your nutrition targets have been updated to ${calories} calories per day. These changes are reflected in your tracking now.`,

    workoutSaved: (name) =>
      `Your ${name} workout is ready to go whenever you are!`,

    generalAck: () =>
      `Got it! Let me know if you'd like to adjust anything.`,
  },
};
