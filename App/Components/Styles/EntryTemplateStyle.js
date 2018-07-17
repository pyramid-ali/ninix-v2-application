import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/index';

export default StyleSheet.create({
  wrapper: {
    height: Metrics.screenHeight,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    marginBottom: 15,
  },
});
