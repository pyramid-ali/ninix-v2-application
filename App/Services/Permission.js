import { Platform, PermissionsAndroid } from 'react-native'

export const checkAndGetPermission = async (permission, message) => {
  if (Platform.OS === 'android') {
    let granted = await PermissionsAndroid.check(permission)
    if (!granted) {
      return await PermissionsAndroid.request(
        permission,
        message
      ) === PermissionsAndroid.RESULTS.GRANTED
    }
    return granted
  }

  return true
}
