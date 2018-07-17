import { StyleSheet } from 'react-native';
import Metrics from '../../Themes/Metrics';
import Colors from '../../Themes/Colors';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(${Colors.blackRGB}, 0.7)`,
  },
  modalBox: {
    width: Metrics.screenWidth - 80,
    padding: 10,
    backgroundColor: Colors.light,
    borderRadius: 5,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  header: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    borderBottomColor: `rgba(${Colors.blackRGB}, 0.1)`,
    borderBottomWidth: 1,
    marginBottom: 5,
    fontSize: 20,
    paddingBottom: 5,
  },
  content: {
    flex: -1,
  },
  buttonGroup: {
    marginTop: 15,
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 5,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
  },
});
