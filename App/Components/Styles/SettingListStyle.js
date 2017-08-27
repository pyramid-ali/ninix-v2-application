import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  line: {
    flex: 1,
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.black,
    height: 1,
    alignSelf: 'center'
  }
})
