import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native'
import styles from './Styles/NotificationItemStyle'
import moment from 'moment'

export default class NotificationItem extends Component {
  // Prop type warnings
  static propTypes = {
    date: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    problem: PropTypes.string.isRequired,
  }

  // Defaults for props
  static defaultProps = {
    date: new Date(),
    type: 'danger',
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
    problem: 'tangie-nafas'
  }

  render () {

    const { date, type, text, problem} = this.props
    const parseDate = moment(date)

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
          <Image source={require('../Images/profile-background.jpg')} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, styles[type.toLowerCase()]]}>{type.toUpperCase()}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    )
  }
}
