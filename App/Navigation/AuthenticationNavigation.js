import { StackNavigator } from 'react-navigation'
import PasswordEntry from '../Containers/PasswordEntry'
import ActivationCode from '../Containers/ActivationCode'
import MobileEntry from '../Containers/MobileEntry'
import LoginPage from '../Containers/LoginPage'
import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'

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
