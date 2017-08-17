import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
    zIndex: 100,
    borderColor: 'white',
    borderWidth: 2,
    resizeMode: 'cover'
  },
  arrow: {
    padding: 5,
    width: 20,
    height: 20,
    backgroundColor: 'white',
    transform: [
      {
        rotateZ: '45deg'
      }
    ],
    zIndex: 99
  },
  leftArrow: {
    marginRight: -12
  },
  rightArrow: {
    marginLeft: -12
  }
})
