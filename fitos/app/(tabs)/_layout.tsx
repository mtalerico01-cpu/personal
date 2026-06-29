import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from '../../src/shared/components/ui/Text';
import { colors } from '../../src/shared/theme/colors';
import { useActiveTheme } from '../../src/shared/theme/useActiveTheme';
import { radius } from '../../src/shared/theme/spacing';
import {
  CoachIcon,
  DashboardIcon,
  NutritionIcon,
  TrainingIcon,
  ProgressIcon,
} from '../../src/shared/components/ui/NavIcon';
import type { ComponentType } from 'react';

interface NavIconProps {
  color: string;
  size?: number;
}

interface TabIconProps {
  label: string;
  Icon: ComponentType<NavIconProps>;
  focused: boolean;
}

function TabIcon({ label, Icon, focused }: TabIconProps) {
  const theme = useActiveTheme();
  const activeColor = theme.colors.persona.core;
  const inactiveColor = theme.colors.text.muted;

  return (
    <View
      style={[
        styles.tabItem,
        focused && {
          backgroundColor: theme.colors.surface.selected,
          borderColor: theme.colors.border.subtle,
        },
      ]}
    >
      <Icon
        color={focused ? activeColor : inactiveColor}
        size={22}
      />
      <Text
        variant="labelMedium"
        color={focused ? activeColor : inactiveColor}
        style={[styles.tabLabel, { opacity: focused ? 1 : 0.5 }]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const theme = useActiveTheme();

  return (
    <Tabs
      initialRouteName="coach"
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: theme.colors.background.secondary,
            borderTopColor: theme.colors.border.subtle,
          },
        ],
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="coach"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Coach" Icon={CoachIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Dashboard" Icon={DashboardIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Nutrition" Icon={NutritionIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Training" Icon={TrainingIcon} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Progress" Icon={ProgressIcon} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
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
    gap: 4,
  },
  tabItemFocused: {},
  tabLabel: {
    fontSize: 9,
    letterSpacing: 0.4,
  },
});
