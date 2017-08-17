import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/StickyAlertStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../Themes/Colors'

export default class StickyAlert extends Component {
  // Prop type warnings
  static propTypes = {
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    leftIconColor: PropTypes.string,
    rightIconColor: PropTypes.string,
  }

  // Defaults for props
  static defaultProps = {
    backgroundColor: `rgba(${Colors.alertRGB}, 0.6)`,
    textColor: Colors.white,
    leftIcon: null,
    rightIcon: null,
    leftIconColor: Colors.white,
    rightIconColor: Colors.white
  }

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
