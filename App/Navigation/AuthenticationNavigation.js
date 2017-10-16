import { StackNavigator } from 'react-navigation'
import PasswordEntry from '../Containers/Authentication/Signup/PasswordEntry'
import ActivationCode from '../Containers/Authentication/Signup/ActivationCode'
import MobileEntry from '../Containers/Authentication/Signup/MobileEntry'
import LoginPage from '../Containers/Authentication/LoginPage'
import React from 'react'


import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const AuthenticationNav = StackNavigator({
  PasswordEntry: { screen: PasswordEntry },
  ActivationCode: { screen: ActivationCode },
  MobileEntry: { screen: MobileEntry },
  LoginPage: { screen: LoginPage },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginPage',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default AuthenticationNav
