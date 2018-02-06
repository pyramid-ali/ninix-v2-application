// import Libraries
import { StackNavigator } from 'react-navigation'

// import Dependencies
import AddDevice from '../Containers/AddDevice'
import BabySettings from '../Containers/BabySettings'
import EditProfile from '../Containers/EditProfile'
import Landing from '../Containers/Landing'
import MainNavigation from './MainNavigation'
import ParentSettings from '../Containers/ParentSettings'
import SplashScreen from '../Containers/SplashScreen'
import Signup from '../Containers/Signup'
import ForgotPassword from '../Containers/ForgotPassword'

// import Styles
import styles from './Styles/NavigationStyles'
import Login from '../Containers/Login'

// Manifest of possible screens
const PrimaryNav = StackNavigator({

  Landing: {
    screen: Landing
  },
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  ForgotPassword: {
    screen: ForgotPassword
  },

  // old navigation
  AddDevice: {
    screen: AddDevice
  },
  BabySettings: {
    screen: BabySettings
  },
  EditProfile: {
    screen: EditProfile
  },
  Main: {
    screen: MainNavigation
  },

  ParentSettings: {
    screen: ParentSettings
  },
  SplashScreen: {
    screen: SplashScreen
  },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Signup',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
