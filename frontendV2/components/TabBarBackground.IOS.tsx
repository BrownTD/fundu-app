import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TabBarBackground() {
  return (
    <BlurView
      intensity={90}              // more intense = more blur
      tint="light"                // try "default" or "extraLight" if needed
      style={StyleSheet.absoluteFill}
    >
      <View style={styles.overlay} />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.1)',

    // optional extra glass effect
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});