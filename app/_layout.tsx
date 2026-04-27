import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useAppContext } from '../src/store/AppContext';
import '../src/locales/i18n';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../src/theme/theme';

void SplashScreen.preventAutoHideAsync();

const RootLayoutContent = () => {
  const { isInitializing, uiSettings } = useAppContext();

  useEffect(() => {
    if (!isInitializing) {
      SplashScreen.hideAsync();
    }
  }, [isInitializing]);

  if (isInitializing) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar
        style="dark"
        translucent={uiSettings.extendIntoStatusBar}
        backgroundColor={
          uiSettings.extendIntoStatusBar ? 'transparent' : theme.colors.background
        }
      />
    </>
  );
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RootLayoutContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}
