import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <LottieView
          source={require('../assets/animations/notFound.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <View style={styles.overlay}>
          <Text style={styles.textE}>Error</Text>
          <Text style={styles.textO404}>404</Text>
          <Text style={styles.textSorry}>Sorry, the page not found</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '20%', // Adjust this value as needed
    paddingHorizontal: 20,
  },
  textO404: {
    fontSize: 45,
    fontWeight: '800',
    color: '#1A2A3A',
    textAlign: 'center',
    marginVertical: 0,
    paddingLeft: 20,
  },
  textE: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1A2A3A',
    textAlign: 'center',
    marginVertical: 0,
    marginTop: 180,
    paddingLeft: 20,
  },
  textSorry: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2A3A',
    textAlign: 'center',
    marginVertical: 285,
  },
});