import React, { useState } from "react";
import Slider from '@react-native-community/slider';
import { Alert } from "react-native";
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

export default function CampaignDetailsScreen({ navigation }: any) {
  const [fundraisingGoal, setFundraisingGoal] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [campaignDescription, setCampaignDescription] = useState("");
  const router = useRouter();
  const handleFinished = () => {
    Alert.alert(
    "Confirm Details",
    "Are all your details correct?",
    [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => router.push("organizationCode")
      },
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
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push("orgOnboarding")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

        <Text style={styles.headerTitle}>Campaign Details</Text>
      </View>

     {/* Fundraising Goal */}
      <Text style={styles.inputLabel}>Fundraising Goal</Text>
      <Text style={styles.goalCounter}>${fundraisingGoal.toLocaleString()}</Text>

      <Slider
        style={styles.slider}
        minimumValue={100}
        maximumValue={10000}
        step={1}
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

      {/* Category Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Category</Text>
            <View style={styles.categoriesContainer}>
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
                        setModalVisible(false);
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
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 80,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "regular",
    marginLeft: 50,
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
});

