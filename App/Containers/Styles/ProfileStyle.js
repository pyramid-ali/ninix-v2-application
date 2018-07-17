import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  topContainer: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight / 2,
  },

  backgroundImage: {
    width: Metrics.screenWidth,
    height: (Metrics.screenHeight - Metrics.navBarHeight) / 2,
    resizeMode: 'cover',
    position: 'absolute',
  },

  topWrapper: {
    position: 'relative',
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 50,
  },

  settingIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  babyContainer: {
    alignItems: 'center',
  },

  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 10,
  },

  description: {
    color: Colors.white,
  },

  babyImage: {
    borderColor: Colors.light,
    borderWidth: 2,
  },

  bottomContainer: {
    flex: 1,
  },

  list: {
    marginTop: 20,
  },

  listTitle: {
    color: Colors.gray,
    paddingLeft: 15,
  },

  rightTitle: {
    fontSize: 12,
    color: Colors.dark,
  },
});
