import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, GestureResponderEvent } from "react-native";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState<string | null>("donor");

  const router = useRouter();
  const handleSelection = (role: string) => {
    setSelectedRole(role);
  };

  function handleGetStarted(event: GestureResponderEvent): void {
       if (selectedRole) {
         router.push("login");
       }
     }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/funduLogo.png')} style={styles.logo} />
      <Text style={styles.title}>Are you a donor or an organization member?</Text>

      <TouchableOpacity
        style={[styles.button, selectedRole === "donor" && styles.selected]}
        onPress={() => handleSelection("donor")}
      >
        {/* Show a check icon in the top-right if "donor" is selected */}
        {selectedRole === "donor" && (
          <Image
            source={require("@/assets/images/check.png")} 
            style={styles.check}
          />
        )}
        <Image source={require('@/assets/images/donationIcon.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Donor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedRole === "organization" && styles.selected]}
        onPress={() => handleSelection("organization")}
      >
        {/* Show a check icon in the top-right if "organization" is selected */}
        {selectedRole === "organization" && (
          <Image
            source={require("@/assets/images/check.png")} 
            style={styles.check}
          />
        )}
        <Image source={require('@/assets/images/orgMembers.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Organization Member</Text>
      </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    marginTop: -35,
    width: 160,
    height: 160,
    marginBottom: 0,
    resizeMode: "contain",
  },
  title: {
    fontSize: 23,
    marginBottom: 20,
    color: "#333",
    fontWeight: "bold",
    alignItems: "center",
  },
  button: {
    width: "80%",
    height: 160,
    paddingVertical: 10,
    borderWidth: .1,
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
    shadowOffset: { width: 10, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#000",
    marginLeft: 0,
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
    fontSize: 18,
    fontWeight: "semibold",
    color: "white",
  },
  disabled: {
    backgroundColor: "#D3D3D3",
  },
});
