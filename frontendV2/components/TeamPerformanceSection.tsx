import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

type Member = {
  id: string;
  name: string;
  profileImage: any;
  amountRaised: string;
};

const mockTeam: Member[] = [
  {
    id: '1',
    name: 'Jordan Thomas',
    profileImage: require('../assets/images/profileImage.png'),
    amountRaised: '$1,250',
  },
  {
    id: '2',
    name: 'Taylor Lee',
    profileImage: require('../assets/images/profileImage.png'),
    amountRaised: '$980',
  },
  {
    id: '3',
    name: 'Morgan Diaz',
    profileImage: require('../assets/images/profileImage.png'),
    amountRaised: '$870',
  },
];

type Props = {
  textColor: string;
};

export default function TeamPerformanceSection({ textColor }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: textColor }]}>Team Performance</Text>
      <FlatList
        data={mockTeam}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={item.profileImage} style={styles.avatar} />
            <Text style={[styles.name, { color: textColor }]}>{item.name}</Text>
            <Text style={[styles.amount, { color: textColor }]}>{item.amountRaised}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});