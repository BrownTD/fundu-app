import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import React, { useState, useEffect} from "react";
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
import { useNavigation } from "@react-navigation/native";
import { useRegistration } from "../../context/registrationContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LayoutAnimation, UIManager } from 'react-native';



export default function CampaignSetupScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { registrationData, setRegistrationData } = useRegistration();
  const [collegeItems, setCollegeItems] = useState<{ label: string; value: string }[]>([]);
  const [collegeOpen, setCollegeOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [allColleges, setAllColleges] = useState<{ name: string; state: string }[]>([]);


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
  const [stateOpen, setStateOpen] = useState(false);
  const states = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" }
];

useEffect(() => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}, [collegeOpen, stateOpen]);

useEffect(() => {
  const fetchColleges = async () => {
    try {
      const response = await fetch("https://www.funduhub.com/api/colleges/");
      const data = await response.json();

      setAllColleges(data); // Full list stored here

      // show all colleges before a state is selected
      setCollegeItems(
        data.map((college) => ({
          label: college.name,
          value: college.name
        }))
      );
    } catch (err) {
      console.error("Failed to fetch colleges:", err);
      Alert.alert("Error", "Unable to load colleges. Please try again.");
    }
  };

  fetchColleges();
}, []);


useEffect(() => {
  if (selectedState) {
    const filtered = allColleges
      .filter((college) => college.state === selectedState)
      .map((college) => ({
        label: college.name,
        value: college.name
      }));
    setCollegeItems(filtered);
  } else {
    setCollegeItems([]);
  }
}, [selectedState, allColleges]);

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
        let fileSizeMB = 0;
        if (fileInfo.exists && typeof fileInfo.size === 'number') {
          fileSizeMB = fileInfo.size / (1024 * 1024);
        } else {
          Alert.alert("File Error", "Unable to determine file size.");
          return;
        }
  
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
  {/*Create organization*/}
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
        setRegistrationData(prev => ({
          ...prev,
          organizationName: data.org_name,
          organizationId: data.organization_id,
          organizationCode: data.code, 
        }));
  
        {/*Update user with org ID*/}
        const accessToken = await AsyncStorage.getItem("accessToken");
      
        if (registrationData.userId && registrationData.selectedRole) {
          console.log("Selected user ID:", registrationData.userId);
          console.log("Selected position to send:", registrationData.selectedRole);

        {/*Update user position*/}
          const updateRes = await fetch("https://www.funduhub.com/api/users/update_position/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              user_id: registrationData.userId,
              position: registrationData.selectedRole,
            }),
          });
        
          const text = await updateRes.text();
          console.log("Raw position update response:", text);
        
          try {
            const updateData = JSON.parse(text);
            console.log("Parsed updateData:", updateData);
          } catch (err) {
            console.error("Failed to parse updateData:", err);
          }
        } else {
          console.warn("Skipped update_position — missing userId or selectedRole");
        }
      
        router.push("/onboarding/campaignDetails");
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
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >

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
      
      const value = callback(registrationData.selectedRole);
      console.log("Dropdown selected position:", value)
      handleChange("selectedRole", value); // Store for display/reference
      handleChange("role", "manager"); // All leadership roles map to 'manager'
      }}  
      placeholder="Select your role"
      style={styles.dropdown}
      dropDownContainerStyle={styles.dropdownContainer}
      textStyle={{ fontSize: 16, color: "#000" }}
      placeholderStyle={{ fontSize: 16, color: "gray" }}
      zIndex={1000} // Ensure dropdown is above other elements
      />
    {/* State Dropdown */}
<Text style={styles.inputLabel}>State</Text>
<DropDownPicker
  open={stateOpen}
  value={selectedState}
  items={states}
  setOpen={setStateOpen}
  setValue={setSelectedState}
  placeholder="Select your state"
  style={styles.dropdown}
  dropDownContainerStyle={styles.dropdownContainer}
  dropDownDirection="BOTTOM"
  listMode="SCROLLVIEW"
  zIndex={2000}
/>
      {/* College */}
      <Text style={styles.inputLabel}>College/University</Text>
      <DropDownPicker
      open={collegeOpen}
      value={registrationData.college}
      items={collegeItems}
      setOpen={setCollegeOpen}
      setValue={(callback) =>
      setRegistrationData(prev => ({
        ...prev,
        college: callback(prev.college),
        }))
      }
      setItems={setCollegeItems}
      placeholder="Select your college"
      dropDownDirection="BOTTOM"
      listMode="SCROLLVIEW"
      placeholderStyle={{ fontSize: 16, color: "gray" }}
      searchable={true}
      searchPlaceholder = "Search"
      searchTextInputProps={{
        placeholderTextColor: "gray",
        style: { fontSize: 16, color: "#000" },
      }}
      style={styles.input}
      dropDownContainerStyle={styles.dropdownContainer}
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
  <TouchableOpacity onPress={() => router.push("/onboarding/campaignDetails")}>
    <Text style={styles.enterCodeText}> Enter Code</Text>
  </TouchableOpacity>
</View>
    </View>
  </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
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