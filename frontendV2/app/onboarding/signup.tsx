import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useRegistration } from "../../context/registrationContext"; // Import global registration context
import {router} from "expo-router";

import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { registrationData, setRegistrationData } = useRegistration();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setRegistrationData((prev) => ({ ...prev, [field]: value }));
  };

  const isValidPassword = (password: string) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= 8 &&
      [hasLowercase, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean)
        .length >= 3
    );
  };

  const handleSignUp = async () => {
    const { firstName, lastName, email, password, role } = registrationData;
  
    if (!firstName?.trim()) {
      Alert.alert("Missing First Name", "Please enter your first name.");
      return;
    }
  
    if (!lastName?.trim()) {
      Alert.alert("Missing Last Name", "Please enter your last name.");
      return;
    }
  
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
  
    if (!password) {
      Alert.alert("Missing Password", "Password cannot be empty.");
      return;
    }
  
    if (!isValidPassword(password)) {
      Alert.alert(
        "Weak Password",
        "Your password must be at least 8 characters and include at least 3 of the following: uppercase, lowercase, number, special character."
      );
      return;
    }
  
    try {
      const response = await fetch("https://funduhub.com/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          role,
        }),
      });
  
      const data = await response.json();
      console.log("Signup response payload:", data);
      if (response.ok) {
        const accessToken = data.access;
  
        // Save access token
        await AsyncStorage.setItem("accessToken", accessToken);
  
        // Update context with user_id from backend response
        setRegistrationData((prev) => ({
          ...prev,
          userId: data.user.user_id,
        }));
  
        router.push("/transitions/signupSuccess");
      } else {
        Alert.alert("Registration Failed", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Network Error", "Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Input Fields */}
      {/* First Name */}
      <Text style={styles.inputLabel}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        placeholderTextColor="gray"
        value={registrationData.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
      />

      {/* Last Name */}
      <Text style={styles.inputLabel}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        placeholderTextColor="gray"
        value={registrationData.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
      />

      {/* Email */}
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        placeholderTextColor="gray"
        keyboardType="email-address"
        value={registrationData.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      {/* Password */}
      <Text style={styles.inputLabel}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password"
          placeholderTextColor="gray"
          secureTextEntry={!showPassword}
          value={registrationData.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Password Requirements */}
      <Text style={styles.passwordRequirement}>8+ characters*</Text>
      <Text style={styles.passwordCriteria}>
        An 8-character password is required with at least 3 of the following:
      </Text>
      <Text style={styles.bulletPoint}>• 1 lowercase character</Text>
      <Text style={styles.bulletPoint}>• 1 uppercase character</Text>
      <Text style={styles.bulletPoint}>• 1 number</Text>
      <Text style={styles.bulletPoint}>• 1 special character</Text>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already a member? Log In */}
      <View style={styles.loginContainer}>
        <Text style={styles.alreadySubscriber}>Already a member? </Text>
        <TouchableOpacity onPress={() => router.push("/onboarding/signinScreen")}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    );
  }

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "regular",
  },
  placeholder: {
    width: 34,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  passwordFocused: {
    borderColor: "#800080",
    shadowColor: "#800080",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 5,
    borderRadius: 10,
    fontSize: 16,
    color: "#000",
  },
  eyeIcon: {
    padding: 10,
  },
  passwordRequirement: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: "bold",
    color: "#6741FF",
    marginBottom: 5,
  },
  passwordCriteria: {
    marginTop: 20,
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
  },
  signUpButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 50,
    backgroundColor: "#6741FF",
    alignItems: "center",
    marginTop: 50,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "regular",
    color: "white",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  alreadySubscriber: {
    fontSize: 14,
    color: "gray",
    marginLeft: 85,
  },
  loginText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
    marginLeft: 5,
  },
});

