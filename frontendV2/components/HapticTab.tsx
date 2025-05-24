// frontendV2/components/HapticTab.tsx
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import React from 'react';

export default function HapticTab({ onPress, children, ...rest }: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...rest}
      onPressIn={(ev) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        rest.onPressIn?.(ev);
      }}
      onPress={onPress}
      style={rest.style}
    >
      {children}
    </PlatformPressable>
  );
}
