import React, { useState } from "react";
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
        onChangeText={setBio}
        multiline
      />

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>+ Upload Image or Logo</Text>
      </TouchableOpacity>

      {/* Campaign Set Up? Enter Code */}
      <View style={styles.campaignContainer}>
        <Text style={styles.campaignText}>Campaign set up?</Text>
        <TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
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
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  bioInput: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
    height: 100,
    textAlignVertical: "top",
  },
  uploadButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#800080",
    alignItems: "center",
    marginBottom: 15,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
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
    color: "#800080",
  },
});

