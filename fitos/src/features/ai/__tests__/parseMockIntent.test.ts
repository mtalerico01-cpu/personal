import { parseMockIntent } from '../intents/parseMockIntent';

describe('parseMockIntent', () => {
  test.each([
    ['log some chicken', 'meal_logging'],
    ['I ate a burger', 'meal_logging'],
    ['I had rice', 'meal_logging'],
    ['track my salad', 'meal_logging'],
    // estimate_food matches 'estimate', 'how many calories', 'calories in', 'macros in'
    ['how many calories in this', 'estimate_food'],
    ['how many calories in a banana', 'estimate_food'],
    ['macros in chicken breast', 'estimate_food'],
    ['how many calories remaining', 'calorie_status'],
    ['how are my macros today', 'nutrition_status'],
    ['how is my nutrition today?', 'nutrition_status'],
    ['what do I have left today', 'nutrition_status'],
    ['what should I eat next?', 'meal_recommendation'],
    ['what should I target for my next meal?', 'meal_recommendation'],
    ['build me a workout', 'workout_generation'],
    ['what is my workout today?', 'training_plan'],
    ['how much cardio do I need', 'cardio_status'],
    ['what cardio should I do?', 'cardio_recommendation'],
    // weight_explanation matches 'explain my weight', 'why did my weight', 'gained weight'
    ['explain my weight change', 'weight_explanation'],
    ['why did my weight go up', 'weight_explanation'],
    ['increase my calories by 200', 'macro_adjustment'],
    ['reduce calories please', 'macro_adjustment'],
    ['help me plan tomorrow', 'tomorrow_plan'],
    ['change my goal weight', 'goal_change'],
    ['review my day', 'daily_review'],
    ['how am I doing today overall?', 'daily_review'],
    ['I want to cut', 'create_cut'],
    ['I want to bulk', 'create_bulk'],
    ['can you help me asdfghjkl', 'unknown'],
  ])('"%s" → %s', (input, expectedType) => {
    const result = parseMockIntent(input);
    expect(result.type).toBe(expectedType);
  });

  it('falls back to general with low confidence for unknown input', () => {
    const result = parseMockIntent('zzzxxx random noise 123');
    expect(result.type).toBe('unknown');
    expect(result.confidence).toBe('low');
  });

  it('assigns likely topic for ambiguous topic keywords', () => {
    const result = parseMockIntent('that cardio thing feels off');
    expect(result.type).toBe('unknown');
    expect(result.topic).toBe('cardio');
  });
});
