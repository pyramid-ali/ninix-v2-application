import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  wrapper: {
    justifyContent: 'center',
    flex: 1
  },
  notConnectedTitle: {
    color: Colors.alert,
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10
  },
  notConnectedText: {
    color: Colors.gray,
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 40
  },
  error: {
    color: Colors.white,
    backgroundColor: Colors.alert,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    color: Colors.black,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'PoiretOne-Regular'
  },
  subtitle: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'PoiretOne-Regular'
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10
  },
  button: {
    marginHorizontal: 30,
    marginVertical: 15,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 30,
    borderColor: Colors.dark,
    borderWidth: 1
  },
  buttonText: {
    color: Colors.dark
  },
})
