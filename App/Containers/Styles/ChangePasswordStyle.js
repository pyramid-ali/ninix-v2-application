import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  submitButton: {
    backgroundColor: Colors.secondary,
    width: Metrics.screenWidth / 2,
    alignSelf: 'flex-end',
    padding: 5,
    marginRight: 5
  }
})
