import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { RegistrationProvider } from '../context/registrationContext'; // Wrap context

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load custom fonts
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide splash screen once fonts are ready
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Don't render anything until fonts are ready
  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RegistrationProvider>
        <Stack>
          {/* Tabs (Main App) */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Onboarding Flow */}
          <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/signup" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/signinScreen" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/managerpipe" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/orgOnboarding" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding/organizationCode" options={{ headerShown: false }} />

          {/* Transition Screens */}
          <Stack.Screen name="transitions/signupSuccess" options={{ headerShown: false }} />

          {/* Fallback / 404 */}
          <Stack.Screen name="+not-found" />
        </Stack>
      </RegistrationProvider>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}