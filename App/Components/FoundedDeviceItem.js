import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/FoundedDeviceItemStyle'
import NinixDevice from './NinixDevice'
import Colors from '../Themes/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class FoundedDeviceItem extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    statusIcon: 'angle-right',
    iconSize: 16,
    iconColor: Colors.dark,
    statusText: 'connect'
  }

  render () {
    const { containerStyle, iconComponent, text, statusText, statusIcon, iconSize, iconColor } = this.props
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
          <TouchableOpacity>
            <Text style={styles.status}>{statusText}  <Icon name={statusIcon} size={iconSize} color={iconColor} /></Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
