import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OrganizationProfileScreen({ navigation }: any) {
  const organization = {
    name: "UNCC Volunteers",
    location: "University of North Carolina at Charlotte",
    logo: require("@/assets/images/unccLogo.png"), // Organization logo
    campaign: {
      category: "Education",
      goal: "$5,000",
      name: "Fund School Supplies",
      image: require("@/assets/images/campaign.png"), // Campaign image
    },
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Organization Profile</Text>
      </View>

      {/* Profile Image */}
      <TouchableOpacity style={styles.profileImageContainer}>
        <Image source={organization.logo} style={styles.profileImage} />
      </TouchableOpacity>

      {/* Organization Info */}
      <Text style={styles.organizationName}>{organization.name}</Text>
      <Text style={styles.organizationLocation}>{organization.location}</Text>

      {/* Current Campaign */}
      <Text style={styles.sectionTitle}>Current Campaign</Text>
      <View style={styles.campaignCard}>
        <Image source={organization.campaign.image} style={styles.campaignImage} />
        <View style={styles.campaignInfo}>
          <Text style={styles.category}>{organization.campaign.category}</Text>
          <Text style={styles.goal}>{organization.campaign.goal}</Text>
        </View>
        <Text style={styles.campaignName}>{organization.campaign.name}</Text>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  profileImageContainer: {
    alignSelf: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  organizationName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  organizationLocation: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  campaignCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  campaignImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  campaignInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  category: {
    color: "red",
    fontWeight: "bold",
  },
  goal: {
    fontWeight: "bold",
  },
  campaignName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});