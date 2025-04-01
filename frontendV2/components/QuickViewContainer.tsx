import React, { useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import ChartCarousel from './ChartCarousel';
import TeamPerformanceSection from './TeamPerformanceSection';

export default function QuickViewContainer({ textColor }: { textColor: string }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.wrapper}>
      <ChartCarousel scrollX={scrollX} />
      <TeamPerformanceSection textColor={textColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 0,
    width: '100%',
  },
});