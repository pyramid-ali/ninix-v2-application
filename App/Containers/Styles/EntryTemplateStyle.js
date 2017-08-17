import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  wrapper: {
    height: Metrics.screenHeight,
  },
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.white
  },
  navBar: {
    position: 'absolute',
    height: Metrics.navBarHeight,
    width: Metrics.screenWidth,
    top: 0,
    left: 0,
    paddingHorizontal: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 999,
    backgroundColor: Colors.dark
  },
  title: {
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    width: Metrics.screenWidth,
    color: Colors.white,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: '500'
  },
  leftBarButton: {
    marginLeft: 10,
    marginBottom: 3
  },
  rightBarButton: {
    marginRight: 10,
    marginBottom: 3
  },
  imageHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  formContainer: {
    flex: 1
  }
})
