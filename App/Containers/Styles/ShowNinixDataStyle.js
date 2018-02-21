import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.secondary
  },
  navBar: {
    backgroundColor: Colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white
  },
  title: {
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center'
  },
  line: {
    alignSelf: 'center',
    width: Metrics.screenWidth - 40,
    backgroundColor: Colors.dark,
    height: 1
  },
  header: {
    padding: 10,
    backgroundColor: `rgba(${Colors.darkRGB}, 0.5)`
  },
  headerText: {
    alignItems: 'center',
    textAlign: 'center',
    color: Colors.white
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButtonIcon: {

  },
  backButtonText: {
    color: Colors.white,
    fontSize: 14,
    paddingLeft: 5,
    fontWeight: '100'
  },
  error: {
    backgroundColor: Colors.alert,
    padding: 10
  },
  white: {
    color: Colors.white
  }
})
