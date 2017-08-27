import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Switch } from 'react-native'
import styles from './Styles/BooleanSettingStyle'

export default class BooleanSetting extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
  }

  // Defaults for props
  static defaultProps = {
    title: 'IS it Shit'
  }

  render () {
    const { title, currentValue, ...props } = this.props
    console.log('re render switch', props.value, currentValue)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{ title }</Text>
        <Switch
          {...props}
          value={currentValue}
        />
      </View>
    )
  }
}
