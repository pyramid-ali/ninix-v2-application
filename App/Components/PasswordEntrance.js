import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator} from 'react-native'
import styles from './Styles/PasswordEntranceStyle'
import Button from './Button';
import Colors from '../Themes/Colors';
import TextInputWithIcon from './TextInputWithIcon';

export default class PasswordEntrance extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showPassword: false
    }
  }

  // Prop type warnings
  static propTypes = {
    password: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired
  }

  // Defaults for props
  static defaultProps = {
    fetching: false,
    onChangePassword: () => {},
    onChangeValue: () => {}
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
