import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
// If using expo-router, you can import/use router. Or use a nav library's back method:
import { useRouter } from "expo-router";

export default function ProfileDetails() {
  const router = useRouter(); // or your navigation method
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Example user data (could be fetched from Django)
  const [userData] = useState({
    firstName: "Joanne",
    lastName: "Wheeler",
    phone: "873-456-9898",
    email: "example@gmail.com",
    campus: "UNC Charlotte",
  });

  useEffect(() => {
    // Request permission for image library
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need permission to access your photos to update your profile picture."
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Image picking error:", error);
    }
  };

  const handleBack = () => {
    // If using expo-router:
    router.back();
    // Or if using React Navigation:
    // navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button & Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Image Container */}
        <View style={styles.profileContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../assets/images/profileImage.png") // or any fallback image
            }
            style={styles.profileImage}
          />
          {/* Camera Button Overlay */}
          <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* User Details */}
        <View style={styles.detailsContainer}>
          {/* First & Last Name in a row */}
          <View style={styles.row}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>First Name</Text>
              <Text style={styles.value}>{userData.firstName}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Last Name</Text>
              <Text style={styles.value}>{userData.lastName}</Text>
            </View>
          </View>

          {/* Phone */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{userData.phone}</Text>
          </View>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>

          {/* campus */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Campus</Text>
            <Text style={styles.value}>{userData.campus}</Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  /* Header */
  header: {
    marginTop: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "regular",
    marginLeft: 110
  },
  /* Scroll Content */
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  /* Profile Image */
  profileContainer: {
    marginBottom: 20,
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6741FF",
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  detailsContainer: {
    width: "90%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldContainer: {
    flex: 1,
    marginRight: 10,
    marginBottom: 50,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
});
