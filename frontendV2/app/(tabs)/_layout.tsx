import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground.ios';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {/* Visible Tabs */}
      <Tabs.Screen
        name="homeScreen"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="organizationProfile"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="profileDetails"
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />

      {/* Hidden Screens */}
      <Tabs.Screen
        name="campaignQrCode"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="campaignCode"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="campaignDetails"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="campaignSetup"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="customGift"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="detailsScreen"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="donationSuccess"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="donorProfile"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="historyScreen"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="login"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="paymentScreen"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="selectGift"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="signinScreen"
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="signup"
        options={{ tabBarStyle: { display: 'none' } }}
      />
    </Tabs>
    
  );
}

