import { StyleSheet } from 'react-native';
import Colors from '../../Themes/Colors';

export default StyleSheet.create({
  container: {
    marginHorizontal: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: Colors.secondary,
    borderWidth: 1,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeSegment: {
    backgroundColor: Colors.primary,
  },
  activeSegmentText: {
    color: 'white',
  },

  rightBordered: {
    borderRightWidth: 1,
    borderRightColor: Colors.secondary,
  },

  segmentText: {
    color: Colors.secondary,
    textAlign: 'center',
  },
});
