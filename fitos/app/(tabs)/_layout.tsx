import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from '../../src/shared/components/ui/Text';
import { colors } from '../../src/shared/theme/colors';
import { radius } from '../../src/shared/theme/spacing';

interface TabIconProps {
  label: string;
  emoji: string;
  focused: boolean;
}

function TabIcon({ label, emoji, focused }: TabIconProps) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
      <Text style={[styles.emoji, focused && styles.emojiFocused]}>{emoji}</Text>
      <Text
        variant="labelMedium"
        color={focused ? colors.tabBarActive : colors.tabBarInactive}
        style={styles.tabLabel}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Today" emoji="⚡" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Nutrition" emoji="🥗" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Training" emoji="🏋️" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Progress" emoji="📈" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBarBackground,
    borderTopColor: colors.tabBarBorder,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: Platform.OS === 'ios' ? 88 : 64,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.lg,
    gap: 2,
  },
  tabItemFocused: {
    backgroundColor: colors.accentMuted,
  },
  emoji: {
    fontSize: 18,
    lineHeight: 22,
    opacity: 0.5,
  },
  emojiFocused: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 9,
    letterSpacing: 0.4,
  },
});
