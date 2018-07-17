import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
    fontSize: 60,
    color: Colors.secondary,
    fontFamily: 'PoiretOne-Regular',
  },
});
