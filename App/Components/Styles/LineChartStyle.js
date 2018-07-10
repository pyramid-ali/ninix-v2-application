import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontFamily: 'PoiretOne-Regular',
  },
  description: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'PoiretOne-Regular',
  },
  chartWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartStyle: {
    flex: 1,
    marginLeft: 16
  }
})
