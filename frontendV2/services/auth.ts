// frontendV2/services/auth.ts
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://www.funduhub.com/api/token/';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || 'Login failed');
    }

    const { access, refresh } = await response.json();
    await SecureStore.setItemAsync('accessToken', access);
    await SecureStore.setItemAsync('refreshToken', refresh);
    return { access, refresh };
  } catch (err: any) {
    console.error('Login error:', err.message);
    throw err;
  }
};

export const getAccessToken = () => SecureStore.getItemAsync('accessToken');
export const getRefreshToken = () => SecureStore.getItemAsync('refreshToken');