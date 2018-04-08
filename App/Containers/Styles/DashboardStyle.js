import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  top: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  informationContainer: {
    flex: 1,
    width: Metrics.screenWidth * 8 / 10,
    justifyContent: 'center'
  },
  statusContainer: {
    flex: -1,
    paddingBottom: 10
  },
  status: {
    color: Colors.white,
    fontSize: 20,
    textAlign: 'center'
  },
  statusSecond: {
    marginBottom: 10,
    fontSize: 14,
    marginTop: 0
  },
  bottom: {
    flex: 6
  },
  imageContainer: {
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'center',

  }

})
