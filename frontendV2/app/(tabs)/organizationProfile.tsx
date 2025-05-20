import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import ProfileIcon from '../../components/ProfileIcon';

export const options = {
  title: 'Organization',
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="business" color={color} size={size} />
  ),
};

export default function OrganizationProfileScreen() {
  const router = useRouter();
  const organization = {
    name: "CLT Club Baseball",
    location: "University of North Carolina at Charlotte",
    logo: require("@/assets/images/organization/club_baseball.jpeg"), // Organization logo
    campaign: {
      category: "Sports",
      goal: "$1,000",
      goalAmount: 1000,       // Numeric goal for progress calculations
      currentDonation: 587,   // Current donation amount
      name: "Clothes Drive",
      image: require("../../assets/images/fundraiser_img.png"),
    },
  };

  // Calculate the donation progress as a percentage.
  const progressPercentage =
    (organization.campaign.currentDonation / organization.campaign.goalAmount) * 100;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Organization</Text>
        <ProfileIcon onPress={() => router.push('/profileDetails')} />
      </View>

      {/* Profile Image */}
      <TouchableOpacity style={styles.profileImageContainer}>
        <Image source={organization.logo} style={styles.profileImage} />
      </TouchableOpacity>

      {/* Organization Info */}
      <Text style={styles.organizationName}>{organization.name}</Text>
      <Text style={styles.organizationLocation}>
        {organization.location}
      </Text>

      {/* Current Campaign */}
      <Text style={styles.sectionTitle}>Current Campaign</Text>
      <View style={styles.campaignCard}>
      <TouchableOpacity onPress={() => router.push("/detailsScreen")}>
        <Image source={organization.campaign.image} style={styles.campaignImage} />
        </TouchableOpacity>
        <View style={styles.campaignInfo}>
          <Text style={styles.category}>{organization.campaign.category}</Text>
          <Text style={styles.goal}>
            <Text style={styles.currentDonation}>
              ${organization.campaign.currentDonation}
            </Text>
            <Text> / ${organization.campaign.goalAmount} Raised</Text>
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>
        <Text style={styles.campaignName}>{organization.campaign.name}</Text>
      </View>
      <TouchableOpacity style={styles.giveButton} onPress={() => router.push("/payments/selectGift")}>
  <Text style={styles.giveButtonText}>Give</Text>
</TouchableOpacity>
      {/* Organization Bio */}
      <Text style={styles.campaignDescription}>
        CLT Club Baseball is proud to announce our Clothes Drive campaign, designed to support the local community while fostering team spirit and athletic excellence. Our campaign aims to raise funds to purchase essential clothing items for underprivileged families, ensuring that everyone has access to quality apparel. With a goal of $1,000, every donation helps us bridge the gap between need and opportunity. Over the years, our club has grown not only in size but in our commitment to giving back. This campaign reflects our belief in the power of sports to unite communities and inspire positive change. By participating in our Clothes Drive, you are contributing to a legacy of community service and sportsmanship. Our team is dedicated to creating a lasting impact through our efforts on and off the field. We work tirelessly to support our athletes and the local community, and we are grateful for every contribution that helps us move closer to our goal. Your support is invaluable and drives our progress every day.
      </Text>

      {/* Extra space for scrolling */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 90,
    flexDirection: "row",
    marginBottom: 20,
    flex: 1,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  profileImageContainer: {
    alignSelf: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
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
    marginLeft: 15,
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
    marginLeft: 120,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#CDF202",
  },
  campaignName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  currentDonation: {
    fontSize: 23,
    color: "#6741FF",
    fontWeight: "bold",
  },
  campaignDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
    textAlign: "left",
    marginTop: 20,
    marginRight: 5,
    marginLeft: 5,
    justifyContent: "center"
  },
  giveButton: {
    backgroundColor: "#6741FF", // your standard purple
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 50,
    marginTop: 0,
    alignSelf: "center",
  },
  giveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal", // "normal" is equivalent to regular
  },
  
});
