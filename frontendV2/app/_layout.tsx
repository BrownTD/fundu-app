import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import BackButton from '../components/backButton';
import { useRouter, useSegments } from 'expo-router';

import { useColorScheme } from '../hooks/useColorScheme';
import { RegistrationProvider } from '../context/registrationContext';
import { AuthProvider } from '../context/authContext';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RegistrationProvider>
        <BackButton
        style={{ position: 'absolute', top: 65, left: 20, zIndex: 9999 }}
        hideOnRoutes={['index', 'welcome', '(tabs)','avatarSelect']} // optional enhancement
      />

        <Stack screenOptions={{ headerShown: false }}>

          <Stack.Screen name="index" />
          <Stack.Screen name="welcome"/>
          <Stack.Screen name="roleSelect"/>
          <Stack.Screen name="onboarding/managerpipe"  />
          <Stack.Screen name="onboarding/signup" />
          <Stack.Screen name="transitions/signupSuccess"  />
          <Stack.Screen name="onboarding/orgOnboarding" />
          <Stack.Screen name="onboarding/campaignDetails" />
          <Stack.Screen name="transitions/campaignSuccess"  />
          <Stack.Screen name="onboarding/organizationCode"  />
          <Stack.Screen name="onboarding/signinScreen"  />
          <Stack.Screen name="payments/addCard"  />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="profileDetails" options={{ animation: 'slide_from_bottom',  }} />
          <Stack.Screen name="avatarSelect" options={{ animation: 'slide_from_bottom',  }} />
        </Stack>
      </RegistrationProvider>

      <StatusBar style="auto" />
    </ThemeProvider>
    </AuthProvider>
  );
}