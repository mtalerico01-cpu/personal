import { useCoachStore } from '../../features/coach/store/coachStore';
import { useColorScheme } from 'react-native';
import { getThemeForAppearance } from './colors';

export function useActiveTheme() {
  const appearance = useCoachStore((state) => state.appearance);
  const colorScheme = useColorScheme();
  const resolvedColorScheme = colorScheme === 'light' || colorScheme === 'dark' ? colorScheme : null;
  return getThemeForAppearance(appearance, resolvedColorScheme);
}
