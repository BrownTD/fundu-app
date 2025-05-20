import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import ProfileIcon from 'components/ProfileIcon';

export default function HomeScreen() {
  const router = useRouter();
  // Define an array of images (adjust the paths and image names as needed)
    const orgImages = [
    require("../../assets/images/organization/nsbe.png"),
    require("../../assets/images/organization/club_baseball.jpeg"),
    require("../../assets/images/organization/girlsWhoCode.png"),
    require("../../assets/images/organization/aka.png"),
  ];
  const orgNames = [
    "NSBE",
    "CLT Club Baseball",
    "Girls Who Code",
    "Alpha Kappa Alpha Sorority"
  ];
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{  paddingBottom: 50 }}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.campusLabel}>Campus</Text>
          <Text style={styles.campusName}>UNC Charlotte</Text>
        {/* Profile Icon*/}
          <ProfileIcon onPress={() => router.push('/profileDetails')} />
        </View>

        {/* Big Featured Card */}
        <View style={styles.featuredCard}>
          <Text style={styles.featuredTitle}>Give to Organizations &amp; Causes</Text>
          
          {/* Illustration (using campaign.png for testing) */}
          <Image
            source={require("../../assets/images/featureBox.png")}
            style={styles.featuredImage}
            />
            <TouchableOpacity style={styles.exploreButton} onPress={() => router.push("explore")}>
            <Text style={styles.exploreButtonText}>Explore</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {[
            "Greek",
            "Business",
            "Sports",
            "Environmental",
            "Social",
            "Religous",
          ].map((category, index) => (
            <TouchableOpacity
              style={styles.categoryItem}
              key={index}
              onPress={() => router.push("category/" + category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Find Nearby Header */}
        <View style={styles.findNearbyContainer}>
          <Text style={styles.sectionTitle}>Find Nearby Campaigns</Text>
          <TouchableOpacity onPress={() => router.push("nearby")}>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>

        {/* Nearby Card */}
        <View style={styles.nearbyCard}>
          {/* Large background/thumbnail image */}
          <Image
            source={require("../../assets/images/fundraiser_img.png")}
            style={styles.cardImage}
        />
        </View>
        <View>
            <TouchableOpacity onPress={() => router.push("detailsScreen")}>
                <Text style={styles.cardTitle}>Clothes Drive</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => router.push("organizationProfile")}>
                <Text style={styles.cardSubtitle}>By Charlotte Baseball</Text>
            </TouchableOpacity>
        </View>


        {/* Popular Organization */}
        <View style={styles.popularOrgHeader}>
          <Text style={styles.sectionTitle}>Popular Organizations</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.popularOrgScroll}
        >
          {Array.from({ length: 4 }).map((_, idx) => (
  <TouchableOpacity
    style={styles.popularOrgItem}
    key={idx}
    onPress={() => router.push("organizationProfile")}
  >
    <Image
      source={orgImages[idx]}
      style={styles.orgIcon}
    />
    <Text style={styles.orgName}>{orgNames[idx]}</Text>
  </TouchableOpacity>
))}
        
        </ScrollView >
        <View style={{ height: 0 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 0,
  },

  // Top Bar
  topBar: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 10,
  },
  campusLabel: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  campusName: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.6,
    marginLeft: 10,
    marginTop: 11,
  },


  // Featured Card
  featuredCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 0,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
    height: 200,
    flex: 1,
    justifyContent: "center", // centers vertically
    alignItems: "center",     // centers horizontally

  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: "bold",
    maxWidth: "70%",
    top: 60,
    alignSelf: "flex-start",
    marginLeft: 10,
    zIndex: 1,
    marginTop: 10,
  },
  exploreButton: {
    backgroundColor: "#6741FF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
    bottom: 100,
    marginLeft: 10,
  },
  exploreButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  featuredImage: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
    bottom: 20,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    marginTop: 10,

  },

  // Categories (2 rows x 3 columns)
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    marginBottom: -70,
  },
  categoryItem: {
    width: "32%",
    aspectRatio: 1, // square
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryText: {
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 5,
  },

  // Find Nearby
  findNearbyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeMore: {
    fontSize: 14,
    color: "gray",
  },

  // Nearby Card
  nearbyCard: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    backgroundColor: "#ff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    //marginTop: -15,
    marginHorizontal: 10,
    //marginLeft: 26
  },
  cardSubtitle: {
    fontSize: 12,
    color: "gray",
    marginHorizontal: 10,
    marginBottom: 18,
    //marginLeft: 26
  },

  // Popular Organization
  popularOrgHeader: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  popularOrgScroll: {
    paddingLeft: 15,
    marginBottom: 30,
  },
  popularOrgItem: {
    width: 80,
    marginRight: 15,
    alignItems: "center",
  },
  orgIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
    resizeMode: "cover",
  },
  orgName: {
    fontSize: 11,
    textAlign: "center",
  },
});