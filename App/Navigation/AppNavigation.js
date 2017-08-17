import { StackNavigator } from 'react-navigation'
import AddDevice from '../Containers/AddDevice'
import AuthenticationScreen from '../Containers/AuthenticationScreen'
import SplashScreen from '../Containers/SplashScreen'
import MainNavigation from './MainNavigation'
import IntroductionPage from '../Containers/IntroductionPage'

import styles from './Styles/NavigationStyles'


// Manifest of possible screens
const PrimaryNav = StackNavigator({
  AddDevice: { screen: AddDevice },
  AuthenticationScreen: { screen: AuthenticationScreen },
  SplashScreen: { screen: SplashScreen },
  Main: { screen: MainNavigation },
  IntroductionPage: { screen: IntroductionPage },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'AddDevice',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
