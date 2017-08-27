import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  navBar: {
    backgroundColor: Colors.dark
  },
  leftBarButtonText: {
    color: Colors.white
  },
  separator: {
    height: 2
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: Colors.white
  },
  itemImageContainer: {
    flex: -1,
    padding: 5
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  itemTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingLeft: 10
  },
  itemTitle: {
    fontSize: 24
  },
  itemText: {
    fontSize: 14
  },
  itemButtonContainer: {
    flex: -1,
    alignSelf: 'center',
    paddingRight: 5
  },
  itemTextButton: {
    color: Colors.secondary,
    fontSize: 20
  }
})
