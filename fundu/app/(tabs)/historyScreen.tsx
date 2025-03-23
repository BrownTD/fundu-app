import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      {/* Clock Image */}
      <Image source={require('@/assets/images/clock.png')} style={styles.clockImage} />

      {/* No Contribution Text */}
      <Text style={styles.noContributionText}>No Contribution</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    left: 10,
  },
  backText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  clockImage: {
    width: 100,
    height: 100,
    marginTop: 100,
  },
  noContributionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default HistoryScreen;