import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Text } from '../../src/shared/components/ui/Text';
import { colors } from '../../src/shared/theme/colors';
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
  return (
    <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
      <Icon
        color={focused ? colors.tabBarActive : colors.tabBarInactive}
        size={22}
      />
      <Text
        variant="labelMedium"
        color={focused ? colors.tabBarActive : colors.tabBarInactive}
        style={[styles.tabLabel, { opacity: focused ? 1 : 0.5 }]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="coach"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
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
    gap: 4,
  },
  tabItemFocused: {
    backgroundColor: colors.accentMuted,
  },
  tabLabel: {
    fontSize: 9,
    letterSpacing: 0.4,
  },
});
