import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function SelectGift() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const giftAmounts = [25, 35, 45, 55, 95, 105];

  const handleGive = () => {
    // If no amount selected, default to 0 or show an alert
    const amount = selectedAmount || 0;
    // Pass the amount to the PaymentScreen via route params
    router.push({ pathname: "/paymentScreen", params: { amount } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
              <Image
                source={require("@/assets/images/giftBuilding.png")}
                resizeMode="stretch"
                style={styles.Image}
              />
            </View>
      
      <Text style={styles.title}>Select your gift</Text>
      <View style={styles.giftContainer}>
        {giftAmounts.map((amt) => (
          <TouchableOpacity
            key={amt}
            style={[
              styles.giftButton,
              selectedAmount === amt && styles.selectedGiftButton,
            ]}
            onPress={() => setSelectedAmount(amt)}
          >
            <Text style={styles.giftButtonText}>${amt}</Text>
          </TouchableOpacity>
        ))}
        {/* "Other" navigates to customGift */}
        <TouchableOpacity
          style={styles.giftButton}
          onPress={() => router.push("customGift")}
        >
          <Text style={styles.giftButtonText}>Other</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.giveButton} onPress={handleGive}>
        <Text style={styles.giveButtonText}>Give</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  topContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  giftContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  giftButton: {
    width: 80,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedGiftButton: {
    backgroundColor: "#E9DDFF",
    borderColor: "#6741FF",
  },
  giftButtonText: {
    fontSize: 16,
  },
  giveButton: {
    backgroundColor: "#6741FF",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 40,
  },
  giveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal",
  },
  Image: {
    width: "132%",
    height: 325,
  }
});
