import { StyleSheet } from 'react-native'
import Metrics from '../../Themes/Metrics';
import Colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  batteryWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  batteryBody: {
    width: Metrics.screenWidth * 0.6,
    height: Metrics.screenHeight * 0.15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.dark,
    borderRadius: 5
  },
  redBorder: {
    borderColor: Colors.alert,
  },
  batteryHead: {
    width: 20,
    height: 30,
    borderColor: Colors.dark,
    borderRadius: 3,
    borderWidth: 2,
    marginLeft: -2
  },
  batteryCharge: {
    fontSize: 40,
    textAlign: 'center'
  },
  batteryFooter: {
    fontSize: 12,
    textAlign: 'center'
  },
  barContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  bar: {
    backgroundColor: Colors.dark,
    marginHorizontal: 1,
    marginVertical: 1
  },
  lowBattery: {
    backgroundColor: Colors.alert
  },
  fullCharge: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  fullChargeTitle: {
    fontSize: 16,
    color: Colors.white
  },
  fullChargeDescription: {
    fontSize: 12
  },
  noBar: {
    flex: 1
  }
})
