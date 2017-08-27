import { StyleSheet } from 'react-native'
import Colors from '../../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    paddingBottom: 10
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 7
  },
  title: {
    flex: -1,
    fontSize: 12,
    color: `rgba(${Colors.blackRGB}, 0.8)`,
    borderBottomColor: `rgba(${Colors.blackRGB}, 0.1)`,
  },
  icon: {
    paddingRight: 5
  },
  textInput: {
    fontSize: 16,
    padding: 0,
    color: Colors.primary
  }
})
