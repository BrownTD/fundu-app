import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  hideOnRoutes?: string[];
};

const BackButton: React.FC<BackButtonProps> = ({
  style,
  iconSize = 28,
  iconColor = '#1A2A3A',
  hideOnRoutes = [],
}) => {
  const router = useRouter();
  const segments = useSegments();

  const shouldHide = segments.some((segment) => hideOnRoutes.includes(segment));
  if (shouldHide || !router.canGoBack()) return null;
  return (
    <TouchableOpacity onPress={() => router.back()} style={[styles.button, style]}>
      <Ionicons name="arrow-back" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
  },
});

export default BackButton;