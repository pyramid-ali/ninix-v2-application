import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: Colors.primary
  },
  rightBarButton: {
    color: Colors.white,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingBottom: 5
  },

  batteryContainer: {
    flex: 1,
    backgroundColor: Colors.primary
  },


  statusText: {
    textAlign: 'center'
  },

  statusContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  connect: {
    fontSize: 20,
    color: Colors.white,
    paddingBottom: 10,
    borderBottomColor: Colors.white,
    borderBottomWidth: 2
  },

  firmwareText: {
    textAlign: 'center',
    color: Colors.white
  },
  firmwareButton: {
    textAlign: 'center',
    color: Colors.dark,
    paddingVertical: 5
  },

  successText: {
    color: Colors.secondary
  },

  animationWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  animationLottie: {
    width: Metrics.screenWidth,
    height: 50,
    marginVertical: 20,
  },
  deviceName: {
    textAlign: 'center',
    fontSize: 30,
    color: Colors.white
  },
  deviceInformation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  hardwareRevision: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.white
  },
  disconnectButton: {
    width: Metrics.screenWidth * 0.5,
  }
})
