import React from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { brandAssets } from '@/branding/assets';

interface CoachTopBarProps {
  name: string;
  role: string;
  onNewConversation: () => void;
  onMenuPress: () => void;
  returnLabel?: string;
  onReturn?: () => void;
}

export function CoachTopBar({
  name,
  role,
  onNewConversation,
  onMenuPress,
  returnLabel,
  onReturn,
}: CoachTopBarProps) {
  const theme = useActiveTheme();
  const hasReturn = Boolean(onReturn && returnLabel);
  const markSource = theme.mode === 'dark' ? brandAssets.markDark : brandAssets.markLight;

  return (
    <View style={styles.container}>
      <View style={styles.leftCluster}>
        <MenuButton onPress={onMenuPress} />
        {hasReturn ? <ReturnButton label={returnLabel} onPress={onReturn} /> : null}
      </View>

      <View style={styles.titleRow}>
        <Image source={markSource} resizeMode="contain" style={styles.brandMark} />
        <Text variant="labelLarge" color={theme.colors.text.primary} numberOfLines={1} style={styles.title}>
          Form Theory
        </Text>
      </View>

      <View style={styles.actions}>
        <NewConversationButton onPress={onNewConversation} />
      </View>
    </View>
  );
}

function MenuButton({ onPress }: { onPress: () => void }) {
  const theme = useActiveTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Open Coach menu"
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.menuButton, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.translucent }]}
    >
      <View style={[styles.menuLine, { backgroundColor: theme.colors.text.secondary }]} />
      <View style={[styles.menuLine, styles.menuLineShort, { backgroundColor: theme.colors.text.secondary }]} />
      <View style={[styles.menuLine, { backgroundColor: theme.colors.text.secondary }]} />
    </TouchableOpacity>
  );
}

function ReturnButton({ label, onPress }: { label?: string; onPress?: () => void }) {
  const theme = useActiveTheme();

  if (!label || !onPress) return null;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Return to ${label}`}
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.returnButton, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.translucent }]}
    >
      <Text variant="headingSmall" color={theme.colors.text.secondary} style={styles.returnArrow}>‹</Text>
      <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.returnText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function NewConversationButton({ onPress }: { onPress: () => void }) {
  const theme = useActiveTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Start a new Coach conversation"
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.iconButton, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.translucent }]}
    >
      <Text variant="headingSmall" color={theme.colors.text.secondary}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  leftCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  menuLine: {
    width: 20,
    height: 1.5,
    borderRadius: 1,
  },
  menuLineShort: { width: 14 },
  returnButton: {
    minHeight: 42,
    borderRadius: 22,
    borderWidth: 1,
    paddingLeft: 9,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  returnArrow: { lineHeight: 24, marginTop: -1 },
  returnText: { letterSpacing: 0.5, textTransform: 'uppercase' },
  titleRow: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  brandMark: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0,
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});