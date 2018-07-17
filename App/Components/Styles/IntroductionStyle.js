import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    padding: 20,
    color: 'white',
    fontFamily: 'PoiretOne-Regular',
  },
  description: {
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    padding: 30,
    color: 'white',
    fontFamily: 'PoiretOne-Regular',
    fontWeight: 'bold',
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
