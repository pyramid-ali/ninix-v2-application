import { StyleSheet } from 'react-native'
import Colors from '../../../Themes/Colors'
import Metrics from '../../../Themes/Metrics'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 0,
    paddingVertical: 5,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    flex: 1
  },
  picker: {
    flex:1,
    opacity: 0,
    zIndex: 10
  },
  placeholder: {
    position: 'absolute',
    right: 15,
    flexDirection: 'row',
    zIndex: 9
  },
  placeholderText: {
    fontSize: 14,
  },
  icon: {
    marginLeft: 5,
    padding: 0,
  }

})
