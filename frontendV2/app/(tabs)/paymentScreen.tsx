import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function PaymentScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");

  const validatePayment = () => {
    // Basic validations
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      Alert.alert("Invalid Card Number", "Card number length should be 13-19 digits.");
      return;
    }
    if (cvv.length < 3 || cvv.length > 4) {
      Alert.alert("Invalid CVV", "CVV should be 3 or 4 digits.");
      return;
    }
    if (zip.length !== 5) {
      Alert.alert("Invalid ZIP", "ZIP code must be 5 digits.");
      return;
    }
    // Expiry check (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      Alert.alert("Invalid Expiry", "Expiry should be in MM/YY format.");
      return;
    }
    const [mm, yy] = expiry.split("/");
    const month = parseInt(mm, 10);
    const year = parseInt(yy, 10) + 2000;
    if (month < 1 || month > 12) {
      Alert.alert("Invalid Expiry", "Month must be between 01 and 12.");
      return;
    }
    const now = new Date();
    const expiryDate = new Date(year, month);
    if (expiryDate < now) {
      Alert.alert("Expired Card", "Please use a valid, non-expired card.");
      return;
    }

    // If all checks pass, navigate to donationSuccess
    router.push("donationSuccess");
  };

  // Placeholder for Apple/Google/PayPal flows
  const handleApplePay = () => Alert.alert("Apple Pay", "Apple Pay flow goes here.");
  const handleGooglePay = () => Alert.alert("Google Pay", "Google Pay flow goes here.");
  const handlePayPal = () => Alert.alert("PayPal", "PayPal flow goes here.");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>

      {/* Basic card fields */}
      <View style={styles.field}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Doe"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="4242 4242 4242 4242"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Expiry (MM/YY)</Text>
        <TextInput
          style={styles.input}
          placeholder="12/25"
          value={expiry}
          onChangeText={setExpiry}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>CVV</Text>
        <TextInput
          style={styles.input}
          placeholder="123"
          keyboardType="numeric"
          value={cvv}
          onChangeText={setCvv}
          secureTextEntry
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Zip Code</Text>
        <TextInput
          style={styles.input}
          placeholder="12345"
          keyboardType="numeric"
          value={zip}
          onChangeText={setZip}
        />
      </View>

      {/* Alternate Payment Options */}
      <Text style={styles.altPayTitle}>Or Pay with:</Text>
      <View style={styles.altPayContainer}>
        <TouchableOpacity style={[styles.altPayButton, styles.applePay]} onPress={handleApplePay}>
          <Text style={styles.altPayText}>Apple Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.altPayButton, styles.googlePay]} onPress={handleGooglePay}>
          <Text style={styles.altPayText}>Google Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.altPayButton, styles.payPal]} onPress={handlePayPal}>
          <Text style={styles.altPayText}>PayPal</Text>
        </TouchableOpacity>
      </View>

      {/* Standard Pay Now Button */}
      <TouchableOpacity style={styles.payNowButton} onPress={validatePayment}>
        <Text style={styles.payNowText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 80,
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "normal", // or "regular" if your font supports it
    textAlign: "center",
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  altPayTitle: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  altPayContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  altPayButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  altPayText: {
    color: "#fff",
    fontSize: 14,
  },
  applePay: {
    backgroundColor: "#000",
  },
  googlePay: {
    backgroundColor: "#4285F4",
  },
  payPal: {
    backgroundColor: "#003087",
  },
  payNowButton: {
    backgroundColor: "#6741FF",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  payNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal",
  },
});
