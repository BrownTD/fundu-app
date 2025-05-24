import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import OnboardingArt from 'assets/images/onboarding.svg';
import { router } from "expo-router";

export default function SignupSuccessScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/onboarding/orgOnboarding");
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInDown" duration={1000} useNativeDriver>
        <OnboardingArt width={400} height={400} />
      </Animatable.View>
      <Animatable.Text animation="fadeIn" delay={1000} style={styles.title}>
        Account Created Successfully!
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" delay={1200} style={styles.subtitle}>
        Now let’s create your organization’s page
      </Animatable.Text>
      <ActivityIndicator size="large" color="#6741FF" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
});