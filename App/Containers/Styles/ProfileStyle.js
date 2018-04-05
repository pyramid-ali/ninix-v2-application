import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: `rgba(${Colors.blackRGB}, 0.8)`
  },
  rightBarButtonText: {
    color: Colors.white
  },
  topContainer: {
    flex: 1,
    backgroundColor: `rgba(${Colors.darkRGB}, 0.7)`,
    width: Metrics.screenWidth,
    height: (Metrics.screenHeight - Metrics.navBarHeight) / 2,
  },
  imagesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  babyContainer: {
    alignItems: 'center'
  },
  babyText: {
    color: Colors.white,
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  babyImage: {
    borderColor: Colors.light,
    borderWidth: 2
  },
  parentContainer: {
    alignItems: 'center'
  },
  parentText: {
    color: Colors.white,
    marginTop: 15
  },
  parentImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: Colors.primary,
    borderWidth: 1
  },
  backgroundImage: {
    width: Metrics.screenWidth,
    height: (Metrics.screenHeight - Metrics.navBarHeight) / 2,
    resizeMode: 'cover',
    position: 'absolute'
  },
  bottomText: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: 10,
    paddingBottom: 10
  },
  bottomContainer: {
    flex: 1,
    height: 300
  }
})
