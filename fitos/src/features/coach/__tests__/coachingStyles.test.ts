import {
  defaultExperiencePreferences,
  mapLegacyPersonaToStyle,
} from '../styles/coachingStyles';

describe('coaching style preferences', () => {
  it('defaults to balanced coaching and system appearance', () => {
    expect(defaultExperiencePreferences.coachingStyle).toBe('balanced');
    expect(defaultExperiencePreferences.appearance).toBe('system');
  });

  it('maps legacy persona selections to communication styles', () => {
    expect(mapLegacyPersonaToStyle('cedric')).toBe('direct');
    expect(mapLegacyPersonaToStyle('elara')).toBe('encouraging');
    expect(mapLegacyPersonaToStyle(undefined)).toBe('balanced');
  });
});
