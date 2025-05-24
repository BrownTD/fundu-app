import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function Penny() {
  return (
    <View style={styles.container} pointerEvents="none">
      <LottieView
        source={require('../assets/animations/pennyWatermarked.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    width: width * 0.3, // 30% of screen width
    height: width * 0.3,
    zIndex: 1000,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});