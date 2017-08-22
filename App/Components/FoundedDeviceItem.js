import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import styles from './Styles/FoundedDeviceItemStyle'
import NinixDevice from './NinixDevice'
import Colors from '../Themes/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable';

export default class FoundedDeviceItem extends Component {

  static defaultProps = {
    statusIcon: 'angle-right',
    iconSize: 16,
    iconColor: Colors.dark,
    statusText: 'connect'
  }

  constructor(props) {
    super(props)
  }

  render () {
    const { containerStyle, statusText, text, statusIcon, iconSize, iconColor, onPress } = this.props
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
