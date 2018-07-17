import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  title: {
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 20,
  },

  description: {
    textAlign: 'left',
    marginBottom: 10,
  },
  error: {
    color: Colors.alert,
    fontSize: 16,
  },
  timerContainerText: {
    color: Colors.dark,
  },
  input: {
    marginBottom: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    color: Colors.primary,
  },
  disableLink: {
    color: Colors.gray,
  },
});
