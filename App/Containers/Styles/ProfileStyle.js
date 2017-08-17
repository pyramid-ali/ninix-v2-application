import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  informationContainer: {
    height: Metrics.screenHeight / 2,
    backgroundColor: 'black'
  },
  backgroundImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 2,
    resizeMode: 'cover'
  },
  overlay: {
    flex: 1,
    backgroundColor: `rgba(${Colors.darkRGB} , 0.8)`
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: 'flex-end',
    height: Metrics.navBarHeight,
    width: Metrics.screenWidth,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    fontSize: 18,
    fontWeight: 'bold',
    width: Metrics.screenWidth,
    textAlign: 'center',
    color: Colors.white
  },
  leftBarButton: {
    color: Colors.white
  },
  rightBarButton: {
    color: Colors.white
  },
  detailsContainer: {
    backgroundColor: Colors.gray
  },
  summary: {
    backgroundColor: Colors.white,
    height: 80,
    borderTopWidth: 2,
    borderTopColor: Colors.dark,
    flexDirection: 'row'
  },
  stat: {
    width: Metrics.screenWidth / 3,
    justifyContent: 'center'
  },
  noBorder: {
    borderRightWidth: 0
  },
  statText: {
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: `rgba(${Colors.darkRGB}, 0.4)`,
  },
  statTitle: {
    color: Colors.dark,
    fontSize: 14,
    paddingBottom: 5
  },
  statDetail: {
    fontSize: 18
  }
})
