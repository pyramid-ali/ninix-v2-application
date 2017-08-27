import { StyleSheet } from 'react-native'
import Colors from '../../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  title: {
    flex: -1,
    fontSize: 16,
    color: Colors.black
  },
  value: {
    textAlign: 'right',
    fontSize: 16,
    color: Colors.gray
  },
  slider: {
    flex: 1
  }
})
