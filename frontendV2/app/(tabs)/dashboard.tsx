import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router'; 
import {
  View,
  Text,
  ScrollView,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import QuickViewContainer from 'components/QuickViewContainer';
import DeepDiveContainer from 'components/DeepDiveContainer';
import KPICard from 'components/KPICard';
import ViewToggle from 'components/ViewToggle';
import ProfileIcon from 'components/ProfileIcon';
import { useAuth } from 'context/authContext'; 


export default function DashboardScreen() {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<'quick' | 'deep'>('quick');
  const toggleAnim = useRef(new Animated.Value(0)).current;
  const sliderPosition = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });
  const viewAnim = useRef(new Animated.Value(1)).current;
  const isDeep = activeView === 'deep';

  const cardAnimations = [0, 1, 2, 3].map(() => ({
    opacity: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(10)).current,
  }));

  useEffect(() => {
    // Animate toggle
    Animated.timing(toggleAnim, {
      toValue: isDeep ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();

    // Pulse animation
    Animated.sequence([
      Animated.timing(viewAnim, {
        toValue: 1.02,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(viewAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Reset card anims
    cardAnimations.forEach(({ opacity, translateY }) => {
      opacity.setValue(0);
      translateY.setValue(10);
    });

    Animated.stagger(
      150,
      cardAnimations.map(({ opacity, translateY }) =>
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
        ])
      )
    ).start();
  }, [isDeep]);

  const backgroundColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#212121'],
  });

  const textColor = isDeep ? '#ffffff' : '#000000';

  const cardBackground = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f1f1f1', '#3a3a3a'],
  });

  const cardTextColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#ffffff'],
  });

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.headerWrapper}>
            <Text style={[styles.headerTitle, { color: textColor }]}>
              Today{' '}
              <Text style={styles.headerDate}>
                {new Date().toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </Text>
            <ProfileIcon onPress={() => router.push('/profileDetails')} />
          </View>
  
          {/* KPI Cards */}
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.kpiRow}>
              {cardAnimations.map((anim, index) => (
                <Animated.View
                  key={index}
                  style={{
                    opacity: anim.opacity,
                    transform: [{ translateY: anim.translateY }],
                    width: '47%',
                    marginBottom: 10,
                  }}
                >
                  <KPICard
                    title={['Total Raised', 'Donors', 'Goal Progress', 'Avg Donation'][index]}
                    value={['$7,500', '124', '75%', '$60'][index]}
                    bg={cardBackground}
                    textColor={cardTextColor}
                  />
                </Animated.View>
              ))}
            </View>
          </View>
  
          {/* View Toggle */}
          <ViewToggle
            isDeep={isDeep}
            sliderPosition={sliderPosition}
            onToggle={(view) => setActiveView(view)}
          />
  
          {/* View Container */}
          <Animated.View
            style={{ width: '100%', flex: 1, transform: [{ scale: viewAnim }] }}
          >
            {activeView === 'quick' ? (
              <QuickViewContainer textColor={textColor} />
            ) : (
              <DeepDiveContainer textColor={textColor} />
            )}
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 90,
  },
  kpiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerWrapper: {
    paddingHorizontal: 20,
    marginTop: 0,
    marginBottom: 10,
  },
  
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  
  headerDate: {
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 0.6,
  },
});