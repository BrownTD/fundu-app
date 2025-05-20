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
import { MaterialIcons } from '@expo/vector-icons';


export default function PaymentScreen() {
  const router = useRouter();

  const [nameonCard, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");
  const [isDefault, setIsDefault] = useState(false);

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
    router.push("paymentMethod");
  };

  return (
    
    <View style={styles.container}>
  <TouchableOpacity onPress={() => router.push("paymentMethod")} style={styles.backButton}>
    <MaterialIcons name="arrow-back-ios" size={20} color="#000" />
  </TouchableOpacity>
  <Text style={styles.title}>Add Card</Text>

      {/* Basic card fields */}
      <View style={styles.field}>
        <Text style={styles.label}>Name on Card</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={nameonCard}
          onChangeText={setName}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}> Card Number</Text> 
        <View style={styles.inlineInputRow}>
        <MaterialIcons name="credit-card" size={20} style={styles.cardIcon} />
          <TextInput
            style={[styles.input]}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Expiration Date</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
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
      {/* Default Payment Method Checkbox */}
      <TouchableOpacity
  style={styles.checkboxRow}
  onPress={() => setIsDefault(!isDefault)}
>
  <View style={[styles.checkbox, isDefault && styles.checkboxChecked]} />
  <Text style={styles.checkboxLabel}>Set as your default payment method</Text>
</TouchableOpacity>

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
    padding: 30,
    backgroundColor: "#fff",
  },
  backButton: {
    paddingRight: 10,
    top: 80
  },  
  title: {
    marginTop: 50,
    fontSize: 30,
    marginBottom: 40,
    fontWeight: "bold", // or "regular" if your font supports it
    textAlign: "center",
  },
  field: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontSize: 18,
    marginBottom: 10,
  },
  inlineInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 30,
    marginRight: 8,
    color: '#6741FF'
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#6741FF',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  payNowButton: {
    backgroundColor: "#6741FF",
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 110,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
    width: "90%",
    alignSelf: "center",
  },
  payNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal",
  },
});
