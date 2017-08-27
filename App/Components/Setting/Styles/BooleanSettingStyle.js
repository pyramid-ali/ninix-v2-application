import { StyleSheet } from 'react-native'
import Colors from '../../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  title: {
    fontSize: 16,
  }
})
