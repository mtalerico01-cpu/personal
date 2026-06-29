import React from 'react';
import { View, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { PersonaId } from '../store/coachStore';
import { CoachIdentityMark } from './CoachIdentityMark';

interface CoachTopBarProps {
  personaId: PersonaId;
  name: string;
  role: string;
  onSwitchCoach: () => void;
  onNewConversation: () => void;
  returnLabel?: string;
  onReturn?: () => void;
}

export function CoachTopBar({ personaId, name, role, onSwitchCoach, onNewConversation, returnLabel, onReturn }: CoachTopBarProps) {
  const theme = useActiveTheme();
  const { width } = useWindowDimensions();
  const targetName = personaId === 'cedric' ? 'Elara' : 'Cedric';
  const hasReturn = Boolean(onReturn && returnLabel);
  const compactLayout = width < 430;

  if (compactLayout) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactNavRow}>
          <View style={styles.compactLeftControls}>
            <MenuButton />
            {hasReturn ? <ReturnButton label={returnLabel} onPress={onReturn} /> : null}
          </View>
          <View style={styles.actions}>
            <NewConversationButton onPress={onNewConversation} />
            <ChangeCoachButton
              personaId={personaId}
              targetName={targetName}
              onPress={onSwitchCoach}
              showLabel={false}
            />
          </View>
        </View>
        <View style={styles.compactIdentityRow}>
          <View style={styles.copy}>
            <Text variant="labelLarge" color={theme.colors.text.primary} style={styles.name}>
              {name}
            </Text>
            <Text variant="caption" color={theme.colors.text.muted} style={styles.role}>
              {role}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftCluster}>
        <MenuButton />
        {hasReturn ? <ReturnButton label={returnLabel} onPress={onReturn} /> : null}
        <View style={styles.identityRow}>
        <CoachIdentityMark persona={personaId} size={38} />
        <View style={styles.copy}>
          <Text variant="labelLarge" color={theme.colors.text.primary} style={styles.name}>
            {name}
          </Text>
          <Text variant="caption" color={theme.colors.text.muted} style={styles.role}>
            {role}
          </Text>
        </View>
      </View>
      </View>

      <View style={styles.actions}>
        <NewConversationButton onPress={onNewConversation} />
        <ChangeCoachButton personaId={personaId} targetName={targetName} onPress={onSwitchCoach} />
      </View>
    </View>
  );
}

function MenuButton() {
  const theme = useActiveTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Open Coach menu"
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

function ChangeCoachButton({
  personaId,
  targetName,
  onPress,
  showLabel = true,
}: {
  personaId: PersonaId;
  targetName: string;
  onPress: () => void;
  showLabel?: boolean;
}) {
  const theme = useActiveTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Change coach to ${targetName}`}
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        showLabel ? styles.switchButton : styles.switchIconButton,
        { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.translucent },
      ]}
    >
      <CoachIdentityMark persona={personaId === 'cedric' ? 'elara' : 'cedric'} size={24} active={false} />
      {showLabel ? (
        <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.switchText}>
          Change coach
        </Text>
      ) : null}
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
  role: { marginTop: 2, letterSpacing: 0.5 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButton: {
    minHeight: 42,
    borderRadius: 22,
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: { letterSpacing: 0.5, textTransform: 'uppercase' },
});