import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, DatePickerAndroid, TouchableOpacity } from 'react-native'
import styles from './Styles/DateSettingStyle'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class DateSetting extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  static defaultProps = {
    title: 'Choose Date',
    value: null
  }

  render () {
    const { title, value } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => this.datePicker(value)}>
          <Text>{value ?  moment(value).format("MMMM Do, YYYY") : 'Choose Date'} <Icon name="calendar-check-o" size={16} /></Text>
        </TouchableOpacity>
      </View>
    )
  }

  async datePicker (value) {
    const { onChange } = this.props
    if (!value) {
      value = new Date(0)
    }
    else {
      value = moment(value).toDate()
    }
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: value
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        onChange(year, month, day)
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
}
