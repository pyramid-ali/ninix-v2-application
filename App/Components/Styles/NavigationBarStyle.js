import { StyleSheet } from 'react-native'
import Metrics from '../../Themes/Metrics'

const paddingBottom = 5

export default StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: paddingBottom,
    paddingHorizontal: 10,
    backgroundColor: 'transparent'
  },
  title: {
    position: 'absolute',
    width: Metrics.screenWidth,
    bottom: paddingBottom,
    left: 0,
    alignItems: 'center',
    textAlign: 'center'
  },
})
