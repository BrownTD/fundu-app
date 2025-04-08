import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import React, { useState } from "react";
import { useRouter } from 'expo-router';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRegistration } from "../../context/registrationContext";

export default function CampaignSetupScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { registrationData, setRegistrationData } = useRegistration();

  const [open, setOpen] = useState(false);
  const leadershipRoles = [
    // Executive Leadership
    { label: 'President', value: 'president' },
    { label: 'Vice President', value: 'vice_president' },
    { label: 'Secretary', value: 'secretary' },
    { label: 'Treasurer', value: 'treasurer' },
    { label: 'Parliamentarian', value: 'parliamentarian' },
    { label: 'Sergeant-at-Arms', value: 'sergeant_at_arms' },
    { label: 'General Leadership', value: 'general_leadership' },
  
    // Committee Chairs / Leads
    { label: 'Fundraising Chair', value: 'fundraising_chair' },
    { label: 'Finance Chair', value: 'finance_chair' },
    { label: 'Marketing Chair', value: 'marketing_chair' },
    { label: 'Social Media Chair', value: 'social_media_chair' },
    { label: 'Events Coordinator', value: 'events_coordinator' },
    { label: 'Community Outreach Chair', value: 'community_outreach_chair' },
    { label: 'Service Chair', value: 'service_chair' },
    { label: 'Academic Chair', value: 'academic_chair' },
    { label: 'Programs Chair', value: 'programs_chair' },
    { label: 'Membership Chair', value: 'membership_chair' },
    { label: 'Public Relations Officer', value: 'public_relations_officer' },
    { label: 'Historian', value: 'historian' },
    { label: 'DEI Chair (Diversity, Equity & Inclusion)', value: 'dei_chair' },
    { label: 'Mental Health & Wellness Chair', value: 'mental_health_chair' },
    { label: 'Training & Development Chair', value: 'training_development_chair' },
    { label: 'Recruitment Officer', value: 'recruitment_officer' },
    
  
    // Webmaster / Tech Chair
    { label: 'App Administrator', value: 'app_administrator' },
    { label: 'Developer / Technical Support', value: 'developer_support' },
  
    // Advisory
    { label: 'Faculty Advisor', value: 'faculty_advisor' },
    { label: 'Graduate Advisor', value: 'graduate_advisor' },
  ];

  const handleDropdownSelect = (role: string) => {
    // Map all selected leadership roles to the backend role: 'manager'
    handleChange("role", 'manager');
  };

  const handleChange = (field, value) => {
    setRegistrationData(prev => ({ ...prev, [field]: value }));
  };

  const handleBioChange = (text) => {
    if (text.length <= 250) {
      handleChange("bio", text);
    } else {
      Alert.alert("Limit reached", "Organization bio cannot exceed 250 characters.");
    }
  };

  

  const handleUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to your media library.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const image = result.assets[0];
  
      try {
        const compressed = await ImageManipulator.manipulateAsync(
          image.uri,
          [{ resize: { width: 800 } }],
          { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
        );
  
        const fileInfo = await FileSystem.getInfoAsync(compressed.uri);
        const fileSizeMB = fileInfo.size / (1024 * 1024);
  
        if (fileSizeMB > 2) {
          Alert.alert("File Too Large", "Please upload an image under 2MB.");
          return;
        }
  
        handleChange("logo", {
          uri: compressed.uri,
          type: 'image/jpeg',
          name: 'logo.jpg',
        });
  
      } catch (err) {
        console.error("Image processing error:", err);
        Alert.alert("Error", "Something went wrong while processing the image.");
      }
    }
  };

  const handleNext = async () => {
    const formData = new FormData();
    formData.append("org_name", registrationData.organizationName);
    formData.append("school", registrationData.college);
    formData.append("description", registrationData.bio);
    formData.append("manager_email", registrationData.email);
    formData.append("manager_uid", String(registrationData.userId));
  
    if (registrationData.logo) {
      formData.append("logo", {
        uri: registrationData.logo.uri,
        name: registrationData.logo.name || 'logo.jpg',
        type: registrationData.logo.type || 'image/jpeg',
      });
    }
  
    try {
      console.log("Submitting with user ID:", registrationData.userId);
  
      const response = await fetch("https://www.funduhub.com/api/organizations/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Organization created:", data);
        router.push("campaignDetails");
      } else {
        console.error("Error creating org:", data);
        Alert.alert("Upload Error", data.detail || "Failed to create organization.");
      }
    } catch (err) {
      console.error("Network error:", err);
      Alert.alert("Network Error", "Please check your internet connection.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
      </View>

      {/* Organization Name */}
      <Text style={styles.inputLabel}>Organization Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        placeholderTextColor="gray"
        value={registrationData.organizationName}
        onChangeText={(text) => handleChange("organizationName", text)}
      />

      {/* Role Dropdown */}
      <Text style={styles.inputLabel}>Your Role</Text>
      <DropDownPicker
      open={open}
      setOpen={setOpen}
      items={leadershipRoles}
      value={registrationData.selectedRole}  // You can store the specific title if you want
      setValue={(callback) => {
      const selectedValue = callback(registrationData.selectedRole);
      handleChange("selectedRole", selectedValue); // Store for display/reference
      handleChange("role", "manager"); // All leadership roles map to 'manager'
      }}  
      placeholder="Select your role"
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropdownContainer}
      textStyle={{ fontSize: 16, color: "#000" }}
      placeholderStyle={{ fontSize: 16, color: "gray" }}
      zIndex={1000}
      />

      {/* College */}
      <Text style={styles.inputLabel}>College/University</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        placeholderTextColor="gray"
        value={registrationData.college}
        onChangeText={(text) => handleChange("college", text)}
      />

      {/* Bio */}
      <Text style={styles.inputLabel}>Organization Bio</Text>
      <TextInput
        style={styles.bioInput}
        placeholder="Type here"
        placeholderTextColor="gray"
        value={registrationData.bio}
        onChangeText={handleBioChange}
        multiline
      />

{/* Upload Button */}
<TouchableOpacity
  style={styles.uploadButton}
  onPress={handleUpload}
>
  <Text style={styles.uploadButtonText}>+ Upload Image or Logo</Text>
</TouchableOpacity>

{/* Next Button */}
<TouchableOpacity
  style={[
    styles.nextButton,
    (!registrationData.organizationName ||
      !registrationData.role ||
      !registrationData.college ||
      !registrationData.bio ||
      !registrationData.logo) && styles.disabledButton
  ]}
  onPress={handleNext}
  disabled={
    !registrationData.organizationName ||
    !registrationData.role ||
    !registrationData.college ||
    !registrationData.bio ||
    !registrationData.logo
  }
>
  <Text style={styles.nextButtonText}>Next</Text>
</TouchableOpacity>

{/* Already Registered */}
<View style={styles.campaignContainer}>
  <Text style={styles.campaignText}>Organization already registered?</Text>
  <TouchableOpacity onPress={() => router.push("signinScreen")}>
    <Text style={styles.enterCodeText}> Enter Code</Text>
  </TouchableOpacity>
</View>
    </View>
  );
}
// Stylesheet
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
  dropdown: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    zIndex: 1000,
    fontSize: 16
  },
  dropdownContainer: {
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 15,
    // iOS shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  backgroundColor: "#fff", // prevent transparency glitches
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
  nextButton: {
    backgroundColor: "#CDF202",
    padding: 15,
    borderRadius: 50,
    marginTop: 15,
    alignItems: "center",
    //alignSelf: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});