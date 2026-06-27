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
            tintColor={colors.accent}
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
    <SafeAreaView style={styles.safeArea}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
