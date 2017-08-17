import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  informationContainer: {
    flex: 1,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftColumn: {
    alignItems: 'flex-start',
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
  },
  inlineBox: {
    alignItems: 'center',
    width: 70
  },
  statText: {
    color: 'white'
  },
})
