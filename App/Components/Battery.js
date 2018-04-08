import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import styles from './Styles/BatteryStyle'
import {Icon} from 'react-native-elements'
import Colors from '../Themes/Colors'

export default class Battery extends Component {

  // TODO: add animation to battery states

  render () {

    const { onPress } = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.batteryWrapper}>
          <View style={[styles.batteryBody]}>
            { this.renderBatteryBars() }
          </View>
          <View style={[styles.batteryHead]}/>
        </View>
      </TouchableOpacity>
    )
  }

  renderBatteryBars () {
    const { battery, lowBattery, fullCharge, charging } = this.props

    if (fullCharge) {
      return (
        <View style={styles.barContainer}>
          <View style={[styles.bar, styles.fullCharge]} >
            <Text style={styles.fullChargeTitle}>Full Charge</Text>
            <Text style={styles.fullChargeDescription}>Unplug Device From Charger</Text>
          </View>
        </View>
      )
    }

    if (charging) {
      return (

        <View style={styles.barContainer}>
          <Icon size={40} name='flash-on' color={Colors.primary} />
        </View>
      )
    }

    if (lowBattery) {
      return (

        <View style={styles.barContainer}>
          <View style={[{flex: battery}, styles.bar, styles.lowBattery]} />
          <View style={{flex: 100 - battery}} />
        </View>
      )
    }

    if (battery) {
      return (
        <View style={styles.barContainer}>
          <View style={[{flex: battery}, styles.bar]} />
          <View style={{flex: 100 - battery}} />
        </View>
      )
    }

    return (
      <Text style={styles.batteryCharge}> { battery ? battery + '%' : 'Unknown'}</Text>
    )
  }
}

Battery.propTypes = {
  battery: PropTypes.number,
  fullCharge: PropTypes.bool,
  charging: PropTypes.bool,
  lowBattery: PropTypes.bool,
  onPress: PropTypes.func
}
