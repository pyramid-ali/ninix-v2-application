import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    flex:4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  textContainer: {
    flex: 6,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    marginHorizontal: 15,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  description: {
    textAlign: Platform.OS === 'ios' ? 'justify': 'center',
    marginHorizontal: 15
  }
})
