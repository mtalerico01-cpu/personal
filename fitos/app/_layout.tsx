import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { router, useSegments } from 'expo-router';
import { useActiveTheme } from '../src/shared/theme/useActiveTheme';
import { useOnboardingStore } from '../src/features/onboarding/store/onboardingStore';
import { useActivePlanStore } from '../src/store/activePlanStore';
import { useUserStore } from '../src/store/userStore';

export default function RootLayout() {
  const theme = useActiveTheme();
  const segments = useSegments();
  const onboarding = useOnboardingStore();
  const initActivePlan = useActivePlanStore((state) => state.initActivePlan);
  const hasActivePlanHydrated = useActivePlanStore((state) => state.hasHydrated);
  const initProfile = useUserStore((state) => state.initProfile);
  const hasProfileHydrated = useUserStore((state) => state.hasHydrated);

  useEffect(() => {
    onboarding.init();
    initActivePlan();
    initProfile();
  }, []);

  useEffect(() => {
    if (!onboarding.isHydrated || !hasProfileHydrated || !hasActivePlanHydrated) return;
    const route = segments[0];
    const isOnboardingRoute = route === 'onboarding';
    const isWelcomeRoute = route === 'welcome';
    const isLoginRoute = route === 'login';
    const hasCompletedOnboarding = onboarding.status === 'completed';

    if (!hasCompletedOnboarding && !isOnboardingRoute && !isWelcomeRoute && !isLoginRoute) {
      router.replace('/welcome');
      return;
    }

    if (hasCompletedOnboarding && isOnboardingRoute) {
      router.replace('/');
    }
  }, [onboarding.isHydrated, onboarding.status, hasProfileHydrated, hasActivePlanHydrated, segments]);

  const isWeb = Platform.OS === 'web';

  const inner = (
    <>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );

  if (isWeb) {
    return (
      <View style={styles.webRoot}>
        <View style={[styles.phoneFrame, { backgroundColor: theme.colors.background.primary }]}>
          {inner}
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={[styles.root, { backgroundColor: theme.colors.background.primary }]}>
      {inner}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  webRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d0d0d',
  },
  phoneFrame: {
    width: 393,
    height: 852,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    // Shadow for depth on the desktop background
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 32px 80px rgba(0,0,0,0.7)' } as object)
      : {}),
  },
});
