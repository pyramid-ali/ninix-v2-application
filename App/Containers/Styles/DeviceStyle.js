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
    backgroundColor: Colors.primary
  },
  rightBarButton: {
    color: Colors.white
  },
  deviceContainer: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.3,
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
  },

  logHeader: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: Colors.dark,
    color: Colors.white
  },

  logActivityIndicator: {
    marginTop: 10
  },

  logHeaderContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  /*
   * divider
   */

  dividerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3
  },
  dividerLine: {
    width: 100,
    height: 1,
    backgroundColor: Colors.black
  },
  dividerCenter: {
    width: 10,
    height: 10,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.black,
    marginHorizontal: 1,
    transform: [
      {
        rotate: '45deg'
      }
    ]
  }
})
