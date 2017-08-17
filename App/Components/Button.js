import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/ButtonStyle'

export default class Button extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const { onPress, backgroundColor, children, color, containerStyle, disabled } = this.props
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.buttonContainer, containerStyle]}>
        <Text style={[styles.buttonText, {backgroundColor, color}, disabled ? styles.disabled : null]}>{children}</Text>
      </TouchableOpacity>
    )
  }
}
