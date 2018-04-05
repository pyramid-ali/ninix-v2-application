import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors';
import Metrics from '../../Themes/Metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
   justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: Colors.dark
  },
  description: {
    paddingHorizontal: 15,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: Metrics.screenWidth / 2
  },
  textInput: {
    flex: 1,
    fontSize: 60,
    textAlign: 'center',
    color: Colors.dark
  },
  suffix: {
    flex: -1,
    fontSize: 20,
    paddingHorizontal: 5
  }
})
