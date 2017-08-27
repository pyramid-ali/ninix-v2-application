import { StyleSheet } from 'react-native'
import Colors from '../../../Themes/Colors'
import Metrics from '../../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.white
  },
  navBar: {
    //flex: 1,
    height: Metrics.navBarHeight,
    backgroundColor: Colors.light,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: `rgba(${Colors.blackRGB}, 0.5)`
  },
  navBarIcon: {
    marginHorizontal: 10
  },
  navBarText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  itemText: {
    fontSize: 18,
    color: Colors.dark
  },
  separator: {
    flex: 1,
    borderWidth: 0.25,
    marginHorizontal: 10,
    borderColor: `rgba(${Colors.blackRGB}, 0.2)`
  }
})
