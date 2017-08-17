import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.white
   },
  navBar: {
    width: Metrics.screenWidth,
    position: 'absolute',
    height: Metrics.navBarHeight,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 5
  },
  barButton: {
    color: Colors.white
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    width: Metrics.screenWidth,
    paddingBottom: 5,
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  deviceContainer: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deviceShapeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deviceShape: {
    width: Metrics.screenWidth * 0.6,
    height: Metrics.screenHeight * 0.15,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderRadius: 5
  },
  deviceShapeHead: {
    width: 30,
    height: 30,
    borderColor: Colors.primary,
    borderRadius: 3,
    borderWidth: 5,
    marginLeft: -5
  },
  batteryCharge: {
    fontSize: 40,
    textAlign: 'center'
  },
  batteryChargeFooter: {
    fontSize: 12,
    textAlign: 'center'
  },
  logContainer: {
    marginTop: 15,
    backgroundColor: Colors.dark
  },
  firmwareDetails: {

  },
  firmwareText: {
    textAlign: 'center',
    color: Colors.gray
  },
  firmwareButton: {
    textAlign: 'center',
    color: Colors.primary
  }
})
