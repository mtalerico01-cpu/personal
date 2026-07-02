import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { brandAssets } from '@/branding/assets';
import { Text } from '@/shared/components/ui/Text';
import { darkTheme } from '@/shared/theme/colors';
import { radius, spacing } from '@/shared/theme/spacing';
import { useOnboardingStore } from '@/features/onboarding/store/onboardingStore';

const SLIDES = [
  {
    stat: '2,430',
    label: 'Calories',
    headline: "Ready for better data? Start coaching, it's simple.",
  },
  {
    stat: '185g',
    label: 'Protein',
    headline: 'See how training, food, and recovery affect your plan.',
  },
  {
    stat: '4x',
    label: 'Training',
    headline: 'Build habits your coach can adapt week after week.',
  },
];

export default function WelcomeScreen() {
  const theme = darkTheme;
  const onboarding = useOnboardingStore();
  const shortcut = onboarding.savedShortcut;

  const startOnboarding = () => router.replace('/onboarding');
  const openLogin = () => router.push('/login');

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background.primary }]}> 
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.brandBlock}>
          <Text variant="labelLarge" color={theme.colors.text.muted} style={styles.welcomeText}>
            Welcome to
          </Text>
          <Image
            source={brandAssets.logoDark}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>

        <View style={styles.carouselRow}>
          <View style={[styles.featureCard, { backgroundColor: theme.colors.surface.default }]}> 
            <View style={[styles.featureStage, { backgroundColor: theme.colors.persona.deep }]}> 
              <View style={[styles.orbitOne, { backgroundColor: theme.colors.persona.core }]} />
              <View style={[styles.orbitTwo, { backgroundColor: theme.colors.persona.soft }]} />
              <View style={[styles.metricCard, { backgroundColor: theme.colors.background.primary }]}> 
                <View style={styles.metricHeader}>
                  <Text variant="labelLarge" color={theme.colors.text.primary} style={styles.metricLabel}>
                    {SLIDES[0].label}
                  </Text>
                  <Text variant="caption" color={theme.colors.text.secondary} style={styles.metricRange}>
                    Today
                  </Text>
                </View>
                <Text variant="headingMedium" color={theme.colors.persona.core} style={styles.metricStat}>
                  {SLIDES[0].stat}
                </Text>
                <View style={styles.barGrid}>
                  {[34, 48, 44, 58, 70, 62, 76].map((height, index) => (
                    <View key={index} style={[styles.bar, { height, backgroundColor: theme.colors.persona.core }]} />
                  ))}
                </View>
                <View style={styles.dayRow}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <Text key={`${day}-${index}`} variant="caption" color={theme.colors.text.secondary} style={styles.dayText}>
                      {day}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.peekCard, { backgroundColor: theme.colors.surface.raised, borderColor: theme.colors.border.subtle }]}> 
            <Text variant="caption" color={theme.colors.text.muted} style={styles.peekText}>
              {SLIDES[1].label}
            </Text>
          </View>
        </View>

        <View style={styles.messageBlock}>
          <Text variant="headingMedium" color={theme.colors.text.primary} style={styles.mainMessage}>
            {SLIDES[0].headline}
          </Text>
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive, { backgroundColor: theme.colors.persona.core }]} />
            <View style={[styles.dot, { backgroundColor: theme.colors.text.disabled }]} />
            <View style={[styles.dot, { backgroundColor: theme.colors.text.disabled }]} />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border.subtle, backgroundColor: theme.colors.background.primary }]}> 
        <TouchableOpacity
          accessibilityRole="button"
          onPress={startOnboarding}
          activeOpacity={0.88}
          style={[styles.primaryCta, { backgroundColor: theme.colors.persona.core }]}
        >
          <Text variant="labelLarge" color={theme.colors.text.inverse} style={styles.ctaLabel}>
            Sign Up For Free
          </Text>
        </TouchableOpacity>

        {shortcut ? (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => onboarding.restoreFromShortcut()}
            activeOpacity={0.88}
            style={styles.textCta}
          >
            <Text variant="labelLarge" color={theme.colors.persona.core} style={styles.loginLabel}>
              Continue as @{shortcut.username}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity accessibilityRole="button" onPress={openLogin} activeOpacity={0.88} style={styles.textCta}>
            <Text variant="labelLarge" color={theme.colors.persona.core} style={styles.loginLabel}>
              Log In
            </Text>
          </TouchableOpacity>
        )}

        <Text variant="caption" color={theme.colors.text.secondary} style={styles.versionText}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingTop: Platform.OS === 'ios' ? 72 : 58,
    paddingHorizontal: 0,
    paddingBottom: 224,
    gap: spacing[6],
    width: '100%',
    alignSelf: 'center',
  },
  brandBlock: {
    alignItems: 'center',
    gap: spacing[2],
  },
  welcomeText: {
    color: '#8B919A',
    fontSize: 21,
    fontWeight: '800',
    opacity: 0.82,
  },
  logo: {
    width: 188,
    height: 54,
  },
  carouselRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing[5],
    marginTop: spacing[6],
    paddingLeft: spacing[5],
  },
  featureCard: {
    width: 300,
    height: 365,
    borderRadius: 28,
    overflow: 'hidden',
  },
  featureStage: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: spacing[5],
  },
  orbitOne: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.24,
    top: 42,
    right: -80,
  },
  orbitTwo: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    opacity: 0.16,
    bottom: -46,
    left: -38,
  },
  metricCard: {
    width: 190,
    borderRadius: radius.xl,
    padding: spacing[4],
    opacity: 0.94,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  metricLabel: {
    color: '#F5F6F8',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  metricRange: {
    color: '#C7CBD1',
    fontSize: 12,
  },
  metricStat: {
    color: '#A7FF00',
    marginTop: spacing[1],
    fontWeight: '900',
  },
  barGrid: {
    height: 82,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: spacing[4],
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.18)',
  },
  bar: {
    width: 12,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing[2],
  },
  dayText: {
    color: '#C7CBD1',
    fontSize: 12,
    fontWeight: '800',
  },
  peekCard: {
    width: 112,
    height: 365,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.78,
  },
  peekText: {
    color: '#8B919A',
    transform: [{ rotate: '90deg' }],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  messageBlock: {
    alignItems: 'center',
    paddingHorizontal: spacing[5],
    gap: spacing[6],
  },
  mainMessage: {
    color: '#F5F6F8',
    textAlign: 'center',
    fontSize: 29,
    lineHeight: 36,
    fontWeight: '900',
  },
  dots: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 999,
  },
  dotActive: {
    width: 10,
    height: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    paddingBottom: Platform.OS === 'ios' ? 34 : spacing[5],
    gap: spacing[3],
    alignItems: 'stretch',
    width: '100%',
    alignSelf: 'center',
  },
  primaryCta: {
    height: 58,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCta: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: {
    color: '#0B0D10',
    fontSize: 17,
    fontWeight: '900',
  },
  loginLabel: {
    color: '#A7FF00',
    fontSize: 17,
    fontWeight: '900',
  },
  versionText: {
    color: '#C7CBD1',
    textAlign: 'center',
    fontSize: 13,
  },
});
