import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  error: {
    backgroundColor: Colors.alert,
    padding: 10
  },
  white: {
    color: Colors.white
  },
  listSubtitle: {
    fontFamily: 'PoiretOne-Regular',
    color: Colors.gray
  }
})
