import React, { useRef, useState } from 'react';
import {
  View,
  Animated,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import DonationsOverTimeChart from './DonationsOverTimeChart';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width;

const mockData = [
  { title: 'Donations by Source' },
  { title: 'Engagement Over Time' },
  { title: 'Campaign Reach' },
  { title: 'Conversion Rates' },
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
              <View style={styles.chartPlaceholder} />
            </Animated.View>
          );
        }}
      />

      {/* 
      Pagination dots (currently disabled for peek effect)

      <View style={styles.dotBar}>
        {mockData.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <TouchableOpacity key={i} onPress={() => handleDotPress(i)}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor: isActive ? '#6741FF' : '#000',
                    transform: [{ scale: isActive ? 1.4 : 1 }],
                    opacity: isActive ? 1 : 0.3,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    width: CHART_WIDTH * 0.85,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholder: {
    width: '100%',
    height: 280,
    backgroundColor: '#d0d0ff',
    borderRadius: 12,
  },
  dotBar: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});