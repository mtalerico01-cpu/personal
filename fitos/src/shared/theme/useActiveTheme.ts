import { useCoachStore } from '../../features/coach/store/coachStore';
import { getThemeForPersona } from './colors';

export function useActiveTheme() {
  const personaId = useCoachStore((state) => state.personaId);
  return getThemeForPersona(personaId);
}
