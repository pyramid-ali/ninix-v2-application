import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    position: 'absolute',
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark,
  },
  innerCircle: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  light: {
    backgroundColor: Colors.gray,
  },
});
