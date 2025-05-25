// app/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import Welcome from './welcome'; // directly render your main screen

SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const animationRef = useRef(null);
  const [showLottie, setShowLottie] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync(); 
      setShowLottie(false); // hide the Lottie after animation
    }, 4000); // match your animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Next screen is already rendered */}
      <Welcome />

      {/* Lottie animation overlays it */}
      {showLottie && (
        <LottieView
          ref={animationRef}
          source={require('../assets/animations/splashScreen.json')}
          autoPlay
          loop={false}
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // match your Lottie background
  },
});