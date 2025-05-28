import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

// Import avatars as React components
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

const avatarSize = 80;

const avatarComponents: React.FC<SvgProps>[] = [
  Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6,
    Avatar7, Avatar8, Avatar9, Avatar10, Avatar11,
    Avatar12, Avatar13, Avatar14, Avatar15, Avatar16,
    Avatar17, Avatar18, Avatar19, Avatar20, Avatar21,
];

type Props = {
  onSelect: (avatarId: number) => void;
  selectedId?: number;
};

export default function AvatarSelector({ onSelect, selectedId }: Props) {
  const avatars = avatarComponents.map((Component, index) => ({
    id: index + 1,
    Svg: Component,
  }));

  const renderItem = ({ item }: { item: { id: number; Svg: React.FC<SvgProps> } }) => {
    const isSelected = item.id === selectedId;
    const Svg = item.Svg;

    return (
      <TouchableOpacity onPress={() => onSelect(item.id)}>
        <View style={[styles.avatarContainer, isSelected && styles.selected]}>
          <Svg width={avatarSize} height={avatarSize} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={avatars}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    />
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  avatarContainer: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    marginHorizontal: 6,
    backgroundColor: '#transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderWidth: 3,
    borderColor: '#6741FF',
  },
});