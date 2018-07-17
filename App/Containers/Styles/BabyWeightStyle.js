import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    paddingBottom: 10,
    fontFamily: 'PoiretOne-Regular',
  },
  focusText: {
    textAlign: 'center',
    fontSize: 50,
    color: 'white',
    paddingVertical: 10,
    fontFamily: 'DancingScript-Regular',
  },
  suffix: {
    flex: -1,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.white,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#eee',
    fontFamily: 'Courgette-Regular',
  },

  inputContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 30,
  },

  inputTitle: {
    fontSize: 18,
    color: 'gray',
    fontFamily: 'Courgette-Regular',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputSubtitle: {
    fontSize: 14,
    paddingHorizontal: 15,
    fontFamily: 'PoiretOne-Regular',
    textAlign: 'center',
  },
});
