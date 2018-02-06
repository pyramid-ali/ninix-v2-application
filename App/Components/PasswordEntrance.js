// Libraries
import React, { Component } from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import PropTypes from 'prop-types'

// Dependencies
import Button from './Button'
import TextInputWithIcon from './TextInputWithIcon'


// Styles
import styles from './Styles/PasswordEntranceStyle'
import Colors from '../Themes/Colors'


export default class PasswordEntrance extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showPassword: false
    }
  }

  render () {

    const { showPassword } = this.state
    const { password, onAccept } = this.props

    return (
      <View style={styles.form}>

        <Text style={styles.password}>{ password }</Text>
        <Text style={styles.description}>
          This password automatically generated for your account
        </Text>

        <Text
          onPress={() => {
            this.setState({
              showPassword: !showPassword
            })
          }}
          style={styles.link}>
          {showPassword ? 'Use Generated Password' : 'Set New Password'}
        </Text>
        {showPassword ?
          this.renderPasswordBox()
          :
          <Button
            onPress={onAccept}
            color={Colors.white}
            backgroundColor={Colors.dark}>
            Accept
          </Button>
        }
      </View>
    )
  }

  renderPasswordBox () {

    const { showPassword } = this.state
    const { fetching, onChangeValue, onChangePassword, valid } = this.props

    return (
      <View>
        <TextInputWithIcon
          ref="passwordInput"
          secureTextEntry={!showPassword}
          selectionColor="black"
          icon="key"
          size={20}
          color={Colors.dark}
          onChangeText={onChangeValue}
          placeholder='New Password'/>
        {fetching ?
          <ActivityIndicator /> :
          <Button
            disabled={!valid}
            onPress={() => {
              const { passwordInput } = this.refs
              onChangePassword()
              passwordInput.blur()
            }}
            color={Colors.white}
            backgroundColor={Colors.dark}>
            Change Password
          </Button>
        }
      </View>
    )
  }

}

PasswordEntrance.propTypes = {
  fetching: PropTypes.bool,
  onAccept: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeValue: PropTypes.func,
  password: PropTypes.string,
  valid: PropTypes.bool
}

PasswordEntrance.defaultProps = {
  fetching: false,
  onAccept: () => {},
  onChangePassword: () => {},
  onChangeValue: () => {},
  valid: true
}
