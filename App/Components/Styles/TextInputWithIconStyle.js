import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    flex: -1,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
  },
});
