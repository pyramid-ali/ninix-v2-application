import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'


import styles from './Styles/NavigationBarStyle'

export default class NavigationBar extends Component {

  static defaultProps = {
    onPressLeftButton: () => {},
    onPressRightButton: () => {},
    leftButton: <Text />,
    rightButton: <Text />
  }

  render () {
    const { onPressLeftButton, onPressRightButton, leftButton, rightButton, children, style, textStyle} = this.props
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
