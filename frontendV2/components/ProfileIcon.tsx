import React from 'react';
import { TouchableOpacity, Image, StyleSheet, GestureResponderEvent, Text, View } from 'react-native';
import { useAuth } from '../context/authContext'; // adjust path

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

export default function ProfileIcon({ onPress }: Props) {
  const { authUser } = useAuth();

  const profilePic = authUser?.profile_pic;
  const isManager = authUser?.role === 'manager';
  const initials = authUser
    ? `${authUser.first_name?.[0] ?? ''}${authUser.last_name?.[0] ?? ''}`.toUpperCase()
    : '';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isManager && styles.managerRing, // gold ring if manager
      ]}
      onPress={onPress}
    >
      {profilePic ? (
        <Image source={{ uri: profilePic }} style={styles.image} />
      ) : (
        <View style={styles.initialsCircle}>
          <Text style={styles.initialsText}>{initials || 'U'}</Text>
        </View>
      )}
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
    backgroundColor: '#6741FF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  managerRing: {
    borderColor: '#FFD700', // gold
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  initialsCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#6741FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});