import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search..." />
        </View>
      </View>

      {/* Recent Searches */}
      <Text style={styles.recentSearchTitle}>Recent Searches</Text>
      <TouchableOpacity style={styles.orgButton}>
        <Image source={require('@/assets/images/unccLogo.png')} style={styles.orgImage} />
        <Text style={styles.orgName}>UNC Charlotte</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.orgButton}>
        <Image source={require('@/assets/images/orgImage.png')} style={styles.orgImage} />
        <Text style={styles.orgName}>Another Organization</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  recentSearchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orgButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
  },
  orgImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  orgName: {
    fontSize: 16,
  },
});

export default SearchScreen;