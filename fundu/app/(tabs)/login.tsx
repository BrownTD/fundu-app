import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/community.png")} style={styles.image} />
      <Text style={styles.title}>Welcome to Fundu</Text>
      <Text style={styles.subtitle}>
        Create an account to start a campaign for your team, club, or league.
      </Text>

      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require("@/assets/images/google.png")}
          style={styles.buttonIcon}
        />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require("@/assets/images/apple.png")}
          style={styles.buttonIcon}
        />
        <Text style={styles.socialButtonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require("@/assets/images/facebook.jpg")}
          style={styles.buttonIcon}
        />
        <Text style={styles.socialButtonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.emailButton}>
        <Text style={styles.emailButtonText}>Sign up with Email</Text>
      </TouchableOpacity>

      {/* "Already a member?" and "Log in" on the same line */}
      <View style={styles.loginContainer}>
        <Text style={styles.alreadyMember}>Already a member?</Text>
        <TouchableOpacity>
          <Text style={styles.loginText}> Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#F1F1F1",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  buttonIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 10, // Reduced margin to bring the icon closer to text
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  emailButton: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#800080",
    alignItems: "center",
    marginVertical: 10,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  alreadyMember: {
    fontSize: 14,
    color: "gray",
  },
  loginText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
  },
});