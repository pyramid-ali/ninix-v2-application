import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26C281',
    position: 'relative'
  },
  setting: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  middleContainer: {
    marginTop: -30,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  slider: {
    flex: 1,
    margin: 0,
    padding: 0,
    marginLeft: -1,
    zIndex: -1
  },
  trackStyle: {
    height: 4
  },
  thumbStyle: {
    width: 0,
    height: 0
  },
  swiper: {
    flex: 1
  },
  swiperDot: {
    width:6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 6
  },
  swiperActiveDot: {
    width:8,
    height: 8,
    borderRadius: 4
  },
  itemWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 30,
    color: Colors.white,
    fontFamily: 'Amaranth-Regular'
  },
  itemImage: {
    marginTop: 15,
    width: Metrics.screenWidth * 0.5,
    height: Metrics.screenWidth * 0.5,
    resizeMode: 'cover'
  }

})
