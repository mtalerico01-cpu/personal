import { parseMockIntent } from '../intents/parseMockIntent';

describe('parseMockIntent', () => {
  test.each([
    // log_meal matches 'log', 'ate', 'had', 'eaten', 'track'
    ['log some chicken', 'log_meal'],
    ['I ate a burger', 'log_meal'],
    ['I had rice', 'log_meal'],
    ['track my salad', 'log_meal'],
    // estimate_food matches 'estimate', 'how many calories', 'calories in', 'macros in'
    ['how many calories in this', 'estimate_food'],
    ['how many calories in a banana', 'estimate_food'],
    ['macros in chicken breast', 'estimate_food'],
    // remaining_macros matches 'remaining', 'how am i doing', 'how are my macros'
    ['how many calories remaining', 'estimate_food'],   // 'calories' triggers estimate_food first
    ['how are my macros today', 'remaining_macros'],
    ['how much is left today', 'remaining_macros'],
    // build_workout matches 'generate', 'build', 'create'
    ['build me a plan', 'build_workout'],
    ['build me a workout', 'build_workout'],
    // cardio_review matches 'cardio', 'steps', 'walk', 'run'
    ['how much cardio do I need', 'cardio_review'],
    // weight_explanation matches 'explain my weight', 'why did my weight', 'gained weight'
    ['explain my weight change', 'weight_explanation'],
    ['why did my weight go up', 'weight_explanation'],
    // adjust_calories
    ['increase my calories by 200', 'adjust_calories'],
    ['reduce calories please', 'adjust_calories'],
    // plan_tomorrow
    ['help me plan tomorrow', 'plan_tomorrow'],
    // change_goal
    ['change my goal weight', 'change_goal'],
    // review_day
    ['review my day', 'review_day'],
    // create_cut
    ['I want to cut', 'create_cut'],
    // create_bulk
    ['I want to bulk', 'create_bulk'],
    // general fallback
    ['can you help me asdfghjkl', 'general'],
  ])('"%s" → %s', (input, expectedType) => {
    const result = parseMockIntent(input);
    expect(result.type).toBe(expectedType);
  });

  it('falls back to general with low confidence for unknown input', () => {
    const result = parseMockIntent('zzzxxx random noise 123');
    expect(result.type).toBe('general');
    expect(result.confidence).toBe('low');
  });
});
