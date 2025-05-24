import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import ChartCarousel from './ChartCarousel';
import TeamPerformanceSection from './TeamPerformanceSection.tsx';
import { fetchDonations } from '../services/api';
import * as SecureStore from 'expo-secure-store';

export default function QuickViewContainer({ textColor }: { textColor: string }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [donationData, setDonationData] = useState([]);

  // Temporarily disable live data fetch
  /*
  useEffect(() => {
    const getDonations = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) return;
      const data = await fetchDonations(token);
      setDonationData(data);
    };

    getDonations();
  }, []);
  */

  return (
    <View style={styles.wrapper}>
      <ChartCarousel scrollX={scrollX} data={donationData} />
      <TeamPerformanceSection textColor={textColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 0,
    width: '100%',
  },
});