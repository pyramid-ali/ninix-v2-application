import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
