import * as SecureStore from 'expo-secure-store';

export const fetchDonations = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (!accessToken) throw new Error('No token found');

    const response = await fetch(
      'https://www.funduhub.com/api/donations/?summary=true',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch donations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching donations:', error);
    return [];
  }
};