import { StyleSheet } from 'react-native'
import Colors from "../../Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 30
  },

  section: {
    backgroundColor: 'white'
  },

  inputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    padding: 0
  },
  labelStyle: {
    fontFamily: 'PoiretOne-Regular',
    fontWeight: 'normal',
    color: Colors.black
  },
  suffix: {
    fontFamily: 'PoiretOne-Regular',
  },
  inputSubtitle: {
    color: Colors.secondary,
    fontFamily: 'PoiretOne-Regular',
  },
  sectionTitleContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  sectionTitle: {
    flex: 0,
    marginHorizontal: 15,
    fontSize: 14,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 5,
    color: Colors.dark,
  },
  picker: {
    flex: 1
  }
})
