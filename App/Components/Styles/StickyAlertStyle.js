import { StyleSheet } from 'react-native'
import Metrics from '../../Themes/Metrics'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: Metrics.screenWidth,
    zIndex: 99999,
    minHeight: 40,
    paddingTop: 15
  },
  text: {
    color: Colors.white,
    padding: 5,
    paddingBottom: 10,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  rightButton: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    paddingLeft: 30
  },
  leftButton: {
    position: 'absolute',
    bottom: 5,
    left: 10,
  }


})
