import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, GestureResponderEvent } from "react-native";
import { useNavigation } from "expo-router";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSelection = (role: string) => {
    setSelectedRole(role);
  };

  function handleGetStarted(event: GestureResponderEvent): void {
    if (selectedRole) {
      navigation.navigate("explore" as never);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fundu!</Text>
      <Image source={require('@/assets/images/funduLogo.png')} style={styles.logo} />
      <Text style={styles.title}>Are you a donor or a member?</Text>

      <TouchableOpacity
        style={[styles.button, selectedRole === "donor" && styles.selected]}
        onPress={() => handleSelection("donor")}
      >
        <Image source={require('@/assets/images/donationIcon.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Donor</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedRole === "organization" && styles.selected]}
        onPress={() => handleSelection("organization")}
      >
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
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    width: "80%",
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: "#800080",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "#E6CCE6",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#800080",
    marginLeft: 10,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  getStartedButton: {
    marginTop: 20,
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#800080",
    alignItems: "center",
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  disabled: {
    backgroundColor: "#D3D3D3",
  },
});
