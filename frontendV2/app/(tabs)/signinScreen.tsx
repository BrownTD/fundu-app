import React, { useState } from "react";
import { useRouter } from 'expo-router';
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [campaignCode, setCampaignCode] = useState("");
  const [secureText, setSecureText] = useState(true);
  //const router = useRouter();

// Store token in SecureStore
const saveToken = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Failed to save token:", error);
  }
}
  
  const handleSignIn = async () => {
    try {
      const response = await fetch('https://www.funduhub.com/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        Alert.alert('Login Failed', data.detail || 'Invalid credentials');
        return;
      }
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.detail || 'Login failed');
      }
  
      await SecureStore.setItemAsync('accessToken', json.access);
      await SecureStore.setItemAsync('refreshToken', json.refresh);
  
      router.push('dashboard'); // Navigate to dashboard screen
    } catch (err) {
      Alert.alert('Login Error', err.message);
    }
  };
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.push("login")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Welcome to FundU</Text>
      <Text style={styles.subtitle}>
        Sign into your account to view your organization, club, or league's campaigns.
      </Text>

      {/* Email Input */}
      <Text style={styles.inputLabel}>Email</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          placeholderTextColor="gray"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <Text style={styles.inputLabel}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="gray"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons name={secureText ? "eye-off" : "eye"} size={20} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => 
          Alert.alert(
          "Email Sent", 
          "An email with instructions to reset your password has been sent. Please check your inbox.")}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Campaign Code Input */}
      <Text style={styles.inputLabel}>Campaign Code</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Code"
          placeholderTextColor="gray"
          autoCapitalize="characters"
          value={campaignCode}
          onChangeText={setCampaignCode}
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => router.push("login")}>
          <Text style={styles.signUpLink}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 10,
    marginTop:80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 80,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center"
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginRight: 10,
  },
  forgotPassword: {
    color: "blue",
    marginTop: 10,
    textAlign: "right",
  },
  signInButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 50,
    backgroundColor: "#6741FF",
    alignItems: "center",
    marginTop: 20,
  },
  signInText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
    color: "gray",
  },
  signUpLink: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
});