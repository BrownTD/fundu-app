import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  isDeep: boolean;
  sliderPosition: Animated.AnimatedInterpolation<string | number>;
  onToggle: (view: 'quick' | 'deep') => void;
};

export default function ViewToggle({ isDeep, sliderPosition, onToggle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.toggleBar}>
        <Animated.View style={[styles.slider, { left: sliderPosition }]}>
          <LinearGradient
            colors={isDeep ? ['#e4f502', '#cdf202'] : ['#7a5eff', '#6741FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
          />
        </Animated.View>

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => onToggle('quick')}
        >
          <Text style={[styles.toggleText, { color: '#fff' }]}>
            Quick View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => onToggle('deep')}
        >
          <Text style={[styles.toggleText, { color: isDeep ? '#000' : '#fff' }]}>
            Deep Dive
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  toggleBar: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  toggleText: {
    fontWeight: 'bold',
  },
  slider: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    borderRadius: 20,
    zIndex: 0,
  },
});