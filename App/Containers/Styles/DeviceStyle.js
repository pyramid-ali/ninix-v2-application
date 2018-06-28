import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  batteryContainer: {
    flex: 1,
  },
  connectedContainer: {
    flex: 1,
    justifyContent: 'space-between'
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
    color: Colors.dark
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
  connectedTitle: {
    textAlign: 'center',
    fontSize: 25
  },
  deviceName: {
    textAlign: 'center',
    color: Colors.gray,
    fontSize: 15,
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
  },

  notConnectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notConnectedTitle: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center'
  },
  notConnectedDescription: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    padding: 20
  },
  disconnectReason: {
    fontSize: 12,
    color: Colors.alert,
    textAlign: 'center',
    padding: 20,
    marginTop: 20
  },
  connectButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  disconnectButton: {
    backgroundColor: Colors.alert,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 15,
    marginVertical: 15
  },
  turnOffButton: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 15,
    marginVertical: 5
  },
  connectedListSubtitle: {
    color: Colors.gray
  },
  connectedRightTitle: {
    color: Colors.dark,
    fontSize: 12
  }

})
