import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/DeviceLogItemStyle'
import NinixDevice from './NinixDevice'
import moment from 'moment'

export default class DeviceLogItem extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  static defaultProps = {
    date: null
  }

  render () {
    const {status, date} = this.props
    const color = status.toLowerCase() === 'disconnected' ? 'red' : 'green'
    return (
      <View style={styles.container}>
        <View style={styles.ninix}>
          <NinixDevice lightColor={color} size={50} blink={false} />
        </View>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{moment(date).fromNow(true)}</Text>
        </View>

      </View>
    )
  }
}
