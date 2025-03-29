import { useRouter } from 'expo-router';
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top portion with the community.png image */}
      <View style={styles.topContainer}>
        <Image
          source={require("@/assets/images/community.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* White card with rounded corners containing sign-in options */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to FundU</Text>
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

        <TouchableOpacity style={styles.emailButton} onPress={() => router.push("signup")}>
          <Text style={styles.emailButtonText}>Sign up with Email</Text>
        </TouchableOpacity>


        {/* "Already a member?" and "Log in" on the same line */}
        <View style={styles.loginContainer}>
          <Text style={styles.alreadyMember}>Already a member?</Text>
          <TouchableOpacity onPress={() => router.push("signinScreen")}>
            <Text style={styles.loginText}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Styles updated to show the top image only in the upper half,
// and place the sign-in card below it.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // fallback background
  },
  topContainer: {
    width: "100%",
    height: "40%", // Approx. top 40% for the image
    overflow: "hidden", // Ensures the image doesn't bleed out
  },
  image: {
    marginTop: 80,
    width: "100%",
    height: "80%",
  },
  card: {
    flex: 1,
    marginTop: -30, // Slight overlap with the image
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
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
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
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
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#333",
    textAlign: "center",
  },
  emailButton: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#6741FF", // Updated button color
    alignItems: "center",
    marginVertical: 10,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: "semibold",
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
