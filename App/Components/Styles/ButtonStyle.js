import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    width: '100%',
    backgroundColor: Colors.primary,
    color: Colors.white,
    fontSize: 18,
    paddingVertical: 10,
    borderRadius: 5,
    textAlign: 'center',
    alignSelf: 'center',
  },
  disabled: {
    backgroundColor: 'transparent',
    color: Colors.gray,
    borderColor: Colors.gray,
    borderWidth: 1,
  },
});
