import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  wrapper: {
    justifyContent: 'center',
    flex: 1
  },
  notConnected: {
    color: Colors.alert,
    fontSize: 18,
    textAlign: 'center'
  },
  error: {
    color: Colors.alert,
    fontSize: 14,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 16
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10
  },
  button: {
    marginHorizontal: 30,
    marginVertical: 15,
    backgroundColor: Colors.secondary,
    padding: 10
  }
})
