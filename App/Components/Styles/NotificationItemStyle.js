import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 5
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  date: {
    color: Colors.gray,
    textAlign: 'center',
    flex: 1
  },
  time: {
    fontSize: 14
  },
  imageContainer: {
    flex: -1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  textContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 16
  },
  danger: {
    color: Colors.alert
  },
  warning: {
    color: 'orange'
  },
  normal: {
    color: 'blue'
  }
})
