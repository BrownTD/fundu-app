import React, { useState } from "react";
import Slider from '@react-native-community/slider';
import { Alert, ScrollView } from "react-native";
import { useRouter } from 'expo-router'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Goals from '../../assets/images/goalsCuate.svg';

import { useRegistration } from "../../context/registrationContext";


import AsyncStorage from "@react-native-async-storage/async-storage";


const categories = [
  "Academic",
  "Cultural",
  "Social",
  "Business",
  "Religious",
  "Greek",
  "Political",
  "Sports",
  "Environment",
];

// Function to split categories into rows of 3
const chunkArray = (arr: string[], size: number) => {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, [] as string[][]);
};

export default function CampaignDetailsScreen({ }: any) {
  const { registrationData } = useRegistration();

  const [fundraisingGoal, setFundraisingGoal] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");

  const router = useRouter();
  const handleFinished = () => {
    Alert.alert(
    "Confirm Details",
    "Are all your details correct?",
    [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => submitCampaign() },
    ],
    { cancelable: true }
    );
  };
  const categoryRows = chunkArray(categories, 3); // Split into rows of 3
  const handleDescChange = (text: string) => {
      if (text.length <= 250) {
        setCampaignDescription(text);
      } else {
        Alert.alert("Limit reached", "Organization bio cannot exceed 250 characters.");
      }
    };

    const fadeAnim = useRef(new Animated.Value(0)).current;
const slideAnim = useRef(new Animated.Value(50)).current;

const closeModal = () => {
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
      toValue: 50,
      duration: 250,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }),
  ]).start(() => {
    setModalVisible(false);
  });
};

useEffect(() => {
  if (modalVisible) {
    // Animate in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  } else {
    // Animate out before hiding
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 250,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Actually hide modal after animation finishes
      setModalVisible(false);
    });
  }
}, [modalVisible]);

const submitCampaign = async () => {
  if (!selectedCategory || !campaignDescription || !registrationData.organizationId || !campaignTitle) {
    Alert.alert("Missing Info", "Please complete all fields before submitting.");
    return;
  }

  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    const response = await fetch("https://www.funduhub.com/api/campaigns/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        org_name: registrationData.organizationName,
        organization: registrationData.organizationId,
        title: campaignTitle,
        description: campaignDescription,
        donation_goal: fundraisingGoal,
      }),
    });

    const data = await response.json();
    await fetch(`https://www.funduhub.com/api/organizations/${registrationData.organizationId}/update_category/`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ category: selectedCategory }),
});

    if (response.ok) {
      console.log("Campaign created:", data);
      router.push("/onboarding/organizationCode");
    } else {
      console.error("Error response:", data);
      Alert.alert("Upload Error", data.detail || "Failed to create campaign.");
    }
  } catch (err) {
    console.error("Network error:", err);
    Alert.alert("Network Error", "Please check your internet connection.");
  }
};

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          {/*<Text style={styles.headerTitle}>Campaign Details</Text>*/}
          <Goals width={450} height={400} />
        </View>
        <View style={styles.card}>
        {/* Fundraising Goal */}
        <Text style={styles.headerTitle}>Set your Fundraising Goal</Text>
        <Text style={styles.goalCounter}>${fundraisingGoal.toLocaleString()}</Text>
  
        <Slider
          style={styles.slider}
          minimumValue={100}
          maximumValue={10000}
          step={100}
          value={fundraisingGoal}
          onValueChange={setFundraisingGoal}
          minimumTrackTintColor="#6741FF"
          maximumTrackTintColor="#D3D3D3"
          thumbTintColor="#6741FF"
        />
  
        {/* Organization Type Selection */}
        <Text style={styles.inputLabel}>What type of organization are you?</Text>
        <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
          <Text style={{ color: selectedCategory ? "black" : "gray" }}>
            {selectedCategory || "Select a category"}
          </Text>
        </TouchableOpacity>
          {/* Campaign Title */}
<Text style={styles.inputLabel}>Campaign Title</Text>
<TextInput
  style={styles.input}
  placeholder="Give your campaign a name"
  placeholderTextColor="gray"
  value={campaignTitle}
  onChangeText={setCampaignTitle}
/>

        {/* Campaign Description */}
        <Text style={styles.inputLabel}>Campaign Description</Text>
        <TextInput
          style={styles.largeInput}
          placeholder="Type here"
          placeholderTextColor="gray"
          multiline
          value={campaignDescription}
          onChangeText={handleDescChange}
        />
  
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedCategory || !campaignDescription) && styles.disabledButton,
          ]}
          onPress={handleFinished}
          disabled={!selectedCategory || !campaignDescription}
        >
          <Text style={styles.continueText}>Finished</Text>
        </TouchableOpacity>
  
        {/* Bottom padding for scroll clearance */}
        <View style={{ height: 60 }} />
        </View>
      </ScrollView>
  
      {/* Category Selection Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.modalTitle}>Select a Category</Text>
            <ScrollView contentContainerStyle={styles.categoriesContainer}>
              {categoryRows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.categoryRow}>
                  {row.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.categoryButton,
                        selectedCategory === item && styles.selectedCategory,
                      ]}
                      onPress={() => {
                        setSelectedCategory(item);
                        closeModal();
                      }}
                    >
                      <Text style={styles.categoryText}>{item}</Text>
                      {selectedCategory === item && (
                        <Ionicons name="checkmark-circle" size={20} color="#6741FF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 80,
    //flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 30,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    fontSize: 16,
    marginTop: 5,
    color: "#000",
  },
  largeInput: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    fontSize: 16,
    height: 175,
    marginTop: 5,
    color: "#000",
    textAlignVertical: "top",
  },
  continueButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 50,
    backgroundColor: "#6741FF",
    alignItems: "center",
    marginTop: 20,
  },
  continueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoriesContainer: {
    alignItems: "center",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  categoryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    backgroundColor: "#F8F8F8",
  },
  selectedCategory: {
    borderColor: "#6741FF",
    backgroundColor: "#F3E5F5",
  },
  categoryText: {
    fontSize: 16,
    marginRight: 5,
  },
  goalCounter: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  card: {
    flex: 1,
    marginTop: -90, // Slight overlap with the image
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    //alignItems: "center",
    zIndex: 1,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
  }
});

