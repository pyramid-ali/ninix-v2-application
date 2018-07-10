// import Libraries
import { StackNavigator } from 'react-navigation'
import FirmwareUpdate from '../Containers/FirmwareUpdate'
import PrivacyPolicy from '../Containers/PrivacyPolicy'
import ChangePassword from '../Containers/ChangePassword'

import EditMotherInformation from '../Containers/EditMotherInformation'
import EditFatherInformation from '../Containers/EditFatherInformation'
import ListPicker from '../Containers/ListPicker'
import EditBabyInformation from '../Containers/EditBabyInformation'
import BabyHead from '../Containers/BabyHead'
import BabyHeight from '../Containers/BabyHeight'
import BabyWeight from '../Containers/BabyWeight'
import EssentialInformationSlider from '../Containers/EssentialInformationSlider'

// import Dependencies
import AddDevice from '../Containers/AddDevice'
import Landing from '../Containers/Landing'
import MainNavigation from './MainNavigation'
import SplashScreen from '../Containers/SplashScreen'
import Signup from '../Containers/Signup'
import ForgotPassword from '../Containers/ForgotPassword'

// import Styles
import styles from './Styles/NavigationStyles'
import Login from '../Containers/Login'
import Device from "../Containers/Device";
import Settings from "../Containers/Settings";

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  FirmwareUpdate: {
    screen: FirmwareUpdate
  },
  PrivacyPolicy: {
    screen: PrivacyPolicy
  },
  ChangePassword: {
    screen: ChangePassword
  },
  Settings: {
    screen: Settings
  },
  Device: {
    screen: Device
  },
  EditMotherInformation: {
    screen: EditMotherInformation
  },
  EditFatherInformation: {
    screen: EditFatherInformation
  },
  ListPicker: {
    screen: ListPicker
  },
  EditBabyInformation: {
    screen: EditBabyInformation
  },
  BabyHead: {
    screen: BabyHead
  },
  BabyHeight: {
    screen: BabyHeight
  },
  BabyWeight: {
    screen: BabyWeight
  },
  EssentialInformationSlider: {
    screen: EssentialInformationSlider
  },
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
  AddDevice: {
    screen: AddDevice
  },
  Main: {
    screen: MainNavigation
  },
  SplashScreen: {
    screen: SplashScreen
  },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SplashScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
