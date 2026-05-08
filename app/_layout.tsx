import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useAppContext } from '../src/store/AppContext';
import '../src/locales/i18n';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../src/theme/theme';

void SplashScreen.preventAutoHideAsync();

const RootLayoutContent = () => {
  const { isInitializing, uiSettings } = useAppContext();
  const [fontsLoaded] = useFonts({
    'Sabana': require('../assets/fonts/Sabana.ttf'),
    'Verdana': require('../assets/fonts/Verdana.ttf'),
    'Verdana-Bold': require('../assets/fonts/Verdana-Bold.ttf'),
    'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
    'WorkSans-Italic': require('../assets/fonts/WorkSans-Italic.ttf'),
    'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
    'WorkSans-SemiBold': require('../assets/fonts/WorkSans-SemiBold.ttf'),
    'WorkSans-Bold': require('../assets/fonts/WorkSans-Bold.ttf'),
  });

  useEffect(() => {
    if (!isInitializing && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isInitializing]);

  if (isInitializing || !fontsLoaded) {
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
