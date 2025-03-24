import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function DonationSuccess() {
  const navigation = useNavigation();
  const route = useRoute();
  const { amount } = route.params || { amount: "0" };
  const now = new Date();
  const formattedDateTime = `${now.toLocaleDateString()} · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;


  return (
    <View style={styles.container}>

      {/* Success Icon */}
      <View style={styles.successIconContainer}>
        <Ionicons name="checkmark-circle" size={80} color="#CDF202" />
      </View>

      {/* Display the donation amount */}
      <Text style={styles.amountText}>${amount}</Text>
      <Text style={styles.successMessage}>Transfer Success</Text>
      <Text style={styles.successSubtext}>
        Your Gift has been successfully sent to CLT CLub Baseball.
      </Text>

      {/* Recipient Info */}
      <View style={styles.recipientContainer}>
        <Image
          source={require("../../assets/images/organization/club_baseball.jpeg")}
          style={styles.orgImage}
        />
        <View>
          <Text style={styles.orgName}>CLT Club Baseball</Text>
          <Text style={styles.orgDetails}>{formattedDateTime}</Text>
        </View>
      </View>

      {/* Go Home Button */}
      <TouchableOpacity
        style={styles.goHomeButton}
        onPress={() => navigation.navigate("homeScreen")}
      >
        <Text style={styles.goHomeText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  amountText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  successSubtext: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  recipientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  orgImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  orgName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orgDetails: {
    fontSize: 12,
    color: "gray",
  },
  goHomeButton: {
    backgroundColor: "#6741FF",
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 25,
  },
  goHomeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal",
  },
});
