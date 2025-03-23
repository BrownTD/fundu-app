import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  CampaignSetup: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>; 

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Password validation function
  const isValidPassword = (password: string) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && 
           [hasLowercase, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length >= 3;
  };

  const handleSignUp = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert("Error", "Password must be at least 8 characters and include at least 3 of the required conditions.");
      return;
    }
    
    // Navigate to CampaignSetupScreen if inputs are valid
    navigation.navigate("CampaignSetup");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Name Input */}
      <Text style={styles.inputLabel}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        placeholderTextColor="gray"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <Text style={styles.inputLabel}>Password</Text>
      <View 
        style={[
          styles.passwordContainer, 
          isFocused && styles.passwordFocused
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password"
          placeholderTextColor="gray"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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

      {/* Already a subscriber? Log In */}
      <View style={styles.loginContainer}>
        <Text style={styles.alreadySubscriber}>Already a subscriber? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
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
    fontWeight: "bold",
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#800080",
    marginBottom: 5,
  },
  passwordCriteria: {
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
    borderRadius: 10,
    backgroundColor: "#800080",
    alignItems: "center",
    marginTop: 20,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "bold",
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
  },
  loginText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#800080",
    marginLeft: 5,
  },
});

