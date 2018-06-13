import { StyleSheet } from 'react-native'
import Colors from "../../Themes/Colors";

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: Colors.white,
    fontFamily: 'PoiretOne-Regular',
  },

  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.gray,
    fontFamily: 'PoiretOne-Regular',
    marginHorizontal: 15
  }
})
