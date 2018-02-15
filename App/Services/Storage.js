import { AsyncStorage } from 'react-native'

export const setItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value)
}

export const getItem = async (key: string) => {
  return await AsyncStorage.getItem(key)
}

export const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key)
}
