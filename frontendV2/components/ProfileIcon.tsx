import React from 'react';
import { TouchableOpacity, Image, StyleSheet, GestureResponderEvent } from 'react-native';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

export default function ProfileIcon({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require('../assets/images/screenshot.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});