import { AsyncStorage } from 'react-native'

const save = async (token: object) => {
  const string = JSON.stringify(token)
  await AsyncStorage.setItem('@token', string)
}

const load = async () => {
  const token = await AsyncStorage.getItem('@token')
  return JSON.parse(token)
}

const  remove = async () => {
  await AsyncStorage.removeItem('@token')
}

export default {
  save, load, remove
}
