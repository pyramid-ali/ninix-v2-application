import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  animatedDot: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#1BA39C',
    zIndex: 3
  },
  dots: {
    zIndex: 2
  }
})
