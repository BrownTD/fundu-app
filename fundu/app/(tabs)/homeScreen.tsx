import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: any) {
  const campaigns = [
    {
      id: "1",
      category: "Education",
      goal: "$5,000",
      name: "Fund School Supplies",
      organization: "UNCC Volunteers",
      image: require("@/assets/images/campaign.png"), // Campaign image
      logo: require("@/assets/images/unccLogo.png"), // Organization logo
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="location-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.collegeName}>University Name</Text>
        <TouchableOpacity onPress={() => navigation.navigate("InboxScreen")}>
          <Ionicons name="mail-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar with Magnifying Glass */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="gray"
        />
      </View>

      {/* Give to Organizations & Causes */}
      <View style={styles.giveContainer}>
        <Text style={styles.giveText}>Give to Organizations & Causes</Text>
      </View>
      <View style={styles.dot} />

      {/* Active Campaigns */}
      <Text style={styles.sectionTitle}>Active Campaigns</Text>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.campaignCard}>
            {/* Campaign Image */}
            <Image source={item.image} style={styles.campaignImage} />

            <View style={styles.campaignInfo}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.goal}>{item.goal}</Text>
            </View>
            <Text style={styles.campaignName}>{item.name}</Text>

            {/* Organization Info with Logo */}
            <View style={styles.organizationInfo}>
              <Image source={item.logo} style={styles.organizationLogo} />
              <Text style={styles.organizationName}>by {item.organization}</Text>
            </View>
          </View>
        )}
      />
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
  collegeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
  giveContainer: {
    backgroundColor: "#F8F8F8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  giveText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "purple",
    borderRadius: 5,
    alignSelf: "center",
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
    elevation: 2, // Adds subtle shadow effect
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
    marginBottom: 5,
  },
  organizationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  organizationLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  organizationName: {
    fontSize: 14,
    color: "gray",
  },
});

