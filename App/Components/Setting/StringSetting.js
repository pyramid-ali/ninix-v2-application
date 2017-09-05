import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native'
import styles from './Styles/StringSettingStyle'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import Colors from '../../Themes/Colors'

export default class StringSetting extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.string,
    placeholder: PropTypes.string,
  }

  // Defaults for props
  static defaultProps = {
    title: 'first name',
    placeholder: null
  }

  render () {
    const { title, icon, ...props } = this.props

    return (
      <View style={styles.container}>
        <Fumi
          label={title}
          iconClass={FontAwesomeIcon}
          iconName={icon}
          iconColor={Colors.secondary}
          iconSize={20}
          {...props}
        />
      </View>
    )
  }

}
