import { AsyncStorage } from 'react-native'

export const setItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value)
}

export const getItem = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
}

export const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key)
}
