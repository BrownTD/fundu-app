import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useRouter } from "expo-router";

export default function CustomGift() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
    
  const handlePayNow = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      Alert.alert("Invalid Input", "Please Enter Valid Value");
      return;
    }
    // Pass custom amount to PaymentScreen
    router.push({ pathname: "/paymentScreen", params: { amount: numericAmount } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
      <View>
  <Image
    source={require("@/assets/images/giftBuilding.png")}
    resizeMode="stretch"
    style={styles.Image}
  />
</View>
      </View>
      <Text style={styles.title}>Enter gift amount</Text>
      <View style={styles.amountBox}>
        <Text style={styles.dollarSign}>$</Text>
        <TextInput
          style={styles.amountInput}
          keyboardType="numeric"
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
        <Text style={styles.payNowText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  topContainer: {
    padding: 10,
    alignItems: "center", // center child elements horizontally
    justifyContent: "center", // center child elements vertically
    bottom: 37,
  },
  Image: {
    width: 478,
    height: 325,   // adjust the height as needed
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    bottom: 20,
  },
  amountBox: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "60%",
    height: 60,
    marginBottom: 10,
    paddingHorizontal: 10,
    bottom: 20,
  },
  dollarSign: {
    fontSize: 24,
    color: "#333",
    marginRight: 5,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    color: "#000",
  },
  payNowButton: {
    backgroundColor: "#6741FF",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 40,
    bottom: 15,
  },
  payNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal",
  },
  
});
