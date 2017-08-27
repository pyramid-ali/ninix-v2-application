import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native'
import styles from './Styles/StringSettingStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class StringSetting extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    placeholder: PropTypes.string,
  }

  // Defaults for props
  static defaultProps = {
    title: 'first name',
    placeholder: 'Enter Your Name'
  }

  render () {
    const { title, icon, ...props } = this.props
    return (
      <View
        style={styles.container}>
        <View style={styles.titleContainer}>
          { icon ?
            <Icon name={icon} size={14} style={styles.icon} /> :
            null
          }
          <Text
            style={styles.title}>
            {title}
          </Text>
        </View>
        <TextInput
          autoCapitalize="words"
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          {...props}
        />
      </View>
    )
  }
}
