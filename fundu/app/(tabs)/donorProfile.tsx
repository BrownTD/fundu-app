import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DonorProfileScreen = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Background Image Container */}
      <View style={styles.profileContainer}>
        {/* Image Upload */}
        <View style={styles.imageUploadContainer}>
          <TouchableOpacity style={styles.imageCircle}>
            <Text style={styles.imageUploadText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* User Name */}
        <Text style={styles.userName}>John Doe</Text>

        {/* Contributions & Givings */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statTextBold}>{Math.floor(Math.random() * 100)}</Text>
            <Text style={styles.statText}>Contributions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statTextBold}>${Math.floor(Math.random() * 1000)}</Text>
            <Text style={styles.statText}>Givings</Text>
          </View>
        </View>

        {/* Follow Button */}
        <TouchableOpacity
          style={[styles.followButton, isFollowing && styles.followButton]}
          onPress={toggleFollow}
        >
          <Text style={styles.followButtonText}>{isFollowing ? 'Following' : 'Follow'}</Text>
        </TouchableOpacity>

        {/* User Bio */}
        <Text style={styles.userBio}>Passionate about making a difference in the community.</Text>

        {/* Profile Options */}
        <TouchableOpacity style={styles.profileOption}>
          <Text style={styles.optionText}>Profile Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileOption}>
          <Text style={styles.optionText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileOption}>
          <Text style={styles.optionText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileOption}>
          <Text style={styles.optionText}>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileContainer: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  imageUploadContainer: {
    position: 'absolute',
    top: -50,
  },
  imageCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadText: {
    fontSize: 30,
    color: '#777',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 60,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
  },
  statTextBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  followButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7E57C2',
  },
  followButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7E57C2',
  },
  userBio: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  profileOption: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#7E57C2',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7E57C2',
  },
});

export default DonorProfileScreen;