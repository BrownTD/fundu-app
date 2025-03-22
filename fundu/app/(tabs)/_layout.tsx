import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.badge.plus" color={color} />,
        }}
        />
        <Tabs.Screen
          name="campaignSetup"
          options={{
            title: 'Capmaign Setup',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.badge.plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="campaignDetails"
          options={{
            title: 'Capmaign Details',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.badge.plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="campaignCode"
          options={{
            title: 'Capmaign Code',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.badge.plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="verificationCodeScreen"
          options={{
            title: 'Verification Code Screen',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.badge.plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="homeScreen"
          options={{
            title: 'Home Screen',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.badge.plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="organizationProfile"
          options={{
            title: 'Organization Profile',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.badge.plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="detailsScreen"
          options={{
            title: 'Details Screen',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.badge.plus" color={color} />,
          }}
        />
    </Tabs>
  );
}
