import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },

  title: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center'
  },
  line: {
    alignSelf: 'center',
    width: Metrics.screenWidth - 40,
    backgroundColor: Colors.dark,
    height: 1
  },
  header: {
    padding: 10,
    backgroundColor: `rgba(${Colors.darkRGB}, 0.5)`
  },
  headerText: {
    alignItems: 'center',
    textAlign: 'center',
    color: Colors.white
  },
  error: {
    backgroundColor: Colors.alert,
    padding: 10
  },
  white: {
    color: Colors.white
  }
})
