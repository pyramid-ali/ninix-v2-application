import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/BatteryStyle'

export default class Battery extends Component {


  render () {

    const { lowBattery, onPress } = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.batteryWrapper}>
          <View style={[styles.batteryBody, lowBattery ? styles.redBorder : null]}>
            { this.renderBatteryBars() }
          </View>
          <View style={[styles.batteryHead, lowBattery ? styles.redBorder : null]}/>
        </View>
      </TouchableOpacity>
    )
  }

  renderBatteryBars () {
    const { battery } = this.props

    if (battery) {
      const state = Math.round(battery / 25)
      const bars = Array.apply(null, {length: 4}).map(Function.call, Number)
      return (
        <View style={styles.barContainer}>
          { bars.map(item => <View key={item} style={item <= state ? (state === 0 ? [styles.bar, styles.lowBattery] : styles.bar) : styles.noBar} />)}
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
