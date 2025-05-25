import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

export default function Welcome() {
  const animationRef = useRef(null);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Lottie animation in background and loops */}
      <LottieView
        ref={animationRef}
        source={require('../assets/animations/Welcome.json')}
        autoPlay
        loop
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header Text */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to</Text>
        <Text style={styles.brandText}>
          Fund
          <Text style={styles.accent}>U</Text>
        </Text>
        <Text style={styles.subText}>
          Get access to the tools you need to manage, fundraise, and grow your organization.
        </Text>
      </View>

      {/* Login and Sign Up buttons at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/onboarding/signinScreen')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/roleSelect')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
    headerContainer: {
    position: 'absolute',
    top: 110,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    color: '#000',
    fontWeight: '600',
  },
  brandText: {
    fontSize: 40,
    color: '#000',
    fontWeight: '600',
    alignContent: 'center',
    justifyContent: 'center',
  },
  accent: {
    color: '#6741FF',
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: '#000',
    lineHeight: 26,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  signupButton: {
    backgroundColor: '#000',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});