import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { ProfileIcon } from '@/shared/components/ui/NavIcon';
import type { AppearancePreference, CoachingStyle } from '@/features/coach/styles/coachingStyles';

interface CoachNavigationRailProps {
  visible: boolean;
  displayName: string;
  username: string;
  avatarUrl?: string;
  coachingStyle: CoachingStyle;
  appearance: AppearancePreference;
  onCoachingStyleChange: (style: CoachingStyle) => void;
  onAppearanceChange: (appearance: AppearancePreference) => void;
  onClose: () => void;
}

type MenuItem = {
  label: string;
  description: string;
  route: string;
  glyph: string;
  featured?: boolean;
};

const mainItems: MenuItem[] = [
  { label: 'Profile', description: 'Account, body, and saved facts', route: '/profile', glyph: 'PR' },
  { label: 'Goals', description: 'Targets and plan focus', route: '/menu/goals', glyph: 'GO' },
  { label: 'Workout Routines', description: 'Saved training plans', route: '/menu/workout-routines', glyph: 'WR' },
  { label: 'Nutrition', description: 'Food logging and macros', route: '/nutrition', glyph: 'NU' },
  { label: 'Recipes', description: 'Meals and saved foods', route: '/menu/recipes', glyph: 'RE' },
];

const utilityItems: MenuItem[] = [
  { label: 'Settings', description: 'Preferences and account controls', route: '/menu/settings', glyph: 'SE' },
  { label: 'Apps & Devices', description: 'Wearables and integrations', route: '/menu/apps-devices', glyph: 'AD' },
  { label: 'Privacy', description: 'Data and permissions', route: '/menu/privacy', glyph: 'PV' },
  { label: 'Help', description: 'Support and guidance', route: '/menu/help', glyph: 'HE' },
];

const coachingStyleOptions: Array<{ value: CoachingStyle; label: string }> = [
  { value: 'direct', label: 'Direct' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'encouraging', label: 'Encouraging' },
];

const appearanceOptions: Array<{ value: AppearancePreference; label: string }> = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
];

export function CoachNavigationRail({
  visible,
  displayName,
  username,
  avatarUrl,
  coachingStyle,
  appearance,
  onCoachingStyleChange,
  onAppearanceChange,
  onClose,
}: CoachNavigationRailProps) {
  const theme = useActiveTheme();
  const router = useRouter();

  if (!visible) return null;

  const handleNavigate = (route: string) => {
    onClose();
    router.push(route as Parameters<typeof router.push>[0]);
  };

  return (
    <View pointerEvents="box-none" style={styles.layer}>
      <Pressable accessibilityLabel="Close navigation menu" onPress={onClose} style={[styles.backdrop, { backgroundColor: theme.colors.background.overlay }]} />
      <View style={[styles.rail, { backgroundColor: theme.colors.background.secondary, borderColor: theme.colors.border.default }]}> 
        <ScrollView contentContainerStyle={styles.railContent} showsVerticalScrollIndicator={false}>
          <View style={styles.railHeader}>
            <Text variant="caption" color={theme.colors.persona.core} style={styles.railEyebrow}>Menu</Text>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Close navigation menu"
              onPress={onClose}
              activeOpacity={0.75}
              style={[styles.closeButton, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.translucent }]}
            >
              <Text variant="labelLarge" color={theme.colors.text.secondary}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileBlock}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.surface.selected, borderColor: theme.colors.border.persona }]}> 
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
              ) : (
                <Text variant="headingMedium" color={theme.colors.persona.core} style={styles.avatarText}>
                  {getInitials(displayName, username)}
                </Text>
              )}
            </View>
            <Text variant="labelLarge" color={theme.colors.text.primary} numberOfLines={1} style={styles.profileName}>
              {displayName}
            </Text>
            <Text variant="caption" color={theme.colors.text.muted} numberOfLines={1} style={styles.username}>
              {username}
            </Text>
          </View>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Try Premium"
            onPress={() => handleNavigate('/menu/try-premium')}
            activeOpacity={0.82}
            style={[styles.premiumCard, { backgroundColor: theme.colors.surface.selected, borderColor: theme.colors.border.persona }]}
          >
            <View style={[styles.premiumIcon, { backgroundColor: theme.colors.persona.core }]}> 
              <Text variant="caption" color={theme.colors.text.inverse} style={styles.itemGlyph}>UP</Text>
            </View>
            <View style={styles.itemCopy}>
              <Text variant="labelLarge" color={theme.colors.text.primary} numberOfLines={1} style={styles.itemLabel}>Try Premium</Text>
              <Text variant="caption" color={theme.colors.text.secondary} numberOfLines={2} style={styles.itemDescription}>Advanced plans, analytics, recipes, and Coach tools.</Text>
            </View>
          </TouchableOpacity>

          <MenuSection title="Plan" items={mainItems} onNavigate={handleNavigate} />

          <View style={styles.section}>
            <Text variant="caption" color={theme.colors.text.muted} style={styles.sectionTitle}>
              Coach Settings
            </Text>
            <View style={[styles.settingsPanel, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.default }]}> 
              <ControlGroup
                label="Coach type"
                options={coachingStyleOptions}
                value={coachingStyle}
                onChange={onCoachingStyleChange}
              />
              <ControlGroup
                label="Appearance"
                options={appearanceOptions}
                value={appearance}
                onChange={onAppearanceChange}
              />
            </View>
          </View>

          <MenuSection title="Settings & Support" items={utilityItems} onNavigate={handleNavigate} />
        </ScrollView>
      </View>
    </View>
  );
}

function ControlGroup<Value extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: Value; label: string }>;
  value: Value;
  onChange: (value: Value) => void;
}) {
  const theme = useActiveTheme();

  return (
    <View style={styles.controlGroup}>
      <Text variant="caption" color={theme.colors.text.muted} style={styles.controlLabel}>{label}</Text>
      <View style={styles.optionGrid}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <TouchableOpacity
              key={option.value}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`Set ${label} to ${option.label}`}
              onPress={() => onChange(option.value)}
              activeOpacity={0.78}
              style={[
                styles.optionButton,
                {
                  backgroundColor: selected ? theme.colors.surface.selected : theme.colors.surface.translucent,
                  borderColor: selected ? theme.colors.border.persona : theme.colors.border.default,
                },
              ]}
            >
              <Text variant="labelMedium" color={selected ? theme.colors.persona.core : theme.colors.text.secondary} numberOfLines={1} style={styles.optionText}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function MenuSection({ title, items, onNavigate }: { title: string; items: MenuItem[]; onNavigate: (route: string) => void }) {
  const theme = useActiveTheme();

  return (
    <View style={styles.section}>
      <Text variant="caption" color={theme.colors.text.muted} style={styles.sectionTitle}>
        {title}
      </Text>
      <View style={styles.sectionItems}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.label}
            accessibilityRole="button"
            accessibilityLabel={`Open ${item.label}`}
            onPress={() => onNavigate(item.route)}
            activeOpacity={0.78}
            style={[styles.item, item.featured && { borderColor: theme.colors.border.persona, backgroundColor: theme.colors.surface.selected }]}
          >
            <View style={[styles.itemIcon, { backgroundColor: item.featured ? theme.colors.persona.core : theme.colors.surface.subtle, borderColor: item.featured ? theme.colors.border.persona : theme.colors.border.default }]}> 
              {item.label === 'Profile' ? (
                <ProfileIcon color={item.featured ? theme.colors.text.inverse : theme.colors.text.secondary} size={18} />
              ) : (
                <Text variant="caption" color={item.featured ? theme.colors.text.inverse : theme.colors.text.secondary} style={styles.itemGlyph}>
                  {item.glyph}
                </Text>
              )}
            </View>
            <View style={styles.itemCopy}>
              <Text variant="labelLarge" color={theme.colors.text.primary} numberOfLines={1} style={styles.itemLabel}>
                {item.label}
              </Text>
              <Text variant="caption" color={theme.colors.text.muted} numberOfLines={1} style={styles.itemDescription}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function getInitials(displayName: string, username: string) {
  const source = displayName.trim() || username.trim() || 'Member';
  const parts = source.split(/\s+/).filter(Boolean);
  const initials = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : source.slice(0, 2);
  return initials.toUpperCase();
}

const styles = StyleSheet.create({
  layer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  rail: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 340,
    maxWidth: '88%',
    borderRightWidth: 1,
    zIndex: 60,
    elevation: 12,
  },
  railContent: {
    paddingTop: 22,
    paddingHorizontal: 18,
    paddingBottom: 30,
    gap: 16,
  },
  railHeader: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  railEyebrow: {
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBlock: {
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 64,
    height: 64,
  },
  avatarText: {
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  profileName: {
    marginTop: 10,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  username: {
    marginTop: 3,
    letterSpacing: 0.4,
  },
  premiumCard: {
    minHeight: 72,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  premiumIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    paddingHorizontal: 4,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  sectionItems: {
    gap: 6,
  },
  item: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  itemIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemGlyph: {
    fontSize: 9,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  itemCopy: {
    flex: 1,
    minWidth: 0,
  },
  itemLabel: {
    letterSpacing: 0.55,
    textTransform: 'uppercase',
  },
  itemDescription: {
    marginTop: 2,
    letterSpacing: 0.15,
  },
  settingsPanel: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    gap: 12,
  },
  controlGroup: {
    gap: 8,
  },
  controlLabel: {
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    minHeight: 36,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    letterSpacing: 0.55,
    textTransform: 'uppercase',
  },
});