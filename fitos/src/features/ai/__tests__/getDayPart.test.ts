import { getDayPart, getDayPartForTimezone } from '../context/getDayPart';

describe('getDayPart', () => {
  test.each([
    [5, 'morning'],
    [11, 'morning'],
    [12, 'afternoon'],
    [16, 'afternoon'],
    [17, 'evening'],
    [20, 'evening'],
    [21, 'night'],
    [23, 'night'],
    [0, 'night'],
    [4, 'night'],
  ])('hour %i → %s', (hour, expected) => {
    expect(getDayPart(hour)).toBe(expected);
  });
});

describe('getDayPartForTimezone', () => {
  it('returns a valid DayPart string', () => {
    const result = getDayPartForTimezone('America/New_York');
    expect(['morning', 'afternoon', 'evening', 'night']).toContain(result);
  });

  it('falls back gracefully on invalid timezone', () => {
    const result = getDayPartForTimezone('Invalid/Zone');
    expect(['morning', 'afternoon', 'evening', 'night']).toContain(result);
  });
});
