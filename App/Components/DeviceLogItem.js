// Libraries
import moment from 'moment'
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

// Dependencies
import NinixDevice from './NinixDevice'

// Styles
import styles from './Styles/DeviceLogItemStyle'

export default class DeviceLogItem extends Component {

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

DeviceLogItem.propTypes = {
  status: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
}
