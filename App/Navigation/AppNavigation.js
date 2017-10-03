import { StackNavigator } from 'react-navigation'
import BabySettings from '../Containers/Profile/BabySettings'
import ProfileSetting from '../Containers/Profile/ProfileSetting'
import EditProfile from '../Containers/Profile/EditProfile'
import AddDevice from '../Containers/Device/AddDevice'
import AuthenticationScreen from '../Containers/Authentication/AuthenticationScreen'
import SplashScreen from '../Containers/SplashScreen'
import MainNavigation from './MainNavigation'
import IntroductionPage from '../Containers/IntroductionPage'

import styles from './Styles/NavigationStyles'


// Manifest of possible screens
const PrimaryNav = StackNavigator({
  BabySettings: { screen: BabySettings },
  ProfileSetting: { screen: ProfileSetting },
  EditProfile: { screen: EditProfile },
  AddDevice: { screen: AddDevice },
  AuthenticationScreen: { screen: AuthenticationScreen },
  SplashScreen: { screen: SplashScreen },
  Main: { screen: MainNavigation },
  IntroductionPage: { screen: IntroductionPage },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'IntroductionPage',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
