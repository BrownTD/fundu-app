import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HapticTab from 'components/HapticTab';
import TabBarBackground from 'components/TabBarBackground.IOS';
import { RegistrationProvider } from 'context/registrationContext';

export default function TabLayout() {
  return (
    <RegistrationProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          animation: 'fade',
          tabBarActiveTintColor: '#6741FF',
          tabBarShowLabel: true,
          tabBarLabel: getTabLabel(route.name),
          tabBarIcon: ({ color, size }) => getTabIcon(route.name, color, size),
          tabBarButton: (props) => <HapticTab {...props} />,
          tabBarBackground: () => <TabBarBackground />,
          tabBarStyle: Platform.select({
            ios: {
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              position: 'absolute',
              elevation: 0,
              height: 75,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              overflow: 'hidden',
            },
            default: {},
          }),
        })}
      />
    </RegistrationProvider>
  );
}

function getTabLabel(name: string) {
  switch (name) {
    case 'dashboard':
      return 'Dashboard';
    case 'detailsScreen':
      return 'Campaigns';
    case 'organizationProfile':
      return 'Organization';
    case 'funding':
      return 'Funding';
    default:
      return '';
  }
}

function getTabIcon(name: string, color: string, size: number) {
  switch (name) {
    case 'dashboard':
      return <Ionicons name="bar-chart" size={size} color={color} />;
    case 'organizationProfile':
      return <Ionicons name="business" size={size} color={color} />;
    case 'detailsScreen':
      return <Ionicons name="megaphone" size={size} color={color} />;
    case 'funding':
      return <Ionicons name="cash" size={size} color={color} />;
    default:
      return <Ionicons name="ellipse-outline" size={size} color={color} />;
  }
}