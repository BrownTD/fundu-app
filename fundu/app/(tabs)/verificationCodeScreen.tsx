import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function VerificationCodeScreen({ navigation }: any) {
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState("123456"); // Simulated code for now
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = () => {
    if (verificationCode === sentCode) {
      alert("Code verified successfully!");
      // Navigate to the next screen
    } else {
      alert("Incorrect code. Please try again.");
    }
  };

  const handleResend = () => {
    if (canResend) {
      setSentCode("654321"); // Simulating a new code being sent
      setTimer(120);
      setCanResend(false);
      alert("A new verification code has been sent to your email.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Code</Text>
      <Text style={styles.subtitle}>
        We have sent the verification code to your email.
      </Text>
      
      {/* Verification Code Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Code"
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />

      {/* Resend Timer & Button */}
      <Text style={styles.timer}>Resend in {timer}s</Text>
      <TouchableOpacity onPress={handleResend} disabled={!canResend}>
        <Text style={[styles.resendText, canResend && styles.resendActive]}>Resend</Text>
      </TouchableOpacity>

      {/* Verify Code Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  timer: {
    fontSize: 14,
    color: "gray",
  },
  resendText: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
  resendActive: {
    color: "purple",
  },
  verifyButton: {
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#800080",
    alignItems: "center",
    marginTop: 20,
  },
  verifyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});