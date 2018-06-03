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


  render () {

    const { value, fetching, onChangeValue } = this.props

    return (
      <View>

        <Text style={styles.title}>
          Password
        </Text>
        <Text style={styles.description}>
          please enter your password, password should not be smaller than 6 characters
        </Text>
        <TextInputWithIcon
          secureTextEntry={true}
          icon="key"
          ref="passwordInput"
          size={20}
          selectionColor={Colors.dark}
          color={Colors.dark}
          value={value}
          editable={!fetching}
          onChangeText={onChangeValue}
          placeholder='Enter your password'/>
        {fetching ? <ActivityIndicator size={24}/> : this.renderActivateButton()}
      </View>
    )
  }

  renderActivateButton() {
    const {onPress, valid} = this.props
    const {passwordInput} = this.refs

    return (
      <Button
        disabled={!valid}
        color={Colors.white}
        backgroundColor={Colors.dark}
        onPress={() => {
          onPress()
          passwordInput.blur()
        }}>
        Set Password
      </Button>
    )

  }

}

PasswordEntrance.propTypes = {
  fetching: PropTypes.bool,
  onChangeValue: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  value: PropTypes.string
}

PasswordEntrance.defaultProps = {
  fetching: false,
  valid: true
}
