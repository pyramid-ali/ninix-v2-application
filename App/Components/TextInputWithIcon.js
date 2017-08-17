import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native'
import styles from './Styles/TextInputWithIconStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class TextInputWithIcon extends Component {
  static propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    secureTextEntry: PropTypes.bool
  }

  // Defaults for props
  static defaultProps = {
    icon: null,
    color: null,
    size: 24,
    selectionColor: 'white'
  }

  render () {
    const {color, size, icon, containerStyle, style, ...textInput} = this.props

    return (
      <View style={[styles.container, containerStyle]}>
        <Icon
          style={styles.icon}
          name={icon}
          size={size}
          color={color} />
        <TextInput
          ref="textInput"
          underlineColorAndroid="transparent"
          style={[styles.textInput, style]}
          {...textInput} />
      </View>
    )
  }

  focus() {
    this.refs.textInput.focus()
  }

  blur() {
    this.refs.textInput.blur()
  }
}
