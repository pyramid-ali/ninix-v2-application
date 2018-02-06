// Libraries
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

// Styles
import styles from './Styles/StickyAlertStyle'
import Colors from '../Themes/Colors'

export default class StickyAlert extends Component {

  render () {
    const {
      children,
      backgroundColor,
      textColor,
      leftIconColor,
      leftIcon,
      rightIconColor,
      rightIcon,
      onPressRightIcon,
      onPressLeftIcon
    } = this.props

    return (
      <View style={[styles.container, {backgroundColor}]}>
        {leftIcon ?
          <TouchableOpacity
            style={[styles.leftButton]}
            onPress={onPressLeftIcon}
          >
            <Icon
              name={leftIcon}
              size={22}
              color={leftIconColor}
            />
          </TouchableOpacity>
           :
          null
        }
        <Text style={[styles.text, {color: textColor}]}>{children}</Text>
        {rightIcon ?
          <TouchableOpacity
            style={[styles.rightButton]}
            onPress={onPressRightIcon}
          >
            <Icon
              name={rightIcon}
              size={22}
              color={rightIconColor}
            />
          </TouchableOpacity>:
          null
        }
      </View>
    )
  }
}

StickyAlert.propTypes = {
  backgroundColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  leftIcon: PropTypes.string,
  leftIconColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onPressLeftIcon: PropTypes.func,
  onPressRightIcon: PropTypes.func,
  rightIconColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  rightIcon: PropTypes.string,
  textColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
}

StickyAlert.defaultProps = {
  backgroundColor: `rgba(${Colors.alertRGB}, 0.6)`,
  leftIcon: null,
  leftIconColor: Colors.white,
  rightIcon: null,
  rightIconColor: Colors.white,
  textColor: Colors.white,
}
