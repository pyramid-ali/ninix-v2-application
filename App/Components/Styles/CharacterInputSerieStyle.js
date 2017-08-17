import { StyleSheet } from 'react-native'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: 60,
    width: 50,
    marginHorizontal: 2,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.dark
  }
})
