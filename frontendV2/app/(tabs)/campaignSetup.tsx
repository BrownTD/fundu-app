import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import React, { useState } from "react";
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CampaignSetupScreen() {
  const navigation = useNavigation();
  const [organizationName, setOrganizationName] = useState("");
  const [role, setRole] = useState("");
  const [college, setCollege] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();

  const handleBioChange = (text: string) => {
    if (text.length <= 250) {
      setBio(text);
    } else {
      Alert.alert("Limit reached", "Organization bio cannot exceed 250 characters.");
    }
  };

  const handleUpload = async () => {
    // Validation: Check if all required fields are filled
    if (!organizationName || !role || !college || !bio) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    } 
    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.cancelled) {
      // Navigate to campaignDetails if an image is selected
      navigation.navigate("campaignDetails");
    }
  };

  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("signup")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Set Up Your First Campaign</Text>
      </View>

      {/* Organization Name */}
      <Text style={styles.inputLabel}>Organization Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        placeholderTextColor="gray"
        value={organizationName}
        onChangeText={setOrganizationName}
      />

      {/* Role */}
      <Text style={styles.inputLabel}>Role</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Treasurer, President"
        placeholderTextColor="gray"
        value={role}
        onChangeText={setRole}
      />

      {/* College/University */}
      <Text style={styles.inputLabel}>College/University</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        placeholderTextColor="gray"
        value={college}
        onChangeText={setCollege}
      />

      {/* Organization Bio */}
      <Text style={styles.inputLabel}>Organization Bio</Text>
      <TextInput
        style={styles.bioInput}
        placeholder="Type here"
        placeholderTextColor="gray"
        value={bio}
        onChangeText={handleBioChange}
        multiline
      />

      {/* Upload Button */}
      <TouchableOpacity
        style={[
        styles.uploadButton,
        (!organizationName || !role || !college || !bio) && styles.disabledButton
        ]}
        onPress={handleUpload}
        disabled={!organizationName || !role || !college || !bio}
      >
        <Text style={styles.uploadButtonText}>+ Upload Image or Logo</Text>
      </TouchableOpacity>

      {/* Campaign Set Up? Enter Code */}
      <View style={styles.campaignContainer}>
        <Text style={styles.campaignText}>Campaign already set?</Text>
<TouchableOpacity onPress={() => router.push("signinScreen")}>
  <Text style={styles.enterCodeText}> Enter Code</Text>
</TouchableOpacity>
      </View>
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
    fontSize: 18,
    fontWeight: "regular",
    marginLeft: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  bioInput: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
    height: 175,
    textAlignVertical: "top",
  },
  uploadButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 50,
    backgroundColor: "#6741FF",
    alignItems: "center",
    marginBottom: 15,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "regular",
    color: "white",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3", 
  },
  campaignContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  campaignText: {
    fontSize: 14,
    color: "gray",
  },
  enterCodeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
  },
});

