import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: Metrics.navBarHeight,
  },
  leftSide: {
    flex: -1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRightColor: Colors.dark,
    borderRightWidth: 1,
  },
  rightSide: {
    flex: 2,
  },
  item: {
    paddingVertical: 10,
  },
  itemTitle: {
    color: Colors.black,
    textAlign: 'center',
  },
  itemValue: {
    color: Colors.dark,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: Colors.dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  footerButton: {
    // color: Colors.white
  },
  footerSkip: {
    fontSize: 24,
    color: Colors.white,
  },
  footerBack: {
    color: Colors.primary,
  },
  footerApply: {
    color: Colors.primary,
  },
});
