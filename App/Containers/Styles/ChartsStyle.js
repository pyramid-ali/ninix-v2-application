import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1/2,
    backgroundColor: '#F5FCFF',
    padding: 15
  },
  chart: {
    flex: 1
  },
  chartHeader: {
    textAlign: 'center',
    paddingVertical: 5,
  }
})
