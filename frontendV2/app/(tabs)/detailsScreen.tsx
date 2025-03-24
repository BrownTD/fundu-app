import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
  
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { useRouter } from 'expo-router';


export default function OrganizationProfileScreen({ navigation }: any) {
  const router = useRouter();
  const organization = {
    name: "CLT Club Baseball",
    location: "University of North Carolina at Charlotte",
    logo: require("@/assets/images/organization/club_baseball.jpeg"), // Organization logo
    campaign: {
      category: "Sports",
      goal: "$1,000",
      goalAmount: 1000, // Numeric goal for progress calculations
      currentDonation: 587, // Current donation amount
      name: "Clothes Drive",
      image: require("../../assets/images/fundraiser_img.png"),
    },
  };

  // Calculate the donation progress as a percentage.
  const progressPercentage =
    (organization.campaign.currentDonation / organization.campaign.goalAmount) *
    100;

  // Sample data for the line chart (cumulative donations over time)
  const chartData = {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
      {
        data: [0, 121, 166, 250, 287, 587],
      },
    ],
  };
// State for tooltip position and value
const [tooltipPos, setTooltipPos] = useState({
  x: 0,
  y: 0,
  value: 0,
  visible: false,
});
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push("homeScreen")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campaign Details</Text>
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
        <Image
          source={organization.campaign.image}
          style={styles.campaignImage}
        />
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
          <View
            style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
          />
        </View>
        <Text style={styles.campaignName}>{organization.campaign.name}</Text>
      </View>
      <TouchableOpacity style={styles.giveButton} onPress={() => router.push("selectGift")}>
  <Text style={styles.giveButtonText}>Give</Text>
</TouchableOpacity>

      {/* Line Chart: Donations Over Time */}
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 60} // account for padding
        height={220}
        yAxisSuffix="$"
        fromZero
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(103,65,255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "1",
            stroke: "#6741FF",
          },
          propsForBackgroundLines: {
            strokeDasharray: "3", // dotted grid lines
          },
          // Format the y-axis labels so they appear in $100 increments:
          formatYLabel: (yLabel) => {
            // Round the value to the nearest hundred.
            const num = Number(yLabel);
            return (Math.round(num / 100) * 100).toString();
          },
        }}
        
        style={{ marginVertical: 8, borderRadius: 16 }}
        onDataPointClick={(data) => {
          let isSamePoint =
            tooltipPos.x === data.x && tooltipPos.y === data.y;
          if (isSamePoint) {
            setTooltipPos((prev) => ({ ...prev, visible: !prev.visible }));
          } else {
            setTooltipPos({
              x: data.x,
              y: data.y,
              value: data.value,
              visible: true,
            });
          }
        }}
        
      />
      {/* Campaign Description */}
      <Text style={styles.campaignDescription}>
        Charlotte Club Baseball is dedicated to supporting our community through our annual Clothes Drive. In this campaign, our goal is to raise funds to provide essential clothing items to those in need. Every donation brings us closer to making a significant impact, enabling us to purchase new uniforms, gear, and supplies that benefit both our team and local families. Your generosity makes a real difference—join us in our mission to uplift and support our community.
      </Text>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 80,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "regular",
    marginLeft: 80,
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
