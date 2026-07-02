import React from 'react';
import { Image, View, TouchableOpacity, StyleSheet, type LayoutChangeEvent } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { brandAssets } from '@/branding/assets';
import { logoSizes } from '@/shared/theme/spacing';

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
  const [containerWidth, setContainerWidth] = React.useState<number | null>(null);
  const hasReturn = Boolean(onReturn && returnLabel);
  const compactLayout = containerWidth === null || containerWidth < 520;
  const logoSource = theme.mode === 'dark' ? brandAssets.logoDark : brandAssets.logoLight;
  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  if (compactLayout) {
    return (
      <View style={styles.compactContainer} onLayout={handleLayout}>
        <View style={styles.compactNavRow}>
          <View style={styles.compactLeftControls}>
            <MenuButton onPress={onMenuPress} />
            {hasReturn ? <ReturnButton label={returnLabel} onPress={onReturn} /> : null}
          </View>
          <View style={styles.actions}>
            <NewConversationButton onPress={onNewConversation} />
          </View>
        </View>
        <View style={styles.compactIdentityRow}>
          <Image source={logoSource} resizeMode="contain" style={styles.compactLogo} />
          <View style={styles.copy}>
            <Text variant="labelLarge" color={theme.colors.text.primary} numberOfLines={1} style={styles.name}>
              {name}
            </Text>
            <Text variant="caption" color={theme.colors.text.muted} numberOfLines={1} style={styles.role}>
              {role}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={styles.leftCluster}>
        <MenuButton onPress={onMenuPress} />
        {hasReturn ? <ReturnButton label={returnLabel} onPress={onReturn} /> : null}
        <View style={styles.identityRow}>
        <Image source={logoSource} resizeMode="contain" style={styles.logo} />
        <View style={styles.copy}>
          <Text variant="labelLarge" color={theme.colors.text.primary} numberOfLines={1} style={styles.name}>
            {name}
          </Text>
          <Text variant="caption" color={theme.colors.text.muted} numberOfLines={1} style={styles.role}>
            {role}
          </Text>
        </View>
      </View>
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
  compactContainer: {
    minHeight: 96,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 8,
    gap: 8,
  },
  compactNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  compactLeftControls: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactIdentityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  compactLogo: { width: logoSizes.standard, height: logoSizes.standard },
  container: {
    minHeight: 68,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  leftCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    flex: 1,
    minWidth: 0,
  },
  logo: { width: logoSizes.standard, height: logoSizes.standard },
  copy: { flex: 1, minWidth: 0 },
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
  name: { letterSpacing: 1.2, textTransform: 'uppercase' },
  role: { marginTop: 2, letterSpacing: 0.4 },
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