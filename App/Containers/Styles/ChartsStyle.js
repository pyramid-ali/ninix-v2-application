import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    paddingVertical: 10
  },
  navBar: {
    backgroundColor: Colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white
  },
  title: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center'
  },
  segment: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  chartWrapper: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: 'white'
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 5,
    marginBottom: 5
  }
})
