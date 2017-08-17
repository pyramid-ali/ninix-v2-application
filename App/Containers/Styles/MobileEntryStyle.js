import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 40,
    marginBottom: 30
  },
  description: {
    textAlign: 'left',
    marginBottom: 10,
  },
  error: {
    color: Colors.alert
  }
})
