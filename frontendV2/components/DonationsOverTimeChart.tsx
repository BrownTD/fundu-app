import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import {
  LineChart,
  LineChartPath,
  LineChartDot,
  LineChartCursorCrosshair,
  LineChartProvider,
  LineChartYAxis,
} from '@rainbow-me/animated-charts';
import { useAuth } from '../context/authContext'; // adjust path

const screenWidth = Dimensions.get('window').width * 0.85;

export default function DonationsOverTimeChart() {
  const { authUser } = useAuth(); // get logged-in user's info
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!authUser?.organization?.id) return;

      try {
        const res = await fetch(
          `https://www.funduhub.com/api/donations/?org=${authUser.organization.id}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`, // optional: only if auth required
            },
          }
        );

        if (res.ok) {
          const json = await res.json();
          const amounts = json.map((entry: any) => entry.amount);
          setData(amounts);
        } else {
          console.error('Failed to fetch donations:', res.status);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [authUser]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6741FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donations Over Time</Text>
      <LineChartProvider data={data}>
        <View style={styles.chartRow}>
          <LineChartYAxis
            style={{ marginRight: 8 }}
            textStyle={{ color: '#888' }}
          />
          <LineChart width={screenWidth} height={220}>
            <LineChartPath color="#6741FF" width={3} animateOnMount />
            <LineChartDot />
            <LineChartCursorCrosshair />
          </LineChart>
        </View>
      </LineChartProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});