import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

const generateCampaignCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];
  const randomNumbers = Math.floor(100 + Math.random() * 900).toString();
  return randomLetters + randomNumbers;
};

export default function CampaignCodeScreen() {
  const router = useRouter();
  const [campaignCode] = useState(generateCampaignCode().split("").join(" "));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organization Code</Text>
      <Text style={styles.description}>
        Your Organization Code lets your team access progress and donation dashboard. Keep it safe and only share it with trusted members. Copy it down, you'll need it later.
      </Text>

      <View style={styles.codeContainer}>
        {campaignCode.split(" ").map((char, index) => (
          <View key={index} style={styles.codeCircle}>
            <Text style={styles.codeChar}>{char}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("transitions/campaignSuccess")}
      >
        <Text style={styles.buttonText}>Got it!</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    gap: 10,
  },
  codeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  codeChar: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#CDF202",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
