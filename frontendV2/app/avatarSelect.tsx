import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Easing } from 'react-native';
import AvatarSelector from '../components/avatar';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Generic default avatar
import DefaultProfile from '../assets/avatars/avatardefault.svg';

// All avatars
import Avatar1 from '../assets/avatars/avatar1.svg';
import Avatar2 from '../assets/avatars/avatar2.svg';
import Avatar3 from '../assets/avatars/avatar3.svg';
import Avatar4 from '../assets/avatars/avatar4.svg';
import Avatar5 from '../assets/avatars/avatar5.svg';
import Avatar6 from '../assets/avatars/avatar6.svg';
import Avatar7 from '../assets/avatars/avatar7.svg';
import Avatar8 from '../assets/avatars/avatar8.svg';
import Avatar9 from '../assets/avatars/avatar9.svg';
import Avatar10 from '../assets/avatars/avatar10.svg';
import Avatar11 from '../assets/avatars/avatar11.svg';
import Avatar12 from '../assets/avatars/avatar12.svg';
import Avatar13 from '../assets/avatars/avatar13.svg';
import Avatar14 from '../assets/avatars/avatar14.svg';
import Avatar15 from '../assets/avatars/avatar15.svg';
import Avatar16 from '../assets/avatars/avatar16.svg';
import Avatar17 from '../assets/avatars/avatar17.svg';
import Avatar18 from '../assets/avatars/avatar18.svg';
import Avatar19 from '../assets/avatars/avatar19.svg';
import Avatar20 from '../assets/avatars/avatar20.svg';
import Avatar21 from '../assets/avatars/avatar21.svg';

const router = useRouter();

const avatarComponents: React.FC<SvgProps>[] = [
  Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6,
  Avatar7, Avatar8, Avatar9, Avatar10, Avatar11,
  Avatar12, Avatar13, Avatar14, Avatar15, Avatar16,
  Avatar17, Avatar18, Avatar19, Avatar20, Avatar21,
];

export default function AvatarSetupScreen() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const SelectedAvatar = selectedId ? avatarComponents[selectedId - 1] : null;

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  const router = useRouter();
  const [exiting, setExiting] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
  Animated.timing(slideAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }).start();
}, []);

  useEffect(() => {
    if (selectedId) {
      scaleAnim.setValue(0.95);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
      }).start();
    }
  }, [selectedId]);

const handleExit = () => {
  if (exiting) return;
  setExiting(true);

  Animated.timing(fadeAnim, {
    toValue: 1000,
    duration: 300,
    useNativeDriver: true,
  }).start(() => {
    router.back();
  });
};


const handleSubmit = async () => {
  console.log("Selected avatar ID:", selectedId);
  // Add backend API logic here
  handleExit(); // animate and exit
};

  return (
    <View style={styles.screenBackground}>
      <Animated.View
        style={[
          styles.animatedCard,
          { opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <LinearGradient colors={['#f5f5f5', '#ffffff']} style={styles.container}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleExit}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <View style={styles.previewCircle}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%', height: '100%' }}>
              {SelectedAvatar ? (
                <SelectedAvatar width="100%" height="100%" />
              ) : (
                <DefaultProfile width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
              )}
            </Animated.View>
          </View>

          <Text style={styles.title}>✨ Choose Your Avatar ✨</Text>
          <Text style={styles.subtitle}>Pick a profile picture to represent you!</Text>

          <AvatarSelector selectedId={selectedId} onSelect={setSelectedId} />

          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
  <TouchableOpacity
    style={[styles.saveButton, (!selectedId || exiting) && styles.saveButtonDisabled]}
    onPress={handleSubmit}
    disabled={exiting || !selectedId}
    onPressIn={() =>
      Animated.spring(buttonScale, {
        toValue: 0.95,
        useNativeDriver: true,
        friction: 4,
      }).start()
    }
    onPressOut={() =>
      Animated.spring(buttonScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
      }).start()
    }
  >
    <Text style={styles.saveButtonText}>Select</Text>
  </TouchableOpacity>
</Animated.View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingTop: 40, // space for floating card

  },
  animatedCard: {
    flex: 1,
    //marginHorizontal: 10,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 10,
  shadowColor: '#000',
shadowOpacity: 0.3,
shadowRadius: 30,
shadowOffset: { width: 0, height: -10 },
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  previewCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 100,
    borderRadius: 50,
    marginBottom: 60,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  cancelButton: {
    position: 'absolute',
    top: 65,
    left: 20,
    zIndex: 10,
  },
  cancelText: {
    color: '#6741FF',
    fontSize: 16,
    fontWeight: '400',
  },
});