import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useRouter } from "expo-router";
import Logo from "../assets/images/funduLogo";
import { useRegistration } from "../context/registrationContext";

// ---------------------------------------------------------
// RoleSelection — lets user choose between leader or member
// ---------------------------------------------------------
export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string>("manager"); // default to leader
  const router = useRouter();
  const { setRegistrationData } = useRegistration(); // pulls setter from context

  // Update local selection state
  const handleSelection = (role: string) => {
    setSelectedRole(role);
  };

  // Save role globally and redirect based on choice
  function handleGetStarted(event: GestureResponderEvent): void {
    setRegistrationData(prev => ({ ...prev, role: selectedRole }));

    if (selectedRole === "manager") {
      router.push("/onboarding/managerpipe");
    } else if (selectedRole === "member") {
      router.push("/onboarding/memberpipe");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Are you an organization leader or an organization member?
      </Text>

      {/* Manager selection button */}
      <TouchableOpacity
        style={[styles.button, selectedRole === "manager" && styles.selected]}
        onPress={() => handleSelection("manager")}
      >
        {selectedRole === "manager" && (
          <Image source={require("@/assets/images/check.png")} style={styles.check} />
        )}
        <Image source={require("@/assets/images/donationIcon.png")} style={styles.icon} />
        <Text style={styles.buttonText}>Organization Leader</Text>
      </TouchableOpacity>

      {/* Member selection button */}
      <TouchableOpacity
        style={[styles.button, selectedRole === "member" && styles.selected]}
        onPress={() => handleSelection("member")}
      >
        {selectedRole === "member" && (
          <Image source={require("@/assets/images/check.png")} style={styles.check} />
        )}
        <Image source={require("@/assets/images/orgMembers.png")} style={styles.icon} />
        <Text style={styles.buttonText}>Organization Member</Text>
      </TouchableOpacity>

      {/* Continue button */}
      <TouchableOpacity
        style={[styles.getStartedButton, !selectedRole && styles.disabled]}
        onPress={handleGetStarted}
        disabled={!selectedRole}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 23,
    marginBottom: 20,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: "80%",
    height: 160,
    paddingVertical: 10,
    borderWidth: 0.1,
    borderColor: "#333",
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  },
  check: {
    position: "absolute",
    top: 10,
    right: 100,
    width: 24,
    height: 30,
    resizeMode: "contain",
  },
  selected: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  getStartedButton: {
    marginTop: 20,
    width: "80%",
    paddingVertical: 15,
    borderRadius: 50,
    backgroundColor: "#6741FF",
    alignItems: "center",
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "white",
  },
  disabled: {
    backgroundColor: "#D3D3D3",
  },
});