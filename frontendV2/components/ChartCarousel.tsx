import React, { useRef, useState } from 'react';
import {
  View,
  Animated,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width;

const mockData = [
  {
    title: 'Donations Over Time',
    type: 'line',
    data: {
      labels: ['Mar 12', 'Mar 19', 'Mar 26', 'Apr 2', 'Apr 8'],
      datasets: [
        {
          data: [50, 100, 75, 150, 125],
        },
      ],
    },
  },
  {
    title: 'Average Donation by Day',
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [40, 70, 60, 90, 100, 80, 55],
        },
      ],
    },
  },
  {
    title: 'Most Active Time of Day',
    type: 'bar',
    data: {
      labels: ['8am', '12pm', '4pm', '8pm'],
      datasets: [
        {
          data: [20, 80, 50, 90],
        },
      ],
    },
  },
  {
    title: 'Day-over-Day Momentum',
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          data: [100, 130, 160, 120],
        },
      ],
    },
  },
];

type Props = {
  scrollX: Animated.Value;
};

export default function ChartCarousel({ scrollX }: Props) {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={mockData}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        snapToInterval={CHART_WIDTH * 0.85 + 10}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        keyExtractor={(_, i) => i.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * CHART_WIDTH * 0.85,
            index * CHART_WIDTH * 0.85,
            (index + 1) * CHART_WIDTH * 0.85,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.92, 1, 0.92],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });

          const chartProps = {
            data: item.data,
            width: CHART_WIDTH * 0.8,
            height: 240,
            chartConfig: {
              backgroundColor: '#f0f0f0',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(103, 65, 255, ${opacity})`,
              strokeWidth: 2,
              barPercentage: 0.5,
              decimalPlaces: 0,
            },
            style: {
              borderRadius: 16,
            },
          };

          return (
            <Animated.View
              style={[
                styles.chartContainer,
                {
                  transform: [{ scale }],
                  opacity,
                  marginRight: 10,
                },
              ]}
            >
              <Text style={styles.title}>{item.title}</Text>
              {item.type === 'line' ? (
                <LineChart {...chartProps} />
              ) : (
                <BarChart {...chartProps} />
              )}
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    width: CHART_WIDTH * 0.85,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});