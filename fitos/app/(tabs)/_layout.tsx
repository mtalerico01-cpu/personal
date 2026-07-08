import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../src/shared/components/ui/Text';
import { useActiveTheme } from '../../src/shared/theme/useActiveTheme';
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

const tabConfig: Record<string, { label: string; Icon: ComponentType<NavIconProps> }> = {
  index: { label: 'Today', Icon: DashboardIcon },
  nutrition: { label: 'Nutrition', Icon: NutritionIcon },
  coach: { label: 'Coach', Icon: CoachIcon },
  training: { label: 'Training', Icon: TrainingIcon },
  progress: { label: 'Progress', Icon: ProgressIcon },
};

function TabIcon({ label, Icon, focused }: TabIconProps) {
  const theme = useActiveTheme();
  const activeColor = theme.colors.persona.core;
  const dark = theme.mode === 'dark';
  // Light mode: near-black icons so they read against a pale glass background.
  // Dark mode: near-white with slight opacity.
  const inactiveColor = dark ? 'rgba(245,246,248,0.72)' : 'rgba(18,18,28,0.72)';

  return (
    <View
      style={[
        styles.tabPill,
        focused && {
          backgroundColor: dark ? 'rgba(167,255,0,0.13)' : 'rgba(167,255,0,0.18)',
          borderColor: dark ? 'rgba(167,255,0,0.58)' : 'rgba(100,180,0,0.55)',
        },
      ]}
    >
      {focused ? (
        <LinearGradient
          pointerEvents="none"
          colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.02)', 'rgba(0,0,0,0.08)']}
          locations={[0, 0.42, 1]}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <Icon
        color={focused ? activeColor : inactiveColor}
        size={focused ? 23 : 22}
      />
      <Text
        variant="labelMedium"
        color={focused ? activeColor : inactiveColor}
        numberOfLines={1}
        style={[styles.tabLabel, { opacity: focused ? 1 : 0.68 }]}
      >
        {label}
      </Text>
    </View>
  );
}

function TabBarMaterial() {
  const theme = useActiveTheme();
  const dark = theme.mode === 'dark';

  // On web the outer glassBar shell already carries CSS backdrop-filter/blur.
  // Rendering BlurView + tint layers here creates an opaque fill that hides
  // underlying content. Skip all opaque layers on web so the shell's
  // backdrop-filter is the only thing drawing.
  if (Platform.OS === 'web') {
    // Pure convex glass — no fills at all. The shell's backdrop-filter
    // does the only blurring. We only render the inset rim highlights here
    // to suggest a curved glass edge.
    return (
      <View style={[styles.materialClip, { overflow: 'hidden' }]}>
        {/* No gradients, no fills — convex edge is handled by glassBar boxShadow */}
        <View
          pointerEvents="none"
          style={[
            styles.materialInnerStroke,
            { borderColor: dark ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.28)' },
          ]}
        />
      </View>
    );
  }

  // Native: use BlurView for actual platform blur.
  return (
    <View style={styles.materialClip}>
      <BlurView intensity={96} tint="dark" style={StyleSheet.absoluteFill} />
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(18,14,28,0.22)' }]}
      />
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(255,255,255,0.32)', 'rgba(255,255,255,0.08)', 'rgba(14,8,24,0.34)']}
        locations={[0, 0.44, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        style={[styles.materialInnerStroke, { borderColor: 'rgba(255,255,255,0.22)' }]}
      />
    </View>
  );
}

function GlassTabBar({ state, descriptors, navigation }: any) {
  const theme = useActiveTheme();
  const dark = theme.mode === 'dark';
  const visibleRoutes = state.routes.filter((route: { key: string; name: string }) => descriptors[route.key]?.options?.href !== null && tabConfig[route.name]);
  const glassThemeStyle = Platform.OS === 'web'
    ? {
        borderColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.24)',
        boxShadow: dark
          ? [
              '0 14px 42px rgba(0,0,0,0.38)',
              '0 2px 10px rgba(0,0,0,0.24)',
              'inset 0 1px 1px rgba(255,255,255,0.18)',
              'inset 1px 0 1px rgba(255,255,255,0.06)',
              'inset -1px 0 1px rgba(255,255,255,0.06)',
              'inset 0 -1px 2px rgba(0,0,0,0.42)',
            ].join(', ')
          : [
              '0 12px 40px rgba(0,0,0,0.16)',
              '0 2px 8px rgba(0,0,0,0.08)',
              'inset 0 2px 3px rgba(255,255,255,0.72)',
              'inset 2px 0 3px rgba(255,255,255,0.22)',
              'inset -2px 0 3px rgba(255,255,255,0.22)',
              'inset 0 -2px 3px rgba(0,0,0,0.10)',
            ].join(', '),
      }
    : {
        borderColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.24)',
      };

  return (
    <View style={styles.tabBarShell} pointerEvents="box-none">
      <View
        accessibilityRole="tablist"
        style={[styles.glassBar, glassThemeStyle]}
      >
        <TabBarMaterial />
        <View style={styles.tabRow}>
          {visibleRoutes.map((route: { key: string; name: string; params?: object }) => {
            const focused = state.routes[state.index]?.key === route.key;
            const config = tabConfig[route.name];

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityState={focused ? { selected: true } : {}}
                accessibilityLabel={config.label}
                onPress={onPress}
                style={styles.tabCell}
              >
                <TabIcon label={config.label} Icon={config.Icon} focused={focused} />
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="coach"
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Today" Icon={DashboardIcon} focused={focused} />
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
        name="coach"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Coach" Icon={CoachIcon} focused={focused} />
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
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarShell: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 10 : 8,
  },
  glassBar: {
    width: '100%',
    maxWidth: 356,
    height: Platform.OS === 'ios' ? 82 : 78,
    borderWidth: 1,
    borderRadius: 38,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    elevation: 24,
    ...(Platform.OS === 'web'
      ? ({
          // Minimal blur — just enough to soften pixel edges without milking colors.
          // brightness > 1 gives the lens-magnification illusion (glass brightens center).
          backdropFilter: 'blur(6px) saturate(140%) brightness(1.06)',
          WebkitBackdropFilter: 'blur(6px) saturate(140%) brightness(1.06)',
          // Layered inset shadows simulate a convex glass rim:
          //  1. Bright top edge  — overhead light hitting the curved top surface
          //  2. Soft left/right  — light catching the curved side edges
          //  3. Dark bottom edge — glass curves away from the light source
          //  4. Outer drop shadow — physical lift off the screen
          boxShadow: [
            '0 12px 40px rgba(0,0,0,0.16)',       // outer lift
            '0 2px 8px rgba(0,0,0,0.08)',          // close ambient
            'inset 0 2px 3px rgba(255,255,255,0.72)',  // top specular
            'inset 2px 0 3px rgba(255,255,255,0.22)',  // left rim
            'inset -2px 0 3px rgba(255,255,255,0.22)', // right rim
            'inset 0 -2px 3px rgba(0,0,0,0.10)',       // bottom dimming
          ].join(', '),
          backgroundColor: 'transparent',
        } as object)
      : {
          shadowColor: '#000',
          shadowOpacity: 0.34,
          shadowRadius: 28,
          shadowOffset: { width: 0, height: 14 },
        }),
  },
  tabRow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingTop: 9,
    paddingBottom: Platform.OS === 'ios' ? 13 : 11,
  },
  materialClip: {
    flex: 1,
    borderRadius: 36,
    overflow: 'hidden',
  },
  materialInnerStroke: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 36,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tabCell: {
    flex: 1,
    minWidth: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? ({
          outlineStyle: 'none',
        } as object)
      : {}),
  },
  tabPill: {
    position: 'relative',
    width: 58,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 4,
    overflow: 'hidden',
  },
  tabLabel: {
    fontSize: 7.5,
    letterSpacing: 0.25,
    textTransform: 'uppercase',
  },
});
