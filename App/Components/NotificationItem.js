// Libraries
import moment from 'moment'
import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

// Styles
import styles from './Styles/NotificationItemStyle'


export default class NotificationItem extends Component {

  render () {

    const {
      date,
      type,
      text,
      problem
    } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {moment().format("dddd, MMMM Do YYYY")}
          </Text>
          <Text style={styles.time}>
            {moment().format("h:mm:ss A")}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../Images/childcare.png')} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, styles[type.toLowerCase()]]}>{type.toUpperCase()}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    )
  }
}

NotificationItem.propTypes = {
  date: PropTypes.object,
  type: PropTypes.string,
  text: PropTypes.string,
  problem: PropTypes.string,
}

NotificationItem.defaultProps = {
  date: new Date(),
  type: 'danger',
  text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
  problem: 'tangie-nafas'
}
