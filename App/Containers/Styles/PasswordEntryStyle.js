import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 40,
    marginBottom: 30
  },
  description: {
    textAlign: 'left',
    marginBottom: 10,
  },
  error: {
    color: Colors.alert
  },
  barButtonText: {
    color: Colors.white,
    paddingBottom: 5
  },
  link: {
    color: Colors.white,
    backgroundColor: Colors.primary,
    textAlign: 'center',
    borderRadius: 5,
    flex: -1,
    paddingVertical: 10,
    marginVertical: 10,
    fontSize: 16
  },
  linkButton: {
    color: Colors.white,
    fontSize: 16,
    padding: 10,
    backgroundColor: Colors.primary
  },
  password: {
    color: Colors.dark,
    fontSize:28,
    marginBottom: 5,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
})
