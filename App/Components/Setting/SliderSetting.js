import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Slider } from 'react-native'
import styles from './Styles/SliderSettingStyle'

export default class SliderSetting extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
  }

  // Defaults for props
  static defaultProps = {
    title: 'Height',
    value: 10,
    unit: 'CM'
  }

  render () {
    const { title, value, unit, onValueChange } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.value}>{ value } { unit }</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{ title }</Text>
          <Slider
            style={styles.slider}
            value={value}
            onValueChange={onValueChange} />
        </View>

      </View>
    )
  }
}
