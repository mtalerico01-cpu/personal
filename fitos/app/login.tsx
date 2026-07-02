import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/shared/components/ui/Text';
import { darkTheme } from '@/shared/theme/colors';
import { radius, spacing } from '@/shared/theme/spacing';
import { useOnboardingStore } from '@/features/onboarding/store/onboardingStore';

const SOCIAL_OPTIONS = ['Continue with Google', 'Continue with Apple', 'Continue with Facebook'];

export default function LoginScreen() {
  const theme = darkTheme;
  const onboarding = useOnboardingStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (onboarding.savedShortcut) {
      onboarding.restoreFromShortcut();
      return;
    }

    router.replace('/onboarding');
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background.primary }]}> 
      <View style={[styles.header, { borderBottomColor: theme.colors.border.subtle }]}> 
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.back()}
          activeOpacity={0.82}
          style={[styles.backButton, { borderColor: theme.colors.border.default }]}
        >
          <Text variant="headingMedium" color={theme.colors.text.primary} style={styles.backArrow}>
            ‹
          </Text>
        </TouchableOpacity>
        <Text variant="headingSmall" color={theme.colors.text.primary} style={styles.headerTitle}>
          Log In
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.form}> 
        <View style={styles.fieldBlock}>
          <Text variant="labelLarge" color={theme.colors.text.muted} style={styles.fieldLabel}>
            Email Address
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@formtheory.app"
            placeholderTextColor={theme.colors.text.disabled}
            style={[styles.input, { borderColor: theme.colors.border.default, color: theme.colors.text.primary }]}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text variant="labelLarge" color={theme.colors.text.muted} style={styles.fieldLabel}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={theme.colors.text.disabled}
            style={[styles.input, { borderColor: theme.colors.border.default, color: theme.colors.text.primary }]}
          />
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          onPress={handleLogin}
          activeOpacity={0.88}
          style={[styles.loginButton, { backgroundColor: theme.colors.persona.core }]}
        >
          <Text variant="labelLarge" color={theme.colors.text.inverse} style={styles.loginText}>
            Log In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity accessibilityRole="button" activeOpacity={0.86} style={styles.forgotButton}>
          <Text variant="labelMedium" color={theme.colors.persona.core} style={styles.forgotText}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={[styles.divider, { backgroundColor: theme.colors.border.subtle }]} />
          <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.orText}>
            OR
          </Text>
          <View style={[styles.divider, { backgroundColor: theme.colors.border.subtle }]} />
        </View>

        <View style={styles.socialStack}>
          {SOCIAL_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              accessibilityRole="button"
              onPress={handleLogin}
              activeOpacity={0.88}
              style={styles.socialButton}
            >
              <Text variant="labelLarge" color="#0f1117" style={styles.socialText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text variant="bodyMedium" color={theme.colors.text.muted} style={styles.permissionText}>
          We will never post anything without your permission.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    height: Platform.OS === 'ios' ? 112 : 96,
    paddingTop: Platform.OS === 'ios' ? 46 : 30,
    paddingHorizontal: spacing[4],
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#F5F6F8',
    fontSize: 42,
    lineHeight: 42,
    marginTop: -4,
  },
  headerTitle: {
    color: '#F5F6F8',
    fontWeight: '900',
  },
  headerSpacer: {
    width: 44,
  },
  form: {
    flex: 1,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[8],
  },
  fieldBlock: {
    gap: spacing[2],
    marginBottom: spacing[5],
  },
  fieldLabel: {
    color: '#8B919A',
    fontSize: 16,
    fontWeight: '900',
  },
  input: {
    height: 58,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    paddingHorizontal: spacing[4],
    fontSize: 16,
    fontWeight: '500',
  },
  loginButton: {
    height: 58,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[2],
  },
  loginText: {
    color: '#0B0D10',
    fontSize: 17,
    fontWeight: '900',
  },
  forgotButton: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotText: {
    color: '#A7FF00',
    fontSize: 15,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    marginBottom: spacing[5],
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  orText: {
    color: '#8B919A',
    fontSize: 14,
    fontWeight: '800',
  },
  socialStack: {
    gap: spacing[3],
  },
  socialButton: {
    height: 54,
    borderRadius: radius.sm,
    backgroundColor: '#f7f7f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 16,
    fontWeight: '900',
  },
  permissionText: {
    color: '#8B919A',
    textAlign: 'center',
    marginTop: spacing[6],
    lineHeight: 22,
    paddingHorizontal: spacing[5],
  },
});
