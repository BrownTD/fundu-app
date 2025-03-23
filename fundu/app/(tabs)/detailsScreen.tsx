import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsScreen({ navigation }: any) {
  const campaign = {
    image: require("@/assets/images/campaign.png"), // Uploaded campaign image
    goal: "$5,000",
    title: "Fund School Supplies",
    leader: "John Doe",
    description: "Helping underprivileged students get the supplies they need for a successful school year."
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Details</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Campaign Image */}
      <Image source={campaign.image} style={styles.campaignImage} />

      {/* Campaign Info */}
      <Text style={styles.goal}>Goal: {campaign.goal}</Text>
      <Text style={styles.campaignTitle}>{campaign.title}</Text>
      <Text style={styles.leader}>Leader: {campaign.leader}</Text>
      <Text style={styles.description}>{campaign.description}</Text>

      {/* Okay Button */}
      <TouchableOpacity style={styles.okayButton} onPress={() => navigation.goBack()}>
        <Text style={styles.okayButtonText}>Okay</Text>
      </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  campaignImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  goal: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  leader: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "black",
    marginBottom: 20,
  },
  okayButton: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  okayButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});