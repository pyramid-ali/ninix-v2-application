// Libraries
import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

// Styles
import styles from './Styles/TextInputWithIconStyle'

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
    const {
      color,
      size,
      icon,
      containerStyle,
      style,
      ...textInput
    } = this.props

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

TextInputWithIcon.propTypes = {
  ...TextInput.propTypes,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  size: PropTypes.size,
  icon: PropTypes.string,
  containerStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),

}

TextInputWithIcon.defaultProps = {
  icon: null,
  color: null,
  size: 24,
  selectionColor: 'white'
}
