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
  const router = useRouter();

// Store token in SecureStore
const saveToken = async (key: string, value: any) => {
  try {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
}
  
const handleSignIn = async () => {
  try {
    const response = await fetch('https://www.funduhub.com/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // STEP 1: Grab raw response
    const rawText = await response.text();
    console.log('Raw response from server:', rawText);

    // STEP 2: Check if it’s JSON
    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Server did not return JSON. Check backend URL or error.');
    }

    // STEP 3: Parse JSON
    const data = JSON.parse(rawText);

    if (!response.ok) {
      Alert.alert('Login Failed', data.detail || 'Invalid credentials');
      return;
    }

    // STEP 4: Save tokens as strings
    await saveToken('accessToken', String(data.access));
    await saveToken('refreshToken', String(data.refresh));

    router.push('/(tabs)/dashboard');
  } catch (err: any) {
    Alert.alert('Login Error', err.message || 'Something went wrong');
  }
};

  return (
    <View style={styles.container}>

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
        <TouchableOpacity onPress={() => router.push("onboarding/managerpipe")}>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 200,
    textAlign: "center",
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
    width: "80%",
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "#6741FF", // Updated button color
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  signInText: {
    fontSize: 16,
    fontWeight: "semibold",
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