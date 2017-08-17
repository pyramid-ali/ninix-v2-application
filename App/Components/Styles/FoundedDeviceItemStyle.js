import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  iconContainer: {
    flex: 1
  },
  textContainer: {
    flex: 4
  },
  text: {
    color: Colors.primary
  },
  statusContainer: {
    flex: -1
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
