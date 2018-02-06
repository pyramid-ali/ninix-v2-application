// Libraries
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

// Styles
import styles from './Styles/NavigationBarStyle'

export default class NavigationBar extends Component {

  render () {
    const {
      onPressLeftButton,
      onPressRightButton,
      leftButton,
      rightButton,
      children,
      style,
      textStyle
    } = this.props
    return (
      <View style={[styles.container, style]}>
        <Text style={[styles.title, textStyle]}>
          {children}
        </Text>
        <View>
          <TouchableOpacity onPress={onPressLeftButton}>
            {leftButton}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={onPressRightButton}>
            {rightButton}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

NavigationBar.propTypes = {
  onPressLeftButton: PropTypes.func,
  onPressRightButton: PropTypes.func,
  leftButton: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  rightButton: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  textStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ])
}

NavigationBar.defaultProps = {
  onPressLeftButton: () => {},
  onPressRightButton: () => {},
  leftButton: <Text />,
  rightButton: <Text />,
}
