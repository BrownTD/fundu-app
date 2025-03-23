import React, { useState } from "react";
import { View, Text, TouchableOpacity, Clipboard, StyleSheet } from "react-native";

const generateCampaignCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];
  const randomNumbers = Math.floor(100 + Math.random() * 900).toString();
  return randomLetters + randomNumbers;
};

export default function CampaignCodeScreen({ navigation }: any) {
  const [campaignCode] = useState(generateCampaignCode());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campaign Code</Text>
      <Text style={styles.description}>
        Your Campaign Code lets your team access progress and donation tools. Keep it safe and only share it with trusted members. Copy it down, you'll need it later.
      </Text>
      <Text style={styles.code}>{campaignCode}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
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
  code: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#800080",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});