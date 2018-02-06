// Libraries
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'


// Dependencies
import NinixDevice from './NinixDevice'

// Styles
import Colors from '../Themes/Colors'
import styles from './Styles/FoundedDeviceItemStyle'

export default class FoundedDeviceItem extends Component {

  static defaultProps = {
    statusIcon: 'angle-right',
    iconSize: 16,
    iconColor: Colors.dark,
  }

  render () {
    const {
      iconColor,
      iconSize,
      onPress,
      statusIcon,
      text
    } = this.props
    const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <NinixDevice size={35} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {text}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.status}>Connect{ ' ' }
              <AnimatedIcon
                  style={styles.statusIcon}
                  name={statusIcon}
                  size={iconSize}
                  color={iconColor} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

FoundedDeviceItem.propTypes = {
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func,
  statusIcon: PropTypes.string,
  text: PropTypes.string
}

FoundedDeviceItem.defaultProps = {
  iconColor: Colors.dark,
  iconSize: 16,
  statusIcon: 'angle-right'
}
