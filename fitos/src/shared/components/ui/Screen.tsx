import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  RefreshControl,
} from 'react-native';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing } from '@/shared/theme/spacing';

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** If true, wraps children in a ScrollView */
  scrollable?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  /** Horizontal padding. Defaults to 16 */
  horizontalPadding?: number;
}

export function Screen({
  children,
  style,
  scrollable = false,
  onRefresh,
  refreshing = false,
  horizontalPadding = spacing[4],
}: ScreenProps) {
  const theme = useActiveTheme();
  const content = scrollable ? (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal: horizontalPadding },
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.persona.core}
          />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.staticContent,
        { paddingHorizontal: horizontalPadding },
        style,
      ]}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.depthGlow, { backgroundColor: theme.colors.persona.ambient }]} />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
  depthGlow: {
    position: 'absolute',
    top: 92,
    left: '18%',
    width: 240,
    height: 240,
    borderRadius: 120,
    opacity: 0.026,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[10],
  },
  staticContent: {
    flex: 1,
  },
});
