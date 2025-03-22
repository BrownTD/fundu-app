import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SelectGiftScreen = () => {
  const [customAmount, setCustomAmount] = useState('');

  const handleAmountSelect = (amount: string) => {
    setCustomAmount(amount);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Details</Text>
      </View>

      {/* Donations Image in a Container */}
      <View style={styles.imageContainer}>
        <Image source={require('@/assets/images/donationIcon.png')} style={styles.donationsImage} />
      </View>

      {/* Select Your Gift Section */}
      <Text style={styles.selectGiftText}>Select Your Gift</Text>

      {/* Price Selection Options */}
      <View style={styles.priceOptions}>
        {[25, 35, 45, 55, 65, 75, 85, 95, 105, 115].map(amount => (
          <TouchableOpacity
            key={amount}
            style={styles.priceButton}
            onPress={() => handleAmountSelect(amount.toString())}
          >
            <Text style={styles.priceButtonText}>${amount}</Text>
          </TouchableOpacity>
        ))}
        {/* Option for custom amount */}
        <TouchableOpacity
          style={styles.priceButton}
          onPress={() => handleAmountSelect('')}
        >
          <Text style={styles.priceButtonText}>Other</Text>
        </TouchableOpacity>
      </View>

      {/* Input for Custom Donation Amount with Dollar Sign */}
      {customAmount === '' ? null : (
        <View style={styles.inputContainer}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput
            style={styles.customAmountInput}
            value={customAmount}
            onChangeText={setCustomAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
          />
        </View>
      )}

      {/* Give Button */}
      <TouchableOpacity style={styles.giveButton}>
        <Text style={styles.giveButtonText}>Give</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  donationsImage: {
    width: '80%',
    height: 200,
    resizeMode: 'contain',
  },
  selectGiftText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  priceButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#7E57C2',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  priceButtonText: {
    color: '#7E57C2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7E57C2',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
  },
  dollarSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7E57C2',
    marginRight: 5,
  },
  customAmountInput: {
    flex: 1,
    fontSize: 16,
  },
  giveButton: {
    backgroundColor: '#7E57C2',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  giveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectGiftScreen;
