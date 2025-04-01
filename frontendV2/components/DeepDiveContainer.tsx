import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width 

const mockData = [
  { title: 'Donations by Source' },
  { title: 'Engagement Over Time' },
  { title: 'Campaign Reach' },
  { title: 'Conversion Rates' },
];

export default function DeepDiveContainer({ textColor }: { textColor: string }) {
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
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
    <View style={styles.wrapper}>
      <Animated.FlatList
        ref={flatListRef}
        data={mockData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {

          return (
            <Animated.View
              style={[
                styles.chartContainer,
                //{marginLeft: index === 0 ? 0 : 10},
              ]}
            >
              <View style={styles.chartPlaceholder} />
            </Animated.View>
          );
        }}
      />

      <View style={styles.dotBar}>
        {mockData.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <TouchableOpacity key={i} onPress={() => handleDotPress(i)}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    backgroundColor: isActive ? '#cdf202' : '#000',
                    transform: [{ scale: isActive ? 1.4 : 1 }],
                    opacity: isActive ? 1 : 0.3,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    //position: 'absolute'
  },
  chartContainer: {
    width: CHART_WIDTH,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  chartPlaceholder: {
    width: '90%',
    height: 220,
    backgroundColor: '#d0d0ff',
    borderRadius: 12,
  },
  dotBar: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});