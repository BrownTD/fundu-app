import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';

const wallet = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false); // State to handle showing receipt

  // Payment options with corresponding images
  const paymentOptions = [
    { id: 'visa', label: 'Visa', image: require('@/assets/images/visa.png') },
    { id: 'mastercard', label: 'Mastercard', image: require('@/assets/images/mastercard.png') },
    { id: 'amex', label: 'Amex Card', image: require('@/assets/images/amex.png') },
  ];

  // Simulated data for the receipt
  const amount = 50;
  const campaignLogo = 'https://via.placeholder.com/50';
  const campaignTitle = 'Campaign Name';

  const handlePayNow = () => {
    setIsPaid(true); // Show the receipt overlay after payment
  };

  const handleGoHome = () => {
    setIsPaid(false);
    setSelectedMethod(null); // Reset selection (simulating navigation to index.tsx)
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
      </View>

      {/* Your Cards Section */}
      <Text style={styles.sectionTitle}>Your Cards</Text>

      {/* Payment Options */}
      <View style={styles.cardOptions}>
        {paymentOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.cardButton,
              selectedMethod === option.id && styles.selectedButton, // Apply selected style
            ]}
            onPress={() => setSelectedMethod(option.id)}
          >
            <Image source={option.image} style={styles.cardImage} />
            <Text style={[styles.cardButtonText, selectedMethod === option.id && styles.selectedText]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pay Now Button */}
      <TouchableOpacity 
        style={[
          styles.confirmButton, 
          selectedMethod ? styles.confirmButtonActive : styles.confirmButtonDisabled
        ]}
        disabled={!selectedMethod} // Disable if no method is selected
        onPress={handlePayNow}
      >
        <Text style={styles.confirmButtonText}>Pay Now</Text>
      </TouchableOpacity>

      {/* Receipt Modal */}
      <Modal transparent={true} visible={isPaid} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.receiptContainer}>
            {/* Checkmark Icon */}
            <View style={styles.checkmarkContainer}>
              <Text style={styles.checkmark}>✔</Text>
            </View>

            {/* Success Message */}
            <Text style={styles.successText}>Transfer Success</Text>

            {/* Transferred Amount */}
            <Text style={styles.amountText}>${amount}</Text>

            {/* Recipient Section */}
            <View style={styles.recipientContainer}>
              <Image source={{ uri: campaignLogo }} style={styles.campaignLogo} />
              <Text style={styles.campaignTitle}>{campaignTitle}</Text>
            </View>

            {/* Go Home Button */}
            <TouchableOpacity style={styles.goHomeButton} onPress={handleGoHome}>
              <Text style={styles.goHomeText}>Go Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardOptions: {
    marginTop: 10,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#7E57C2',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#7E57C2',
  },
  cardImage: {
    width: 40,
    height: 25,
    marginRight: 10,
    resizeMode: 'contain',
  },
  cardButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7E57C2',
  },
  selectedText: {
    color: '#fff',
  },
  confirmButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonActive: {
    backgroundColor: '#7E57C2',
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dims background
  },
  receiptContainer: {
    width: '80%',
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Shadow for Android
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7E57C2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkmark: {
    fontSize: 40,
    color: '#fff',
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7E57C2',
    marginBottom: 20,
  },
  recipientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
  },
  campaignLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  goHomeButton: {
    backgroundColor: '#7E57C2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  goHomeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default wallet;