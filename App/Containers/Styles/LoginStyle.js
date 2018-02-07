import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    height: Metrics.screenHeight,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    justifyContent: 'center',
    position: 'absolute'
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    height: Metrics.screenHeight,
    maxHeight: Metrics.screenHeight
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontSize: 80,
    color: Colors.white,
    width: Metrics.screenWidth,
    textAlign: 'center',
    fontFamily: 'BerkshireSwash-Regular'
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  textInputContainerStyle: {
    alignSelf: 'center',
    width: Metrics.screenWidth - 60,
    borderColor: 'white'
  },
  textInput: {
    color: Colors.white
  },
  buttonStyle: {
    alignSelf: 'center',
    width: Metrics.screenWidth - 60,
    marginBottom: 15
  },
  linkContainer: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.white,
    marginBottom: 25
  },
  link: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  footer: {
    width: Metrics.screenWidth,
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopColor: 'rgba(255, 255, 255, 0.7)',
    borderTopWidth: 1
  },
  footerText: {
    width: Metrics.screenWidth,
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopColor: 'rgba(255, 255, 255, 0.7)',
    borderTopWidth: 1
  },
  error: {
    color: Colors.alert,
    marginHorizontal: 30,
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.white
  }
})
