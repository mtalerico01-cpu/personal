import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useActiveTheme } from '../src/shared/theme/useActiveTheme';

export default function RootLayout() {
  const theme = useActiveTheme();

  return (
    <GestureHandlerRootView style={[styles.root, { backgroundColor: theme.colors.background.primary }]}> 
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
