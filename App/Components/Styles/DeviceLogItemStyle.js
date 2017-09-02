import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  dateContainer: {
    flex: -1,
    alignItems: 'flex-end'
  },
  date: {
    color: Colors.gray
  },
  time: {
    color: Colors.dark
  },
  status: {
    flex: 1,
    paddingHorizontal: 10
  },
  ninix: {
    flex: -1
  }
})
