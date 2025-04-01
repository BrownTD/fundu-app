import React from 'react';
import { Animated, StyleSheet, Text, ViewStyle } from 'react-native';

type Props = {
  title: string;
  value: string;
  bg: any;
  textColor: any;
  style?: ViewStyle;
  animatedStyle?: any;
};

export default function KPICard({
  title,
  value,
  bg,
  textColor,
  style,
  animatedStyle,
}: Props) {
  return (
    <Animated.View style={[styles.card, { backgroundColor: bg }, style, animatedStyle]}>
      <Animated.Text style={[styles.value, { color: textColor }]}>
        {value}
      </Animated.Text>
      <Animated.Text style={[styles.title, { color: textColor }]}>
        {title}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
  },
});