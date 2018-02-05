import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light
  },
  indicatorContainerStyle: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: Metrics.screenWidth - 80,
    height: 50
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 10
  }
})
