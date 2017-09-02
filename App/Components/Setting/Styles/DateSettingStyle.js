import { StyleSheet } from 'react-native'
import Colors from '../../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  title: {
    fontSize: 16
  }
})
