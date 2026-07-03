import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { router, useLocalSearchParams } from 'expo-router';
import { brandAssets } from '@/branding/assets';
import { Text } from '@/shared/components/ui/Text';
import { darkTheme } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { fontFamilies } from '@/shared/theme/typography';
import { useAuthStore } from '@/store/authStore';

function ChevronLeft({ size = 20, color = '#E6E8ED' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function LoginScreen() {
  const theme = darkTheme;
  const params = useLocalSearchParams<{ mode?: string }>();
  const [mode, setMode] = useState<'login' | 'signup'>(params.mode === 'signup' ? 'signup' : 'login');
  const { signIn, signUp, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !password) return;
    clearError();
    if (mode === 'signup') {
      if (!username.trim()) return;
      await signUp(email.trim().toLowerCase(), password, username.trim().toLowerCase());
      router.replace('/onboarding');
    } else {
      await signIn(email.trim().toLowerCase(), password);
    }
  };

  const switchMode = () => {
    clearError();
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  const isSignup = mode === 'signup';
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/welcome');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.root, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <TouchableOpacity accessibilityRole="button" onPress={handleBack} activeOpacity={0.76} style={styles.backLink}>
          <ChevronLeft size={22} color="#E6E8ED" />
          <Text variant="labelMedium" color="#E6E8ED" style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.brandBlock}>
          <Image source={brandAssets.logoDark} resizeMode="contain" style={styles.logo} />
        </View>

        <View style={styles.headerBlock}>
          <Text variant="headingLarge" color={theme.colors.text.primary} style={styles.title}>
            {isSignup ? 'Create your account' : 'Sign in'}
          </Text>
          <Text variant="bodyLarge" color="#D7D9E0" style={styles.subtitle}>
            {isSignup ? 'Start with an account, then build your coaching profile.' : 'Access your coaching plan, nutrition targets, and progress history.'}
          </Text>
        </View>

        <View style={styles.form}>
          {isSignup && (
          <View style={styles.fieldBlock}>
            <Text variant="labelMedium" color="#E6E8ED" style={styles.fieldLabel}>
              Username
            </Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholder="yourname"
              placeholderTextColor="#B8BDC6"
              style={[styles.input, { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.border.default, color: theme.colors.text.primary }]}
            />
          </View>
          )}

          <View style={styles.fieldBlock}>
          <Text variant="labelMedium" color="#E6E8ED" style={styles.fieldLabel}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@formtheory.app"
            placeholderTextColor="#B8BDC6"
            style={[styles.input, { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.border.default, color: theme.colors.text.primary }]}
          />
          </View>

          <View style={styles.fieldBlock}>
          <Text variant="labelMedium" color="#E6E8ED" style={styles.fieldLabel}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor="#B8BDC6"
            style={[styles.input, { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.border.default, color: theme.colors.text.primary }]}
          />
          </View>

          <TouchableOpacity
            accessibilityRole="button"
            onPress={handleSubmit}
            activeOpacity={0.86}
            disabled={isLoading}
            style={[styles.primaryButton, { backgroundColor: theme.colors.persona.core, opacity: isLoading ? 0.72 : 1 }]}
          >
            {isLoading ? (
              <ActivityIndicator color="#0B0D10" />
            ) : (
              <Text variant="labelLarge" color={theme.colors.text.inverse} style={styles.primaryButtonText}>
                {isSignup ? 'Create account' : 'Sign in'}
              </Text>
            )}
          </TouchableOpacity>

          {error ? (
            <View style={[styles.errorBox, { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.status.error }]}> 
              <Text variant="bodyMedium" color={theme.colors.status.error} style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {!isSignup ? (
            <TouchableOpacity accessibilityRole="button" activeOpacity={0.76} style={styles.forgotButton}>
              <Text variant="bodyMedium" color="#D7D9E0" style={styles.forgotText}>
                Reset password
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.switchRow}>
          <Text variant="bodyMedium" color="#C9CDD4" style={styles.switchPrompt}>
            {isSignup ? 'Already have an account?' : 'New to Form Theory?'}
          </Text>
          <TouchableOpacity accessibilityRole="button" onPress={switchMode} activeOpacity={0.76}>
            <Text variant="bodyMedium" color="#F5F6F8" style={styles.switchLink}>
              {isSignup ? 'Sign in' : 'Create account'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text variant="caption" color="#AEB4BE" style={styles.sessionNote}>
          Your session is encrypted and stored securely on this device.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
    paddingHorizontal: spacing[5],
    paddingTop: Platform.OS === 'ios' ? 58 : spacing[8],
    paddingBottom: spacing[8],
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    minHeight: 40,
    gap: spacing[1],
    marginBottom: spacing[6],
  },
  backText: {
    color: '#E6E8ED',
    fontFamily: fontFamilies.button,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0,
  },
  brandBlock: {
    alignItems: 'flex-start',
    marginBottom: spacing[8],
  },
  logo: {
    width: 154,
    height: 44,
  },
  headerBlock: {
    gap: spacing[2],
    marginBottom: spacing[8],
  },
  title: {
    color: '#F5F6F8',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '600',
    letterSpacing: 0,
  },
  subtitle: {
    color: '#D7D9E0',
    maxWidth: 330,
    fontSize: 17,
    lineHeight: 26,
  },
  form: {
    gap: spacing[4],
  },
  fieldBlock: {
    gap: spacing[2],
  },
  fieldLabel: {
    color: '#E6E8ED',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  input: {
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: spacing[4],
    fontFamily: fontFamilies.sans,
    fontSize: 17,
    fontWeight: '400',
  },
  primaryButton: {
    height: 54,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[1],
  },
  primaryButtonText: {
    color: '#0B0D10',
    fontFamily: fontFamilies.button,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0,
  },
  errorBox: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
  },
  errorText: {
    lineHeight: 20,
  },
  forgotButton: {
    alignSelf: 'flex-start',
    minHeight: 32,
    justifyContent: 'center',
  },
  forgotText: {
    color: '#D7D9E0',
    fontSize: 16,
    lineHeight: 24,
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(245,246,248,0.35)',
  },
  switchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing[2],
    marginTop: spacing[8],
  },
  switchPrompt: {
    color: '#C9CDD4',
    fontSize: 17,
    lineHeight: 24,
  },
  switchLink: {
    color: '#F5F6F8',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(245,246,248,0.35)',
  },
  sessionNote: {
    color: '#AEB4BE',
    marginTop: spacing[4],
    fontSize: 15,
    lineHeight: 22,
  },
});
